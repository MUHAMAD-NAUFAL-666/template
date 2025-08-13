<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Meja;

class MejaController extends Controller
{
    public function index()
    {
        $mejas = Meja::orderBy('nomor_meja')->get();
        return Inertia::render('meja', [
            'mejas' => $mejas
        ]);
    }
}