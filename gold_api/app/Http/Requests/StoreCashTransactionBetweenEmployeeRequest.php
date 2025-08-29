<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreCashTransactionBetweenEmployeeRequest extends FormRequest
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
            'payee_id' => [
                'required',
                'integer',
                'different:payer_id',
                'exists:employees,emp_id',
            ],
            'payer_id' => [
                'required',
                'integer',
                'different:payee_id',
                'exists:employees,emp_id',
            ],
            'cash' => [
                'required',
                'numeric',
                'min:1',
            ],
            'tr_date' => [
                'nullable',
                'date',
            ],
            'comment' => [
                'nullable',
                'string',
                'max:50',
            ],
        ];
    }
    /**
     * Automatically inject the current user's emp_id as payee_id
     */
//    protected function prepareForValidation()
//    {
//        $this->merge([
//            'payee_id' => Auth::user()->emp_id,
//        ]);
//    }

    public function messages()
    {
        return [
            'payee_id.required'   => 'Please select a payee (receiver).',
            'payee_id.exists'     => 'The selected payee does not exist.',
            'payer_id.required'   => 'Please select a payer (sender).',
            'payer_id.exists'     => 'The selected payer does not exist.',
            'payer_id.different'  => 'Payer and payee cannot be the same employee.',
            'cash.required'       => 'Please enter the cash amount.',
            'cash.min'            => 'The transaction amount must be at least 1.',
            'tr_date.date'        => 'The transaction date must be a valid date.',
            'comment.max'         => 'Comment cannot exceed 50 characters.',
        ];
    }
}
