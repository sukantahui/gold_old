<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $table = 'customer_master';
    protected $primaryKey = 'cust_id'; // or null
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
    protected $keyType = 'string';
    public $timestamps = false;
    private $cust_name;
    private $mailing_name;
    private $city;
    private $cust_address;
    private $cust_pin;
    private $cust_phone;
    private $p_cat;
    private $gold_limit;
    private $cash_limit;
    private $markup_value;
    private $markuped;
    private $user_id;
    private $order_inforce;
    private $bill_inforce;
    private $short_name;


}
