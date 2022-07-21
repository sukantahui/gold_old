<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalaryHolderSalary extends Model
{
    use HasFactory;
    private $salary_holder_id;
    private $year_number;
    private $month_number;
    private $base_salary;
    private $hour_deduction;
    private $monthly_deduction_amount;
    private $hour_deduction_amount;
    private $extra_pay;
    private $hourly_rate;
}
