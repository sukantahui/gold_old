<?php

namespace App\Http\Controllers;

use App\Models\TransactionParticular;
use App\Http\Requests\StoreTransactionParticularRequest;
use App\Http\Requests\UpdateTransactionParticularRequest;

class TransactionParticularController extends Controller
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
     * @param  \App\Http\Requests\StoreTransactionParticularRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTransactionParticularRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TransactionParticular  $transactionParticular
     * @return \Illuminate\Http\Response
     */
    public function show(TransactionParticular $transactionParticular)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TransactionParticular  $transactionParticular
     * @return \Illuminate\Http\Response
     */
    public function edit(TransactionParticular $transactionParticular)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTransactionParticularRequest  $request
     * @param  \App\Models\TransactionParticular  $transactionParticular
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTransactionParticularRequest $request, TransactionParticular $transactionParticular)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TransactionParticular  $transactionParticular
     * @return \Illuminate\Http\Response
     */
    public function destroy(TransactionParticular $transactionParticular)
    {
        //
    }
}
