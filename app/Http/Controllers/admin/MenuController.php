<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    //
    public function index()
    {
        $menus = Menu::all();

        return inertia('menupages', [
            'menus' => $menus
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/menucreate');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_menu' => 'required|string|max:255',
            'harga' => 'required|numeric',
            'kategori_id' => 'nullable|exists:kategoris,id',
            'deskripsi' => 'nullable|string',
            'stok' => 'required|integer|min:0',
            'status' => 'required|in:tersedia,tidak tersedia',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('menus', 'public');
        }

        Menu::create($data);
        return redirect()->route('admin.menu.index');
    }

    public function edit($id)
    {
        $menu = Menu::findOrFail($id);
        return Inertia::render('Admin/MenuEdit', [
            'menu' => $menu
        ]);
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);
        $data = $request->validate([
            'nama_menu' => 'required|string|max:255',
            'harga' => 'required|numeric',
            'kategori_id' => 'nullable|exists:kategoris,id',
            'deskripsi' => 'nullable|string',
            'stok' => 'required|integer|min:0',
            'status' => 'required|in:tersedia,tidak tersedia',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            if ($menu->gambar) {
                Storage::disk('public')->delete($menu->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('menus', 'public');
        }

        $menu->update($data);
        return redirect()->route('admin.menu.index');
    }

    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        if ($menu->gambar) {
            Storage::disk('public')->delete($menu->gambar);
        }
        $menu->delete();
        return redirect()->back();
    }
}
