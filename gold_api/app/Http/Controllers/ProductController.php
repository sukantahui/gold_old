<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends ApiController
{
    public function getProducts()
    {
        $result = Product::orderBy('product_code')->get();
        return $this->successResponse($result);
    }
}
