<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillMaster extends Model
{
    use HasFactory;
    protected $table = 'bill_master';
    protected $primaryKey = 'bill_no'; // or null
    public $timestamps = false;
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
    protected $keyType = 'string';
    /**
     * @var mixed|string
     */
    private $bill_no;
    /**
     * @var int|mixed
     */
    private $bill_date;
    /**
     * @var mixed|string
     */
    private $cust_id;
    /**
     * @var int|mixed
     */
    private $order_id;
    /**
     * @var float|mixed
     */
    private $bill_gold;
    /**
     * @var float|mixed
     */
    private $gold_cleared;
    /**
     * @var float|mixed
     */
    private $gold_completed;
    /**
     * @var float|mixed
     */
    private $bill_labour_charge;
    /**
     * @var float|mixed
     */
    private $Cash_cleared;
    /**
     * @var float|mixed
     */
    private $cash_completed;
    /**
     * @var mixed|string
     */
    private $agent_id;
    /**
     * @var mixed|string
     */
    private $comments;
    /**
     * @var int|mixed
     */
    private $emp_id;
    /**
     * @var float|mixed
     */
    private $total_lc_inward;
    /**
     * @var float|mixed
     */
    private $discount;
    /**
     * @var mixed
     */
    private $tr_time;

    public function bill_details() {
        return $this->hasMany(BillDetails::class, 'bill_no');
    }

}
