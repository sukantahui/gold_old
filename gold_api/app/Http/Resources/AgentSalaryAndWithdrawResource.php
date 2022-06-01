<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed id
 * @property mixed agent_id
 * @property mixed year_number
 * @property mixed month_number
 * @property mixed salary
 * @property mixed commission
 * @property mixed salary_withdraw
 * @property mixed ta
 */
class AgentSalaryAndWithdrawResource extends JsonResource
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
            'id'=>$this->id,
            'agentId'=>$this->agent_id,
            'year'=>$this->year_number,
            'month'=>$this->month_number,
            'salary'=>$this->salary,
            'ta'=>$this->ta,
            'commission'=>$this->commission,
            'totalSalary'=>($this->salary+$this->ta+$this->commission),
            'salaryWithdraw'=>$this->salary_withdraw,
        ];
    }
}
