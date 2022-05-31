<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgentSalaryWithdrawal extends Model
{
    use HasFactory;

    /**
     * @var mixed
     */
    private $agent_id;
    /**
     * @var mixed
     */
    private $year_number;
    /**
     * @var mixed
     */
    private $month_number;
    /**
     * @var mixed
     */
    private $amount;
}
