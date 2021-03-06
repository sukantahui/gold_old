<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    use HasFactory;
    protected $table = 'agent_master';
    protected $primaryKey = 'agent_id'; // or null
    public $incrementing = false;
    // In Laravel 6.0+ make sure to also set $keyType
    protected $keyType = 'string';
    public $timestamps = false;
    private $agent_name;
    private $short_name;
    private $agent_category_id;
    private $agent_address;
    private $agent_phone;
    private $time_stamp;
    private $user_id;
    private $inforce;
    private $max_gold_limit;

    public function customers()    {
        return $this->hasManyThrough(
            Customer::class,
            AgentToCustomer::class, // middle table
            'agent_id', // Foreign key on agent_to_customer table...
            'cust_id', // Foreign key on customer_master table...
            'agent_id', // Local key on agent_master table...
            'cust_id' // Local key on AgentToCustomer table...
        );
    }

}
