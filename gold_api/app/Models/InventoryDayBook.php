<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryDayBook extends Model
{
    use HasFactory;
    protected $table = 'inventory_day_book';
    //protected $primaryKey = 'job_id'; // or null
    public $timestamps = false;
    //public $incrementing = false;
}
