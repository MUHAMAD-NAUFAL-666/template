<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::all();
        return Inertia::render('MenuPages', [
            'menus' => $menus
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_menu' => 'required|string|max:255',
            'deskripsi' => 'required',
            'kategori_id' => 'required|exists:kategoris,id_kategori',
            'harga' => 'required|numeric',
            'stok' => 'required|integer',
            'gambar' => 'required|image|mimes:jpg,jpeg,png',
            'ukuran' => 'required|in:kecil,sedang,besar',
            'status' => 'required|in:tersedia,tidak tersedia'
        ]);

        $gambarPath = $request->file('gambar')->store('images', 'public');

        Menu::create([
            'nama_menu' => $request->nama_menu,
            'deskripsi' => $request->deskripsi,
            'kategori_id' => $request->kategori_id,
            'harga' => $request->harga,
            'stok' => $request->stok,
            'gambar' => $gambarPath,
            'ukuran' => $request->ukuran,
            'status' => $request->status,
        ]);

        return redirect()->route('menus.index');
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $data = $request->validate([
            'nama_menu' => 'required|string|max:255',
            'deskripsi' => 'required',
            'kategori_id' => 'required|exists:kategoris,id_kategori',
            'harga' => 'required|numeric',
            'stok' => 'required|integer',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png',
            'ukuran' => 'required|in:kecil,sedang,besar',
            'status' => 'required|in:tersedia,tidak tersedia'
        ]);

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('images', 'public');
        }

        $menu->update($data);

        return redirect()->route('menus.index');
    }

    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();
        return redirect()->route('menus.index');
    }
}
