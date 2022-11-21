<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed order_id
 * @property mixed cust_id
 * @property mixed agent_id
 * @property mixed order_date
 * @property mixed customer
 */
class OrderMasterResource extends JsonResource
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
            'orderId'=>$this->order_id,
            'customer'=>new CustomerResource($this->customer),
            'orderDate'=>$this->order_date,
        ];
    }
}
