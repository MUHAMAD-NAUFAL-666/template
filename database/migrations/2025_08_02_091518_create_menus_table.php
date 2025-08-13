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
        Schema::create('menus', function (Blueprint $table) {
            $table->id("id_menu");
            $table->string('nama_menu');
            $table->text('deskripsi');
            $table->unsignedBigInteger('kategori_id')->nullable();
            $table->decimal('harga', 10, 2);
            $table->integer('stok');
            $table->string("gambar");
            $table->enum('ukuran', ['kecil', 'sedang', 'besar'])->default('besar'); // Tambahkan kolom status()
            $table->enum('status', ['tersedia', 'tidak tersedia'])->default('tersedia');
            $table->timestamps();

            $table->foreign('kategori_id')->references('id_kategori')->on('kategoris')->onDelete('cascade');
        });
    }   

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
