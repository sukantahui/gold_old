<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BillResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        return [
            'billNo' => $this->bill_no,
            'billDate' => $this->bill_date,
            'customerId' => $this->cust_id,
            'orderId' => $this->order_id,
            'billGold' => $this->bill_gold,
            'gold' => $this->gold_cleared,
            'goldCompleted' => $this->gold_completed,
            'billLabourCharge' => $this->bill_labour_charge,
            'cashCleared' => $this->Cash_cleared,
            'cashCompleted' => $this->cash_completed,
            'agentId' => $this->agent_id,
            'comments' => $this->comments,
            'empId' => $this->emp_id,
            'totalLcInward' => $this->total_lc_inward,
            'discount' => $this->discount,
            'billDetails' => BillDetailsResource::collection($this->bill_details)
        ];
    }
}
