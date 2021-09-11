<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;
    protected $table = 'order_details';
    protected $primaryKey = 'order_no'; // or null
    public $timestamps = false;
    public $incrementing = true;
    /**
     * @var int|mixed
     */
    private $sl_no;
    /**
     * @var mixed|string
     */
    private $order_id;
    /**
     * @var mixed
     */
    private $product_code;
    /**
     * @var mixed
     */
    private $price_code;
    /**
     * @var mixed|string
     */
    private $price_method;
    /**
     * @var mixed
     */
    private $p_loss;
    /**
     * @var mixed
     */
    private $price;
    /**
     * @var mixed
     */
    private $prd_size;
    /**
     * @var mixed
     */
    private $gold_wt;
    /**
     * @var mixed
     */
    private $rm_id;
    /**
     * @var mixed
     */
    private $particulars;
    /**
     * @var mixed
     */
    private $qty;
    /**
     * @var int|mixed
     */
    private $status;
    /**
     * @var mixed
     */
    private $product_mv;
}
