<?php

namespace App\Http\Resources;

use App\Models\Employee;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed user_name
 * @property mixed id
 * @property mixed user_type_id
 * @property mixed user_type
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $employee =new EmployeeResource(Employee::findOrFail($this->emp_id));
        return [
            'uniqueId' => $this->id,
            'userName' => $this->user_name,
            'user_name' => $this->user_name,
            'userTypeId' => $this->user_type_id,
            'employeeId' => $this->emp_id,
            'emp_id' =>  $this->emp_id,   //used in different places
            'employee' => $employee,
            'userTypeName' => $this->user_type->user_type_name,
        ];
    }
}
