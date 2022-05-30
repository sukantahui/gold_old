<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgentSalaryWithdrawalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agent_salary_withdrawals', function (Blueprint $table) {
            $table->id();
            $table->string('agent_id',50);
            $table->integer('year_number')->nullable(false);
            $table->integer('month_number')->nullable(false);
            $table->integer('amount')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('agent_salary_withdrawals');
    }
}
