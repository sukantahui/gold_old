<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaterialDayBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('material_day_books', function (Blueprint $table) {
            $table->id();
            $table->integer('raw_material_id');
            $table->integer('material_sender_employee_id');
            $table->integer('material_receiver_employee_id');
            $table->decimal('material_value');
            $table->integer('transaction_type_id');
            $table->string('voucher_number');
            $table->string('description',255);
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
        Schema::dropIfExists('material_day_books');
    }
}
