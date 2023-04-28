<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcReceiptMaster extends Model
{
    use HasFactory;
    protected $appends = array('payment_mode_name');
    protected $table = 'lc_receipt_master';
    protected $primaryKey = 'lc_receipt_no'; // or null
    public $timestamps = false;
    public $incrementing = false;
    public function getPaymentModeNameAttribute()
    {
        return ($this->attributes['mode']==1?"Cash": "Cheque");
    }
    /**
     * @var mixed|string
     */
    private $lc_receipt_no;
    /**
     * @var mixed
     */
    private $agent_id;
    /**
     * @var mixed
     */
    private $cust_id;
    /**

     * @var mixed
     */
    private $emp_id;
    /**
     * @var mixed
     */
    private $amount;
    /**
     * @var mixed
     */
    private $discount;
    /**
     * @var mixed
     */
    private $cheque_details;
    /**
     * @var mixed
     */
    private $mode;

    public function getLcReceiptDateAttribute($value)
    {
        return date('d-m-Y', strtotime($this->attributes['lc_receipt_date']));
    }
}
