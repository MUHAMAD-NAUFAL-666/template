<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Pegawai extends Authenticatable
{
    use Notifiable;

    protected $primaryKey = 'id_pegawai';

    protected $fillable = [
        'nama_pegawai',
        'alamat',
        'no_hp',
        'jobdesk',
        'password',
        'email',
    ];

    protected $hidden = [
        'password',
    ];
}
