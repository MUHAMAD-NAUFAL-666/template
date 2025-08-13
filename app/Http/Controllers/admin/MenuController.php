<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
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
}
