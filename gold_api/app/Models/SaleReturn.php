<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleReturn extends Model
{
    use HasFactory;

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
    private $gini_gold;
    /**
     * @var mixed
     */
    private $fine_gold;
    /**
     * @var mixed
     */
    private $gross_weight;
    /**
     * @var mixed
     */
    private $qty;
    /**
     * @var mixed
     */
    private $lc;
    /**
     * @var mixed
     */
    private $year_number;
    /**
     * @var mixed
     */
    private $month_number;
    /**
     * @var mixed
     */
    private $agent_id;

    /**
     * @var mixed
     */
    private $customer_id;
}
