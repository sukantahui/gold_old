<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderMaster extends Model
{
    use HasFactory;
    protected $table = 'order_Master';
    protected $primaryKey = 'order_autoid'; // or null
    public $timestamps = false;
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
//    protected $keyType = 'string';
    // In Laravel 6.0+ make sure to also set $keyType
    /**
     * @var int|mixed
     */
    private $order_serial;
    /**
     * @var mixed|string
     */
    private $order_id;
    /**
     * @var int|mixed
     */
    private $cust_id;
    /**
     * @var mixed
     */
    private $agent_id;
    /**
     * @var mixed
     */
    private $order_date;
    /**
     * @var mixed
     */
    private $delivery_date;

    /**
     * @var mixed
     */
    private $lc_discount_percentage;

}
