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
            'deduction' => $this->deduction,
            'salary' => $this->salary,
            'calculatedSalary' => 0
        ];
    }
}
