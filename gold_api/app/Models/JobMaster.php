<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobMaster extends Model
{
    use HasFactory;
    protected $table = 'job_master';
    protected $primaryKey = 'job_id'; // or null
    public $timestamps = false;
    public $incrementing = false;

    public function getTrTimeAttribute($value)
    {
        $newDate = new Carbon($this->attributes['tr_time']);
        return $newDate;
        //return $newDate->format('Y-m-d');
    }
    public function statuses() {
        return $this->belongsTo(TableStatus::class , 'status');
    }
}
