<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('empresa', function (Request $request) {
        abort_unless(
            $request->user()->accountTypes()->where('type', 'company')->exists(),
            403,
        );

        return Inertia::render('company/settings');
    })->name('company.settings');
});

require __DIR__.'/settings.php';
