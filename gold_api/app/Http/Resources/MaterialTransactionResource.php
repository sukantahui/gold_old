<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed transaction_id
 * @property mixed employee_id
 * @property mixed rm_id
 * @property mixed inward
 * @property mixed outward
 * @property mixed job_id
 * @property mixed reference
 * @property mixed record_time
 * @property mixed comment
 * @property mixed transaction_type_id
 */
class MaterialTransactionResource extends JsonResource
{
    /**
     * @var mixed
     */


    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
                'transactionId' => $this->transaction_id,
                'employeeId' => $this->employee_id,
                'rmId' => $this->rm_id,
                'inward' => $this->inward,
                'outward' => $this->outward,
                'jobId' => $this->job_id,
                'reference' => $this->reference,
                'recordTime' => $this->record_time,
                'comment' => $this->comment,
                'transactionTypeId' => $this->transaction_type_id,
        ];


    }
}
