<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Product::create([
            'category_id' => 1, // Đảm bảo ID này đã tồn tại trong bảng categories
            'name' => 'Laptop Gaming MSI Katana',
            'slug' => 'msi-katana-15',
            'price' => 25000000,
            'stock' => 5,
            'specs' => json_encode(['CPU' => 'i7-13620H', 'VGA' => 'RTX 4050']),
        ]);
    }
}
