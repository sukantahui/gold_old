<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateGpTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gp_transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('transaction_date');
            $table->double('gp_value');
            $table->unsignedBigInteger('gp_transaction_type_id');
            $table->string('comment', 100)->default('GP Used');
            $table->timestamps();

            $table->foreign('gp_transaction_type_id')
                ->references('id')
                ->on('gp_transaction_types')
                ->onDelete('cascade')
                ->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gp_transactions');
    }
}
