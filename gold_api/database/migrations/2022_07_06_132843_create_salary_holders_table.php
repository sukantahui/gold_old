<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalaryHoldersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salary_holders', function (Blueprint $table) {
            $table->id();
            $table->string('salary_holder_name',200)->unique();
            $table->string('salary_holder_mailing_name',200);
            $table->integer('salary')->default(0);
            $table->integer('advance')->default(0);
            $table->tinyInteger('inforced')->default(1);
            $table->tinyInteger('show_in_salary_list')->default(1);
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
        Schema::dropIfExists('salary_holders');
    }
}
