<?php

namespace App\Http\Controllers;

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
            $matBetweenEmployee = new MatBetweenEmployeeMaster();
            $matBetweenEmployee->transaction_number = $voucher_number;
            $matBetweenEmployee->save();
            $return_array['matBetweenEmployee']=$matBetweenEmployee;
            DB::commit();
        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
        return $this->successResponse($return_array);
    }
}
