<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $table = 'employees';
    protected $primaryKey = 'emp_id'; // or null
    public $timestamps = false;
    public $incrementing = true;
    protected $hidden = ['user_password'];
    public function designation() {
        return $this->belongsTo(Designation::class , 'designation_id');
    }
    // ✅ reverse relation: employee has one cash balance
    public function cashBalance()
    {
        return $this->hasOne(EmployeeCashBalance::class, 'emp_id', 'emp_id');
    }
}
