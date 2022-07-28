<?php

namespace App\Http\Controllers;

use App\Models\SalaryHolderSalaryPayment;
use App\Http\Requests\StoreSalaryHolderSalaryPaymentRequest;
use App\Http\Requests\UpdateSalaryHolderSalaryPaymentRequest;
use Illuminate\Http\Request;

class SalaryHolderSalaryPaymentController extends APIController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Throwable
     */
    public function saveSalaryPayment(Request $request)
    {
        $salaryPayment = new SalaryHolderSalaryPayment();
        $salaryPayment->salary_holder_id = $request->salaryHolderId;
        $salaryPayment->year_number = $request->yearNumber;
        $salaryPayment->month_number = $request->monthNumber;
        $salaryPayment->salary_paid = $request->salaryPaid;
        $salaryPayment->advance_adjusted = $request->advanceAdjusted;
        $salaryPayment->saveOrFail();
        return $this->successResponse($salaryPayment);
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
     * @param  \App\Http\Requests\StoreSalaryHolderSalaryPaymentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSalaryHolderSalaryPaymentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SalaryHolderSalaryPayment  $salaryHolderSalaryPayment
     * @return \Illuminate\Http\Response
     */
    public function show(SalaryHolderSalaryPayment $salaryHolderSalaryPayment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SalaryHolderSalaryPayment  $salaryHolderSalaryPayment
     * @return \Illuminate\Http\Response
     */
    public function edit(SalaryHolderSalaryPayment $salaryHolderSalaryPayment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSalaryHolderSalaryPaymentRequest  $request
     * @param  \App\Models\SalaryHolderSalaryPayment  $salaryHolderSalaryPayment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSalaryHolderSalaryPaymentRequest $request, SalaryHolderSalaryPayment $salaryHolderSalaryPayment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SalaryHolderSalaryPayment  $salaryHolderSalaryPayment
     * @return \Illuminate\Http\Response
     */
    public function destroy(SalaryHolderSalaryPayment $salaryHolderSalaryPayment)
    {
        //
    }
}
