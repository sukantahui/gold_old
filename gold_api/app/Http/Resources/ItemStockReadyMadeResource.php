<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed tag
 * @property mixed item_inward_detail_id
 * @property mixed model_no
 * @property mixed model_size
 * @property mixed qty
 * @property mixed labour_charge
 * @property mixed gross_weight
 * @property mixed package_weight
 * @property mixed gold
 * @property mixed in_stock
 * @property mixed agent_id
 * @property mixed record_time
 * @property mixed employee_id
 * @property mixed inforce
 * @property mixed reference
 * @property mixed bill_no
 * @property mixed job_id
 * @property mixed is_selected
 */
class ItemStockReadyMadeResource extends JsonResource
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
         'tag'=> $this->tag,
         'item_inward_detail_id'=> $this->item_inward_detail_id,
         'model_no'=> $this->model_no,
         'model_size'=> $this->model_size,
         'qty'=> $this->qty,
         'gold'=> $this->gold,
         'labour_charge'=> $this->labour_charge,
         'gross_weight'=> $this->gross_weight,
         'package_weight'=> $this->package_weight,
         'in_stock'=> $this->in_stock,
         'agent_id'=> $this->agent_id,
         'record_time'=> $this->record_time,
         'employee_id'=> $this->employee_id,
         'inforce'=> $this->inforce,
         'reference'=> $this->reference,
         'bill_no'=> $this->bill_no,
         'job_id'=> $this->job_id,
         'is_selected'=>$this->is_selected
        ];
    }
}
