<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VistasController extends Controller
{
    public function showLoginForm(){
        return view('proyecto.login');
    }

    public function showRegisterForm(){
        return view('proyecto.register');
    }
}
