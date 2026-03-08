<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run() {
        \App\Models\Category::create(['name' => 'Laptop', 'slug' => 'laptop']);
        \App\Models\Category::create(['name' => 'PC Gaming', 'slug' => 'pc-gaming']);
        \App\Models\Category::create(['name' => 'Tay cầm', 'slug' => 'tay-cam']);
    }
}
