<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\BillResource;
use App\Models\BillDetails;
use App\Models\CustomerBalance;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Maxtable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
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
            'customerId.exists' => 'Customer id does not exist !!',
            'agentId.required' => 'Agent id is required !!',
            'agentId.exists' => 'Agent id does not exist !!',
            'employeeId.required' => 'Employee id is required !!',
            'employeeId.exists' => 'Employee id does not exist !!'
        );
        $validator = Validator::make($input['billMaster'],$rules,$messages );
        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(),406);
        }

        $rules = array(
            '*.tag'=> ['required',Rule::unique('bill_details','tag')],
            '*.modelNo' => ['required','exists:item_stock_ready_made,model_no']
        );
        $messages = array(
            '*.tag.required' => 'Tag is required !!',
            '*.tag.unique' => 'Tag is already taken !!',
            '*.modelNo.required' => 'Model Number is required !!',
            '*.modelNo.exists' => 'Model Number does not exist !!'
        );

        $validator = Validator::make($input['billDetails'],$rules,$messages );
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
            $bill_master->cust_id = $billMaster->customerId;
            $bill_master->bill_gold = 0;
            $bill_master->gold_cleared = 0;
            $bill_master->gold_completed = 0;
            $bill_master->bill_labour_charge = 0;
            $bill_master->Cash_cleared = 0;
            $bill_master->cash_completed = 0;
            $bill_master->agent_id = $billMaster->agentId;
            $bill_master->comments = 'Ready Made Bill';
            $bill_master->emp_id = $billMaster->employeeId;
            $bill_master->total_lc_inward = 0;
            $bill_master->discount = 0;
            $bill_master->save();

            $return_array['billMaster']=$bill_master;

            $x = 1;
            foreach ($billDetails as $item){
                $bill_details =  new BillDetails();
                $bill_details->bill_details_id = $bill_master->bill_no.'-'.($x++);
                $bill_details->bill_no =  $bill_master->bill_no;
                $bill_details->job_id = $item['jobId'] ;
                $bill_details->tag =  $item['tag'];
                $bill_details->model_no =  $item['modelNo'];
                $bill_details->price_code =  $item['priceCode'];
                $bill_details->gold_wt =  $item['goldWeight'];
                $bill_details->gross_wt =  $item['grossWeight'];
                $bill_details->price_method =  'Regular';
                $bill_details->wastage_percentage =  0;
                $bill_details->wastage =  0;
                $bill_details->total_gold =  $item['totalGold'];
                $bill_details->gold_quality = 92;
                $bill_details->fine_gold =  $item['fineGold'];
                $bill_details->qty =   $item['quanity'];
                $bill_details->size = $item['size'];
                $bill_details->ploss =  0;
                $bill_details->labour_charge =  $item['labourCharge'];
                $bill_details->markup_value =  0;
                $bill_details->save();
                $return_array['billDetails'] = $bill_details;
            }
            $total_fine_gold = BillDetails::whereBillNo($bill_master->bill_no)->sum('fine_gold');
            $total_labour_charge =  BillDetails::whereBillNo($bill_master->bill_no)->sum('labour_charge');
            $return_array['totalGold'] = $total_fine_gold;
            $return_array['totalLabourCharge'] = $total_labour_charge;

            $customer_balance = CustomerBalance::whereCustId($bill_master->cust_id)->first();
            $customer_balance->billed_gold = $customer_balance->billed_gold + $total_fine_gold;
            $customer_balance->billed_lc = $customer_balance->billed_lc + $total_labour_charge;
            $customer_balance->update();
            $return_array['customerBalance'] = $customer_balance;

            DB::commit();
//            return  $this->successResponse($return_array);
            return $this->successResponse(new BillResource($bill_master));

        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
        return $this->successResponse($data);
    }

}
