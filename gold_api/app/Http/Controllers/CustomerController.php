<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AgentToCustomer;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends ApiController
{
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/customers
    public function index(){
        $result = Customer::get();
        return $this->successResponse($result);
    }
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/customers/agent/{agentId}
    public function getCustomerByAgent($agentId){
        $customers = AgentToCustomer::whereAgentId($agentId)->pluck('cust_id')->toArray();

//        $ids =implode("','",$customers);
        $result = Customer::whereIn('cust_id',$customers)->get();

        return $this->successResponse($result);
    }
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/customers/agent/{agentId}/inforced
    public function getInforcedCustomerByAgent($agentId){
        $customers = AgentToCustomer::whereAgentId($agentId)->pluck('cust_id')->toArray();

//        $ids =implode("','",$customers);
        $result = Customer::whereOrderInforce(1)->whereIn('cust_id',$customers)->orderBy('cust_name')->get();

        return $this->successResponse($result);
    }
}
