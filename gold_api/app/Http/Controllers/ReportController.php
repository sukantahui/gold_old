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
use App\Models\EmployeeCashBalance;
use App\Models\JobMaster;
use App\Models\MaterialToEmployeeBalance;
use App\Models\OrderMaster;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\InventoryDayBook;
use App\Models\RawMaterial;
use App\Models\CashTransactionBetweenEmployee;
class ReportController extends ApiController
{
    public function cashBalances(){
        $balances = EmployeeCashBalance::select(
            'employees_cash_balance.*',
            'employees.emp_name'
        )
            ->join('employees', 'employees_cash_balance.emp_id', '=', 'employees.emp_id')
            ->where(function ($query) {
                $query->where('employees_cash_balance.inward', '!=', 0)
                    ->orWhere('employees_cash_balance.outward', '!=', 0)
                    ->orWhere('employees_cash_balance.balance', '!=', 0);
            })
            ->get();
        return $this->successResponse($balances);
    }
    public function cashTransactionByEmployees(){
        $transactions = DB::table('cash_transaction_between_employees')
            ->join('employees as payees', 'cash_transaction_between_employees.payee_id', '=', 'payees.emp_id')
            ->join('employees as payers', 'cash_transaction_between_employees.payer_id', '=', 'payers.emp_id')
            ->select(
                'cash_transaction_between_employees.cash_transaction_id',
                'cash_transaction_between_employees.payee_id',
                'payees.emp_name as payee_name',
                'cash_transaction_between_employees.payer_id',
                'payers.emp_name as payer_name',
                'cash_transaction_between_employees.cash',
                'cash_transaction_between_employees.tr_date'
            )
            ->get();
        return $this->successResponse($transactions);
    }
    public function cashTransactionByCurrentEmployees()
    {
        $currentUserId = Auth::user()->emp_id; // ✅ capture here
        $transactions = DB::table('cash_transaction_between_employees as c')
            ->join('employees as payees', 'c.payee_id', '=', 'payees.emp_id')
            ->join('employees as payers', 'c.payer_id', '=', 'payers.emp_id')
            ->select(
                'c.cash_transaction_id',
                'c.payee_id',
                'payees.emp_name as payee_name',
                'c.payer_id',
                'payers.emp_name as payer_name',
                'c.cash',
                'c.tr_date'
            )
            ->where(function ($query) use ($currentUserId) {
                $query->where('c.payee_id', $currentUserId)
                    ->orWhere('c.payer_id', $currentUserId);
            })
            ->get();

        return $this->successResponse($transactions);
    }


