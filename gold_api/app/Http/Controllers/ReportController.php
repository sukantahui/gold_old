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

        $customers = AgentToCustomer::whereAgentId($agentId)->pluck('cust_id')->toArray();

        $ids =implode("','",$customers);
//
        $queries = DB::select("SELECT cust_id
                , mailing_name
                , get_customer_sale_qty_by_date(cust_id,'$startDate', '$endDate') as qty
                , get_customer_sale_gold_total_by_date(cust_id,'$startDate', '$endDate') as fine_gold
                , get_customer_sale_lc_total_by_date(cust_id,'$startDate', '$endDate') as lc
                , get_customer_gold_received_total_by_date(cust_id,'$startDate', '$endDate') as gold_received
                , get_customer_lc_received_total_by_date(cust_id,'$startDate', '$endDate') as lc_received
                  from customer_master where cust_id in('$ids')");
//        $queries=DB::table('customer_master')
//                ->selectRaw("get_customer_sale_qty_by_date(cust_id,$startDate, $endDate)")
//                ->whereIn('cust_id', $customers)
//                ->get();
//        get_customer_sale_qty_by_date(cust_id,$startDate, $endDate)
        return $this->successResponse($queries);
    }
}
