<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemStockReadyMade extends Model
{
    use HasFactory;
    protected $table = 'item_stock_ready_made';
    protected $primaryKey = 'tag'; // or null
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
    protected $keyType = 'string';
    public $timestamps = false;
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
    private $model_size;
    /**
     * @var mixed
     */
    private $qty;
    /**
     * @var mixed
     */
    private $gold;
    /**
     * @var mixed
     */
    private $labour_charge;
    /**
     * @var mixed
     */
    private $gross_weight;
    /**
     * @var mixed
     */
    private $package_weight;
    /**
     * @var mixed
     */
    private $in_stock;
    /**
     * @var mixed
     */
    private $agent_id;
    /**
     * @var mixed
     */
    private $employee_id;
    /**
     * @var mixed
     */
    private $reference;
    /**
     * @var mixed
     */
    private $bill_no;
    /**
     * @var mixed
     */
    private $job_id;
    protected $appends = ['is_selected'];

    public function getIsSelectedAttribute()
    {
        return false;
    }


}
