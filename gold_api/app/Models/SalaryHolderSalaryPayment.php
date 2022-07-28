<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalaryHolderSalaryPayment extends Model
{
    use HasFactory;

    private mixed $salary_holder_id;
    private mixed $year_number;
    private mixed $month_number;
    private mixed $salary_paid;
    private mixed $advance_adjusted;
}
