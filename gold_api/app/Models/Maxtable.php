<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maxtable extends Model
{
    use HasFactory;
    protected $table = 'maxtable';
    protected $primaryKey = 'table_id'; // or null
    public $timestamps = false;
    /**
     * @var mixed|string
     */
    private $table_name;
    /**
     * @var int|mixed
     */
    private $mainfield;
    /**
     * @var int|mixed
     */
    private $prefix;
    /**
     * @var mixed|string
     */
    private $suffix;
    /**
     * @var mixed
     */
    private $financial_year;
}
