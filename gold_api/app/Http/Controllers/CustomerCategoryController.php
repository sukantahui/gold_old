<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CustomerCategory;
use App\Models\PriceMaster;
use Illuminate\Http\Request;

class CustomerCategoryController extends ApiController
{
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/customerCategories
    public function getCustomerCategories(){
        $result = CustomerCategory::get();
        return $this->successResponse($result);
    }
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/customerCategories/visible
    public function getVisibleCustomerCategories(){
        $price_cats = PriceMaster::distinct()->pluck('price_cat')->toArray();
        $result = CustomerCategory::whereVisible(1)->whereIn('ID',$price_cats)->get();
        return $this->successResponse($result);
    }
}
