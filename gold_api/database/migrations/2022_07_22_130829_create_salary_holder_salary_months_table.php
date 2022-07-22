<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalaryHolderSalaryMonthsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salary_holder_salary_months', function (Blueprint $table) {
            $table->id();
            $table->integer('year_number')->nullable(false);
            $table->integer('month_number')->nullable(false);
            $table->tinyInteger('is_done')->nullable(false)->default(0);
            $table->unique(["year_number", "month_number"], 'year_month_unique');
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
        Schema::table('salary_holder_salary_months', function (Blueprint $table) {
            $table->dropUnique('year_month_unique');
        });
        Schema::dropIfExists('salary_holder_salary_months');
    }
}
