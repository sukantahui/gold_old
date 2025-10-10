<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLcWithdrawnsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lc_withdrawns', function (Blueprint $table) {
            $table->id()->comment('Primary key');

            $table->integer('lc_value')
                ->comment('LC value withdrawn in integer amount');

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

            $table->timestamp('created_at')
                ->useCurrent()
                ->comment('Record creation time');

            $table->timestamp('updated_at')
                ->useCurrent()
                ->useCurrentOnUpdate()
                ->comment('Record last update time');
            // Add table comment
            $table->comment = 'Tracks LC withdrawal transactions between employees mainly by owner';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lc_withdrawns');
    }
}
