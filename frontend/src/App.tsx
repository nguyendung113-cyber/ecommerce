import { Routes, Route } from "react-router-dom"; // Import các component điều hướng
import AdminLayout from "./layouts/AdminLayout";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <AdminLayout>
      <Routes>
        {/* Trang chủ hoặc trang sản phẩm */}
        <Route path="/" element={<ProductPage />} />
        <Route path="/products" element={<ProductPage />} />

        {/* Trang nhập kho */}
        <Route path="/inventory" element={<InventoryPage />} />
        
        {/* Bạn có thể thêm các route khác như /settings, /support ở đây */}
      </Routes>
    </AdminLayout>
  );
}

export default App;