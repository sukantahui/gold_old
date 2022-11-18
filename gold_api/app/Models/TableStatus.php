<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableStatus extends Model
{
    use HasFactory;
    protected $table = 'table_status';
    protected $primaryKey = 'status_ID'; // or null
    public $timestamps = false;
    public $incrementing = false;
    public function jobs() {
        return $this->hasMany(JobMaster::class, 'job_id');
    }
}
