<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemStockReadyMadeResource;
use App\Models\ItemStockReadyMade;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use App\Models\Job;

class StockController extends ApiController
{
    public function get_all_instock_items(){
        $result = ItemStockReadyMade::whereInStock(1)->get();
        return $this->successResponse($result);
    }
    public function stock_by_agent_id($agentId){
        $result = ItemStockReadyMade::whereInStockAndAgentId(1,$agentId)->get();
        return $this->successResponse(ItemStockReadyMadeResource::collection($result));
    }
    public function store(Request $request)
    {
        $rules = array(
            'tag' => ['required',Rule::unique('item_stock_ready_made','tag')],
            'model_no' => 'required|exists:product_master,product_code',
            'model_size' => 'required',
            'quantity' => ['required','integer','gte:1'],
            'agent_id' => ['required','exists:agent_master,agent_id'],
            'employee_id' => ['required','exists:employees,emp_id']
        );
        $messsages = array(
            'model_no.exists'=>"This model does not exist"
        );

        $validator = Validator::make($request->all(),$rules,$messsages );
        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(),406);
        }
        try{
            $stock = new ItemStockReadyMade();
            $stock->tag = $request->input("tag");
            $stock->model_no=$request->input("model_no");
            $stock->model_size=$request->input("model_size");
            $stock->qty=$request->input("quantity");
            $stock->gold=$request->input("gold");
            $stock->labour_charge=$request->input("labour_charge");
            $stock->gross_weight=$request->input("gross_weight");
            $stock->package_weight=$request->input("package_weight");
            $stock->in_stock=$request->input("in_stock");
            $stock->agent_id=$request->input("agent_id");
            $stock->employee_id=$request->input("employee_id");
            $stock->reference=$request->input("reference");
            $stock->bill_no=$request->input("bill_no");
            $stock->job_id =$request->input("job_id");
            $stock->saveOrFail();
            return $this->successResponse($stock);
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
    public function get_stock_by_agent($id){

        $result = ItemStockReadyMade::where('agent_id',$id)->get();

        return $this->successResponse($result);
    }
    public  function get_model_numbers(){
        $result = Product::select()->get();
        return $this->successResponse($result);
    }
    public function get_price_by_model_number($id){
        $result = Product::select("product_master.product_code","price_master.price_id","price_master.price_code","price_master.price")
                  ->join("price_master","product_master.price_code","=","price_master.price_code")
                  ->where("price_master.price_cat",1)
                  ->where("product_master.product_code",$id)
                  ->first();
        return $this->successResponse($result);
    }
    public function get_job_id(){
        $result = Job::select()->get();
        return $this->successResponse($result);
    }
    public function get_details_by_job_id($id){
        $result = Job::select('job_master.job_id','job_master.product_code','job_master.product_size','price_master.price_id','price_master.price_code','price_master.price','bill_master.bill_no')
                  ->join("product_master","product_master.product_code","=","job_master.product_code")
                  ->join("price_master","price_master.price_code","=","product_master.price_code")
                  ->join("bill_master","bill_master.order_id","=","job_master.order_id")
                  ->where('job_master.job_id',$id)
                  ->first();
        return $this->successResponse($result);
    }
}
