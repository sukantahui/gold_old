<?php

namespace App\Http\Controllers;

use App\Models\EmployeeCashBalance;
use App\Http\Requests\StoreEmployeeCashBalanceRequest;
use App\Http\Requests\UpdateEmployeeCashBalanceRequest;
use Illuminate\Support\Facades\Auth;

class EmployeeCashBalanceController extends APIController
{
    public function getCurrentCashBalance(){
        $user_id =Auth::user()->emp_id;
        $result=EmployeeCashBalance::findOrFail($user_id);
        return $this->successResponse($result);
    }
    public function getCurrentCashBalanceByEmpId($emp_id){
        $result=EmployeeCashBalance::findOrFail($emp_id);
        return $this->successResponse($result);
    }
}
