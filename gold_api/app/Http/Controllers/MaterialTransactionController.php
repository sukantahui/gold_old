<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\MaterialTransactionResource;
use App\Models\MaterialTransaction;
use Illuminate\Http\Request;

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

    public function getDataByDate(){
        $result = MaterialTransaction::where('record_time','>=','2021/3/31')->get();

        return $this->successResponse(MaterialTransactionResource::collection($result));
    }
}
