<?php

namespace App\Http\Controllers;

use App\Models\SalaryHolder;
use App\Http\Requests\StoreSalaryHolderRequest;
use App\Http\Requests\UpdateSalaryHolderRequest;

class SalaryHolderController extends Controller
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
     * @param  \App\Http\Requests\StoreSalaryHolderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSalaryHolderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SalaryHolder  $salaryHolder
     * @return \Illuminate\Http\Response
     */
    public function show(SalaryHolder $salaryHolder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SalaryHolder  $salaryHolder
     * @return \Illuminate\Http\Response
     */
    public function edit(SalaryHolder $salaryHolder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSalaryHolderRequest  $request
     * @param  \App\Models\SalaryHolder  $salaryHolder
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSalaryHolderRequest $request, SalaryHolder $salaryHolder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SalaryHolder  $salaryHolder
     * @return \Illuminate\Http\Response
     */
    public function destroy(SalaryHolder $salaryHolder)
    {
        //
    }
}
