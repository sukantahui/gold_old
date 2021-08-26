<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobMaster extends Model
{
    use HasFactory;
    protected $table = 'job_master';
    protected $primaryKey = 'job_id'; // or null
    public $timestamps = false;
    public $incrementing = false;
}
