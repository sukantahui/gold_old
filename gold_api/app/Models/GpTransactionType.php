<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpTransactionType extends Model
{
    use HasFactory;
    protected $fillable = [
        'transaction_type_name',
        'transaction_type_value',
        'inforced'
    ];
}
