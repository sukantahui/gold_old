<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSaleReturnsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sale_returns', function (Blueprint $table) {
            $table->id();
            $table->string('tag');
            $table->string('model_no');
            $table->string('model_size');
            $table->double('gini_gold');
            $table->double('fine_gold');
            $table->double('gross_weight')->default(0);
            $table->integer('qty');
            $table->integer('lc');
            $table->integer('year_number');
            $table->integer('month_number');

            $table->string('agent_id',50)->charset('utf8')->collation('utf8_general_ci');
            $table->foreign('agent_id')->references('agent_id')->on('agent_master');
            $table->string('customer_id')->charset('utf8')->collation('utf8_general_ci');
            $table->foreign('customer_id')->references('cust_id')->on('customer_master');
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
        Schema::dropIfExists('sale_returns');
    }
}
