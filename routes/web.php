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
    

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/menu', [MenuController::class, 'index'])->name('menu.index');
        Route::get('/menu/create', [MenuController::class, 'create'])->name('menu.create');
        Route::post('/menu', [MenuController::class, 'store'])->name('menu.store');
        Route::get('/menu/{id}/edit', [MenuController::class, 'edit'])->name('menu.edit');
        Route::put('/menu/{id}', [MenuController::class, 'update'])->name('menu.update');
        Route::delete('/menu/{id}', [MenuController::class, 'destroy'])->name('menu.destroy');
    });
});


require __DIR__.'/settings.php';

require __DIR__.'/auth.php';
