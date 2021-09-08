<?php

namespace App\Http\Controllers;

use App\Models\PriceMaster;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PriceMasterController extends ApiController
{
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/priceMasters
    public function getPriceMasters(){
        $result = PriceMaster::get();
        return $this->successResponse($result);
    }
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/priceMasters/{priceCode}/{priceCat}
    public function getPriceMastersByCodeNCat($priceCode, $priceCat){

        $result = PriceMaster::select('price_id','price_code','price_cat','price','p_loss','price_master_mv')->wherePriceCode($priceCode)->wherePriceCat($priceCat)->first();
        return $this->successResponse($result);
    }
}
