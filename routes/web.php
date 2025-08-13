<?php

use App\Http\Controllers\admin\MenuController;
use App\Http\Controllers\MejaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

Route::get('/meja', [MejaController::class, 'index'])->name('meja');    

    Route::inertia('/menu', 'menupages')->name('menu');
    Route::get('/menu', [MenuController::class, 'index'])->name('admin.menu.index');

    Route::prefix('admin/menu')->name('admin.menu.')->group(function () {
        Route::get('/', [MenuController::class, 'index'])->name('index');
        Route::get('/create', [MenuController::class, 'create'])->name('create');
        Route::post('/', [MenuController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [MenuController::class, 'edit'])->name('edit');
        Route::put('/{id}', [MenuController::class, 'update'])->name('update');
        Route::delete('/{id}', [MenuController::class, 'destroy'])->name('destroy');
    });
});


require __DIR__ . '/settings.php';

require __DIR__ . '/auth.php';