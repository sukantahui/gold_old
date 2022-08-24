<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed year_number
 * @property mixed month_number
 * @property mixed is_done
 */
class SalaryPeriodResource extends JsonResource
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
            'yearNumber' => $this->year_number,
            'monthNumber' => $this->month_number,
            'isDone' => $this->is_done
        ];
    }
}
