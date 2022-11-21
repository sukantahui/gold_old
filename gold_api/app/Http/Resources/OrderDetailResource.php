<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed order_no
 * @property mixed order_id
 * @property mixed orderMaster
 */
class OrderDetailResource extends JsonResource
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
            'orderDetailNo' => $this->order_no,
            'OrderMaster'=>new OrderMasterResource($this->orderMaster)
        ];
    }
}
