<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $table = 'job_master';
    protected $primaryKey = 'job_id'; // or null
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
    protected $keyType = 'string';
    public $timestamps = false;
    private $order_id;
    private $order_serial;
    private $order_no;
    private $product_code;
    private $rm_id;
    private $pieces;
    private $product_size;
    private $job_date;
    private $delivery_date;
    private $expected_gold;
    private $p_loss;
    private $tr_date;
    private $tr_time;
    private $status;
    private $emp_id;
    private $price_method;
    private $price_code;
    private $price;
    private $gold_send;
    private $dal_send;
    private $pan_send;
    private $bronze_send;
    private $copper_send;
    private $gold_returned;
    private $dal_returned;
    private $pan_returned;
    private $bronze_returned;
    private $nitrick_returned;
    private $copper_return;
    private $product_wt;
    private $comments;
    private $dal_id;
    private $pan_id;
    private $bronze_id;
    private $copper_id;
    private $markup_value;
    private $in_stock;
    private $ip;
}
