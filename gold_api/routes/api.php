<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StockController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\BillController;

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
});

