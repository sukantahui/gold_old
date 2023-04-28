<?php

namespace App\Http\Controllers;

use App\Models\EmployeeCashBalance;
use App\Http\Requests\StoreEmployeeCashBalanceRequest;
use App\Http\Requests\UpdateEmployeeCashBalanceRequest;

class EmployeeCashBalanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreEmployeeCashBalanceRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEmployeeCashBalanceRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\EmployeeCashBalance  $employeeCashBalance
     * @return \Illuminate\Http\Response
     */
    public function show(EmployeeCashBalance $employeeCashBalance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\EmployeeCashBalance  $employeeCashBalance
     * @return \Illuminate\Http\Response
     */
    public function edit(EmployeeCashBalance $employeeCashBalance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEmployeeCashBalanceRequest  $request
     * @param  \App\Models\EmployeeCashBalance  $employeeCashBalance
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEmployeeCashBalanceRequest $request, EmployeeCashBalance $employeeCashBalance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EmployeeCashBalance  $employeeCashBalance
     * @return \Illuminate\Http\Response
     */
    public function destroy(EmployeeCashBalance $employeeCashBalance)
    {
        //
    }
}
