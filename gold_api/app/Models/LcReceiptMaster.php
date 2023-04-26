<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LcReceiptMaster extends Model
{
    use HasFactory;
    protected $table = 'lc_receipt_master';
    protected $primaryKey = 'lc_receipt_no'; // or null
    public $timestamps = false;
    public $incrementing = false;
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
}
