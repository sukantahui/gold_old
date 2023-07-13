<?php

namespace App\Http\Controllers;

use App\Models\MatBetweenEmployeeMaster;
use App\Http\Requests\StoreMatBetweenEmployeeMasterRequest;
use App\Http\Requests\UpdateMatBetweenEmployeeMasterRequest;
use Illuminate\Http\Request;

class MatBetweenEmployeeMasterController extends ApiController
{
    function saveMaterialToEmployees(Request $request){
        $input=($request->json()->all());
        return $this->successResponse($input);
    }
}
