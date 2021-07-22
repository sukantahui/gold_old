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
            'jobId'=>$this->job_id,
            'tag'=>$this->tag,
            'modelNo'=>$this->model_no,
            'priceCode'=>$this->price_code,
            'goldWeight'=>$this->gold_wt,
            'grossWeight'=>$this->gross_wt,
            'priceMethod'=>$this->price_method,
            'wastagePercentage'=>$this->wastage_percentage,
            'wastage'=>$this->wastage,
            'totalGold'=>$this->total_gold,
            'goldQuality'=>$this->gold_quality,
            'fineGold'=>$this->fine_gold,
            'quantity'=>$this->qty,
            'size'=>$this->size,
            'ploss'=>$this->ploss,
            'labourCharge'=>$this->labour_charge,
            'markupValue'=>$this->markup_value,
            'stock'=>new ItemStockReadyMadeResource($this->stock_details)
        ];
    }
}
