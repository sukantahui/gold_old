<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\MaterialTransactionResource;
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


}
