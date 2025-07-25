<?php

namespace App\Http\Controllers;

use App\Models\GpTransactionType;
use App\Http\Requests\StoreGpTransactionTypeRequest;
use App\Http\Requests\UpdateGpTransactionTypeRequest;
use App\Models\TransactionType;

class GpTransactionTypeController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = GpTransactionType::all();
        return $this->successResponse($result);
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
     * @param  \App\Http\Requests\StoreGpTransactionTypeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreGpTransactionTypeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GpTransactionType  $gpTransactionType
     * @return \Illuminate\Http\Response
     */
    public function show(GpTransactionType $gpTransactionType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GpTransactionType  $gpTransactionType
     * @return \Illuminate\Http\Response
     */
    public function edit(GpTransactionType $gpTransactionType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateGpTransactionTypeRequest  $request
     * @param  \App\Models\GpTransactionType  $gpTransactionType
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateGpTransactionTypeRequest $request, GpTransactionType $gpTransactionType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GpTransactionType  $gpTransactionType
     * @return \Illuminate\Http\Response
     */
    public function destroy(GpTransactionType $gpTransactionType)
    {
        //
    }
}
