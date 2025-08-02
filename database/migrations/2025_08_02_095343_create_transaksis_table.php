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
        Schema::create('transaksis', function (Blueprint $table) {
           $table->id("id_transaksi");
            $table->unsignedBigInteger('pelanggan_id');
            $table->unsignedBigInteger("meja_id");
            $table->decimal('total_harga', 10, 2);
            $table->enum('status', ['belom dibayar', 'sudah dibayar', 'batal'])->default('belom dibayar');
            $table->enum('metode_pembayaran' ,["debit","cash"]);
            $table->timestamps();

            $table->foreign('pelanggan_id')->references('id_pelanggan')->on('pelanggans')->onDelete('cascade');
            $table->foreign('meja_id')->references('id_meja')->on('mejas')->onDelete('cascade');
        });
  
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksis');
    }
};