    public function ownerJobReport($job_id)
    {
        // 1. Check if job exists
        $jobExists = JobMaster::where('job_id', $job_id)->exists(); // or use 'id' if numeric

        if (!$jobExists) {
            return $this->errorResponse('Job ID not found.', 404);
        }

        // 2. Prepare RM types
        $rm_ids = [
            'gold' => 48,
            'pan' => 31,
            'nitric' => 45,
        ];

        $result_array = [];

        // 3. Loop through RM types
        foreach ($rm_ids as $key => $rm_id) {
            $results = InventoryDayBook::with('rm')
                ->selectRaw('
                inventory_day_book.rm_id,
                inventory_day_book.transaction_type,
                inventory_day_book.rm_value * inventory_day_book.transaction_type * -1 AS material_value,
                inventory_day_book.comment,
                inventory_day_book.timestamp
            ')
                ->where('inventory_day_book.rm_id', $rm_id)
                ->where('inventory_day_book.reference', $job_id)
                ->get()
                ->map(function ($item) {
                    return [
                        'rm_id' => $item->rm_id,
                        'transaction_type' => $item->transaction_type,
                        'transaction_text' => $item->transaction_type == -1 ? 'Add: ' : 'Less: ',
                        'gold_value' => $item->material_value,
                        'comment' => $item->comment,
                        'timestamp' => optional($item->timestamp)->format('d/m/Y h:i A'),
                        'rm_name' => optional($item->rm)->rm_name,
                    ];
                });

            $result_array[$key] = $results;
        }
        // job details
        $jobDetails=JobMaster::where('job_id', $job_id)->first();
        $result_array['job']=$jobDetails;
        $billNo="bill not created";
        if($jobDetails){
            $billNo = BillDetails::where('job_id', 22)->value('bill_no');
        }
        $result_array['bill_no']=$billNo;
        // bangle pan
        $banglePan = RawMaterial::where('rm_ID', 31)->first();
        $result_array['rm_bangle_pan']=$banglePan;
        // nitric
        $nitric = RawMaterial::where('rm_ID', 45)->first();
        $result_array['rm_nitric']=$nitric;
        // gini 92
        $gini92 = RawMaterial::where('rm_ID', 48)->first();
        $result_array['rm_gini92']=$gini92;

        return $this->successResponse((object)$result_array);
    }
    public function currentStatusReport(){
        $result_array=array();

        // All customers Gold Due
        $result = DB::select("select get_status_all_customer_total_gold_due_except_stock() as bileda_gold_due");
        $temp_array=array(
            'particulars'=>'All Customer Gold Due',
            'material_value'=>($result[0]->bileda_gold_due ?? null)
            ,'gold_percentage'=>1
            ,'pure_value'=>(round($result[0]->bileda_gold_due,3)?? null)
        );
        $result_array['all_customer_gold_due']=$temp_array;

        // Stock customer Gold Due
        $result = DB::select("select get_status_stock_customer_total_gold_due() as bileda_gold_due");
        $temp_array=array(
            'particulars'=>'Bileda Gold Due',
            'material_value'=>($result[0]->bileda_gold_due ?? null)
            ,'gold_percentage'=>1
            ,'pure_value'=>(round($result[0]->bileda_gold_due,3)?? null)
        );
        $result_array['stock_customer_gold_due']=$temp_array;


        // calculating stock gold
        $result = DB::select("select round(sum(gold),3) as stock_gold from item_stock_ready_made where in_stock");
        $temp_array=array(
            'particulars'=>'Readymade Stock Gold',
            'material_value'=>($result[0]->stock_gold ?? null)
            ,'gold_percentage'=>0.92
            ,'pure_value'=>(round($result[0]->stock_gold * 0.92,3) ?? null)
        );
        $result_array['readymade_stock_gold']=$temp_array;

        //workin progress
        $result = DB::select("select sum(pieces) as qty,sum(pieces*price) as lc, round(sum((gold_send*rm_master.rm_gold/100)+(pan_send*40/100)-(gold_returned*rm_master.rm_gold/100)-(nitrick_returned*.88)),3) as gold from job_master
				inner join rm_master on job_master.rm_id = rm_master.rm_ID
				where job_master.status in(5,6,7,8,51) and in_stock=0");

        $temp_array=array(
            'particulars'=>'Work in Progress',
            'material_value'=>0
            ,'gold_percentage'=>0
            ,'qty' => $result[0]->qty
            ,'pure_value'=>(round($result[0]->gold,3) ?? null)
        );
        $result_array['work_in_progress']=$temp_array;

        // material in hand with other employees
        $result = DB::select("select db2.rm_id,rm_name,material,round(material*(rm_master.rm_gold/100),3) as pure from
				(select rm_id,round(sum(closing_balance),3) as material from(select rm_id,emp_id, closing_balance from material_to_employee_balance where emp_id not in(28,72) and rm_id in(31,33,36,38,45,48))  as db1 group by rm_id) as db2
				inner join rm_master on db2.rm_id = rm_master.rm_ID");


        $temp_array2=[];
        $materials=array('31'=>'bangle_pan','33'=>'dal','36'=>'fine_gold','38'=>'pure_silver','45'=>'nitric_gold','48'=>'gini_92');
        foreach($result as $row){
            $temp_array=array(
                'particulars'=>$row->rm_name,
                'material_value'=>$row->material
                ,'gold_percentage'=>0
                ,'pure_value'=>(round($row->pure,3) ?? null)
            );

            $temp_array2[$materials[$row->rm_id]]=$temp_array;
        }

        $result_array['material_balance_employees']=$temp_array2;


        // material in hand with Manager
        $result = DB::select("select db2.rm_id,rm_name,material,round(material*(rm_master.rm_gold/100),3) as pure from
				(select rm_id,round(sum(closing_balance),3) as material from(select rm_id,emp_id, closing_balance from material_to_employee_balance where emp_id  in(72) and rm_id in(31,33,36,38,45,48))  as db1 group by rm_id) as db2
				inner join rm_master on db2.rm_id = rm_master.rm_ID");


        $temp_array2=[];
        $materials=array('31'=>'bangle_pan','33'=>'dal','36'=>'fine_gold','38'=>'pure_silver','45'=>'nitric_gold','48'=>'gini_92');
        foreach($result as $row){
            $temp_array=array(
                'particulars'=>$row->rm_name,
                'material_value'=>$row->material
            ,'gold_percentage'=>0
            ,'pure_value'=>(round($row->pure,3) ?? null)
            );

            $temp_array2[$materials[$row->rm_id]]=$temp_array;
        }

        $result_array['material_balance_manager']=$temp_array2;




        //markup value for todays production
        $result = DB::select("SELECT IFNULL(sum(markup_value*pieces),0) as todays_markup, ifnull(sum(pieces),0) as qty FROM job_master WHERE DATE(tr_time) = CURDATE()");

        $temp_array=array(
            'particulars'=>'Markup Value',
            'material_value'=>$result[0]->todays_markup
            ,'gold_percentage'=>0
            ,'qty' => $result[0]->qty
            ,'pure_value'=>(round($result[0]->todays_markup * .92,3) ?? null)
        );
        $result_array['markup_value']=$temp_array;



        //ploss value for todays production
        $result = DB::select("SELECT IFNULL(round(sum(p_loss*pieces),3),0) as todays_ploss, ifnull(sum(pieces),0) as qty FROM job_master WHERE DATE(tr_time) = CURDATE()");

        $temp_array=array(
            'particulars'=>'Processing Loss',
            'material_value'=>$result[0]->todays_ploss
            ,'gold_percentage'=>0
            ,'qty' => $result[0]->qty
            ,'pure_value'=>(round($result[0]->todays_ploss * .92,3) ?? null)
        );
        $result_array['ploss']=$temp_array;

        //all customer LC Due
        $result = DB::select("select get_status_all_customer_total_lc_due_except_stock() as all_customer_lc_due");
        $temp_array=array(
            'particulars'=>'All Customer LC Due'
            ,'amount'=>($result[0]->all_customer_lc_due?? null)
        );
        $result_array['all_customer_lc_due']=$temp_array;

        //stock customer LC Due
        $result = DB::select("select get_status_stock_customer_total_lc_due() as stock_customer_lc_due");
        $temp_array=array(
            'particulars'=>'Bileda LC Due'
            ,'amount'=>($result[0]->stock_customer_lc_due?? null)
        );
        $result_array['stock_customer_lc_due']=$temp_array;



        //stock LC
        $result = DB::select("select sum(labour_charge) as readymade_stock_lc from item_stock_ready_made where in_stock=1");
        $temp_array=array(
            'particulars'=>'Readymade Stock LC'
            ,'amount'=>($result[0]->readymade_stock_lc?? null)
        );

        $result_array['readymade_stock_lc']=$temp_array;

        //Employee Cash Balance
        $result = DB::select("select sum(balance) as cash_balance from employees_cash_balance where emp_id not in(28,72) ");
        $temp_array=array(
            'particulars'=>'Cash Balance, Employees'
            ,'amount'=>($result[0]->cash_balance?? null)
        );

        $result_array['employee_cash_balance']=$temp_array;

        //Manager Cash Balance
        $result = DB::select("select sum(balance) as cash_balance from employees_cash_balance where emp_id in(72)");
        $temp_array=array(
            'particulars'=>'Cash Balance, Manager'
            ,'amount'=>($result[0]->cash_balance?? null)
        );

        $result_array['manager_cash_balance']=$temp_array;


        //Readmae stock lc
        $result = DB::select("select sum(pieces) as qty,sum(pieces*price) as lc, round(sum((gold_send*rm_master.rm_gold/100)+(pan_send*40/100)-(gold_returned*rm_master.rm_gold/100)-(nitrick_returned*.88)),3) as gold from job_master
				inner join rm_master on job_master.rm_id = rm_master.rm_ID
				where job_master.status in(5,6,7,8,51)");
        $temp_array=array(
            'particulars'=>'Work In Progress LC'
            ,'qty'=>($result[0]->qty?? null)
            ,'amount'=>($result[0]->lc?? null)
        );

        $result_array['work_in_progress_lc']=$temp_array;

        //order Remaining
        $result = DB::table('order_master')
            ->join('order_details', 'order_master.order_id', '=', 'order_details.order_id')
            ->where('order_master.tr_time', '>', '2025-04-01')
            ->where('order_details.status', '=', 0)
            ->distinct('order_master.order_id')
            ->count('order_master.order_id');
        $temp_array=array(
            'particulars'=>'Remaining Orders form 01-03-2025'
            ,'qty'=>$result
            ,'amount'=>0
        );
        $result_array['order_not_jobbed']=$temp_array;

        //order detail Remaining
        $result = DB::table('order_master')
            ->join('order_details', 'order_master.order_id', '=', 'order_details.order_id')
            ->where('order_master.tr_time', '>', '2025-04-01')
            ->where('order_details.status', '=', 0)
            ->count();
        $temp_array=array(
            'particulars'=>'Remaining Orders in quantity form 01-03-2025'
            ,'qty'=>$result
            ,'amount'=>0
        );
        $result_array['order_details_quantity_not_jobbed']=$temp_array;

        return $this->successResponse((object)$result_array);
    }
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
    public function get_gini_balance_date_by_date(Request $request,$emp_id=70){

        $lastBalance=DB::table('material_to_employee_balance')->where('rm_id', 48)
            ->where('emp_id', $emp_id)
            ->first();
        $nextDay = Carbon::parse($lastBalance->last_known_physical_balance_date)->addDay()->format('Y-m-d');

        $startDate = $nextDay;
//        $startDate = Carbon::createFromFormat('Y-m-d', '2025-01-01');
        $endDate = Carbon::createFromFormat('Y-m-d', '2025-04-01');

        $dateRange = CarbonPeriod::create($startDate, $endDate);

        $employee_id=70;
        $dates = array_map(fn ($date) => $date->format('Y-m-d'), iterator_to_array($dateRange));
        //gold balance of last date
        $gold_balance=$lastBalance->last_known_physical_balance;
        $opening_balance=$gold_balance;


        $result_array=array();
        $result=DB::select("select id, employee_id, transaction_type, rm_value, reference, comment, `timestamp`
                ,DATE_FORMAT(`timestamp`, '%d-%m-%Y') as formatted_date
                from inventory_day_book where rm_id=48 and employee_id=70 and date(`timestamp`)>?",[$lastBalance->last_known_physical_balance_date]);

        $temp_array=array(
            'transaction_date'=>$lastBalance->last_known_physical_balance_date,
            'particulars'=>'Opening Balance',
            'employee_id'=>$employee_id,
            'job_id'=>'',
            'reference'=>'',
            'transaction_type'=>0,
            'opening_balance'=>0,
            'rm_value'=>0,
            'gold_balance'=>$opening_balance,
        );
        $opening_balance=$gold_balance;
        $result_array[]=$temp_array;

        foreach($result as $row){
            if(strpos($row->reference, '/') == true){
                $reference=$row->reference;
                $job_id=null;
            }else{
                $reference=null;
                $job_id=$row->reference;
            }
            if($row->transaction_type==1){
                $particulars="Add: ".$row->comment;
                $gold_balance=round($gold_balance+$row->rm_value,3);
            }else{
                $particulars="Less: ".$row->comment;
                $gold_balance=round($gold_balance-$row->rm_value,3);
            }



            $temp_array=array(
                'transaction_date'=>$row->formatted_date,
                'particulars'=>$particulars,
                'employee_id'=>$row->employee_id,
                'job_id'=>$job_id,
                'reference'=>$reference,
                'transaction_type'=>$row->transaction_type,
                'opening_balance'=>$opening_balance,
                'rm_value'=>$row->rm_value,
                'gold_balance'=>$gold_balance,
            );
            $opening_balance=$gold_balance;
            $result_array[]=$temp_array;
        }
        return $this->successResponse($result_array);
    }
}


