<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalaryHolderSalariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salary_holder_salaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('salary_holder_id')->references('id')->on('salary_holders')->onDelete('cascade');
            $table->integer('year_number');
            $table->integer('month_number');
            $table->integer('base_salary');
            $table->integer('hourly_rate')->default(0);
            $table->integer('monthly_deduction_amount')->default(0);
            $table->integer('hour_deduction')->default(0);
            $table->integer('hour_deduction_amount')->default(0);
            $table->integer('extra_pay')->default(0); //will be added
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
        Schema::dropIfExists('salary_holder_salaries');
    }
}
