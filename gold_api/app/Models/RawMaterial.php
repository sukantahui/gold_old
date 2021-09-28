<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawMaterial extends Model
{
    use HasFactory;
    protected $table = 'rm_master';
    protected $primaryKey = 'rm_ID'; // or null
    public $timestamps = false;
    public $incrementing = true;
    // In Laravel 6.0+ make sure to also set $keyType
//    protected $keyType = 'string';
    // In Laravel 6.0+ make sure to also set $keyType
}
