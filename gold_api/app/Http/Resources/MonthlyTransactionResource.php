<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MonthlyTransactionResource extends JsonResource
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
            'id' => $this->id,
            'transactionParticularId' => $this->transaction_particular_id,
            'value' => (float) $this->value,
            'fine' => (float) $this->fine,
            'cash' => (float) $this->cash,
            'rmId' => $this->rm_id,
            'comment' => $this->comment,
            'trDate' => $this->tr_date,
            'trType' => $this->tr_type,
            'recordYear' => $this->record_year,
            'recordMonth' => $this->record_month,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
