<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meja extends Model
{
    protected $table = 'mejas';
    protected $primaryKey = 'id_meja';
    protected $fillable = [
        'nomor_meja',
        'kapasitas',
        'status'
    ];
}
