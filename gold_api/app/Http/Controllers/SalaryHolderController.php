<?php

namespace App\Http\Controllers;

use App\Models\SalaryHolder;
use App\Http\Requests\StoreSalaryHolderRequest;
use App\Http\Requests\UpdateSalaryHolderRequest;

class SalaryHolderController extends ApiController
{

    public function getAgentSalaryHolders()
    {
        $result = SalaryHolder::get();
        return $this->successResponse($result);
    }

    public function destroy(SalaryHolder $salaryHolder)
    {
        //
    }
}
