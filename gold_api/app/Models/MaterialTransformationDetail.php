<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialTransformationDetail extends Model
{
    use HasFactory;
    private $mtm_id;
    private $rm_id;
    private $rm_value;
    /**
     * @var int
     */
    private $tr_type;
}
