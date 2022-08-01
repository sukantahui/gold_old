<?php

namespace App\Http\Controllers;

use App\Http\Resources\SalaryHolderResource;
use App\Models\SalaryHolder;
use App\Http\Requests\StoreSalaryHolderRequest;
use App\Http\Requests\UpdateSalaryHolderRequest;

class SalaryHolderController extends ApiController
{

    public function getAgentSalaryHolders()
    {
        $result = SalaryHolder::orderBy('salary_holder_name')->get();
        return $this->successResponse(SalaryHolderResource::collection($result));
    }

    public function destroy(SalaryHolder $salaryHolder)
    {
        //
    }
}
