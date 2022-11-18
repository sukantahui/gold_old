<?php

namespace App\Http\Controllers;

use App\Models\TableStatus;
use App\Http\Requests\StoreTableStatusRequest;
use App\Http\Requests\UpdateTableStatusRequest;

class TableStatusController extends Controller
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
     * @param  \App\Http\Requests\StoreTableStatusRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTableStatusRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TableStatus  $tableStatus
     * @return \Illuminate\Http\Response
     */
    public function show(TableStatus $tableStatus)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TableStatus  $tableStatus
     * @return \Illuminate\Http\Response
     */
    public function edit(TableStatus $tableStatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTableStatusRequest  $request
     * @param  \App\Models\TableStatus  $tableStatus
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTableStatusRequest $request, TableStatus $tableStatus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TableStatus  $tableStatus
     * @return \Illuminate\Http\Response
     */
    public function destroy(TableStatus $tableStatus)
    {
        //
    }
}
