// src/layouts/AdminLayout.tsx
import Header from "../components/dashboard/Header.tsx/Header";
import Sidebar from "../components/dashboard/Sidebar/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ width: "80%", backgroundColor: "#f8fafc" }}>
        <Header />

        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
