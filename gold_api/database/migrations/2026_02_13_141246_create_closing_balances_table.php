<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClosingBalancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('closing_balances', function (Blueprint $table) {
            // Primary key (auto increment ID)
            $table->id();

            // Foreign key reference to rm_master table (rm_ID)
            // identifies which raw material this balance belongs to
            $table->unsignedInteger('rm_id')
                ->comment('Reference to rm_master.rm_ID');

            // Month for which this closing balance is recorded (1–12)
            $table->integer('closing_balance_month')
                ->check('closing_balance_month >= 1 AND closing_balance_month <= 12')
                ->comment('Closing balance month');

            // Year for which this closing balance is recorded (e.g. 2026)
            $table->integer('closing_balance_year')
                ->comment('Closing balance year');

            // this is next moth of the current year or first month of the next year if closing_balance_month is the last month
            $table->integer('opening_balance_month')
                ->comment('Opening balance month');

            // this is year depends on closing balance month
            $table->integer('opening_balance_year')
                ->comment('Opening balance year');

            // Final calculated closing balance amount
            // use precision and scale for accuracy
            $table->decimal('balance', 15, 4)->default(0)
                ->comment('Final closing balance amount');

            // created_at and updated_at timestamps
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
        Schema::dropIfExists('closing_balances');
    }
}
