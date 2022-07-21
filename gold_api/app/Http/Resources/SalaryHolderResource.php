<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed salary_holder_name
 * @property mixed salary_holder_mailing_name
 * @property mixed salary
 * @property mixed deduction
 */
class SalaryHolderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'salaryHolderName' => $this->salary_holder_name,
            'salaryHolderMailingName' => $this->salary_holder_mailing_name,
            'hourDeduction' => 0,
            'hourDeductionAmount' => 0,
            'salaryDeductionPercentage' => 0,
            'deduction' => $this->deduction,
            'salary' => $this->salary,
            'hourlyRate' => round($this->salary/300,0),
            'amountAdded' => 0,
            'calculatedSalary' => $this->salary
        ];
    }
}
