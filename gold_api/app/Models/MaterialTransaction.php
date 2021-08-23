<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialTransaction extends Model
{
    use HasFactory;


    protected $table = 'material_transaction';
    protected $primaryKey = 'transaction_id'; // or null
    public $timestamps = false;
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
    protected $keyType = 'string';




}
