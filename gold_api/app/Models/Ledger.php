<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ledger extends Model
{
    use HasFactory;

    /**
     * @var mixed
     */
    private $ledger_type_id;
    /**
     * @var mixed
     */
    private $ledger_name;
}
