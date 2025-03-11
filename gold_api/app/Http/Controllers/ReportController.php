<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\MaterialBalanceResource;
use App\Models\AgentToCustomer;
use App\Models\BillDetails;
use App\Models\BillMaster;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\JobMaster;
use App\Models\MaterialToEmployeeBalance;
use App\Models\OrderMaster;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportController extends ApiController
{
    public function getKarigars(){
        $result = Employee::whereDesignationIdAndInforce(9,1)->orderBy('emp_name')->get();
//        return $this->successResponse(EmployeeResource::collection($result));
        return $this->successResponse($result);
    }

    public function getEmployeeMaterialBalance(){
        $result = MaterialToEmployeeBalance::whereEmpId(Auth::user()->emp_id)->get();
        return $this->successResponse(MaterialBalanceResource::collection($result));
    }
    public function getEmployeeMaterialBalanceById($emp_id){
        $result = MaterialToEmployeeBalance::whereEmpId($emp_id)->get();
        return $this->successResponse(MaterialBalanceResource::collection($result));
    }
    public function getOwnerCashWithdrawnByDate($start_date,$end_date){
        $result = DB::select("call select_owner_cash_receipt_from_employees_by_dates('$start_date','$end_date')");
        return $this->successResponse($result);
    }
    public function getOwnerCashWithdrawnFromEmployeeByDate($payerId,$start_date,$end_date){
        $result = DB::select("call select_owner_cash_receipt_from_employee_by_emp_id_by_dates($payerId,'$start_date','$end_date')");
        return $this->successResponse($result);
    }

    public function getOwnerFineWithdrawnByDate($start_date,$end_date){
        $result = DB::select("call select_owner_fine_gold_receipt_from_employees_by_dates('$start_date','$end_date')");
        return $this->successResponse($result);
    }

    public function getOwnerFineWithdrawnByEmployeeByDate($payerId,$start_date,$end_date){
        $result = DB::select("call select_owner_fine_gold_receipt_from_employee_by_emp_id_by_dates($payerId,'$start_date','$end_date')");
        return $this->successResponse($result);
    }

    public function selectAllJobDetails(){
        $result = DB::select("call select_all_job_details()");
        return $this->successResponse($result);
    }
    public function selectAllJobDetailsByEmployee($employee_id){
        $result = DB::select("call select_all_job_details_by_employee($employee_id)");
        return $this->successResponse($result);
    }

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
                                    , agent_phone
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
    public function getModelsSaleReportByDate($startDate,$endDate,$limit)
    {
        $result = DB::select('call get_modelwise_sale_by_date(?, ?,?)', [$startDate,$endDate,$limit]);
        return $this->successResponse($result);
    }
    public function getSaleReportByModel($startDate,$endDate,$model)
    {
        $result = DB::select('call get_model_sale_to_customer_by_date(?, ?,?)', [$startDate,$endDate,$model]);
        return $this->successResponse($result);
    }
    public function getDiscountableBill($cust_id,$startDate,$endDate,$discount)
    {
        $result = DB::select('call get_customer_discountable_bill_by_id_date(?, ?,?,?)', [$cust_id,$startDate,$endDate,$discount]);
        $totalDiscount=collect($result)->sum('discount');
        $result_array=array();
        $result_array['records']=$result;
        $result_array['totalDiscount']=$totalDiscount;
        return $this->successResponse($result_array);
    }
    public function getAgentwiseDue(){
        $queries = DB::select("select agent_id
                                    , agent_name
                                    , short_name
                                    , get_agent_gold_due(agent_id) as gold_due
                                    , get_agent_lc_due(agent_id) as lc_due
                                    from agent_master");
        return $this->successResponse($queries);
    }
    public function getCustomerDueByAgent($agentId)
    {
        $result = DB::select('call get_customer_due_by_agent(?)', [$agentId]);
        $totalGoldDue=collect($result)->sum('gold_due');
        $totalLcDue=collect($result)->sum('lc_due');
        $result_array=array();
        $result_array['records']=$result;
        $result_array['totalGoldDue']=$totalGoldDue;
        $result_array['totalLcDue']=$totalLcDue;
        return $this->successResponse($result_array);
    }
    public function getCustomerTransaction($customerId)
    {
        $result = DB::select('call get_cutomer_recept_payment_by_id(?)', [$customerId]);
        return $this->successResponse($result);
    }
    public function getCustomerDiscountReport($custId,$startDate,$endDate,$discount)
    {
        $result = DB::select('call get_cutomer_discountable_bill_by_id_date(?,?,?,?)', [$custId,$startDate,$endDate,$discount]);
        return $this->successResponse($result);
    }

    public function getCustomerDueByCustId($customerId)
    {

        // return Auth::user()->emp_id;
        $result = collect(DB::select('select round(get_customer_gold_due(cust_id),3) as gold_due
                ,get_customer_lc_due(cust_id) as lc_due
                from customer_master
                where cust_id=?', [$customerId]))->first();
        return $this->successResponse($result);
    }

    public function withdraw_materials_by_owner()
    {
        $result = DB::select("select material_receiver.transaction_id
                   , material_receiver.record_time
                   , DATE_FORMAT(material_receiver.record_time,'%d-%m-%Y %H:%i') as transaction_date
                   , material_receiver.receiver_employee_id
                   , material_receiver.inward, material_receiver.rm_id
                   , material_receiver.rm_name
                   , material_sender.sender_employee_id
                   , material_sender.emp_name
                   , material_sender.outward
                   , material_receiver.comment
            from (select material_transaction.transaction_id
                  ,material_transaction.employee_id as receiver_employee_id
                  ,material_transaction.inward
                  ,material_transaction.rm_id
                  ,rm_master.rm_name
                  ,material_transaction.comment
                  ,material_transaction.reference
                  ,material_transaction.record_time
                  from material_transaction
            inner join rm_master ON rm_master.rm_ID = material_transaction.rm_id
            where transaction_type_id=2 and employee_id=28 and inward>0) as material_receiver
            inner join (select material_transaction.employee_id as sender_employee_id
                  ,employees.emp_name
                  ,material_transaction.outward
                  ,material_transaction.reference
                  from material_transaction
                  inner join employees ON employees.emp_id = material_transaction.employee_id
            where transaction_type_id=2 and employee_id<>28 and outward>0) as material_sender
            on material_receiver.reference = material_sender.reference
            order by material_receiver.record_time desc");
        return $this->successResponse($result);
    }
    public function withdraw_materials_by_owner_material($rm_id)
    {
        $result = DB::select("select material_receiver.transaction_id
                   , material_receiver.record_time
                   , DATE_FORMAT(material_receiver.record_time,'%d-%m-%Y %H:%i') as transaction_date
                   , material_receiver.receiver_employee_id
                   , material_receiver.inward, material_receiver.rm_id
                   , material_receiver.rm_name
                   , material_sender.sender_employee_id
                   , material_sender.emp_name
                   , material_sender.outward
                   , material_receiver.comment
            from (select material_transaction.transaction_id
                  ,material_transaction.employee_id as receiver_employee_id
                  ,material_transaction.inward
                  ,material_transaction.rm_id
                  ,rm_master.rm_name
                  ,material_transaction.comment
                  ,material_transaction.reference
                  ,material_transaction.record_time
                  from material_transaction
            inner join rm_master ON rm_master.rm_ID = material_transaction.rm_id
            where transaction_type_id=2 and employee_id=28 and inward>0) as material_receiver
            inner join (select material_transaction.employee_id as sender_employee_id
                  ,employees.emp_name
                  ,material_transaction.outward
                  ,material_transaction.reference
                  from material_transaction
                  inner join employees ON employees.emp_id = material_transaction.employee_id
            where transaction_type_id=2 and employee_id<>28 and outward>0) as material_sender
            on material_receiver.reference = material_sender.reference
            where rm_id=?
            order by material_receiver.record_time desc",[$rm_id]);
        return $this->successResponse($result);
    }
    public function withdraw_materials_by_owner_employee($employee_id)
    {
        $result = DB::select("select material_receiver.transaction_id
                   , material_receiver.record_time
                   , DATE_FORMAT(material_receiver.record_time,'%d-%m-%Y %H:%i') as transaction_date
                   , material_receiver.receiver_employee_id
                   , material_receiver.inward, material_receiver.rm_id
                   , material_receiver.rm_name
                   , material_sender.sender_employee_id
                   , material_sender.emp_name
                   , material_sender.outward
                   , material_receiver.comment
            from (select material_transaction.transaction_id
                  ,material_transaction.employee_id as receiver_employee_id
                  ,material_transaction.inward
                  ,material_transaction.rm_id
                  ,rm_master.rm_name
                  ,material_transaction.comment
                  ,material_transaction.reference
                  ,material_transaction.record_time
                  from material_transaction
            inner join rm_master ON rm_master.rm_ID = material_transaction.rm_id
            where transaction_type_id=2 and employee_id=28 and inward>0) as material_receiver
            inner join (select material_transaction.employee_id as sender_employee_id
                  ,employees.emp_name
                  ,material_transaction.outward
                  ,material_transaction.reference
                  from material_transaction
                  inner join employees ON employees.emp_id = material_transaction.employee_id
            where transaction_type_id=2 and employee_id<>28 and outward>0) as material_sender
            on material_receiver.reference = material_sender.reference
            where sender_employee_id=?
            order by material_receiver.record_time desc",[$employee_id]);
        return $this->successResponse($result);
    }
    public function withdraw_materials_by_owner_employee_material($employee_id,$rm_id,$start_date='2019-10-01',$end_date='3000-01-01')
    {
        $result = DB::select("select material_receiver.transaction_id
                   , material_receiver.record_time
                   , DATE_FORMAT(material_receiver.record_time,'%d-%m-%Y %H:%i') as transaction_date
                   , material_receiver.receiver_employee_id
                   , material_receiver.inward, material_receiver.rm_id
                   , material_receiver.rm_name
                   , material_sender.sender_employee_id
                   , material_sender.emp_name
                   , material_sender.outward
                   , material_receiver.comment
            from (select material_transaction.transaction_id
                  ,material_transaction.employee_id as receiver_employee_id
                  ,material_transaction.inward
                  ,material_transaction.rm_id
                  ,rm_master.rm_name
                  ,material_transaction.comment
                  ,material_transaction.reference
                  ,material_transaction.record_time
                  from material_transaction
            inner join rm_master ON rm_master.rm_ID = material_transaction.rm_id
            where transaction_type_id=2 and employee_id=28 and inward>0) as material_receiver
            inner join (select material_transaction.employee_id as sender_employee_id
                  ,employees.emp_name
                  ,material_transaction.outward
                  ,material_transaction.reference
                  from material_transaction
                  inner join employees ON employees.emp_id = material_transaction.employee_id
            where transaction_type_id=2 and employee_id<>28 and outward>0) as material_sender
            on material_receiver.reference = material_sender.reference
            where sender_employee_id=? and rm_id=? and date(material_receiver.record_time)>=? and date(material_receiver.record_time)<?
            order by material_receiver.record_time desc",[$employee_id,$rm_id,$start_date,$end_date]);
        return $this->successResponse($result);
    }
    public function selectAllCurrentStocks($employee_id){
        $result = DB::select("call select_current_readymade_stock");
        return $this->successResponse($result);
    }
    public function material_to_employees($start_date='2019-10-01',$end_date='3000-01-01'){
        $result = DB::select('call get_material_transfer_from_owner_to_employees(?,?)', [$start_date, $end_date]);
        return $this->successResponse($result);
    }

    public function material_to_employees_by_dates($start_date,$end_date){
        $result = DB::select('call get_material_transfer_from_owner_to_employees(?,?)', [$start_date, $end_date]);
        return $this->successResponse($result);
    }
    public function material_to_employees_material_and_employee($rm_id, $employee_id){
        $start_date='2001-01-01';
        $end_date='3000-01-01';
        $result = DB::select('call get_material_transfer_from_owner_to_employees_by_rm_id_n_emp_id(?,?,?,?)', [$start_date,$end_date,$rm_id,$employee_id]);
        return $this->successResponse($result);
    }

    public function material_to_employees_by_dates_material_and_employee($start_da,$end_date,$rm_id, $employee_id){
        $start_date='2001-01-01';
        $end_date='3000-01-01';
        $result = DB::select('call get_material_transfer_from_owner_to_employees_by_rm_id_n_emp_id(?,?,?,?)', [$start_date,$end_date,$rm_id,$employee_id]);
        return $this->successResponse($result);
    }
    public function material_to_employees_by_dates_and_material($start_date,$end_date,$rm_id){
        $result = DB::select('call get_material_transfer_from_owner_by_rm_id(?,?,?)', [$start_date,$end_date,$rm_id]);
        return $this->successResponse($result);
    }

    public function material_submitted_by_owner(){
        $result = DB::select("select rm_ID as rm_id,rm_name from rm_master where rm_ID
                in(select distinct rm_id from material_transaction where transaction_type_id=1)
                order by rm_name");
        return $this->successResponse($result);
    }

    public function get_job_by_bill_no(Request $request){
        $result = DB::select('select job_id from bill_details where bill_no=?',[$request->bill_number]);
        return $this->successResponse($result);
    }
    public function get_gini_balance_date_by_date(Request $request){


        $startDate = Carbon::createFromFormat('Y-m-d', '2025-03-01');
        $endDate = Carbon::createFromFormat('Y-m-d', '2025-03-05');

        $dateRange = CarbonPeriod::create($startDate, $endDate);

        $dates = array_map(fn ($date) => $date->format('Y-m-d'), iterator_to_array($dateRange));
        $result_array=array();



        foreach ($dates as $date){
            //adding record gold from owner
            $paid_to_owner=DB::select("select
                                user_submit.record_time,
                                user_submit.outward as gold_submit
                                from(select * from material_transaction where employee_id=70 and outward>0 and    rm_id=48) as user_submit
                                inner join (select * from material_transaction where employee_id=28 and inward>0 and    rm_id=48) as owner_withdrawn
                                on user_submit.reference = owner_withdrawn.reference
                                where date(user_submit.record_time)=?",[$date]);
            


            $result=DB::select('select job_id,tr_time, date_format(tr_time,"%Y-%m-%d") as transaction_date,gold_send, gold_returned from job_master where date(tr_time)=?',[$date]);
            foreach($result as $row){
                $temp_array=array('transaction_date'=>$row->transaction_date
                            , 'job_id'=>$row->job_id
                            ,'gold_send'=>$row->gold_send
                            ,'gold_returned'=>$row->gold_returned
                            ,'gold_used'=>round($row->gold_send - $row->gold_returned,3)
                            );
                $result_array[]=$temp_array;
            }
        }

        //$result = array('x'=>100,'y'=>90);
        return $this->successResponse($result_array);
    }
}


