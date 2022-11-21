<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed job_id
 * @property mixed order_id
 * @property mixed product_code
 * @property mixed rmId
 * @property mixed pieces
 * @property mixed productSize
 * @property mixed expected_gold
 * @property mixed p_loss
 * @property mixed tr_time
 * @property mixed employee
 * @property mixed statuses
 */
class JobOwnerResource extends JsonResource
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
            'jobId' => $this->job_id,
            'orderId' => $this->order_id,
            'productCode' => $this->product_code,
            'rmId' => $this->rmId,
            'pieces' => $this->pieces,
            'productSize' => $this->productSize,
            'expectedGold' => $this->expected_gold,
            'pLoss' => $this->p_loss,
            'trTime' => $this->tr_time->format('Y-m-d'),
            'formattedTrTime' => $this->tr_time->format('d-m-Y'),
            'currentStatus' =>new TableStatusResource($this->statuses),
            'employee' =>new EmployeeResource($this->employee),
        ];
    }
}
