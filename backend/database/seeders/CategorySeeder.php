<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Laptop Gaming',
            'CPU - Bộ vi xử lý',
            'VGA - Card màn hình',
            'Mainboard - Bo mạch chủ',
            'RAM - Bộ nhớ trong',
            'Ổ cứng SSD/HDD',
            'Nguồn máy tính (PSU)',
            'Vỏ case'
        ];

        foreach ($categories as $cat) {
            Category::create([
                'name' => $cat,
                'slug' => Str::slug($cat)
            ]);
        }
    }
}
