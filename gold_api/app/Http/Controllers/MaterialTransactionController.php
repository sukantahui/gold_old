<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\MaterialTransactionResource;
use App\Models\InventoryDayBook;
use App\Models\JobMaster;
use App\Models\MaterialToEmployeeBalance;
use App\Models\MaterialTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaterialTransactionController extends ApiController
{
    public function getOwnerOutward()
    {
//        $result = MaterialTransaction::where('employee_id',28)
//                  ->where('rm_id',48)
//                  ->where('inward',0)
//                  ->where('outward','!=',0)
//                  ->get();

        $result = MaterialTransaction::whereEmployeeIdAndRmIdAndInward(28,48,0,0)
                  ->where('outward','!=',0)
                  ->get();


        return $this->successResponse(MaterialTransactionResource::collection($result));
    }

    public function getMaterialReceivedFromOwner(Request $request){
        $employeeId = $request->input("employeeId");
        $materialId = $request->input("materialId");
        $date = $request->input("date");

        $result = MaterialTransaction::whereEmployeeIdAndRmId($employeeId,$materialId)
                  ->where('inward','!=',0)
                  ->where('record_time','>=',$date)
                  ->where('transaction_type_id',1)
                  ->get();

        return $this->successResponse(MaterialTransactionResource::collection($result));
    }
    public function getMaterialReceivedFromOwnerWithinDates(Request $request){
        $employeeId = $request->input("employeeId");
        $materialId = $request->input("materialId");
        $date1 = $request->input("date1");
        $date2 = $request->input("date2");

        $result = MaterialTransaction::whereEmployeeIdAndRmId($employeeId,$materialId)
                  ->where('inward','!=',0)
                  ->where('record_time','>',$date1)
                  ->where('record_time','<',$date2)
                  ->where('transaction_type_id',1)
                  ->get();

        return $this->successResponse(MaterialTransactionResource::collection($result));
    }

    public function getTotalMaterialReceivedFromOwner(Request $request){
        $employeeId = $request->input("employeeId");
        $materialId = $request->input("materialId");
        $date = $request->input("date");

        $result = MaterialTransaction::where('employee_id',$employeeId)
                  ->where('rm_id',$materialId)
                  ->where('inward','!=',0)
                  ->where('record_time','>=',$date)
                  ->where('transaction_type_id',1)
                  ->sum('inward');

        return $this->successResponse($result);
    }
    public function getTotalMaterialReceivedFromOwnerWithinDates(Request $request){
        $employeeId = $request->input("employeeId");
        $materialId = $request->input("materialId");
        $date1 = $request->input("date1");
        $date2 = $request->input("date2");

        $result = MaterialTransaction::where('employee_id',$employeeId)
                  ->where('rm_id',$materialId)
                  ->where('inward','!=',0)
                  ->where('record_time','>',$date1)
                  ->where('record_time','<',$date2)
                  ->where('transaction_type_id',1)
                  ->sum('inward');



        return $this->successResponse($result);
    }

    public function getMaterialReceivedTransactionsByDates($startDate,$endDate,$rmId, $employeeId,$transactionTypeId){
        $result = MaterialTransaction::where('rm_id',$rmId)
            ->where('record_time','>=',$startDate)
            ->where('record_time','<=',$endDate)
            ->where('employee_id','=',$employeeId)
            ->where('transaction_type_id',$transactionTypeId)
            ->where('inward','>',0)
            ->get();

        return $this->successResponse($result);
    }

    public function getMaterialReceivedTransactionsTotalByDates($startDate,$endDate,$rmId, $employeeId,$transactionTypeId){
        $result = MaterialTransaction::where('rm_id',$rmId)
            ->where('record_time','>=',$startDate)
            ->where('record_time','<=',$endDate)
            ->where('employee_id','=',$employeeId)
            ->where('transaction_type_id',$transactionTypeId)
            ->where('inward','>',0)
            ->sum('inward');
        if ( is_null($result) ) {
            return $this->successResponse(0,'No Record find');
        }else{
            return $this->successResponse(round($result,3));
        }
    }



    //http://127.0.0.1/gold_old/gold_api/public/api/dev/goldSendToJobs/total/total/2019-04-13/2022-05-30/48/70
    public function getGoldSendToJobByDatesAndEmployee($startDate,$endDate,$rmId,$employeeId){
        //run the following command first
        //ALTER TABLE inventory_day_book CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
        //$jobs = JobMaster::whereIn('status',[2,3,4,5,6,7,51])->pluck('job_id');
        $result = InventoryDayBook::where('timestamp','>=',$startDate)
            ->where('timestamp','<=',$endDate)
            ->whereRmId($rmId)
            ->whereComment('Gold send to Job')
            ->whereEmployeeId($employeeId)
            ->whereTransactionType(-1)
            ->sum('rm_value');
        return $this->successResponse(round($result,3));
    }

    //http://127.0.0.1/gold_old/gold_api/public/api/dev/goldReceivedFromJobs/total/total/2019-04-13/2022-05-30/48/70
    public function getGoldReceivedFromJobByDatesAndEmployee($startDate,$endDate,$rmId,$employeeId){
        //run the following command first
        //ALTER TABLE inventory_day_book CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
        $result = InventoryDayBook::where('timestamp','>=',$startDate)
            ->where('timestamp','<=',$endDate)
            ->whereRmId($rmId)
            ->whereComment('Mathakata Returned from Job')
            ->whereEmployeeId($employeeId)
            ->whereTransactionType(1)
            ->sum('rm_value');
        return $this->successResponse(round($result,3));
    }
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/nitricReceivedFromJobs/total/total/2019-04-13/2022-05-30/45/70
    public function getNitricReceivedFromJobByDatesAndEmployee($startDate,$endDate,$rmId,$employeeId){
        //run the following command first
        //ALTER TABLE inventory_day_book CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
        $result = InventoryDayBook::where('timestamp','>=',$startDate)
            ->where('timestamp','<=',$endDate)
            ->whereRmId($rmId)
            ->whereComment('Nitric returned from job Job')
            ->whereEmployeeId($employeeId)
            ->whereTransactionType(1)
            ->sum('rm_value');
        return $this->successResponse(round($result,3));
    }

}
