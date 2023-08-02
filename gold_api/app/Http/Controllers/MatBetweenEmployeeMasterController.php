<?php

namespace App\Http\Controllers;

use App\Models\MatBetweenEmployeeDetails;
use App\Models\MatBetweenEmployeeMaster;
use App\Http\Requests\StoreMatBetweenEmployeeMasterRequest;
use App\Http\Requests\UpdateMatBetweenEmployeeMasterRequest;
use App\Models\Maxtable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MatBetweenEmployeeMasterController extends ApiController
{
    function saveMaterialToEmployees(Request $request){
        $input=($request->json()->all());

        $data=(object)($input);
        DB::beginTransaction();
        $return_array=[];
        try{
            $accounting_year = get_accounting_year();
            $voucher="mat_between_employees";
            $maxTable = Maxtable::whereTableNameAndFinancialYear($voucher,$accounting_year)->first();

            if($maxTable){
                $maxTable->mainfield =  $maxTable->mainfield + 1;
                $maxTable->save();
                $return_array['maxTable']=$maxTable;

            }else{
                $maxTable = new Maxtable();
                $maxTable->table_name = $voucher;
                $maxTable->mainfield = 1;
                $maxTable->prefix = 'MBE';
                $maxTable->suffix = 'None';
                $maxTable->financial_year = $accounting_year;
                $maxTable->save();
                $return_array['maxTable']=$maxTable;


            }
            $voucher_number = $maxTable->prefix.'/'.$maxTable->mainfield.'/'.$maxTable->financial_year;

            // adding data to Master
            $matBetweenEmployeeMaster = new MatBetweenEmployeeMaster();
            $matBetweenEmployeeMaster->transaction_number = $voucher_number;
            $matBetweenEmployeeMaster->save();
            $return_array['matBetweenEmployeeMaster']=$matBetweenEmployeeMaster;
            // adding details for sender
            $matBetweenEmployeeDetails = new MatBetweenEmployeeDetails();
            $matBetweenEmployeeDetails->mat_between_employee_id=$matBetweenEmployeeMaster->id;
            $matBetweenEmployeeDetails->employee_id=$data->outward_employee_id;
            $matBetweenEmployeeDetails->rm_id=$data->rm_id;
            $matBetweenEmployeeDetails->outward=$data->value;
            $matBetweenEmployeeDetails->inward=0;
            $matBetweenEmployeeDetails->save();
            $return_array['matBetweenEmployeeDetailsSender']=$matBetweenEmployeeDetails;
            // adding details for receiver
            $matBetweenEmployeeDetails = new MatBetweenEmployeeDetails();
            $matBetweenEmployeeDetails->mat_between_employee_id=$matBetweenEmployeeMaster->id;
            $matBetweenEmployeeDetails->employee_id=$data->inward_employee_id;
            $matBetweenEmployeeDetails->rm_id=$data->rm_id;
            $matBetweenEmployeeDetails->outward=0;
            $matBetweenEmployeeDetails->inward=$data->value;
            $matBetweenEmployeeDetails->save();
            $return_array['matBetweenEmployeeDetailsReceiver']=$matBetweenEmployeeDetails;
            DB::commit();
        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
        return $this->successResponse($return_array);
    }
}
