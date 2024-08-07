<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed emp_id
 * @property mixed emp_name
 * @property mixed designation_id
 * @property mixed nick_name
 * @property mixed designation
 */
class EmployeeResource extends JsonResource
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
            'employeeId'=>$this->emp_id,
            'employeeName'=>$this->emp_name,
            'designation'=>new DesignationResource($this->designation),
            'nickName'=>$this->nick_name
        ];
    }
}
