<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonthlyTransaction extends Model
{
    use HasFactory;
    protected $table = 'monthly_transactions';
    protected $guarded = ['id'];
    public function transactionParticular()
    {
        return $this->belongsTo(TransactionParticular::class, 'transaction_particular_id');
    }
    protected $casts = [
        'value' => 'decimal:3',
        'fine' => 'decimal:3',
        'cash' => 'decimal:2',
        'tr_date' => 'date',
    ];
}
