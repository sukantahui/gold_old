<?php

namespace App\Http\Controllers;

use App\Models\MaterialTransformationMaster;
use App\Http\Requests\StoreMaterialTransformationMasterRequest;
use App\Http\Requests\UpdateMaterialTransformationMasterRequest;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MaterialTransformationMasterController extends ApiController
{
    public function fineToNinetyTwo(Request $request){
        $input=($request->json()->all());
        $validator = Validator::make($input,[
            'employee_id' => 'required',
            'karigar_id' => 'required',
            'fine_gold_id' => 'required',
            'copper_id' => 'required',
            'gini_id' => 'required',
            'fine_gold_value' => 'required'
        ]);
        if($validator->fails()){
            return $this->errorResponse($validator->messages(),406);
        }
        $data=(object)($input);
        DB::beginTransaction();
        try{
            $mtm =new MaterialTransformationMaster();
            $mtm->employee_id =$data->employee_id;
            $mtm->karigar_id =$data->karigar_id;
            $mtm->save();
            DB::commit();
        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }


        return $this->successResponse($input);
    }
}
