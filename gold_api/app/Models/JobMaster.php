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
    public function employee() {
        return $this->belongsTo(Employee::class , 'emp_id');
    }
    public function dal() {
        return $this->belongsTo(RawMaterial::class , 'dal_id');
    }
    public function pan() {
        return $this->belongsTo(RawMaterial::class , 'pan_id');
    }
    public function bronze() {
        return $this->belongsTo(RawMaterial::class , 'bronze_id');
    }
    public function copper() {
        return $this->belongsTo(RawMaterial::class , 'copper_id');
    }
    public function orderDetails() {
        return $this->belongsTo(OrderDetail::class , 'order_no');
    }
}
