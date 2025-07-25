<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGpTransactionTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gp_transaction_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('transaction_type_name', 200);
            $table->integer('transaction_type_value')->nullable(false);
            $table->boolean('inforced')->default(true);
            $table->timestamps(); // creates 'created_at' and 'updated_at' columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gp_transaction_types');
    }
}
