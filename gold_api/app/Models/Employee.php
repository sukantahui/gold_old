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
    public function designation() {
        return $this->belongsTo(Designation::class , 'designation_id');
    }
}
