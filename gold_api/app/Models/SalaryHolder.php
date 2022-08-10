<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalaryHolder extends Model
{
    use HasFactory;
    public function getDeductionAttribute()
    {
        return 0;
    }
    public function salaries() {
        return $this->hasMany(SalaryHolderSalary::class, 'salary_holder_id');
    }

}
