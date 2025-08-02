<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_transaksis', function (Blueprint $table) {
            $table->id("id_detail");
            $table->unsignedBigInteger('transaksi_id');
            $table->unsignedBigInteger('menu_id');
            $table->integer('jumlah');
            $table->decimal('total_harga', 10, 2);
            $table->timestamps();

            $table->foreign('transaksi_id')->references('id_transaksi')->on('transaksis')->onDelete('cascade');
            $table->foreign('menu_id')->references('id_menu')->on('menus')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_transaksis');
    }
};
