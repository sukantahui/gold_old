<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Agent;
use App\Models\ItemStockReadyMade;
use App\Models\Customer;
use App\Models\AgentToCustomer;
class AgentController extends ApiController
{
    public function getAgentsExceptCounterAgent(){

        $agent = Agent::select('agent_id','short_name','agent_name')
                 ->whereNotIn('agent_id',['AG2018'])
                 ->whereInforce(1)
                 ->get();


        return $this->successResponse($agent);
    }
    public function getProductsForTransfer(){
        $products  = ItemStockReadyMade::select()
                     ->whereInStockAndAgentId(1,'AG2018')
                     ->get();

        return $this->successResponse($products);

    }
    public function get_counter_agent_id(){
        $result = Agent::where('agent_name','Counter Agent')->first();
        return $this->successResponse($result);
    }

    public  function get_customers_by_agent($id){
        $ressult = AgentToCustomer::select('customer_master.cust_id','customer_master.cust_name','agent_to_customer.agent_id')
                   ->join('customer_master','agent_to_customer.cust_id','customer_master.cust_id')
                   ->where('agent_to_customer.agent_id',$id)
                   ->get();
        return $this->successResponse($ressult);
    }
}
