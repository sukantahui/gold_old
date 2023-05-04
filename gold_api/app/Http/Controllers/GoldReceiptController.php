<?php

namespace App\Http\Controllers;

use App\Models\GoldReceiptMaster;
use Illuminate\Http\Request;

class GoldReceiptController extends ApiController
{
    public function getLcReceiptsByCustomer($customer_id){
        $lcReceipt = GoldReceiptMaster::whereCustId($customer_id)->orderBy('tr_date', 'DESC')->get();
        return $this->successResponse($lcReceipt);
    }
}
