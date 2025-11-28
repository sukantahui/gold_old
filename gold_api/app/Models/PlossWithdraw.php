<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlossWithdraw extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    // The employee who paid
    public function payer()
    {
        return $this->belongsTo(Employee::class, 'payer_id', 'emp_id');
    }

    // The employee who received payment
    public function payee()
    {
        return $this->belongsTo(Employee::class, 'payee_id', 'emp_id');
    }
}
