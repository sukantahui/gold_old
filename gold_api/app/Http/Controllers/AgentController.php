<?php

namespace App\Http\Controllers;

use App\Http\Resources\AgentSalaryAndWithdrawResource;
use App\Http\Resources\AgentSalaryWithdrawResource;
use App\Models\AgentSalary;
use App\Models\AgentSalaryWithdrawal;
use Illuminate\Http\Request;
use App\Models\Agent;
use App\Models\ItemStockReadyMade;
use App\Models\Customer;
use App\Models\AgentToCustomer;
use Illuminate\Support\Facades\DB;

class AgentController extends ApiController
{
    public function getAgentsExceptCounterAgent(){

        $agent = Agent::select('agent_id','short_name','agent_name','max_gold_limit_ready_made')
                 ->whereNotIn('agent_id',['AG2018'])
                 ->whereInforce(1)
                 ->whereDisplayInSaleReport(1)
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

//    public  function get_customers_by_agent($id){
//        $ressult = AgentToCustomer::select('customer_master.cust_id','customer_master.cust_name','agent_to_customer.agent_id')
//                   ->join('customer_master','agent_to_customer.cust_id','customer_master.cust_id')
//                   ->where('agent_to_customer.agent_id',$id)
//                   ->get();
//        return $this->successResponse($ressult);
//    }

    public  function get_customers_by_agent($id){
        $result = Agent::findOrFail($id)->customers;
        return $this->successResponse($result);
    }
    public  function get_billable_customers(){
        $result = Customer::get();
        return $this->successResponse($result);
    }
    public function getAgents(){
        $agent = Agent::select()->get();

        return $this->successResponse($agent);
    }
    public function getActiveAgents(){
        $agent = Agent::select()->where('inforce', '=', 1)->get();

        return $this->successResponse($agent);
    }
    public function getAgentsForSaleReport(){
        $agent = Agent::select()->where('inforce', '=', 1)->get();
//        $agent = Agent::select()->where('inforce', '=', 1)->where('display_in_sale_report', '=', 1)->get();

        return $this->successResponse($agent);
    }
    public function getAgentSalary($year, $month){
        $result = DB::select('call select_agents_income_year_month(?,?)',[$year,$month]);
        return $this->successResponse($result);
    }
    public function saveAgentSalary($year,$month){
        $result = DB::statement("insert into agent_salaries (
       id
      ,agent_id
      ,year_number
      ,month_number
      ,salary
      ,ta
      ,commission
    ) SELECT
       NULL AS id,
       agent_id
       , $year
       ,$month
       ,get_agent_salary_year_and_month(agent_id, $year, $month)
       ,get_agent_ta_year_and_month(agent_id, $year, $month)
       ,get_agent_commission_year_and_month(agent_id, $year, $month)
    FROM agent_master where show_in_commission=1");
        if($result){
            return $this->successResponse($result);
        }else{
            return $this->errorResponse(404);
        }

    }
    public function saveAgentSalaryWithdraw(Request $request){
        $agentSalaryWithdrawal = new AgentSalaryWithdrawal();
        $agentSalaryWithdrawal->agent_id = $request->input('agentId');
        $agentSalaryWithdrawal->year_number = $request->input('yearNumber');
        $agentSalaryWithdrawal->month_number = $request->input('monthNumber');
        $agentSalaryWithdrawal->amount = $request->input('amount');
        $agentSalaryWithdrawal->save();
        if($agentSalaryWithdrawal){
            $totalAmount=AgentSalaryWithdrawal::whereAgentIdAndYearNumberAndMonthNumber($request->input('agentId'),$request->input('yearNumber'),$request->input('monthNumber'))->sum('amount');
            $totalSalary= AgentSalary::whereAgentIdAndYearNumberAndMonthNumber($request->input('agentId'),$request->input('yearNumber'),$request->input('monthNumber'))->first();
            $totalSalary->setAttribute('salary_withdraw', $totalAmount);
            return $this->successResponse(new AgentSalaryAndWithdrawResource($totalSalary));
        }else{
            return $this->errorResponse(404);
        }

    }
    public function getAgentSalaryWithdraw(){
        $result=AgentSalaryWithdrawal::get();
        return $this->successResponse(AgentSalaryWithdrawResource::collection($result));
    }
    public function getAgentSalaryWithdrawByAgentIdYearMont($agentId, $year, $month){
//        $x=array();
        $totalAmount=AgentSalaryWithdrawal::whereAgentIdAndYearNumberAndMonthNumber($agentId,$year,$month)->sum('amount');
//        $x['totalWithdraw'] = $totalAmount;
        $totalSalary= AgentSalary::whereAgentIdAndYearNumberAndMonthNumber($agentId,$year,$month)->first();
        $totalSalary->setAttribute('salary_withdraw', $totalAmount);
        return $this->successResponse(new AgentSalaryAndWithdrawResource($totalSalary));
    }

}
