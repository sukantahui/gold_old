<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClosingBalance extends Model
{
    use HasFactory;
    protected $table = 'closing_balances';

    protected $fillable = [
        'rm_id',
        'closing_balance_month',
        'closing_balance_year',
        'opening_balance_month',
        'opening_balance_year',
        'balance'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if ($model->closing_balance_month == 12) {
                $model->opening_balance_month = 1;
                $model->opening_balance_year = $model->closing_balance_year + 1;
            } else {
                $model->opening_balance_month = $model->closing_balance_month + 1;
                $model->opening_balance_year = $model->closing_balance_year;
            }
        });
    }
}
