<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed|string gold_receipt_id
 * @property mixed agent_id
 * @property mixed cust_id
 * @property mixed payment_mode
 * @property mixed emp_id
 * @property mixed gold_value
 * @property mixed gold_rate
 * @property mixed cash
 * @property mixed last_gold_balance
 * @property mixed current_lc_balance
 * @property mixed rm_id
 */
class GoldReceiptMaster extends Model
{
    use HasFactory;
    protected $table = 'gold_receipt_master';
    protected $primaryKey = 'gold_receipt_id'; // or null
    public $timestamps = false;
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
    protected $keyType = 'string';
    protected $appends = ['gold_receipt_date'];

    public function getGoldReceiptDateAttribute($value)
    {
        return date('d-m-Y', strtotime($this->attributes['tr_date']));
    }
}
