<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AssetController extends ApiController
{
    public function index()
    {
        $assets=Asset::get();
        return $this->successResponse($assets);
    }
}
