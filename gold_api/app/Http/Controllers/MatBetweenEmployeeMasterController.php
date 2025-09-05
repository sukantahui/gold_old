<?php

namespace App\Http\Controllers;

use App\Http\Resources\MaterialBalanceResource;
use App\Models\Employee;
use App\Models\InventoryDayBook;
use App\Models\MatBetweenEmployeeDetails;
use App\Models\MatBetweenEmployeeMaster;
use App\Http\Requests\StoreMatBetweenEmployeeMasterRequest;
use App\Http\Requests\UpdateMatBetweenEmployeeMasterRequest;
use App\Models\MaterialToEmployeeBalance;
use App\Models\Maxtable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MatBetweenEmployeeMasterController extends ApiController
{
    function saveMaterialToEmployees(Request $request){
        /*
         *  API Calling
         *
         *
         *
         *
         */


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
//            $matBetweenEmployeeDetails->employee_id=$data->outward_employee_id;
            $matBetweenEmployeeDetails->employee_id=auth()->user()->emp_id;
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
            //adding Material to Employee Balance for Sender
            $materialToEmployeeBalance = MaterialToEmployeeBalance::whereEmpIdAndRmId(auth()->user()->emp_id,$data->rm_id)->first();
            if($materialToEmployeeBalance) {
                $materialToEmployeeBalance->outward = $materialToEmployeeBalance->outward + $data->value;
                $materialToEmployeeBalance->closing_balance = $materialToEmployeeBalance->closing_balance - $data->value;
                $materialToEmployeeBalance->save();
            }else{
                $materialToEmployeeBalance = new MaterialToEmployeeBalance();
                $materialToEmployeeBalance->emp_id = auth()->user()->emp_id;
                $materialToEmployeeBalance->rm_id = $data->rm_id;
                $materialToEmployeeBalance->inward=0;
                $materialToEmployeeBalance->outward = $data->value;
                $materialToEmployeeBalance->closing_balance = $data->value;
                $materialToEmployeeBalance->save();
            }
            $return_array['sender_material_balance']=$materialToEmployeeBalance;

            //adding Material to Employee Balance for receiver
            $materialToEmployeeBalance = MaterialToEmployeeBalance::whereEmpIdAndRmId($data->inward_employee_id,$data->rm_id)->first();
            if($materialToEmployeeBalance) {
                $materialToEmployeeBalance->inward = $materialToEmployeeBalance->inward + $data->value;
                $materialToEmployeeBalance->closing_balance = $materialToEmployeeBalance->closing_balance + $data->value;
                $materialToEmployeeBalance->save();
            }else{
                $materialToEmployeeBalance->rm_id = $data->rm_id;
                $materialToEmployeeBalance->emp_id = $data->inward_employee_id;
                $materialToEmployeeBalance->outward = 0;
                $materialToEmployeeBalance->inward = $data->value;
                $materialToEmployeeBalance->closing_balance =$data->value;
                $materialToEmployeeBalance->save();
            }
            $return_array['receiver_material_balance']=$materialToEmployeeBalance;

            $result_sender = MaterialToEmployeeBalance::whereEmpId( auth()->user()->emp_id)->get();
            $return_array['sender_all_material_balance']=MaterialBalanceResource::collection($result_sender);

            $result_receiver = MaterialToEmployeeBalance::whereEmpId( $data->inward_employee_id)->get();
            $return_array['receiver_all_material_balance']=MaterialBalanceResource::collection($result_receiver);
            // recording in inventory_day_book
            $outwardEmployee = Employee::find(auth()->user()->emp_id);
            $inwardEmployee = Employee::find($data->inward_employee_id);
            $result=InventoryDayBook::create([
                'employee_id'      => $data->outward_employee_id,
                'rm_id'            => $data->rm_id,
                'transaction_type' => 1,
                'rm_value'         => $data->value,
                'reference'        => $voucher_number,
                'comment'          => 'Send to '.$inwardEmployee->emp_name.' from '.$outwardEmployee->emp_name,
                'inforce'          => 1,
            ]);
            $return_array['inventory_day_book_data']=$request;
            DB::commit();
        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
        return $this->successResponse($return_array);
    }
    function saveMaterialToManagerByOwner(Request $request){
        /*
         *  API Calling
         *
         *
         *
         *
         */


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
//            $matBetweenEmployeeDetails->employee_id=$data->outward_employee_id;
            $matBetweenEmployeeDetails->employee_id=28;    //employee id of user
            $matBetweenEmployeeDetails->rm_id=$data->rm_id;
            $matBetweenEmployeeDetails->outward=$data->value;
            $matBetweenEmployeeDetails->inward=0;
            $matBetweenEmployeeDetails->save();
            $return_array['matBetweenEmployeeDetailsSender']=$matBetweenEmployeeDetails;

            // adding details for receiver
            $matBetweenEmployeeDetails = new MatBetweenEmployeeDetails();
            $matBetweenEmployeeDetails->mat_between_employee_id=$matBetweenEmployeeMaster->id;
            $matBetweenEmployeeDetails->employee_id=72;   // receiver employee id
            $matBetweenEmployeeDetails->rm_id=$data->rm_id;
            $matBetweenEmployeeDetails->outward=0;
            $matBetweenEmployeeDetails->inward=$data->value;
            $matBetweenEmployeeDetails->save();
            $return_array['matBetweenEmployeeDetailsReceiver']=$matBetweenEmployeeDetails;



            //adding Material to Employee Balance for receiver
            $materialToEmployeeBalance = MaterialToEmployeeBalance::whereEmpIdAndRmId(72,$data->rm_id)->first();
            if($materialToEmployeeBalance) {
                $materialToEmployeeBalance->inward = $materialToEmployeeBalance->inward + $data->value;
                $materialToEmployeeBalance->closing_balance = $materialToEmployeeBalance->closing_balance + $data->value;
                $materialToEmployeeBalance->save();
            }else{
                $materialToEmployeeBalance->rm_id = $data->rm_id;
                $materialToEmployeeBalance->emp_id = $data->inward_employee_id;
                $materialToEmployeeBalance->outward = 0;
                $materialToEmployeeBalance->inward = $data->value;
                $materialToEmployeeBalance->closing_balance =$data->value;
                $materialToEmployeeBalance->save();
            }
            $return_array['receiver_material_balance']=$materialToEmployeeBalance;

            $result = MaterialToEmployeeBalance::whereEmpId(72)->get();
            $receiver_all_material_balance = MaterialBalanceResource::collection($result);
            $return_array['manager_all_material_balance']=$receiver_all_material_balance;

            // recording in inventory_day_book
            $outwardEmployee = Employee::find(28);
            $inwardEmployee = Employee::find(72);
            $result=InventoryDayBook::create([
                'employee_id'      => 28, // outward employee is the owner here
                'rm_id'            => $data->rm_id,
                'transaction_type' => 1,
                'rm_value'         => $data->value,
                'reference'        => $voucher_number,
                'comment'          => 'Send to '.$inwardEmployee->emp_name.' from '.$outwardEmployee->emp_name,
                'inforce'          => 1,
            ]);
            $return_array['inventory_day_book_data']=$request;

            DB::commit();
        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
        return $this->successResponse($return_array);
    }
    function saveMaterialFromManagerByOwner(Request $request){
        /*
         *  API Calling
         *
         *
         *
         *
         */


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
//            $matBetweenEmployeeDetails->employee_id=$data->outward_employee_id;
            $matBetweenEmployeeDetails->employee_id=72;    //employee id of sender
            $matBetweenEmployeeDetails->rm_id=$data->rm_id;
            $matBetweenEmployeeDetails->outward=$data->value;
            $matBetweenEmployeeDetails->inward=0;
            $matBetweenEmployeeDetails->save();
            $return_array['matBetweenEmployeeDetailsSender']=$matBetweenEmployeeDetails;

            // adding details for receiver
            $matBetweenEmployeeDetails = new MatBetweenEmployeeDetails();
            $matBetweenEmployeeDetails->mat_between_employee_id=$matBetweenEmployeeMaster->id;
            $matBetweenEmployeeDetails->employee_id=28;   // receiver employee id
            $matBetweenEmployeeDetails->rm_id=$data->rm_id;
            $matBetweenEmployeeDetails->outward=0;
            $matBetweenEmployeeDetails->inward=$data->value;
            $matBetweenEmployeeDetails->save();
            $return_array['matBetweenEmployeeDetailsReceiver']=$matBetweenEmployeeDetails;

            //adding Material to Employee Balance for Sender
            $materialToEmployeeBalance = MaterialToEmployeeBalance::whereEmpIdAndRmId(72,$data->rm_id)->first();
            if($materialToEmployeeBalance) {
                $materialToEmployeeBalance->outward = $materialToEmployeeBalance->outward + $data->value;
                $materialToEmployeeBalance->closing_balance = $materialToEmployeeBalance->closing_balance - $data->value;
                $materialToEmployeeBalance->save();
            }else{
                $materialToEmployeeBalance = new MaterialToEmployeeBalance();
                $materialToEmployeeBalance->emp_id =72;
                $materialToEmployeeBalance->rm_id = $data->rm_id;
                $materialToEmployeeBalance->inward=0;
                $materialToEmployeeBalance->outward = $data->value;
                $materialToEmployeeBalance->closing_balance = $data->value;
                $materialToEmployeeBalance->save();
            }
            $return_array['sender_material_balance']=$materialToEmployeeBalance;

            //adding Material to Employee Balance for receiver
//            $materialToEmployeeBalance = MaterialToEmployeeBalance::whereEmpIdAndRmId(72,$data->rm_id)->first();
//            if($materialToEmployeeBalance) {
//                $materialToEmployeeBalance->inward = $materialToEmployeeBalance->inward + $data->value;
//                $materialToEmployeeBalance->closing_balance = $materialToEmployeeBalance->closing_balance + $data->value;
//                $materialToEmployeeBalance->save();
//            }else{
//                $materialToEmployeeBalance->rm_id = $data->rm_id;
//                $materialToEmployeeBalance->emp_id = $data->inward_employee_id;
//                $materialToEmployeeBalance->outward = 0;
//                $materialToEmployeeBalance->inward = $data->value;
//                $materialToEmployeeBalance->closing_balance =$data->value;
//                $materialToEmployeeBalance->save();
//            }
//            $return_array['receiver_material_balance']=$materialToEmployeeBalance;
            $result = MaterialToEmployeeBalance::whereEmpId(72)->get();
            $receiver_all_material_balance = MaterialBalanceResource::collection($result);
            $return_array['manager_all_material_balance']=$receiver_all_material_balance;

            // recording in inventory_day_book
            $outwardEmployee = Employee::find(72);
            $inwardEmployee = Employee::find(auth()->user()->emp_id);
            $result=InventoryDayBook::create([
                'employee_id'      => 72,
                'rm_id'            => $data->rm_id,
                'transaction_type' => -1,
                'rm_value'         => $data->value,
                'reference'        => $voucher_number,
                'comment'          => 'Send to '.$inwardEmployee->emp_name.' from '.$outwardEmployee->emp_name,
                'inforce'          => 1,
            ]);
            $return_array['inventory_day_book_data']=$request;

            DB::commit();
        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
        return $this->successResponse($return_array);
    }
    function saveMaterialFromEmployee(Request $request){
        /*
         *  API Calling
         *
         *
         *
         *
         */


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
//            $matBetweenEmployeeDetails->employee_id=$data->outward_employee_id;
            $matBetweenEmployeeDetails->employee_id=$data->outward_employee_id;
            $matBetweenEmployeeDetails->rm_id=$data->rm_id;
            $matBetweenEmployeeDetails->outward=$data->value;
            $matBetweenEmployeeDetails->inward=0;
            $matBetweenEmployeeDetails->save();
            $return_array['matBetweenEmployeeDetailsSender']=$matBetweenEmployeeDetails;
            // adding details for receiver
            $matBetweenEmployeeDetails = new MatBetweenEmployeeDetails();
            $matBetweenEmployeeDetails->mat_between_employee_id=$matBetweenEmployeeMaster->id;
            $matBetweenEmployeeDetails->employee_id=auth()->user()->emp_id;
            $matBetweenEmployeeDetails->rm_id=$data->rm_id;
            $matBetweenEmployeeDetails->outward=0;
            $matBetweenEmployeeDetails->inward=$data->value;
            $matBetweenEmployeeDetails->save();
            $return_array['matBetweenEmployeeDetailsReceiver']=$matBetweenEmployeeDetails;

            //adding Material to Employee Balance for Sender
            $materialToEmployeeBalance = MaterialToEmployeeBalance::whereEmpIdAndRmId($data->outward_employee_id,$data->rm_id)->first();
            if($materialToEmployeeBalance) {
                $materialToEmployeeBalance->outward = $materialToEmployeeBalance->outward + $data->value;
                $materialToEmployeeBalance->closing_balance = $materialToEmployeeBalance->closing_balance - $data->value;
                $materialToEmployeeBalance->save();
            }else{
                $materialToEmployeeBalance = new MaterialToEmployeeBalance();
                $materialToEmployeeBalance->emp_id = $data->outward_employee_id;
                $materialToEmployeeBalance->rm_id = $data->rm_id;
                $materialToEmployeeBalance->inward=0;
                $materialToEmployeeBalance->outward = $data->value;
                $materialToEmployeeBalance->closing_balance = $data->value;
                $materialToEmployeeBalance->save();
            }
            $result = MaterialToEmployeeBalance::whereEmpId($data->outward_employee_id)->get();
            $return_array['sender_material_balance']=MaterialBalanceResource::collection($result);

            //adding Material to Employee Balance for receiver
            $materialToEmployeeBalance = MaterialToEmployeeBalance::whereEmpIdAndRmId(auth()->user()->emp_id,$data->rm_id)->first();
            if($materialToEmployeeBalance) {
                $materialToEmployeeBalance->inward = $materialToEmployeeBalance->inward + $data->value;
                $materialToEmployeeBalance->closing_balance = $materialToEmployeeBalance->closing_balance + $data->value;
                $materialToEmployeeBalance->save();
            }else{
                $materialToEmployeeBalance->rm_id = $data->rm_id;
                $materialToEmployeeBalance->emp_id = auth()->user()->emp_id;
                $materialToEmployeeBalance->outward = 0;
                $materialToEmployeeBalance->inward = $data->value;
                $materialToEmployeeBalance->closing_balance =$data->value;
                $materialToEmployeeBalance->save();
            }
            $result = MaterialToEmployeeBalance::whereEmpId(auth()->user()->emp_id)->get();
            $return_array['receiver_material_balance']=MaterialBalanceResource::collection($result);

            // recording in inventory_day_book
            $outwardEmployee = Employee::find($data->outward_employee_id);
            $inwardEmployee = Employee::find(auth()->user()->emp_id);
            $result=InventoryDayBook::create([
                'employee_id'      => $data->outward_employee_id,
                'rm_id'            => $data->rm_id,
                'transaction_type' => -1,
                'rm_value'         => $data->value,
                'reference'        => $voucher_number,
                'comment'          => 'Send to '.$inwardEmployee->emp_name.' from '.$outwardEmployee->emp_name,
                'inforce'          => 1,
            ]);
            $return_array['inventory_day_book_data']=$request;
            DB::commit();
        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
        return $this->successResponse($return_array);
    }
}
