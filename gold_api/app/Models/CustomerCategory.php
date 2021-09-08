<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerCategory extends Model
{
    use HasFactory;
    protected $table = 'cust_category';
    protected $primaryKey = 'ID'; // or null
    public $incrementing = true;
    // In Laravel 6.0+ make sure to also set $keyType
    //protected $keyType = 'string';
    public $timestamps = false;
}
