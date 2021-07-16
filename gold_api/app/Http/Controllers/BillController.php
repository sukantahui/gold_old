<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Maxtable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use mysql_xdevapi\Exception;
use App\Models\BillMaster;


class BillController extends ApiController
{
    public function create_ready_made_bill(Request $request){
        $input=($request->json()->all());
        //****************** Validation Part, First Validation **********************
        $validator = Validator::make($input,[
            'billMaster' => 'required',
            'billDetails' => ['required']]);
        if($validator->fails()){
            return $this->errorResponse($validator->messages(),406);
        }
        //****************** End of Validation ********************
        $billMaster=(object)($input['billMaster']);
        $billDetails=($input['billDetails']);

        $rules = array(
            'customerId' => ['required','exists:customer_master,cust_id'],
            'agentId' => ['required', 'exists:agent_master,agent_id'],
            'employeeId'=> ['required','exists:employees,emp_id']
        );
        $messages= array(
            'customerId.required'=> 'Customer id is required !!',
            'customerId.exists' => 'Customer id does not exists !!',
            'agentId.required' => 'Agent id is required !!',
            'agentId.exists' => 'Agent id does not exists !!',
            'employeeId.required' => 'Employee id is required !!',
            'employeeId.exists' => 'Employee id does not exists !!'
        );
        $validator = Validator::make($input['billMaster'],$rules,$messages );
        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(),406);
        }

        DB::beginTransaction();
        try{
            $return_array = array();
            $accounting_year = get_accounting_year();
            $maxTable = Maxtable::whereTableNameAndFinancialYear('bill_master',$accounting_year)->first();
            if($maxTable){
                $maxTable->mainfield =  $maxTable->mainfield + 1;
                $maxTable->save();
                $return_array['maxTable']=$maxTable;

            }else{
                $maxTable = new Maxtable();
                $maxTable->table_name = 'bill_master';
                $maxTable->mainfield = 1;
                $maxTable->prefix = 'SBJW';
                $maxTable->suffix = 'None';
                $maxTable->financial_year = $accounting_year;
                $maxTable->save();

                $return_array['maxTable']=$maxTable;
            }
            $bill_number = $maxTable->prefix.'/'.$maxTable->mainfield.'/'.$maxTable->financial_year;
            $return_array['bill_number'] = $bill_number;
            $bill_master =  new BillMaster();
            $bill_master->bill_no = $bill_number;
            $bill_master->bill_date = 41640;
            $bill_master->cust_id = 'S101';
            $bill_master->order_id = 200;
            $bill_master->bill_gold = 21.03;
            $bill_master->gold_cleared = 21.03;
            $bill_master->gold_completed = 21.03;
            $bill_master->bill_labour_charge = 21.03;
            $bill_master->Cash_cleared = 21.03;
            $bill_master->cash_completed = 21.03;
            $bill_master->agent_id = 'AG2004';
            $bill_master->comments = 'Ready Made Bill';
//            $bill_number->tr_time = bill_date;
            $bill_master->emp_id = 33;
            $bill_master->total_lc_inward = 21.03;
            $bill_master->discount = 21.03;
            $bill_master->save();
            $return_array['billMaster']=$bill_master;
            DB::commit();
            return $this->successResponse($return_array);

        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
        return $this->successResponse($data);
    }

}
