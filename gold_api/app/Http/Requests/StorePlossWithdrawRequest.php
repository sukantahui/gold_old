<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePlossWithdrawRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'payer_id' => ['required', 'integer', 'exists:employees,emp_id'],
            'payee_id' => ['nullable', 'integer', 'exists:employees,emp_id'],
            'rm_id' => ['nullable', 'integer', 'exists:rm_master,rm_ID'],
            'rm_quantity' => ['required', 'numeric', 'min:0.001'],
        ];
    }
    public function messages()
    {
        return [
            'payer_id.required' => 'Please select the employee who paid.',
            'payer_id.exists' => 'Invalid payer selected.',
            'payee_id.exists' => 'Invalid payee selected.',
            'rm_id.exists' => 'Invalid material type selected.',
            'rm_quantity.required' => 'RM quantity is required.',
            'rm_quantity.numeric' => 'RM quantity must be a number.',
            'rm_quantity.min' => 'RM quantity must be greater than zero.',
        ];
    }
}
