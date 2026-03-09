import "./Header.css";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

const Header = () => {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Tổng quan", icon: "📊" },
    { id: "products", label: "Quản lý sản phẩm", icon: "🖥️" },
    { id: "inventory", label: "Nhập kho PC", icon: "📦" },
    { id: "settings", label: "Cài đặt", icon: "⚙️" },
  ];
  return (
    <header className="dashboard-header">
      <div className="header-left">
        {menuItems.map((items) => (
          <h3>{items.label}</h3>
        ))}
      </div>

      <div className="header-right">
        <div className="user-info">
          <span className="user-name">Developer Admin</span>
          <div className="user-avatar">AD</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
