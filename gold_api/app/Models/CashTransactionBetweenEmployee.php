<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashTransactionBetweenEmployee extends Model
{
    use HasFactory;
    protected $table = 'cash_transaction_between_employees';
    protected $primaryKey = 'cash_transaction_id';
    public $timestamps = false;

    // Both payer and payee are employees
    private $payee_id;
    private $cash_transaction_id;

    public function payee()
    {
        return $this->belongsTo(Employee::class, 'payee_id', 'emp_id');
    }

    public function payer()
    {
        return $this->belongsTo(Employee::class, 'payer_id', 'emp_id');
    }
}
