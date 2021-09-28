<?php

namespace App\Http\Controllers;

use App\Models\RawMaterial;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;

class RawMaterialController extends ApiController
{
    public function getRawMaterial($rmId){
        $rawMaterial = RawMaterial::findOrFail($rmId);
        return $this->successResponse($rawMaterial);
    }
}
