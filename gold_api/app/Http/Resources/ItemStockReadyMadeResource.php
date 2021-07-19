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
         'itemInwardDetailId'=> $this->item_inward_detail_id,
         'modelNo'=> $this->model_no,
         'modelSize'=> $this->model_size,
         'quantity'=> $this->qty,
         'gold'=> $this->gold,
         'labourCharge'=> $this->labour_charge,
         'grossWeight'=> $this->gross_weight,
         'packageWeight'=> $this->package_weight,
         'inStock'=> $this->in_stock,
         'agentId'=> $this->agent_id,
         'recordTime'=> $this->record_time,
         'employeeId'=> $this->employee_id,
         'inforce'=> $this->inforce,
         'reference'=> $this->reference,
         'billNo'=> $this->bill_no,
         'jobId'=> $this->job_id,
         'isSelected'=>$this->is_selected
        ];
    }
}
