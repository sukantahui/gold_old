<?php

namespace App\Http\Controllers;

use App\Models\PriceMaster;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PriceMasterController extends ApiController
{
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/priceMasters
    public function getCustomerCategories(){
        $result = PriceMaster::get();
        return $this->successResponse($result);
    }
}
