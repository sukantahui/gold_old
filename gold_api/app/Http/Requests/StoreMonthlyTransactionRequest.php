<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMonthlyTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // change if using auth
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'records' => 'required|array|min:1',

            'records.*.transaction_particular_id' =>
                'required|exists:transaction_particulars,id',

            'records.*.value' => 'required|numeric',
            'records.*.fine' => 'required|numeric',
            'records.*.cash' => 'required|numeric',

            'records.*.rm_id' => 'required|integer',
            'records.*.comment' => 'nullable|string',
            'records.*.tr_date' => 'required|date',
            'records.*.tr_type' => 'required|integer|in:-1,0,1',
            'records.*.record_year' => 'required|integer|min:2026',
            'records.*.record_month' => 'required|integer|min:1|max:12',
            'records.*.order_no' => 'integer|min:1|max:300',
        ];

    }

    public function messages()
    {
        return [
            'records.required' => 'No transaction records provided.',
            'records.*.transaction_particular_id.exists' =>
                'Invalid transaction particular selected.',
        ];
    }
}
