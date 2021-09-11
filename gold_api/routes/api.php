<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerCategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PriceMasterController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportController;
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

    //for stock
    Route::get("stocks",[StockController::class,'get_all_instock_items']);
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



    Route::get("getClosingBalannceByEmpIdAndRmId/{empId}/{rmId}",[MaterialToEmployeeBalanceController::class, 'getClosingBalannceByEmpIdAndRmId']);

    Route::get("getJobIdByJobMaster",[JobMasterController::class, 'getJobIdByJobMaster']);

    Route::get("agents",[AgentController::class, 'getAgents']);


    //Customers
    Route::get("customers",[CustomerController::class, 'index']);
    Route::get("customers/agent/{agentId}",[CustomerController::class, 'getCustomerByAgent']);
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

});

