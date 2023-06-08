<?php

namespace App\Http\Controllers;

use App\Models\MaterialTransformationDetail;
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
        $return_array=[];
        try{
            $mtm =new MaterialTransformationMaster();
            $mtm->employee_id =$data->employee_id;
            $mtm->karigar_id =$data->karigar_id;
            $mtm->save();
            $return_array['mtm']=$mtm;
            $mtdFine=new MaterialTransformationDetail();
            $mtdFine->mtm_id = $mtm->id;
            $mtdFine->rm_id = $data->fine_gold_id;
            $mtdFine->rm_value = $data->fine_gold_value;
            $mtdFine->tr_type = -1;
            $mtdFine->save();
            $return_array['mtdFine']=$mtdFine;
            $mtdCopper=new MaterialTransformationDetail();
            $mtdCopper->mtm_id = $mtm->id;
            $mtdCopper->rm_id = $data->copper_id;
            $mtdCopper->rm_value = $data->copper_value;
            $mtdCopper->tr_type = -1;
            $mtdCopper->save();
            $return_array['mtdCopper']=$mtdCopper;
            //adding gini
            $mtdGini=new MaterialTransformationDetail();
            $mtdGini->mtm_id = $mtm->id;
            $mtdGini->rm_id = $data->gini_id;
            $mtdGini->rm_value = $data->gini_value;
            $mtdGini->tr_type = 1;
            $mtdGini->save();
            $return_array['mtdGini']=$mtdGini;

            DB::commit();
        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }


        return $this->successResponse($return_array);
    }
}
