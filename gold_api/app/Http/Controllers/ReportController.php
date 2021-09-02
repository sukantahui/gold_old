<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AgentToCustomer;
use App\Models\BillDetails;
use App\Models\BillMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends ApiController
{
    public function test($startDate,$endDate,$agentId){

//        $customers = AgentToCustomer::whereAgentId($agentId)->pluck('cust_id');
        $queries = DB::select("SELECT cust_id, get_customer_sale_qty_by_date(cust_id,'2021-01-01', '2021-08-30') from customer_master");
        return $this->successResponse($queries);
    }
}
