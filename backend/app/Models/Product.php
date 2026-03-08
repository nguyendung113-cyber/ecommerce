<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    // Cho phép nạp dữ liệu hàng loạt (Mass Assignment)
    protected $fillable = ['category_id', 'name', 'slug', 'price', 'stock', 'specs', 'image'];

    protected $casts = [
    'specs' => 'array',
    'price' => 'float',
];
    // Khai báo mối quan hệ: Một sản phẩm thuộc về một danh mục
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}