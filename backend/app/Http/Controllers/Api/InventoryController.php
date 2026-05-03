<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'price' => 'nullable|numeric'
        ]);

        // Tìm sản phẩm theo tên chính xác
        $product = Product::where('name', $request->name)->first();

        if ($product) {
            DB::transaction(function () use ($product, $request) {
                // 1. Tăng tồn kho thực tế
                $product->increment('stock', $request->quantity);

                // 2. Ghi nhật ký vào database
                DB::table('inventory_logs')->insert([
                    'product_id' => $product->id,
                    'quantity_added' => $request->quantity,
                    'import_price' => $request->price,
                    'status' => 'Thành công',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            });

            return response()->json([
                'status' => 'success',
                'message' => "Đã nhập kho thành công cho {$product->name}"
            ], 200);
        }

        return response()->json(['status' => 'error', 'message' => 'Linh kiện không tồn tại!'], 404);
    }
}
