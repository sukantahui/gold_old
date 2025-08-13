<?php

namespace App\Http\Controllers;

use App\Http\Resources\RawMaterialResource;
use App\Models\RawMaterial;
use App\Models\MaterialToEmployeeBalance;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class RawMaterialController extends ApiController
{
    public function getRawMaterial($rmId){
        $rawMaterial = RawMaterial::findOrFail($rmId);
        return $this->successResponse($rawMaterial);
    }
    public function getRawMaterials(){
        $rawMaterials = RawMaterial::get();
        return $this->successResponse(RawMaterialResource::collection($rawMaterials));
    }
    public function getRawMaterialsWithManager(){
        $rawMaterials = RmMaster::whereIn(
            'rm_ID',
            MaterialToEmployeeBalance::where('emp_id', 72)->pluck('rm_id')
        )->get();
        return $this->successResponse(RawMaterialResource::collection($rawMaterials));
    }



}

