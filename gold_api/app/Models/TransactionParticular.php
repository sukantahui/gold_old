<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionParticular extends Model
{
    use HasFactory;

    protected $table = 'transaction_particulars';

    protected $guarded = ['id'];

    public function monthlyTransactions()
    {
        return $this->hasMany(MonthlyTransaction::class, 'transaction_particular_id');
    }
}
