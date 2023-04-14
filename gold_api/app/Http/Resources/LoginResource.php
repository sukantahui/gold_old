<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed id
 * @property mixed user_name
 * @property mixed user_type_id
 * @property mixed token
 * @property mixed user_type
 * @property mixed emp_id
 */
class LoginResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $employee = $this->employee;
        return [
            'uniqueId' => $this->id,
            'userName' => $this->user_name,
            'userTypeId' => $this->user_type_id,
            'userTypeName' => $this->user_type->user_type_name,
            'emplyoeeId' => $this->emp_id,
            'token' => $this->token,
            'employee' => new EmployeeResource($employee)
        ];
    }
}
