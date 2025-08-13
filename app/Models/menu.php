<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $table = 'menus';
    protected $primaryKey = 'id_menu';

    protected $fillable = [
        'nama_menu',
        'deskripsi',
        'kategori_id',
        'harga',
        'stok',
        'gambar',
        'ukuran',
        'status',
    ];
}
