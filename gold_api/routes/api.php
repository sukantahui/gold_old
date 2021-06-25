<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StockController;

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




Route::group(array('prefix' => 'dev'), function() {
    Route::get("backupDatabase",[AdminController::class,'backup_database']);


    Route::get("stocks",[StockController::class,'get_all_instock_items']);
    Route::get("stocks/agent/{agentId}",[StockController::class,'get_all_instock_items']);
    Route::put("stocks/{tag}",[StockController::class,'update']);
    Route::post("stocks",[StockController::class,'store']);
});

