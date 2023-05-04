<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AgentSalaryController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\CustomerCategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeCashBalanceController;
use App\Http\Controllers\GoldReceiptController;
use App\Http\Controllers\LcReceiptMasterController;
use App\Http\Controllers\LedgerController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PriceMasterController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RawMaterialController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SalaryHolderController;
use App\Http\Controllers\SalaryHolderSalaryController;
use App\Http\Controllers\SalaryHolderSalaryMonthController;
use App\Http\Controllers\SalaryHolderSalaryPaymentController;
use App\Http\Controllers\SaleReturnController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StockController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\MaterialToEmployeeBalanceController;
use App\Http\Controllers\MaterialTransactionController;
use App\Http\Controllers\JobMasterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//this api will backup database and will store in storage\app folder





Route::get("backupDatabase",[AdminController::class,'backup_database']);
Route::post("login",[UserController::class,'login']);
Route::get("login",[UserController::class,'authenticationError'])->name('login');

Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::get('/me', function(Request $request) {
        return auth()->user();
    });
    Route::put("user",[UserController::class,'updatePassword']);

    Route::get("revokeAll",[UserController::class,'revoke_all']);
    //All secure URL's
    Route::get("user",[UserController::class,'getCurrentUser']);



    Route::get("logout",[UserController::class,'logout']);

    //get all users
    Route::get("users",[UserController::class,'getAllUsers']);
    //for transferring products to agents
    Route::get("agentsExceptCounterAgent",[AgentController::class,'getAgentsExceptCounterAgent']);
    Route::get("getProductsForTransfer",[AgentController::class,'getProductsForTransfer']);
    Route::put("stockToAgent",[StockController::class,'transfer_stock_to_agent']);

    //for transferring products from agents
    Route::get("getStockByAgent/{id}",[StockController::class,'get_stock_by_agent']);
    Route::get("getCounterAgent",[AgentController::class,'get_counter_agent_id']);
    Route::get("getCustomersByAgent/{id}",[AgentController::class,'get_customers_by_agent']);
    Route::get("agentReadyMadeBalance/{agentId}",[StockController::class,'getReadyMadeBalance']);

    //for stock
    Route::get("stocks",[StockController::class,'get_all_instock_items']);
    Route::get("stocksInHand/{categoryID}/{agentId}",[StockController::class,'get_all_instock_items_in_hand']);
    Route::post("stocks",[StockController::class,'store']);
    Route::get("jobs",[StockController::class,'get_job_id']);
    Route::get("getDetailsByJobId/{id}",[StockController::class,'get_details_by_job_id']);

    //for bill
    Route::post("createBill",[BillController::class,'create_ready_made_bill']);

    Route::get("getOwnerOutwardData",[MaterialTransactionController::class ,'getOwnerOutward']);
    Route::post("getMaterialReceivedFromOwner",[MaterialTransactionController::class ,'getMaterialReceivedFromOwner']);
    Route::post("getTotalMaterialReceivedFromOwner",[MaterialTransactionController::class ,'getTotalMaterialReceivedFromOwner']);
    Route::post("getMaterialReceivedFromOwnerWithinDates",[MaterialTransactionController::class ,'getMaterialReceivedFromOwnerWithinDates']);
    Route::post("getTotalMaterialReceivedFromOwnerWithinDates",[MaterialTransactionController::class ,'getTotalMaterialReceivedFromOwnerWithinDates']);

    Route::get("getJobIdByJobMaster",[JobMasterController::class, 'getJobIdByJobMaster']);

    Route::get("agents",[AgentController::class, 'getAgents']);

    Route::post("save",[OrderController::class, 'saveOrder']);
    Route::get("getOrderMasterList",[OrderController::class, 'getOrderMasterList']);

