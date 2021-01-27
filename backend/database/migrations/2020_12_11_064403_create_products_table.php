<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->mediumText('name');
            $table->text('description');
            $table->integer('quantity')->unsigned();
            $table->string('status')->default("invalid");
            $table->boolean('new')->default(true);
            $table->text('image')->nullable();
            $table->text('deliverytime')->nullable();
            $table->boolean('returnable')->default(false);
            $table->integer('seller_id')->unsigned();
            $table->integer('category_id')->unsigned();
            $table->integer('store_id')->unsigned();
            $table->integer('rate')->default(2.5);
            $table->integer('price');
            $table->timestamps();

            $table->foreign('seller_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
