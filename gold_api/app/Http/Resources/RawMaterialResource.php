<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed rm_ID
 * @property mixed rm_cat_id
 * @property mixed rm_name
 * @property mixed rm_gold
 * @property mixed bill_percentage
 * @property mixed billPercentage
 */
class RawMaterialResource extends JsonResource
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
            'rmID'=>$this->rm_ID,
            'rmCategoryId'=>$this->rm_cat_id,
            'rmName'=>$this->rm_name,
            'rmGold'=>$this->rm_gold,
            'billPercentage'=>$this->bill_percentage
        ];
    }
}
