<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Designation extends Model
{
    use HasFactory;
    protected $table = 'designations';
    protected $primaryKey = 'designation_id'; // or null
    public $timestamps = false;
    public $incrementing = true;
}
