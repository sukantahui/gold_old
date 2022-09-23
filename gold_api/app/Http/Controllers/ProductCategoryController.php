<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Http\Requests\StoreProductCategoryRequest;
use App\Http\Requests\UpdateProductCategoryRequest;

class ProductCategoryController extends ApiController
{
    public function  getProductCategories(){
        $result = ProductCategory::get();

        return $this->successResponse($result);
    }
}
