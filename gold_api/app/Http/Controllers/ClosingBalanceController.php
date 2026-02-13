<?php

namespace App\Http\Controllers;

use App\Models\ClosingBalance;
use App\Http\Requests\StoreClosingBalanceRequest;
use App\Http\Requests\UpdateClosingBalanceRequest;

class ClosingBalanceController extends Controller
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
     * @param  \App\Http\Requests\StoreClosingBalanceRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreClosingBalanceRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ClosingBalance  $closingBalance
     * @return \Illuminate\Http\Response
     */
    public function show(ClosingBalance $closingBalance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ClosingBalance  $closingBalance
     * @return \Illuminate\Http\Response
     */
    public function edit(ClosingBalance $closingBalance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClosingBalanceRequest  $request
     * @param  \App\Models\ClosingBalance  $closingBalance
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateClosingBalanceRequest $request, ClosingBalance $closingBalance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ClosingBalance  $closingBalance
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClosingBalance $closingBalance)
    {
        //
    }
}
