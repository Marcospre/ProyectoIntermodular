<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VistasController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
// Route::get('/proyecto', [App\Http\Controllers\AuthController::class, 'index'])->name('proyecto');
// Route::get('login', [VistasController::class,'showLoginForm']);
// Route::post('login', 'App\Http\Controllers\AuthController@login')->name('user.autentificar');
// Route::get('/register', [VistasController::class,'showRegisterForm']);
// Route::post('/register', 'App\Http\Controllers\AuthController@register')->name('user.registrar');
// // Route::post('/logout', 'App\Http\Controllers\AuthController@logout');