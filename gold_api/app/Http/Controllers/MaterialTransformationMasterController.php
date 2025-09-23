<?php

namespace App\Http\Controllers;

use App\Http\Resources\MaterialBalanceResource;
use App\Models\Employee;
use App\Models\InventoryDayBook;
use App\Models\MaterialToEmployeeBalance;
use App\Models\MaterialTransformationDetail;
use App\Models\MaterialTransformationMaster;
use App\Http\Requests\StoreMaterialTransformationMasterRequest;
use App\Http\Requests\UpdateMaterialTransformationMasterRequest;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MaterialTransformationMasterController extends ApiController
{
    public function nitricToFineCreation(Request $request){
        $input=($request->json()->all());
        $validator = Validator::make($input,[
            'nitric_value' => 'required',
            'fine_value' => 'required'
        ]);
        if($validator->fails()){
            return $this->errorResponse($validator->messages(),406);
        }
        $data=(object)($input);
        DB::beginTransaction();
        $return_array=[];
        try{
            //master saved
            $mtm =new MaterialTransformationMaster();
            $mtm->employee_id =Auth::user()->emp_id;
            $mtm->karigar_id =76;
            $mtm->save();
            $return_array['mtm']=$mtm;

            //nitric outward
            $mtdNitric=new MaterialTransformationDetail();
            $mtdNitric->mtm_id = $mtm->id;
            $mtdNitric->rm_id = 45;
            $mtdNitric->rm_value = $data->nitric_value;
            $mtdNitric->tr_type = -1;
            $mtdNitric->save();
            $return_array['mtdNitric']=$mtdNitric;

            //fine inward
            $mtdFine=new MaterialTransformationDetail();
            $mtdFine->mtm_id = $mtm->id;
            $mtdFine->rm_id = 36;
            $mtdFine->rm_value = $data->fine_value;
            $mtdFine->tr_type = 1;
            $mtdFine->save();
            $return_array['mtdFine']=$mtdFine;


            // updating material_to_employee balance for nitric outward
            $mtebNitric= MaterialToEmployeeBalance::whereRmIdAndEmpId(45,Auth::user()->emp_id)->first();
            $mtebNitric->outward=$data->nitric_value;
            $mtebNitric->closing_balance=$mtebNitric->closing_balance - $data->nitric_value;
            $mtebNitric->update();
            $return_array['mtebNitric']=$mtebNitric;

            // updating material_to_employee balance for nitric
            $mtebFine= MaterialToEmployeeBalance::whereRmIdAndEmpId(36,Auth::user()->emp_id)->first();
            $mtebFine->outward=$data->fine_value;
            $mtebFine->closing_balance=$mtebFine->closing_balance + $data->fine_value;
            $mtebFine->update();
            $return_array['mtebFine']=$mtebFine;

            // recording in inventory_day_book for nitric
            $employee = Employee::find(auth()->user()->emp_id);
            $result=InventoryDayBook::create([
                'employee_id'      => auth()->user()->emp_id,
                'rm_id'            =>  $mtdNitric->rm_id,
                'transaction_type' => -1,
                'rm_value'         => $data->fine_value,
                'reference'        => $mtm->id,
                'comment'          => 'Nitric used to convert to fine by '.$employee->emp_name,
                'inforce'          => 1,
            ]);
            $return_array['inventory_day_book_data_nitric']=$result;

            // recording in inventory_day_book for fine gold
            $employee = Employee::find(auth()->user()->emp_id);
            $result=InventoryDayBook::create([
                'employee_id'      => auth()->user()->emp_id,
                'rm_id'            =>  $mtdFine->rm_id,
                'transaction_type' => 1,
                'rm_value'         => $data->nitric_value,
                'reference'        => $mtm->id,
                'comment'          => 'Fine received from conversion of Nitric by '.$employee->emp_name,
                'inforce'          => 1,
            ]);
            $return_array['inventory_day_book_data_nitric']=$result;


            DB::commit();
            $materialBalance = MaterialToEmployeeBalance::whereEmpId(Auth::user()->emp_id)->get();
            $return_array['material_balance']=MaterialBalanceResource::collection($materialBalance);
        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
        return $this->successResponse($return_array);
    }
    public function dalCreation(Request $request){
        $input=($request->json()->all());
        $validator = Validator::make($input,[
            'employee_id' => 'required',
            'karigar_id' => 'required',
            'silver_id' => 'required',
            'copper_id' => 'required',
            'zinc_id' => 'required',
            'dal_id' => 'required',
            'silver_value'=>'required'
        ]);
        if($validator->fails()){
            return $this->errorResponse($validator->messages(),406);
        }
        $data=(object)($input);
        DB::beginTransaction();
        $return_array=[];
        try{
            //master saved
            $mtm =new MaterialTransformationMaster();
            $mtm->employee_id =$data->employee_id;
            $mtm->karigar_id =$data->karigar_id;
            $mtm->save();
            $return_array['mtm']=$mtm;

            //silver out recording
            $mtdSilver=new MaterialTransformationDetail();
            $mtdSilver->mtm_id = $mtm->id;
            $mtdSilver->rm_id = $data->silver_id;
            $mtdSilver->rm_value = $data->silver_value;
            $mtdSilver->tr_type = -1;
            $mtdSilver->save();
            $return_array['mtdSilver']=$mtdSilver;

            //copper out
            $mtdCopper=new MaterialTransformationDetail();
            $mtdCopper->mtm_id = $mtm->id;
            $mtdCopper->rm_id = $data->copper_id;
            $mtdCopper->rm_value = $data->copper_value;
            $mtdCopper->tr_type = -1;
            $mtdCopper->save();
            $return_array['mtdCopper']=$mtdCopper;

            //Zinc out
            $mtdZinc=new MaterialTransformationDetail();
            $mtdZinc->mtm_id = $mtm->id;
            $mtdZinc->rm_id = $data->zinc_id;
            $mtdZinc->rm_value = $data->zinc_value;
            $mtdZinc->tr_type = -1;
            $mtdZinc->save();
            $return_array['mtdZinc']=$mtdZinc;

            //Dal in
            $mtdDal=new MaterialTransformationDetail();
            $mtdDal->mtm_id = $mtm->id;
            $mtdDal->rm_id = $data->dal_id;
            $mtdDal->rm_value = $data->dal_value;
            $mtdDal->tr_type = 1;
            $mtdDal->save();
            $mtdDal['mtdZinc']=$mtdDal;

            // updating material_to_employee balance for Silver
            $mtebSilver= MaterialToEmployeeBalance::whereRmIdAndEmpId($data->silver_id,$data->employee_id)->first();
            $mtebSilver->outward=$data->silver_value;
            $mtebSilver->closing_balance=$mtebSilver->closing_balance - $data->silver_value;
            $mtebSilver->update();
            $return_array['mtebSilver']=$mtebSilver;

            // updating material_to_employee balance for Copper
            $mtebCopper= MaterialToEmployeeBalance::whereRmIdAndEmpId($data->copper_id,$data->employee_id)->first();
            $mtebCopper->outward=$data->copper_value;
            $mtebCopper->closing_balance=$mtebCopper->closing_balance - $data->copper_value;
            $mtebCopper->update();
            $return_array['mtebCopper']=$mtebCopper;

            // updating material_to_employee balance for Zinc
            $mtebZinc= MaterialToEmployeeBalance::whereRmIdAndEmpId($data->zinc_id,$data->employee_id)->first();
            $mtebZinc->outward=$data->zinc_value;
            $mtebZinc->closing_balance=$mtebZinc->closing_balance - $data->zinc_value;
            $mtebZinc->update();
            $return_array['mtebZinc']=$mtebZinc;

            // updating material_to_employee balance for Zinc
            $mtebDal= MaterialToEmployeeBalance::whereRmIdAndEmpId($data->dal_id,$data->employee_id)->first();
            $mtebDal->inward=$data->dal_value;
            $mtebDal->closing_balance=$mtebDal->closing_balance + $data->dal_value;
            $mtebDal->update();
            $return_array['mtebDal']=$mtebDal;

            DB::commit();
            $materialBalance = MaterialToEmployeeBalance::whereEmpId(Auth::user()->emp_id)->get();
            $return_array['material_balance']=MaterialBalanceResource::collection($materialBalance);
        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
        return $this->successResponse($return_array);
    }
    public function panCreation(Request $request){
        $input=($request->json()->all());
        $validator = Validator::make($input,[
            'karigar_id' => 'required',
            'ninety_two_gini_value'=>'required',
            'zinc_value'=>'required',
            'dal_value'=>'required',
            'pan_value'=>'required'
        ]);
        $employee_id = Auth::user()->emp_id;
        if($validator->fails()){
            return $this->errorResponse($validator->messages(),406);
        }
        $data=(object)($input);
        DB::beginTransaction();
        $return_array=[];
        try{
            //master saved
            $mtm =new MaterialTransformationMaster();
            $mtm->employee_id =$employee_id;
            $mtm->karigar_id =$data->karigar_id;
            $mtm->save();
            $return_array['mtm']=$mtm;

            //92 gini out recording
            $mtdGini=new MaterialTransformationDetail();
            $mtdGini->mtm_id = $mtm->id;
            $mtdGini->rm_id = 48;  // id of 92 gini
            $mtdGini->rm_value = $data->ninety_two_gini_value;
            $mtdGini->tr_type = -1;
            $mtdGini->save();
            $mtdGini['mtdGini']=$mtdGini;

            //Zinc out
            $mtdZinc=new MaterialTransformationDetail();
            $mtdZinc->mtm_id = $mtm->id;
            $mtdZinc->rm_id = 39;  // rm_id of zinc
            $mtdZinc->rm_value = $data->zinc_value;
            $mtdZinc->tr_type = -1;
            $mtdZinc->save();
            $return_array['mtdZinc']=$mtdZinc;

            //dal out
            $mtdDal=new MaterialTransformationDetail();
            $mtdDal->mtm_id = $mtm->id;
            $mtdDal->rm_id = 33; // rm_id of DAL
            $mtdDal->rm_value = $data->dal_value;
            $mtdDal->tr_type = -1;
            $mtdDal->save();
            $return_array['mtdDal']=$mtdDal;

            //PAN in
            $mtdPan=new MaterialTransformationDetail();
            $mtdPan->mtm_id = $mtm->id;
            $mtdPan->rm_id = 31;  // rm_id of PAN
            $mtdPan->rm_value = $data->pan_value;
            $mtdPan->tr_type = 1;
            $mtdPan->save();
            $mtdPan['mtdPan']=$mtdPan;

            // updating material_to_employee balance for 92 Gini           Subtracting
            $mtebGini= MaterialToEmployeeBalance::whereRmIdAndEmpId(48,$employee_id)->first();
            $mtebGini->outward=$data->ninety_two_gini_value;
            $mtebGini->closing_balance=$mtebGini->closing_balance - $data->ninety_two_gini_value;
            $mtebGini->update();
            $return_array['mtebGini']=$mtebGini;

            // updating material_to_employee balance for Zinc     Subtracting
            $mtebZinc= MaterialToEmployeeBalance::whereRmIdAndEmpId(39,$employee_id)->first();
            $mtebZinc->outward=$data->zinc_value;
            $mtebZinc->closing_balance=$mtebZinc->closing_balance - $data->zinc_value;
            $mtebZinc->update();
            $return_array['mtebZinc']=$mtebZinc;


            // updating material_to_employee balance for Dal    Subtracting
            $mtebDal= MaterialToEmployeeBalance::whereRmIdAndEmpId(33,$employee_id)->first();
            $mtebDal->outward=$data->dal_value;
            $mtebDal->closing_balance=$mtebDal->closing_balance - $data->dal_value;
            $mtebDal->update();
            $return_array['mtebDal']=$mtebDal;


            // updating material_to_employee balance for Pan      Adding
            $mtebPan= MaterialToEmployeeBalance::whereRmIdAndEmpId(31,$employee_id)->first();
            $mtebPan->inward=$data->pan_value;
            $mtebPan->closing_balance=$mtebPan->closing_balance + $data->pan_value;
            $mtebPan->update();
            $return_array['mtebPan']=$mtebPan;

            // recording in inventory_day_book for gini
            $employee = Employee::find(auth()->user()->emp_id);
            $result=InventoryDayBook::create([
                'employee_id'      => auth()->user()->emp_id,
                'rm_id'            =>  $mtdGini->rm_id ,
                'transaction_type' => -1,
                'rm_value'         => $mtdGini->rm_value,
                'reference'        => $mtm->id,
                'comment'          => 'Gini is used to create Pan by '.$employee->emp_name,
                'inforce'          => 1,
            ]);
            $return_array['inventory_day_book_data_gini']=$result;

            // recording in inventory_day_book for pan
            $employee = Employee::find(auth()->user()->emp_id);
            $result=InventoryDayBook::create([
                'employee_id'      => auth()->user()->emp_id,
                'rm_id'            =>  $mtdPan->rm_id ,
                'transaction_type' => 1,
                'rm_value'         => $mtdPan->rm_value,
                'reference'        => $mtm->id,
                'comment'          => 'Pan created using Gini by '.$employee->emp_name,
                'inforce'          => 1,
            ]);
            $return_array['inventory_day_book_data_pan']=$result;

            DB::commit();
            $materialBalance = MaterialToEmployeeBalance::whereEmpId(Auth::user()->emp_id)->get();
            $return_array['material_balance']=MaterialBalanceResource::collection($materialBalance);
        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
        return $this->successResponse($return_array);
    }
    public function fineToNinetyTwo(Request $request){
        $input=($request->json()->all());
        $validator = Validator::make($input,[
            'employee_id' => 'required',
            'karigar_id' => 'required',
            'fine_gold_id' => 'required',
            'copper_id' => 'required',
            'gini_id' => 'required',
            'fine_gold_value'=>'required',
            'copper_value'=>'required',
            'gini_value'=>'required'
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
            // updating material_to_employee balance for fineGold
            $mtebgold= MaterialToEmployeeBalance::whereRmIdAndEmpId($data->fine_gold_id,$data->employee_id)->first();
            $mtebgold->outward=$data->fine_gold_value;
            $mtebgold->closing_balance=$mtebgold->closing_balance-$data->fine_gold_value;
            $mtebgold->update();
            $return_array['mtebGold']=$mtebgold;

            // updating material_to_employee balance for Copper
            $mtebCopper= MaterialToEmployeeBalance::whereRmIdAndEmpId($data->copper_id,$data->employee_id)->first();
            $mtebCopper->outward=$data->copper_value;
            $mtebCopper->closing_balance=$mtebCopper->closing_balance-$data->copper_value;
            $mtebCopper->update();
            $return_array['mtebCopper']=$mtebCopper;

            // updating material_to_employee balance for Gini
            $mtebGini= MaterialToEmployeeBalance::whereRmIdAndEmpId($data->gini_id,$data->employee_id)->first();
            $mtebGini->inward=$data->gini_value;
            $mtebGini->closing_balance=$mtebGini->closing_balance+$data->gini_value;
            $mtebGini->update();
            $return_array['mtebGini']=$mtebGini;

            // recording in inventory_day_book for fine
            $employee = Employee::find(auth()->user()->emp_id);
            $result=InventoryDayBook::create([
                'employee_id'      => auth()->user()->emp_id,
                'rm_id'            =>  $mtdFine->rm_id ,
                'transaction_type' => -1,
                'rm_value'         => $mtdFine->rm_value,
                'reference'        => $mtm->id,
                'comment'          => 'Fine gold is used to create Gini by '.$employee->emp_name,
                'inforce'          => 1,
            ]);
            $return_array['inventory_day_book_data_fine']=$result;

            // recording in inventory_day_book for gini
            $employee = Employee::find(auth()->user()->emp_id);
            $result=InventoryDayBook::create([
                'employee_id'      => auth()->user()->emp_id,
                'rm_id'            =>  $mtdGini->rm_id ,
                'transaction_type' => 1,
                'rm_value'         => $mtdGini->rm_value,
                'reference'        => $mtm->id,
                'comment'          => 'Gini created using fine by '.$employee->emp_name,
                'inforce'          => 1,
            ]);
            $return_array['inventory_day_book_data_gini']=$result;

            DB::commit();
            $materialBalance = MaterialToEmployeeBalance::whereEmpId(Auth::user()->emp_id)->get();
            $return_array['material_balance']=MaterialBalanceResource::collection($materialBalance);
        }catch (\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }


        return $this->successResponse($return_array);
    }
}