//    http://127.0.0.1/gold_old/gold_api/public/api/dev/orderDetails/orderMasterId/1366
    Route::get("orderDetails/orderMasterId/{order_master_id}",[OrderController::class, 'getOrderDetailsByOrderMaster']);

    Route::post("saveCustomer",[CustomerController::class, 'saveCustomer']);

    // http://127.0.0.1/gold_old/gold_api/public/api/getAgentBalance
    Route::get("getAgentBalance",[ReportController::class, 'getAgentsBalance']);

    // http://127.0.0.1/gold_old/gold_api/public/api/getAgentBalance
    Route::get("getCustomersBalanceByAgentId/{agentId}",[ReportController::class, 'getCustomersBalanceByAgentId']);

    // http://127.0.0.1/gold_old/gold_api/public/api/dev/customersBalances
    Route::get("customersBalances",[ReportController::class, 'getCustomersBalance']);

    // http://127.0.0.1/gold_old/gold_api/public/api/dev/customerReceiptPayments
    Route::get("customerReceiptPayments/{custId}",[ReportController::class, 'getCustomerReceiptPayment']);

    Route::get("customerByJob/{jobId}",[ReportController::class, 'getCustomerByJobId']);

    // http://127.0.0.1/gold_old/gold_api/public/api/billableOrders
    Route::get("billableOrders",[BillController::class, 'get_billable_orders']);

    /*Working status*/
    Route::get("materialReceivedTransactions/total/{startDate}/{endDate}/{rmId}/{employeeId}/{transactionTypeId}",[MaterialTransactionController::class ,'getMaterialReceivedTransactionsTotalByDates']);
    Route::get("materialReceivedTransactions/{startDate}/{endDate}/{rmId}/{employeeId}/{transactionTypeId}",[MaterialTransactionController::class ,'getMaterialReceivedTransactionsByDates']);

    Route::get("goldSendToJobs/total/{startDate}/{endDate}/{rmId}/{employeeId}",[MaterialTransactionController::class ,'getGoldSendToJobByDatesAndEmployee']);

    Route::get("goldReceivedFromJobs/total/{startDate}/{endDate}/{rmId}/{employeeId}",[MaterialTransactionController::class ,'getGoldReceivedFromJobByDatesAndEmployee']);

    //http://127.0.0.1/gold_old/gold_api/public/api/dev/nitricReceivedFromJobs/total/total/2019-04-13/2022-05-30/45/70
    Route::get("nitricReceivedFromJobs/total/{startDate}/{endDate}/{rmId}/{employeeId}",[MaterialTransactionController::class ,'getNitricReceivedFromJobByDatesAndEmployee']);
    Route::get("billTotal/total/{startDate}/{endDate}",[MaterialTransactionController::class ,'getBillTotalByDate']);

    Route::get("billableOrdersByOrderId/{ordertAutoId}", [BillController::class, 'get_billable_orders_by_order_autoid']);
    Route::get("SalesReport/agent/{startDate}/{endDate}/{agentId}",[ReportController::class ,'getSaleReportByDatesAndAgent']);



    Route::get("goldReceivedFromJobs/total/{startDate}/{endDate}/{rmId}/{employeeId}",[MaterialTransactionController::class ,'getGoldReceivedFromJobByDatesAndEmployee']);
    Route::get('/test', [ReportController::class,'getCurrentJobStatus']);


    Route::get('/expenditureLedgers', [LedgerController::class,'get_expenditure']);
    Route::get('/incomeLedgers', [LedgerController::class,'get_income']);
    Route::get('/assets',[AssetController::class,'index']);

    Route::get('/assets',[AssetController::class,'index']);

    Route::post('/expenditureTransactions',[TransactionController::class,'saveExpenditureTransaction']);
    Route::post('/incomeTransactions',[TransactionController::class,'saveIncomeTransaction']);


    //get agent salary
    Route::get('/agentSalary/{year}/{month}',[AgentController::class,'getAgentSalary']);
    Route::post('/agentSalary/{year}/{month}',[AgentController::class,'saveAgentSalary']);

    Route::post('/agentSalaryWithdraw',[AgentController::class,'saveAgentSalaryWithdraw']);
    Route::get('/agentSalaryWithdraw',[AgentController::class,'getAgentSalaryWithdraw']);
    Route::get('/agentSalaryWithdraw/{agentId}/{year}/{month}',[AgentController::class,'getAgentSalaryWithdrawByAgentIdYearMont']);

    //salary holders
    Route::get('/salaryHolders',[SalaryHolderController::class,'getAgentSalaryHolders']);

    Route::post('/saveSalary',[SalaryHolderSalaryController::class,'saveMonthlySalary']);
    Route::get('/currentSalaryMonth',[SalaryHolderSalaryMonthController::class,'getCurrentMonth']);
    Route::get('/salaryHolderSalaries/{salaryHolderId}/{yearNumber}/{monthNumber}',[SalaryHolderSalaryController::class,'getSalaryByShareHolderIdAndYearAndMonth']);
    Route::get('/salaryHolderSalaries/{yearNumber}/{monthNumber}',[SalaryHolderSalaryController::class,'getSalaryByYearAndMonth']);
    Route::get('/salaryHolderSalaries/{salaryHolderId}',[SalaryHolderSalaryController::class,'getSalariesBySalaryHolderId']);
    Route::get('/currentSalaryDues/{salaryHolderId}',[SalaryHolderSalaryController::class,'getSalaryHolderDueById']);

    Route::post('/saveSalaryPayment',[SalaryHolderSalaryPaymentController::class,'saveSalaryPayment']);


    Route::get('/modelWiseSale/{startDate}/{endDate}/{limit}',[ReportController::class,'getModelsSaleReportByDate']);
    Route::get('/SaleByModel/{startDate}/{endDate}/{model}',[ReportController::class,'getSaleReportByModel']);

    Route::get('/discountableBill/{cust_id}/{startDate}/{endDate}/{discount}',[ReportController::class,'getDiscountableBill']);

    Route::get("customers",[CustomerController::class, 'index']);

    Route::get("productCategories",[ProductCategoryController::class, 'getProductCategories']);

    //sale return
    Route::post("saleReturn",[SaleReturnController::class, 'store']);
    Route::get("owner/jobs/dates/{dateFrom}/{dateTo}",[JobMasterController::class, 'getJobByDate']);
    //get job details for owner
    Route::get("agentDues",[ReportController::class, 'getAgentwiseDue']);
    Route::get("customerDueByAgentId/{agentId}",[ReportController::class, 'getCustomerDueByAgent']);
    Route::get("customerTransaction/{customerId}",[ReportController::class, 'getCustomerTransaction']);

    Route::get("job/{job_id}",[JobMasterController::class, 'getJobById']);
    Route::get("logs/{reference}",[LogController::class, 'getLogByReference']);

    Route::get("customer/discount/{custId}/{startDate}/{endDate}/{discount}",[ReportController::class, 'getCustomerDiscountReport']);
    Route::get("customer/balance/{custId}/{startDate}/{endDate}/{discount}",[CustomerController::class, 'getCustomerDues']);
    Route::get("customer/dues/{customerId}",[ReportController::class, 'getCustomerDueByCustId']);

    Route::post("lcReceipt/save",[LcReceiptMasterController::class, 'save_lc_receipt']);
    Route::get("lcReceipt/{customer_id}",[LcReceiptMasterController::class, 'getLcReceiptsByCustomer']);
    Route::post("lcReceipt/byReceiptNumber",[LcReceiptMasterController::class, 'getLcReceiptsByReceiptNo']);

    Route::get("employee/cash/currentBalance",[EmployeeCashBalanceController::class, 'getCurrentCashBalance']);

    Route::get("customer/goldReceipt/{customer_id}",[GoldReceiptController::class, 'getLcReceiptsByCustomer']);
});







