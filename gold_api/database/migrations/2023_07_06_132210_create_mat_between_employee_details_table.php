<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatBetweenEmployeeDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mat_between_employee_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('mat_between_employee_id')->unsigned()->index()->nullable();
            $table->foreign('mat_between_employee_id')->references('id')->on('mat_between_employee_masters')->onDelete('cascade');
            $table->integer('employee_id')->nullable(false);
            $table->foreign('employee_id')->references('emp_id')->on('employees')->onDelete('cascade');
            $table->integer('rm_id')->nullable(false);;
            $table->foreign('rm_id')->references('rm_ID')->on('rm_master')->onDelete('cascade');
            $table->double('outward')->nullable(false)->default(0);
            $table->double('inward')->nullable(false)->default(0);
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
        Schema::dropIfExists('mat_between_employee_details');
    }
}
