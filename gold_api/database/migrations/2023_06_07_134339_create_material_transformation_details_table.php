<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaterialTransformationDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('material_transformation_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('mtm_id')->unsigned()->index()->nullable();
            $table->foreign('mtm_id')->references('id')->on('material_transformation_masters')->onDelete('cascade');
            $table->integer('rm_id');
            $table->double('rm_value');
            $table->integer('tr_type');
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
        Schema::dropIfExists('material_transformation_details');
    }
}
