<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\StoreOrderRequest;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)->with('items.product')->latest()->get();
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        try {
            DB::beginTransaction();

            $totalPrice = 0;
            foreach ($request->items as $item) {
                $totalPrice += ($item['price'] * $item['quantity']);
                
                // Trừ tồn kho
                $product = Product::findOrFail($item['product_id']);
                if ($product->stock < $item['quantity']) {
                    return response()->json([
                        'message' => 'Sản phẩm ' . $product->name . ' không đủ số lượng trong kho.'
                    ], 400);
                }
                $product->stock -= $item['quantity'];
                $product->save();
            }

            $order = Order::create([
                'user_id' => $request->user()->id,
                'total_price' => $totalPrice,
                'status' => 'pending',
                'address' => $request->address,
                'phone' => $request->phone,
            ]);

            foreach ($request->items as $item) {
                $order->items()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Đặt hàng thành công',
                'order' => $order->load('items')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi xảy ra khi đặt hàng',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with('items.product')->findOrFail($id);
        
        // Ensure user can only view their own orders unless they are admin
        if (request()->user()->id !== $order->user_id && request()->user()->role === 'user') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        return response()->json($order);
    }
}
