<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AgentToCustomer;
use App\Models\BillDetails;
use App\Models\BillMaster;
use App\Models\Customer;
use App\Models\JobMaster;
use App\Models\OrderMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends ApiController
{
    public function getSaleReportByDatesAndAgent($startDate,$endDate,$agentId){


        if($agentId=='1'){
            $queries = DB::select("SELECT cust_id
                , cust_name
                , get_customer_sale_qty_by_date(cust_id,'$startDate', '$endDate') as qty
                , get_customer_sale_gold_total_by_date(cust_id,'$startDate', '$endDate') as fine_gold
                , get_customer_sale_lc_total_by_date(cust_id,'$startDate', '$endDate') as lc
                , get_customer_gold_received_total_by_date(cust_id,'$startDate', '$endDate') as gold_received
                , get_customer_lc_received_total_by_date(cust_id,'$startDate', '$endDate') as lc_received
                  from customer_master  order by qty desc");
            return $this->successResponse($queries);
        }


        //if agent selected
        $customers = AgentToCustomer::whereAgentId($agentId)->pluck('cust_id')->toArray();

        $ids =implode("','",$customers);
//
        $queries = DB::select("SELECT cust_id
                , cust_name
                , get_customer_sale_qty_by_date(cust_id,'$startDate', '$endDate') as qty
                , get_customer_sale_gold_total_by_date(cust_id,'$startDate', '$endDate') as fine_gold
                , get_customer_sale_lc_total_by_date(cust_id,'$startDate', '$endDate') as lc
                , get_customer_gold_received_total_by_date(cust_id,'$startDate', '$endDate') as gold_received
                , get_customer_lc_received_total_by_date(cust_id,'$startDate', '$endDate') as lc_received
                  from customer_master where cust_id in('$ids') order by qty desc");
//        $queries=DB::table('customer_master')
//                ->selectRaw("get_customer_sale_qty_by_date(cust_id,$startDate, $endDate)")
//                ->whereIn('cust_id', $customers)
//                ->get();
//        get_customer_sale_qty_by_date(cust_id,$startDate, $endDate)
        return $this->successResponse($queries);
    }
    public function getAgentsBalance(){
        $result = DB::select("select agent_id
                                    , agent_name
                                    , short_name
                                    , get_agent_lc_due(agent_id) as lc_due
                                    ,get_agent_gold_due(agent_id) as gold_due
                                    from agent_master");
        return $this->successResponse($result);
    }
    public function getCustomersBalanceByAgentId($agentId){
        $result = DB::select("select agent_to_customer.cust_id
                                    ,customer_master.cust_name
                                    , customer_master.city
                                    , get_customer_gold_due(agent_to_customer.cust_id) as gold_due
                                    , get_customer_lc_due(agent_to_customer.cust_id) as lc_due
                                    from agent_to_customer
                                    inner join customer_master ON customer_master.cust_id = agent_to_customer.cust_id
                                    where agent_to_customer.agent_id='$agentId'");
        return $this->successResponse($result);
    }
    public function getCustomersBalance(){
        $result = DB::select("select agent_to_customer.cust_id
                                    ,customer_master.cust_name
                                    , customer_master.city
                                    , get_customer_gold_due(agent_to_customer.cust_id) as gold_due
                                    , get_customer_lc_due(agent_to_customer.cust_id) as lc_due
                                    from agent_to_customer
                                    inner join customer_master ON customer_master.cust_id = agent_to_customer.cust_id");
        return $this->successResponse($result);
    }
    public function getCustomerReceiptPayment($custId){
        $result = DB::select("call get_cutomer_recept_payment_by_id('$custId')");
        return $this->successResponse($result);
    }

    public function getCustomerByJobId($jobId){
        $job = JobMaster::findOrFail($jobId);
        $order = OrderMaster::whereOrderId($job->order_id)->first();
        $customer = Customer::findOrFail($order->cust_id);
        return $this->successResponse($customer);
    }
    public function getCurrentJobStatus(){
//        $result = DB::select('call get_bill_and_receive_by_date(?, ?)', ['2021-01-01','2021-04-30']);
        $result = DB::select('call get_all_current_jobs');
        return $this->successResponse($result);
    }
}
