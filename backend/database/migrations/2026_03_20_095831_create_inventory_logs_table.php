<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventory_logs', function (Blueprint $table) {
            $table->id();
            // Liên kết với bảng products
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity_added');
            $table->decimal('import_price', 15, 2)->nullable(); // Giá nhập từ form của bạn
            $table->string('status')->default('Thành công');
            $table->timestamps(); // Sẽ dùng để hiển thị cột "Thời gian"
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_logs');
    }
};
