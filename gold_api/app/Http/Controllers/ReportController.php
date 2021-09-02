<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AgentToCustomer;
use App\Models\BillDetails;
use App\Models\BillMaster;
use Illuminate\Http\Request;

class ReportController extends ApiController
{
    public function test($startDate,$endDate,$agentId){

        $customers = AgentToCustomer::whereAgentId($agentId)->pluck('cust_id');
        return $this->successResponse($customers);
    }
}
