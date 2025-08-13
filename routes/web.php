<?php

use App\Http\Controllers\admin\MenuController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    

    Route::inertia('/menu', 'menupages')->name('menu');
  Route::get('/menu', [MenuController::class, 'index'])->name('admin.menu.index');
});


require __DIR__.'/settings.php';

require __DIR__.'/auth.php';
