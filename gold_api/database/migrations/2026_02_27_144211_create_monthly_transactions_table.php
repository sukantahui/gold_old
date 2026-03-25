<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMonthlyTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monthly_transactions', function (Blueprint $table) {
            $table->id();


            $table->unsignedBigInteger('transaction_particular_id');

            $table->decimal('value', 14, 3)->default(0);
            $table->decimal('fine', 14, 3)->default(0);
            $table->decimal('cash', 15, 2)->default(0);

            $table->integer('rm_id');
            $table->text('comment')->nullable();

            $table->date('tr_date');
            $table->integer('tr_type'); //1, 0 or -1

            $table->integer('record_year');
            $table->integer('record_month');
            $table->integer('order_no')->comment("only to maintain the order");
            $table->timestamps();

            $table->foreign('transaction_particular_id')
                ->references('id')
                ->on('transaction_particulars')
                ->onDelete('cascade')
                ->onUpdate('restrict');
            // 🔥 Optional but VERY Recommended
            $table->index(['record_year', 'record_month']);
            // Prevent duplicate month entries per particular + rm_id
            $table->unique(
                ['transaction_particular_id','rm_id' ,'record_year', 'record_month'],
                'unique_monthly_transaction'
            );
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('monthly_transactions');
    }
}
