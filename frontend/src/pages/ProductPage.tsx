import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import type { Product } from "../types/product";
import { useCartStore } from "../store/cartStore";

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Quản lý linh kiện PC</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #eee",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: "1.2rem" }}>
                {product.name}
              </h3>
              <p
                style={{
                  color: "#d32f2f",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Giá: {new Intl.NumberFormat("vi-VN").format(product.price)}đ
              </p>
              <p style={{ color: "#555" }}>
                📂 Danh mục: {product.category?.name || "N/A"}
              </p>
              <p style={{ color: product.stock > 0 ? "#2e7d32" : "#c62828" }}>
                📦 Kho:{" "}
                {product.stock > 0 ? `${product.stock} cái` : "Hết hàng"}
              </p>
              {product.specs && (
                <div
                  style={{
                    fontSize: "0.85rem",
                    background: "#f9f9f9",
                    padding: "8px",
                    borderRadius: "5px",
                  }}
                >
                  <strong>Thông số:</strong> {JSON.stringify(product.specs)}
                </div>
              )}
              <button 
                onClick={() => addItem(product as any)}
                style={{
                  marginTop: "15px",
                  padding: "8px 16px",
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "100%"
                }}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào. Hãy kiểm tra Database hoặc Seeder.</p>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
