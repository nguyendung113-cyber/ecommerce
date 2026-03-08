import AdminLayout from "./layouts/AdminLayout";
import ProductPage from "./pages/ProductPage"; // Đảm bảo đường dẫn này đúng với cấu trúc thư mục của bạn

function App() {
  return (
    <AdminLayout>
      <ProductPage />
    </AdminLayout>
  );
}

export default App;
