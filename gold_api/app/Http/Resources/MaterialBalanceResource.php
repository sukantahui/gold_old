<?php

namespace App\Http\Resources;

use App\Models\RawMaterial;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed material_balance_id
 * @property mixed emp_id
 * @property mixed closing_balance
 * @property mixed opening_balance
 * @property mixed outward
 * @property mixed inward
 * @property mixed rm_id
 */
class MaterialBalanceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $rawMaterial = RawMaterial::where('rm_ID',$this->rm_id)->first();
        return [
            "materialBalanceId"=> $this->material_balance_id,
            "empId"=> $this->emp_id,
            "rmId"=> $this->rm_id,
            "inward"=> $this->inward,
            "outward"=> $this->outward,
            "openingBalance"=> $this->opening_balance,
            "closingBalance"=> $this->closing_balance,
            'rawMaterialName' => $rawMaterial->rm_name,
            'rawMaterial' => $rawMaterial,
        ];
    }
}
