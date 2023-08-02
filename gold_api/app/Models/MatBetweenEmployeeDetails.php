<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatBetweenEmployeeDetails extends Model
{
    use HasFactory;
    private $mat_between_employee_id;
    private $outward;
    /**
     * @var int
     */
    private $inward;
    private $rm_id;
    private $employee_id;
}
