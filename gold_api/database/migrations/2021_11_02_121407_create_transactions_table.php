<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            $table->date('transaction_date')->nullable(false);
            $table->string('transaction_number',20)->nullable(false);

            $table->foreignId('ledger_id')->nullable(false)->references('id')->on('ledgers')->onDelete('cascade');
            $table->foreignId('asset_id')->nullable(false)->references('id')->on('assets')->onDelete('cascade');
            $table->foreignId('voucher_id')->nullable(false)->references('id')->on('vouchers')->onDelete('cascade');

            $table->string('voucher_number')->nullable(true);
            $table->string('particulars')->nullable(true);

            $table->foreignId('user_id')->nullable(false)->references('id')->on('users')->onDelete('cascade');

            $table->decimal('amount');

            $table->tinyInteger('inforce')->default(1);
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
        Schema::dropIfExists('transactions');
    }
}
