<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Date;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $users = [
            ['nombre' => 'BBVA', 'datos' => '4'],
            ['nombre' => 'CaixaBank', 'datos' => '4'],
            ['nombre' => 'Cellnex', 'datos' => '4'],
            ['nombre' => 'Ferrovial', 'datos' => '4'],
            ['nombre' => 'Iberdrola', 'datos' => '4'],
            ['nombre' => 'Inditex', 'datos' => '4'],
            ['nombre' => 'Naturgy', 'datos' => '4'],
            ['nombre' => 'Repsol', 'datos' => '4'],
            ['nombre' => 'Santander', 'datos' => '4'],
            ['nombre' => 'Telefonica', 'datos' => '4']
        ];

        $ini = [
            ['id' => 1, 'datos' => 0 ,'fecha'=>null],
            ['id' => 2, 'datos' => 0 ,'fecha'=>null],
            ['id' => 3, 'datos' => 0 ,'fecha'=>null],
            ['id' => 4, 'datos' => 0 ,'fecha'=>null],
            ['id' => 5, 'datos' => 0 ,'fecha'=>null],
            ['id' => 6, 'datos' => 0 ,'fecha'=>null],
            ['id' => 7, 'datos' => 0 ,'fecha'=>null],
            ['id' => 8, 'datos' => 0 ,'fecha'=>null],
            ['id' => 9, 'datos' => 0 ,'fecha'=>null],
            ['id' => 10, 'datos' => 0 ,'fecha'=>null],
            
        ];
        
        DB::table('empresas')->insert($users);
        DB::table('actuales')->insert($ini);

    }
}
