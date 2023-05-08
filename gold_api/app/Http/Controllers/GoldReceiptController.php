<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\GoldReceiptMaster;
use App\Models\MaterialToEmployeeBalance;
use App\Models\Maxtable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GoldReceiptController extends ApiController
{
    public function getLcReceiptsByCustomer($customer_id){
        $lcReceipt = GoldReceiptMaster::whereCustId($customer_id)->orderBy('tr_date', 'DESC')->get();
        return $this->successResponse($lcReceipt);
    }
    public function save_gold_receipt(Request $request){
        DB::beginTransaction();
        try{
            $return_array=array();
            $accounting_year = get_accounting_year();
            $voucher="gold_receipt_master";
            $maxTable = Maxtable::whereTableNameAndFinancialYear($voucher,$accounting_year)->first();

            if($maxTable){
                $maxTable->mainfield =  $maxTable->mainfield + 1;
                $maxTable->save();
                $return_array['maxTable']=$maxTable;

            }else{
                $maxTable = new Maxtable();
                $maxTable->table_name = $voucher;
                $maxTable->mainfield = 1;
                $maxTable->prefix = 'GRM';
                $maxTable->suffix = 'None';
                $maxTable->financial_year = $accounting_year;
                $maxTable->save();

                $return_array['maxTable']=$maxTable;
            }
            $voucher_number = $maxTable->prefix.'/'.$maxTable->mainfield.'/'.$maxTable->financial_year;
            $goldReceiptMaster = new GoldReceiptMaster();
            $goldReceiptMaster->gold_receipt_id = $voucher_number;
            $goldReceiptMaster->agent_id = $request->agent_id;
            $goldReceiptMaster->cust_id = $request->cust_id;
            $goldReceiptMaster->payment_mode = $request->payment_mode;
            $goldReceiptMaster->emp_id = Auth::user()->emp_id;
            $goldReceiptMaster->gold_value = $request->gold_value;
            $goldReceiptMaster->gold_rate = $request->gold_rate;
            $goldReceiptMaster->cash = $request->cash;
            $goldReceiptMaster->last_gold_balance = $request->last_gold_balance;
            $goldReceiptMaster->current_lc_balance = $request->current_lc_balance;
            $goldReceiptMaster->rm_id = $request->rm_id;
            $goldReceiptMaster->save();

            $materialToEmployeeBalance = MaterialToEmployeeBalance::whereEmpIdAndRmId(Auth::user()->emp_id, $request->rm_id)->first();
            $materialToEmployeeBalance->inward=$materialToEmployeeBalance->inward + $request->gold_value;
            $materialToEmployeeBalance->balance=$materialToEmployeeBalance->balance + $request->gold_value;
            $materialToEmployeeBalance->save();
            DB::commit();
//            $return_array['lc_receipt']=$goldReceiptMaster;
//            $lc_dues = (object)(DB::select('select get_customer_total_lc_due_before_lc_receipt_no(?) as lc_due_before', [$voucher_number])[0]);
//            $return_array['lc_due']=$lc_dues;
            $return_array['material_to_employee_balance']=$materialToEmployeeBalance;
            $return_array['gold_receipt']=GoldReceiptMaster::findOrFail($voucher_number);
            $return_array['customer']=Customer::findOrFail($return_array['gold_receipt']->cust_id);
            $return_array['agent']=Agent::findOrFail($return_array['gold_receipt']->agent_id);
            $return_array['employee']=Employee::findOrFail($return_array['gold_receipt']->emp_id);
            return $this->successResponse($return_array);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['success'=>0,'exception'=>$e->getMessage()], 500);
        }
    }
}
