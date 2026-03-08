// src/layouts/AdminLayout.tsx
import Sidebar from "../components/dashboard/Sidebar/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "20px", backgroundColor: "#f8fafc" }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
