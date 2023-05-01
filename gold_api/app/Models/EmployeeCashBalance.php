<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeCashBalance extends Model
{
    use HasFactory;
    protected $table = 'employees_cash_balance';
    protected $primaryKey = 'emp_id'; // or null
    public $incrementing = false;
    public $timestamps = false;
}
