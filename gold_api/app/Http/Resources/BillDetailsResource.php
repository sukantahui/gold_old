<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BillDetailsResource extends JsonResource
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
            'billDetailsId'=>$this->bill_details_id,
            'billNo'=>$this->bill_no,
            'job_id'=>$this->job_id,
            'tag'=>$this->tag,
            'model_no'=>$this->model_no,
            'price_code'=>$this->price_code,
            'gold_wt'=>$this->gold_wt,
            'gross_wt'=>$this->gross_wt,
            'price_method'=>$this->price_method,
            'wastage_percentage'=>$this->wastage_percentage,
            'wastage'=>$this->wastage,
            'totalGold'=>$this->total_gold,
            'goldQuality'=>$this->gold_quality,
            'fineGold'=>$this->fine_gold,
            'quantity'=>$this->qty,
            'size'=>$this->size,
            'ploss'=>$this->ploss,
            'labourCharge'=>$this->labour_charge,
            'markupValue'=>$this->markup_value,
        ];
    }
}
