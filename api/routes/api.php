<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/empresas', 'App\Http\Controllers\EmpresaController@index'); //mostrar todas la cotizaciones
Route::get('/empresas/{id}', 'App\Http\Controllers\EmpresaController@show'); //muestra una cotizacion
Route::post('/empresas', 'App\Http\Controllers\EmpresaController@store');//crear una empresa
Route::put('/empresas/{id}', 'App\Http\Controllers\EmpresaController@update');//actualizar los datos de una empresa
Route::delete('/empresas/{id}', 'App\Http\Controllers\EmpresaController@destroy');//actualizar los datos de una empresa

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});