Route::group(array('prefix' => 'dev'), function() {
    Route::get("backupDatabase",[AdminController::class,'backup_database']);




    Route::get("stocks",[StockController::class,'get_all_instock_items']);
    Route::get("stocks/agent/{agentId}",[StockController::class,'get_all_instock_items']);
    Route::put("stocks/{tag}",[StockController::class,'update']);
    Route::post("stocks",[StockController::class,'store']);
    Route::get("agentsExceptCounterAgent",[AgentController::class,'getAgentsExceptCounterAgent']);
    Route::get("getProductsForTransfer",[AgentController::class,'getProductsForTransfer']);

    Route::put("stockToAgent",[StockController::class,'transfer_stock_to_agent']);
    Route::get("getStockByAgent/{id}",[StockController::class,'get_stock_by_agent']);
    Route::get("getCounterAgent",[StockController::class,'get_counter_agent_id']);
    Route::get("getCustomersByAgent/{id}",[AgentController::class,'get_customers_by_agent']);
    Route::get("jobs",[StockController::class,'get_job_id']);
    Route::get("getDetailsByJobId/{id}",[StockController::class,'get_details_by_job_id']);
    Route::post("createBill",[BillController::class,'create_ready_made_bill']);

    Route::get("getOwnerOutwardData",[MaterialTransactionController::class ,'getOwnerOutward']);
    Route::post("getMaterialReceivedFromOwner",[MaterialTransactionController::class ,'getMaterialReceivedFromOwner']);
    Route::post("getTotalMaterialReceivedFromOwner",[MaterialTransactionController::class ,'getTotalMaterialReceivedFromOwner']);
    Route::post("getMaterialReceivedFromOwnerWithinDates",[MaterialTransactionController::class ,'getMaterialReceivedFromOwnerWithinDates']);
    Route::post("getTotalMaterialReceivedFromOwnerWithinDates",[MaterialTransactionController::class ,'getTotalMaterialReceivedFromOwnerWithinDates']);


    /*Working on this*/
    Route::get("materialReceivedTransactions/total/{startDate}/{endDate}/{rmId}/{employeeId}/{transactionTypeId}",[MaterialTransactionController::class ,'getMaterialReceivedTransactionsTotalByDates']);
    Route::get("materialReceivedTransactions/{startDate}/{endDate}/{rmId}/{employeeId}/{transactionTypeId}",[MaterialTransactionController::class ,'getMaterialReceivedTransactionsByDates']);

    Route::get("goldSendToJobs/total/{startDate}/{endDate}/{rmId}/{employeeId}",[MaterialTransactionController::class ,'getGoldSendToJobByDatesAndEmployee']);

    Route::get("goldReceivedFromJobs/total/{startDate}/{endDate}/{rmId}/{employeeId}",[MaterialTransactionController::class ,'getGoldReceivedFromJobByDatesAndEmployee']);

    //http://127.0.0.1/gold_old/gold_api/public/api/dev/nitricReceivedFromJobs/total/total/2019-04-13/2022-05-30/45/70
    Route::get("nitricReceivedFromJobs/total/{startDate}/{endDate}/{rmId}/{employeeId}",[MaterialTransactionController::class ,'getNitricReceivedFromJobByDatesAndEmployee']);
    Route::get("billTotal/total/{startDate}/{endDate}",[MaterialTransactionController::class ,'getBillTotalByDate']);


    Route::get("SalesReport/agent/{startDate}/{endDate}/{agentId}",[ReportController::class ,'getSaleReportByDatesAndAgent']);

    //Customers
    Route::get("customers",[CustomerController::class, 'index']);
    Route::get("customers/agent/{agentId}",[CustomerController::class, 'getCustomerByAgent']);
    Route::get("customers/agent/{agentId}/inforced",[CustomerController::class, 'getInforcedCustomerByAgent']);

    Route::get("getClosingBalannceByEmpIdAndRmId/{empId}/{rmId}",[MaterialToEmployeeBalanceController::class, 'getClosingBalannceByEmpIdAndRmId']);

    Route::get("getJobIdByJobMaster",[JobMasterController::class, 'getJobIdByJobMaster']);
    Route::get("job/{job_id}",[JobMasterController::class, 'getJobById']);
    Route::get("tag/job/{job_id}",[JobMasterController::class, 'getDetailsForTag']);

    Route::get("agents",[AgentController::class, 'getAgents']);


    //Customers
    Route::get("customers",[CustomerController::class, 'index']);
    Route::get("customers/agent/{agentId}",[CustomerController::class, 'getCustomerByAgent']);
    Route::get("customersInforced",[CustomerController::class, 'getInforcedCustomers']);
    Route::get("customers/agent/{agentId}/inforced",[CustomerController::class, 'getInforcedCustomerByAgent']);


    //Products
    Route::get("products",[ProductController::class, 'getProducts']);

    //Customer Categories
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/customerCategories
    Route::get("customerCategories",[CustomerCategoryController::class, 'getCustomerCategories']);
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/customerCategories/visible
    Route::get("customerCategories/visible",[CustomerCategoryController::class, 'getVisibleCustomerCategories']);

    //Price Master
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/customerCategories
    Route::get("priceMasters",[PriceMasterController::class, 'getPriceMasters']);
    //http://127.0.0.1/gold_old/gold_api/public/api/dev/priceMasters/{priceCode}/{priceCat}
    Route::get("priceMasters/{priceCode}/{priceCat}",[PriceMasterController::class, 'getPriceMastersByCodeNCat']);


    Route::post("save",[OrderController::class, 'saveOrder']);
    // http://127.0.0.1/gold_old/gold_api/public/api/dev/getOrderMasterList
    Route::get("getOrderMasterList/{pageSize}",[OrderController::class, 'getOrderMasterList']);

    // http://127.0.0.1/gold_old/gold_api/public/api/dev/orderDetails/orderMasterId/1366
    Route::get("orderDetails/orderMasterId/{order_master_id}",[OrderController::class, 'getOrderDetailsByOrderMaster']);

    Route::post("saveCustomer",[CustomerController::class, 'saveCustomer']);

    // http://127.0.0.1/gold_old/gold_api/public/api/dev/getAgentBalance
    Route::get("getAgentBalance",[ReportController::class, 'getAgentsBalance']);

    // http://127.0.0.1/gold_old/gold_api/public/api/dev/getAgentBalance
    Route::get("getCustomersBalanceByAgentId/{agentId}",[ReportController::class, 'getCustomersBalanceByAgentId']);

    // http://127.0.0.1/gold_old/gold_api/public/api/dev/customersBalances
    Route::get("customersBalances",[ReportController::class, 'getCustomersBalance']);

    // http://127.0.0.1/gold_old/gold_api/public/api/dev/customerReceiptPayments
    Route::get("customerReceiptPayments/{custId}",[ReportController::class, 'getCustomerReceiptPayment']);

    Route::get("customerByJob/{jobId}",[ReportController::class, 'getCustomerByJobId']);

    // http://127.0.0.1/gold_old/gold_api/public/api/dev/getOderIdByStatus
    Route::get("getOderIdByStatus",[JobMasterController::class, 'getOderIdByStatus']);

    Route::get("rawMaterials/{rmId}",[RawMaterialController::class, 'getRawMaterial']);

    Route::get("billableOrders",[BillController::class, 'get_billable_orders']);

    // http://127.0.0.1/gold_old/gold_api/public/api/dev/billableOrdersByJobId/
    Route::get("billableOrdersByOrderId/{ordertAutoId}", [BillController::class, 'get_billable_orders_by_order_autoid']);

    //Accounts
    // http://127.0.0.1/gold_old/gold_api/public/api/dev/incomeLedgers/
    Route::get('/incomeLedgers', [LedgerController::class,'get_income']);
    // http://127.0.0.1/gold_old/gold_api/public/api/dev/expenditureLedgers/
    Route::get('/expenditureLedgers', [LedgerController::class,'get_expenditure']);
    Route::get('/assets',[AssetController::class,'index']);
    // transaction
    Route::post('/incomeTransactions',[TransactionController::class,'saveIncomeTransaction']);
    Route::get('/incomeTransactions',[TransactionController::class,'getIncomeTransactions']);

    Route::post('/expenditureTransactions',[TransactionController::class,'saveExpenditureTransaction']);
    Route::get('/expenditureTransactions', [TransactionController::class,'getExpenditureTransactions']);

    Route::get('/transactionYears', [TransactionController::class,'get_transaction_years']);

    Route::get('/incomeLedgersTotal/{year}',[TransactionController::class,'get_income_ledgers_group_total_by_year']);
    Route::get('/incomeLedgersTotal/{year}/{month}',[TransactionController::class,'get_income_ledgers_group_total_by_year_n_month']);

    Route::get('/expenditureLedgersTotal/{year}',[TransactionController::class,'get_expenditure_ledgers_group_total_by_year']);
    Route::get('/expenditureLedgersTotal/{year}/{month}',[TransactionController::class,'get_expenditure_ledgers_group_total_by_year_n_month']);

    Route::post('/ledgers', [LedgerController::class,'create_ledger']);


    Route::get('/test', [ReportController::class,'getCurrentJobStatus']);




});

