<?php

namespace App\Http\Controllers;

use App\Http\Resources\SalaryHolderSalaryResource;
use App\Models\SalaryHolder;
use App\Models\SalaryHolderSalary;
use App\Http\Requests\StoreSalaryHolderSalaryRequest;
use App\Http\Requests\UpdateSalaryHolderSalaryRequest;
use App\Models\SalaryHolderSalaryPayment;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SalaryHolderSalaryController extends ApiController
{

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
                $td->month_number = 7;
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

    public function getSalaryByShareHolderIdAndYearAndMonth($salaryHolderId, $yearNumber,$monthNumber){
        $salary = SalaryHolderSalary::whereSalaryHolderIdAndYearNumberAndMonthNumber($salaryHolderId,$yearNumber,$monthNumber)->first();
        return $this->successResponse(new SalaryHolderSalaryResource($salary));
    }
    public function getSalaryByYearAndMonth($yearNumber,$monthNumber){
        $salary = SalaryHolderSalary::whereYearNumberAndMonthNumber($yearNumber,$monthNumber)->get();
        return $this->successResponse(SalaryHolderSalaryResource::collection($salary));
    }

    public function getSalariesBySalaryHolderId($salaryHolderId){
        $salaries = SalaryHolder::find($salaryHolderId)->salaries;
        return $this->successResponse(SalaryHolderSalaryResource::collection($salaries));
    }
    public function getSalaryHolderDueById($salaryHolderId){
        $openingDue = SalaryHolder::find($salaryHolderId)->advance;
        $salaryCalculated = SalaryHolderSalary::whereSalaryHolderId($salaryHolderId)
            ->sum(DB::raw ('base_salary-(hourly_rate*hour_deduction)-monthly_deduction_amount+extra_pay'));
        $salaryPaid = SalaryHolderSalaryPayment::whereSalaryHolderId($salaryHolderId)
            ->sum('salary_paid');
        $currentDue = $openingDue + $salaryCalculated - $salaryPaid;
        return $this->successResponse($currentDue);
    }

}
