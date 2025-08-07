<?php

namespace App\Http\Controllers;

use App\Models\bahan_baku;
use App\Models\detail_transaksi;
use App\Models\Pelanggan;
use App\Models\Kategori;
use App\Models\Menu;
use App\Models\Pegawai;
use App\Models\BahanBaku;
use App\Models\Meja;
use App\Models\Transaksi;
use App\Models\DetailTransaksi;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'pelanggans' => Pelanggan::count(),
            'kategoris' => Kategori::count(),
            'menus' => Menu::count(),
            'pegawais' => Pegawai::count(),
            'bahanBakus' => bahan_baku::count(),
            'mejas' => Meja::count(),
            'transaksis' => Transaksi::count(),
            'detailTransaksis' => detail_transaksi::count(),
            
        ]);
    }
}
