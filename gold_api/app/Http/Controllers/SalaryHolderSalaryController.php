<?php

namespace App\Http\Controllers;

use App\Models\SalaryHolderSalary;
use App\Http\Requests\StoreSalaryHolderSalaryRequest;
use App\Http\Requests\UpdateSalaryHolderSalaryRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SalaryHolderSalaryController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index():
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function saveMonthlySalary(Request $request)
    {
        $input=($request->json()->all());
//        return $this->successResponse($input);
        DB::beginTransaction();
        try {
            $result_array = array();
            foreach($input as $detail){
                $salaryHolder = (object)$detail;
                $td = new SalaryHolderSalary();
                $td->salary_holder_id = $salaryHolder->id;
                $td->year_number = 2022;
                $td->month_number = 6;
                $td->base_salary = $salaryHolder->salary;
                $td->hourly_rate = $salaryHolder->hourlyRate;
                $td->monthly_deduction_amount = $salaryHolder->deduction;
                $td->hour_deduction = $salaryHolder->hourDeduction;
                $td->hour_deduction_amount = $salaryHolder->hourDeductionAmount;
                $td->extra_pay = $salaryHolder->amountAdded;
                $td->save();
                $result_array[]=$td;
            }
            DB::commit();
        }catch(\Exception $e){
            DB::rollBack();
            return $this->errorResponse($e->getMessage(),500);
        }
        return $this->successResponse($result_array);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSalaryHolderSalaryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSalaryHolderSalaryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SalaryHolderSalary  $salaryHolderSalary
     * @return \Illuminate\Http\Response
     */
    public function show(SalaryHolderSalary $salaryHolderSalary)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SalaryHolderSalary  $salaryHolderSalary
     * @return \Illuminate\Http\Response
     */
    public function edit(SalaryHolderSalary $salaryHolderSalary)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSalaryHolderSalaryRequest  $request
     * @param  \App\Models\SalaryHolderSalary  $salaryHolderSalary
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSalaryHolderSalaryRequest $request, SalaryHolderSalary $salaryHolderSalary)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SalaryHolderSalary  $salaryHolderSalary
     * @return \Illuminate\Http\Response
     */
    public function destroy(SalaryHolderSalary $salaryHolderSalary)
    {
        //
    }
}
