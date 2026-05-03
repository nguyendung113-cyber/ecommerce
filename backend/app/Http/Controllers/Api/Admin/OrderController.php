<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin' && $request->user()->role !== 'sales') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Get all orders with users
        $orders = Order::with('user', 'items.product')->latest()->get();
        return response()->json($orders);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        if ($request->user()->role !== 'admin' && $request->user()->role !== 'sales') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json(Order::with('user', 'items.product')->findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if ($request->user()->role !== 'admin' && $request->user()->role !== 'sales') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled'
        ]);

        $order->update($validated);

        return response()->json([
            'message' => 'Cập nhật trạng thái thành công',
            'order' => $order
        ]);
    }
}
