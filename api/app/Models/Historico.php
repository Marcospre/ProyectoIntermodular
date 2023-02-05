<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historico extends Model
{
    use HasFactory;

    public $timestamps = false;
   protected $table = 'historial_empresas';

   public static function datos($id) {
        return self::where('id_empresa', $id)->orderBy('fecha', 'asc')->get();
    }
}
