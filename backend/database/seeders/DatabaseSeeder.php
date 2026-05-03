<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin PC Master',
            'email' => 'admin@pcmaster.com',
            'password' => \Illuminate\Support\Facades\Hash::make('Anhdung001'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Sales Staff',
            'email' => 'sales@pcmaster.com',
            'password' => \Illuminate\Support\Facades\Hash::make('Anhdung001'),
            'role' => 'sales',
        ]);

        User::factory()->create([
            'name' => 'Normal User',
            'email' => 'user@gmail.com',
            'password' => \Illuminate\Support\Facades\Hash::make('Anhdung001'),
            'role' => 'user',
        ]);
    }
}
