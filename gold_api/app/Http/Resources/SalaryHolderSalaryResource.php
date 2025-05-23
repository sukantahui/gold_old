<?php

namespace App\Http\Resources;

use App\Models\SalaryHolder;
use App\Models\SalaryHolderSalaryPayment;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed salary_holder_id
 * @property mixed year_number
 * @property mixed month_number
 * @property mixed base_salary
 * @property mixed hourly_rate
 * @property mixed monthly_deduction_amount
 * @property mixed hour_deduction
 * @property mixed extra_pay
 */
class SalaryHolderSalaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $salaryHolder =SalaryHolder::findOrFail($this->salary_holder_id);
        $monthSalaryPaid = SalaryHolderSalaryPayment::whereSalaryHolderIdAndYearNumberAndMonthNumber($this->salary_holder_id,$this->year_number,$this->month_number)->sum('salary_paid');
        return [
            'salaryHolderId' => $this->salary_holder_id,
            'yearNumber' => $this->year_number,
            'monthNumber' => $this->month_number,
            'monthName' => date('F', mktime(0, 0, 0, $this->month_number, 10)),
            'baseSalary' => $this->base_salary,
            'hourlyRate' => $this->hourly_rate,
            'hourDeduction' => $this->hour_deduction,
            'hourlyDeductionAmount' => $this->hourly_rate*$this->hour_deduction,
            'monthlyDeductionAmount' => $this->monthly_deduction_amount,

            'extraPay' => $this->extra_pay,
            'calculatedSalary' => ($this->base_salary - ($this->hourly_rate * $this->hour_deduction) - $this->monthly_deduction_amount + $this->extra_pay),
            'salaryHolderName' =>$salaryHolder->salary_holder_name,
            'salaryPaid' => $monthSalaryPaid,
            'openingAdvance' => $salaryHolder->advance,
        ];
    }
}
