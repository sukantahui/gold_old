<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialToEmployeeBalance extends Model
{

    use HasFactory;

    protected $table = 'material_to_employee_balance';
    protected $primaryKey = 'material_balance_id'; // or null
    public $timestamps = false;
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
    // protected $keyType = 'string';
    /**
     * @var mixed
     */
    private $emp_id;
}
