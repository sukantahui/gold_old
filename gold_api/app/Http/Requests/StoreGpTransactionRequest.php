<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGpTransactionRequest extends FormRequest
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
            'particulars' => 'nullable|string|max:100',
            'transaction_date' => 'nullable|date',
            'gp_value' => 'required|numeric',
            'gp_transaction_type_id' => 'required|exists:gp_transaction_types,id',
        ];
    }
}
