<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LedgerType extends Model
{
    use HasFactory;
    public function ledgers()
    {
        return $this->hasMany('App\Models\Ledger','ledger_type_id');
    }
}
