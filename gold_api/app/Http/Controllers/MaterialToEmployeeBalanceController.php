<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MaterialToEmployeeBalance;
use GrahamCampbell\ResultType\Result;
use Illuminate\Http\Request;

class MaterialToEmployeeBalanceController extends ApiController
{
    public function getClosingBalannceByEmpIdAndRmId($empId, $rmId){
        $result= MaterialToEmployeeBalance::whereEmpIdAndRmId(70, 48)->first();
        return $this->successResponse($result);
    }
}
