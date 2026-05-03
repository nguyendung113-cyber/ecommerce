<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'category_id' => 1,
                'name' => 'Laptop Gaming MSI Katana 15 B13VEK-252VN',
                'price' => 24990000,
                'stock' => 10,
                'specs' => ['CPU' => 'i7-13620H', 'VGA' => 'RTX 4050 6GB', 'RAM' => '16GB', 'SSD' => '512GB'],
                'image' => 'https://example.com/msi.jpg'
            ],
            [
                'category_id' => 2,
                'name' => 'CPU Intel Core i9-14900K',
                'price' => 15500000,
                'stock' => 20,
                'specs' => ['Socket' => 'LGA 1700', 'Cores' => '24', 'Threads' => '32'],
                'image' => 'https://example.com/i9.jpg'
            ],
            [
                'category_id' => 3,
                'name' => 'VGA ASUS ROG Strix RTX 4090 OC Edition',
                'price' => 56990000,
                'stock' => 5,
                'specs' => ['Memory' => '24GB GDDR6X', 'Clock' => '2640 MHz'],
                'image' => 'https://example.com/rtx4090.jpg'
            ],
            [
                'category_id' => 5,
                'name' => 'RAM Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
                'price' => 3500000,
                'stock' => 50,
                'specs' => ['Type' => 'DDR5', 'Speed' => '6000MHz', 'Capacity' => '32GB'],
                'image' => 'https://example.com/ram.jpg'
            ]
        ];

        foreach ($products as $prod) {
            Product::create([
                'category_id' => $prod['category_id'],
                'name' => $prod['name'],
                'slug' => Str::slug($prod['name']),
                'price' => $prod['price'],
                'stock' => $prod['stock'],
                'specs' => $prod['specs'],
                'image' => $prod['image']
            ]);
        }
    }
}
