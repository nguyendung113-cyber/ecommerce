<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // For admin, we might want to return all products even if out of stock, ordered by latest
        return response()->json(Product::with('category')->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin' && $request->user()->role !== 'sales') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'specs' => 'nullable|array',
            'image' => 'nullable|image|max:2048' // max 2MB
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . time();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $product = Product::create($validated);

        return response()->json([
            'message' => 'Tạo sản phẩm thành công',
            'product' => $product
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Product::with('category')->findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if ($request->user()->role !== 'admin' && $request->user()->role !== 'sales') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'specs' => 'nullable|array',
            'image' => 'nullable|image|max:2048'
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']) . '-' . time();
        }

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image && str_starts_with($product->image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $product->image));
            }
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $product->update($validated);

        return response()->json([
            'message' => 'Cập nhật sản phẩm thành công',
            'product' => $product
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Chỉ Admin mới có quyền xóa sản phẩm'], 403);
        }

        $product = Product::findOrFail($id);
        
        if ($product->image && str_starts_with($product->image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $product->image));
        }

        $product->delete();

        return response()->json(['message' => 'Xóa sản phẩm thành công']);
    }
}
