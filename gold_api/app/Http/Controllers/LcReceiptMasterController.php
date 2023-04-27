<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\LcReceiptMaster;
use App\Http\Requests\StoreLcReceiptMasterRequest;
use App\Http\Requests\UpdateLcReceiptMasterRequest;
use App\Models\Maxtable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LcReceiptMasterController extends APIController
{
    public function getLcReceiptsByCustomer($customer_id){
        $lcReceipt = LcReceiptMaster::whereCustId($customer_id)->orderBy('lc_receipt_date', 'DESC')->get();
        return $this->successResponse($lcReceipt);
    }
    public function save_lc_receipt(Request $request){
        DB::beginTransaction();
        try{
            $return_array=array();
            $accounting_year = get_accounting_year();
            $voucher="lc_receipt_master";
            $maxTable = Maxtable::whereTableNameAndFinancialYear($voucher,$accounting_year)->first();

            if($maxTable){
                $maxTable->mainfield =  $maxTable->mainfield + 1;
                $maxTable->save();
                $return_array['maxTable']=$maxTable;

            }else{
                $maxTable = new Maxtable();
                $maxTable->table_name = $voucher;
                $maxTable->mainfield = 1;
                $maxTable->prefix = 'LRM';
                $maxTable->suffix = 'None';
                $maxTable->financial_year = $accounting_year;
                $maxTable->save();

                $return_array['maxTable']=$maxTable;
            }
            $voucher_number = $maxTable->prefix.'/'.$maxTable->mainfield.'/'.$maxTable->financial_year;
            $lcReceiptMaster = new LcReceiptMaster();
            $lcReceiptMaster->lc_receipt_no = $voucher_number;
            $lcReceiptMaster->agent_id = $request->agent_id;
            $lcReceiptMaster->cust_id = $request->cust_id;
            $lcReceiptMaster->mode = $request->mode;
            $lcReceiptMaster->emp_id = Auth::user()->emp_id;
            $lcReceiptMaster->amount = $request->amount;
            $lcReceiptMaster->discount = $request->discount;
            $lcReceiptMaster->cheque_details =$request->cheque_details? $request->cheque_details: null;
            $lcReceiptMaster->save();
            $agent = Agent::findOrFail($request->agent_id);
            $customer = Customer::findOrFail($request->cust_id);
            $return_array['agent']=$agent;
            $return_array['customer']=$customer;
            $return_array['user']=Auth::user();
            $return_array['employee']=Employee::find($return_array['user']->emp_id);

            DB::commit();
            $return_array['lc_receipt']=LcReceiptMaster::find($voucher_number);
            return $this->successResponse($return_array);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['success'=>0,'exception'=>$e->getMessage()], 500);
        }
    }
}
