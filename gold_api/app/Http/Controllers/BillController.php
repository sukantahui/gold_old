<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class BillController extends ApiController
{
    public function create_ready_made_bill(Request $request){
        $curr_year =  date('y');
        $next_year =  $curr_year + 1;
        $financial_year =  $curr_year.$next_year;
        $accounting_year = get_accounting_year();

        return $this->successResponse($accounting_year);
    }

}
