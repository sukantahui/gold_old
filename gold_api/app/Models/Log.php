<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;
    protected $table = 'log_table';
    protected $primaryKey = 'id'; // or null
    public $timestamps = false;
    public $incrementing = true;
    // In Laravel 6.0+ make sure to also set $keyType
//    protected $keyType = 'string';
}
