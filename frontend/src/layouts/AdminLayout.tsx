// src/layouts/AdminLayout.tsx
import Header from "../components/dashboard/Header/Header"; // Sửa lại path nếu bị dư .tsx
import Sidebar from "../components/dashboard/Sidebar/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar /> 
      <div className="main" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1, padding: "20px", backgroundColor: "#f8fafc" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;