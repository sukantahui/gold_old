<?php

namespace App\Http\Resources;

use App\Models\RawMaterial;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed job_id
 * @property mixed cust_id
 * @property mixed cust_name
 * @property mixed status
 * @property mixed status_name
 * @property mixed order_id
 * @property mixed product_code
 * @property mixed rm_id
 * @property mixed rm_name
 * @property mixed product_size
 * @property mixed pieces
 * @property mixed p_loss
 * @property mixed price
 * @property mixed price_code
 * @property mixed dal_send
 * @property mixed dal_returned
 * @property mixed gold_send
 * @property mixed gold_returned
 * @property mixed pan_send
 * @property mixed pan_returned
 * @property mixed nitrick_returned
 * @property mixed product_wt
 * @property mixed markup_value
 * @property mixed pan_id
 * @property mixed short_name
 */
class TagResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        //TRUNCATE(gold_send+(pan_send*.4)-gold_returned-nitrick_returned+(p_loss*pieces)+(markup_value*pieces),3) as gold_used
        $rm_gold=RawMaterial::find($this->rm_id);
        $rm_pan=RawMaterial::find($this->pan_id);
        return [
            "job_id"=>$this->job_id,
            "cust_id"=>$this->cust_id,
            "cust_name"=>$this->cust_name,
            "short_name"=>$this->short_name,
            "status"=>$this->status,
            "status_name"=>$this->status_name,
            "order_id"=>$this->order_id,
            "product_code"=>$this->product_code,
            "rm_id"=>$this->rm_id,
            "rm_name"=>$this->rm_name,
            "product_size"=>$this->product_size,
            "pieces"=>$this->pieces,
            "p_loss"=>$this->p_loss,
            "price"=>$this->price,
            "price_code"=>$this->price_code,
            "dal_send"=>$this->dal_send,
            "dal_returned"=>$this->dal_returned,
            "gold_send"=>$this->gold_send,
            "gold_returned"=>$this->gold_returned,
            "pan_id"=>$this->pan_id,
            "pan_send"=>$this->pan_send,
            "pan_returned"=>$this->pan_returned,
            "nitrick_returned"=>$this->nitrick_returned,
            "product_wt"=>$this->product_wt,
            "markup_value"=>$this->markup_value,
            "raw_gold"=>$rm_gold,
            "rm_pan"=>$rm_pan,
            "gold_used"=>round(($this->gold_send + ($this->pan_send * $rm_pan->bill_percentage) - $this->gold_returned - $this->nitrick_returned + ($this->p_loss * $this->pieces) + ($this->markup_value * $this->pieces)),3),
            "fine_gold"=>round((($this->gold_send + ($this->pan_send * $rm_pan->bill_percentage) - $this->gold_returned - $this->nitrick_returned + ($this->p_loss * $this->pieces) + ($this->markup_value * $this->pieces))*($rm_gold->rm_gold/100)),3),
            "total_lc"=>($this->price*$this->pieces)
        ];
    }
}
