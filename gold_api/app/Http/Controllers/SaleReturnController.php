<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemStockReadyMadeResource;
use App\Models\SaleReturn;
use App\Http\Requests\StoreSaleReturnRequest;
use App\Http\Requests\UpdateSaleReturnRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class SaleReturnController extends ApiController
{
    public function store(Request $request)
    {
        $rules = array(
            'modelNo' => 'required|exists:product_master,product_code',
            'modelSize' => 'required',
            'quantity' => ['required','integer','gte:1'],
            'agentId' => ['required','exists:agent_master,agent_id'],
            'customerId' => ['required','exists:customer_master,cust_id']
        );
        $messsages = array(
            'modelNo.exists'=>"This model does not exist"
        );

        $validator = Validator::make($request->all(),$rules,$messsages );
        if ($validator->fails()) {
            return $this->errorResponse($validator->messages(),406);
        }
        try{
            $saleReturn = new SaleReturn();
            $saleReturn->tag = $request->input("tag");
            $saleReturn->model_no=$request->input("modelNo");
            $saleReturn->model_size=$request->input("modelSize");
            $saleReturn->gini_gold=$request->input("giniGold");
            $saleReturn->fine_gold=$request->input("fineGold");
            $saleReturn->gross_weight=$request->input("grossWeight");
            $saleReturn->qty=$request->input("quantity");
            $saleReturn->lc=$request->input("lc");
            $saleReturn->year_number=$request->input("yearNumber");
            $saleReturn->month_number=$request->input("monthNumber");
            $saleReturn->agent_id=$request->input("agentId");
            $saleReturn->customer_id=$request->input("customerId");


            $saleReturn->saveOrFail();
            return $this->successResponse($saleReturn);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage(),500);
        }


    }
}
