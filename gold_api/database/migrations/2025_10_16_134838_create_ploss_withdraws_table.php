<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlossWithdrawsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ploss_withdraws', function (Blueprint $table) {
            $table->id()->comment('Primary key');
            $table->integer('payer_id')
                ->comment('Employee ID who paid (from employees.emp_id)');

            $table->integer('payee_id')
                ->default(28)
                ->comment('Employee ID who received payment, defaults to 28');
            $table->foreign('payer_id')
                ->references('emp_id')
                ->on('employees')
                ->onDelete('cascade');

            $table->foreign('payee_id')
                ->references('emp_id')
                ->on('employees')
                ->onDelete('cascade');

            $table->integer('rm_id')
                ->default(36)
                ->comment('default material is pure gold');

            $table->foreign('rm_id')
                ->references('rm_ID')
                ->on('rm_master')
                ->onDelete('cascade');

            $table->decimal('rm_quantity',10,3)
                ->nullable(false)
                ->comment('Quantity of RM withdrawn');
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
        Schema::dropIfExists('ploss_withdraws');
    }
}
