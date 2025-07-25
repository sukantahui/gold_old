<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryDayBook extends Model
{
    use HasFactory;

    protected $table = 'inventory_day_book';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'employee_id',
        'rm_id',
        'transaction_type',
        'rm_value',
        'reference',
        'comment',
        'timestamp',
        'inforce',
    ];

    protected $casts = [
        'rm_value' => 'float',
        'timestamp' => 'datetime',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'emp_id');
    }

    public function rm()
    {
        return $this->belongsTo(RawMaterial::class, 'rm_id', 'rm_ID');
    }
}
