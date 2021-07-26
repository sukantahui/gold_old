<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemStockReadyMadeResource;
use App\Models\ItemStockReadyMade;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use App\Models\Job;
use Illuminate\Support\Facades\DB;

class StockController extends ApiController
{
//    public function get_all_instock_items(){
//        $result = ItemStockReadyMade::whereInStock(1)->get();
//        return $this->successResponse(ItemStockReadyMadeResource::collection($result));
//    }
    public function  get_all_instock_items(){
        $result = ItemStockReadyMade::select('tag','item_inward_detail_id','model_no','model_size','qty','gold','labour_charge','gross_weight','package_weight','agent_id','employee_id','bill_no','job_id',DB::raw("DATE(record_time) as date"))
                  ->where('in_stock',1)
                  ->get();
//        return $this->successResponse(ItemStockReadyMadeResource::collection($result));
        return response()->json(['success'=>1 , 'data'=>$result],200,[],JSON_NUMERIC_CHECK);
    }

    public function stock_by_agent_id($agentId){
        $result = ItemStockReadyMade::whereInStockAndAgentId(1,$agentId)->get();
        return $this->successResponse(ItemStockReadyMadeResource::collection($result));
    }
    public function store(Request $request)
    {
        $rules = array(
            'tag' => ['required',Rule::unique('item_stock_ready_made','tag')],
            'modelNo' => 'required|exists:product_master,product_code',
            'modelSize' => 'required',
            'quantity' => ['required','integer','gte:1'],
            'agentId' => ['required','exists:agent_master,agent_id'],
            'employeeId' => ['required','exists:employees,emp_id']
        );
        $messsages = array(
            'modelNo.exists'=>"This model does not exist"
        );

        $validator = Validator::make($request->all(),$rules,$messsages );
        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(),406);
        }
        try{
            $stock = new ItemStockReadyMade();
            $stock->tag = $request->input("tag");
            $stock->model_no=$request->input("modelNo");
            $stock->model_size=$request->input("modelSize");
            $stock->qty=$request->input("quantity");
            $stock->gold=$request->input("gold");
            $stock->labour_charge=$request->input("labourCharge");
            $stock->gross_weight=$request->input("grossWeight");
            $stock->package_weight=$request->input("packageWeight");
            $stock->in_stock=$request->input("in_stock");
            $stock->agent_id=$request->input("agentId");
            $stock->employee_id=$request->input("employeeId");
            $stock->reference=$request->input("reference");
            $stock->bill_no=$request->input("billNo");
            $stock->job_id =$request->input("jobId");
            $stock->saveOrFail();
            return $this->successResponse(new ItemStockReadyMadeResource($stock));
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage(),500);
        }


    }
    public function update(Request $request, $tag)
    {

        $stock = ItemStockReadyMade::find($tag);
        $stock->gold = 23.456;
        $stock->update();
        return $this->successResponse($stock);
    }
    public function transfer_stock_to_agent(Request $request){
        $agent_id = $request->input('agent_id');
        $tags = $request->input('tags');
        $result = ItemStockReadyMade::whereIn('tag', $tags)->update(['agent_id'=>$agent_id]);
        return $this->successResponse($tags);
    }
    public function get_stock_by_agent($agentId){

        $result = ItemStockReadyMade::whereAgentIdAndInStock($agentId,1)->get();

        return $this->successResponse(ItemStockReadyMadeResource::collection($result));
    }
    public function get_job_id(){
        $result = Job::select()->get();
        return $this->successResponse($result);
    }
    public function get_details_by_job_id($id){
        $result = Job::select('job_master.job_id','job_master.product_code','job_master.product_size','price_master.price_id','price_master.price_code','price_master.price','bill_master.bill_no')
                  ->join('product_master','product_master.product_code','=','job_master.product_code')
                  ->join('price_master','price_master.price_code','=','product_master.price_code')
                  ->join('bill_master','bill_master.order_id','=','job_master.order_id')
                  ->where('job_master.job_id',$id)
                  ->first();
        return $this->successResponse($result);
    }
}
