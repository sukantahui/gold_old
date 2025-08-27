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

    // ✅ relation: every balance belongs to an Employee
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'emp_id', 'emp_id');
    }
}
