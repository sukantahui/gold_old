<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeCashBalance extends Model
{
    use HasFactory;
    protected $table = 'employees_cash_balance';
    protected $primaryKey = 'emp_id'; // or null
<<<<<<< HEAD
    public $incrementing = false;
    public $timestamps = false;
=======
    public $timestamps = false;
    public $incrementing = false;
>>>>>>> 37503e26134eaee644e9f13544f6dedef3517254
}
