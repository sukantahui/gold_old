<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillDetails extends Model
{
    use HasFactory;
    protected $table = 'bill_details';
    protected $primaryKey = 'bill_details_id'; // or null
    public $timestamps = false;
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
    protected $keyType = 'string';
    /**
     * @var mixed|string
     */
    private $bill_details_id;
    /**
     * @var mixed|string
     */
    private $bill_no;
    /**
     * @var mixed
     */
    private $job_id;
    /**
     * @var mixed
     */
    private $tag;
    /**
     * @var mixed
     */
    private $model_no;
    /**
     * @var mixed
     */
    private $price_code;
    /**
     * @var mixed
     */
    private $gold_wt;
    /**
     * @var mixed
     */
    private $gross_wt;
    /**
     * @var mixed|string
     */
    private $price_method;
    /**
     * @var int|mixed
     */
    private $wastage_percentage;
    /**
     * @var int|mixed
     */
    private $wastage;
    /**
     * @var mixed
     */
    private $total_gold;
    /**
     * @var int|mixed
     */
    private $gold_quality;
    /**
     * @var mixed
     */
    private $fine_gold;
    /**
     * @var mixed
     */
    private $qty;
    /**
     * @var mixed
     */
    private $size;
    /**
     * @var int|mixed
     */
    private $ploss;
    /**
     * @var mixed
     */
    private $labour_charge;
    /**
     * @var int|mixed
     */
    private $markup_value;
}
