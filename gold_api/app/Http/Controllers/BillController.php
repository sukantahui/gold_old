<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BillController extends ApiController
{
    public function create_ready_made_bill(Request $request){
        $curr_year =  date('y');
        $next_year =  $curr_year + 1;
        $financial_year =  $curr_year.$next_year;

        return $this->successResponse($financial_year);
    }

}
