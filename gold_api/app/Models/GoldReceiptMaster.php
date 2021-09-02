<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoldReceiptMaster extends Model
{
    use HasFactory;
    protected $table = 'gold_receipt_master';
    protected $primaryKey = 'gold_receipt_id'; // or null
    public $timestamps = false;
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
    protected $keyType = 'string';
}
