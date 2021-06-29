<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Agent;
use App\Models\ItemStockReadyMade;
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
}
