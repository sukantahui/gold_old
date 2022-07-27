<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalaryHolderSalaryPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salary_holder_salary_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('salary_holder_id')->references('id')->on('salary_holders')->onDelete('cascade');
            $table->integer('year_number');
            $table->integer('month_number');
            $table->integer('salary_paid')->default(0);
            $table->integer('advance_adjusted')->default(0);
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
        Schema::dropIfExists('salary_holder_salary_payments');
    }
}
