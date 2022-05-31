<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed agent_id
 * @property mixed year_number
 * @property mixed month_number
 * @property mixed amount
 */
class AgentSalaryWithdrawResource extends JsonResource
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
            'agentId' => $this->agent_id,
            'yearNumber' => $this->year_number,
            'monthNumber' => $this->month_number,
            'amount' => $this->amount,
        ];
    }
}
