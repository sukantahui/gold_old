<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceMaster extends Model
{
    use HasFactory;
    protected $table = 'price_master';
    protected $primaryKey = 'price_id'; // or null
    public $incrementing = true;
    // In Laravel 6.0+ make sure to also set $keyType
    //protected $keyType = 'string';
    public $timestamps = false;
}
