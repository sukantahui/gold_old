<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgentToCustomer extends Model
{
    use HasFactory;
    protected $table = 'agent_to_customer';
    protected $primaryKey = 'cust_id'; // or null
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
    protected $keyType = 'string';
    private $agent_id;
    private $tr_time;

}
