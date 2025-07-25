<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpTransaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'transaction_date',
        'gp_value',
        'gp_transaction_type_id',
        'comment'
    ];

    public function transactionType()
    {
        return $this->belongsTo(GpTransactionType::class, 'gp_transaction_type_id');
    }
}
