<?php

namespace App\Http\Controllers;

use App\Models\SalaryHolderSalaryMonth;
use App\Http\Requests\StoreSalaryHolderSalaryMonthRequest;
use App\Http\Requests\UpdateSalaryHolderSalaryMonthRequest;

class SalaryHolderSalaryMonthController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCurrentMonth()
    {
        $result=SalaryHolderSalaryMonth::whereIsDone(0)->first();
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
     * @param  \App\Http\Requests\StoreSalaryHolderSalaryMonthRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSalaryHolderSalaryMonthRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SalaryHolderSalaryMonth  $salaryHolderSalaryMonth
     * @return \Illuminate\Http\Response
     */
    public function show(SalaryHolderSalaryMonth $salaryHolderSalaryMonth)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SalaryHolderSalaryMonth  $salaryHolderSalaryMonth
     * @return \Illuminate\Http\Response
     */
    public function edit(SalaryHolderSalaryMonth $salaryHolderSalaryMonth)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSalaryHolderSalaryMonthRequest  $request
     * @param  \App\Models\SalaryHolderSalaryMonth  $salaryHolderSalaryMonth
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSalaryHolderSalaryMonthRequest $request, SalaryHolderSalaryMonth $salaryHolderSalaryMonth)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SalaryHolderSalaryMonth  $salaryHolderSalaryMonth
     * @return \Illuminate\Http\Response
     */
    public function destroy(SalaryHolderSalaryMonth $salaryHolderSalaryMonth)
    {
        //
    }
}
