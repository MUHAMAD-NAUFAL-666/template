<?php
namespace App\Http\Controllers;

use App\Models\Meja;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MejaController extends Controller
{
    public function index()
    {
        $mejas = Meja::orderBy('nomor_meja')->get();
        return Inertia::render('meja', ['mejas' => $mejas]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nomor_meja' => 'required',
            'kapasitas' => 'required|integer',
            'status' => 'required'
        ]);

        Meja::create($request->all());
        return redirect()->route('meja');
    }

    public function destroy($id)
    {
        Meja::where('id_meja', $id)->delete();
        return redirect()->route('meja');
    }
}
