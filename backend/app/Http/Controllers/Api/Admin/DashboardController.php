<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin' && $request->user()->role !== 'sales') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Thống kê cơ bản
        $totalRevenue = Order::where('status', '!=', 'cancelled')->sum('total_price');
        $totalOrders = Order::count();
        $totalCustomers = User::where('role', 'user')->count();

        // Giao dịch mới nhất
        $latestTransactions = Order::with('user', 'items.product')
            ->latest()
            ->take(5)
            ->get()
            ->map(function($order) {
                $productNames = $order->items->map(function($item) {
                    return $item->product ? $item->product->name : 'Unknown Product';
                })->implode(', ');

                return [
                    'id' => '#ORD' . str_pad($order->id, 4, '0', STR_PAD_LEFT),
                    'customer' => $order->user->name,
                    'product' => $productNames,
                    'date' => $order->created_at->diffForHumans(),
                    'amount' => '$' . number_format($order->total_price, 2),
                    'status' => $order->status,
                ];
            });

        // Because Product model doesn't have order items relation set up yet, 
        // we will fetch simple products list as top products for now
        $topProductsFallback = Product::with('category')->take(3)->get()->map(function($p) {
            return [
                'id' => $p->id,
                'name' => $p->name,
                'category' => $p->category ? $p->category->name : 'N/A',
                'price' => '$' . number_format($p->price, 2),
                'sold' => rand(10, 500) . ' pcs' // Fake sold count since we don't have aggregation yet
            ];
        });

        return response()->json([
            'stats' => [
                'revenue' => '$' . number_format($totalRevenue, 2),
                'orders' => $totalOrders,
                'customers' => $totalCustomers,
            ],
            'topProducts' => $topProductsFallback,
            'transactions' => $latestTransactions
        ]);
    }
}
