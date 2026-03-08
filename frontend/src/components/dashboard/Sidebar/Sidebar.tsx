import "./Sidebar.css";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

function Sidebar() {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Tổng quan", icon: "📊" },
    { id: "products", label: "Quản lý sản phẩm", icon: "🖥️" },
    { id: "inventory", label: "Nhập kho PC", icon: "📦" },
    { id: "settings", label: "Cài đặt", icon: "⚙️" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">PC MASTER</div>
      <p>Main Menu</p>
      <ul className="sidebar-menu">
        {menuItems.map((items) => (
          <li key={items.id} className="menu-items">
            <button className="btn-sidebar">
              <span className="menu-icon">{items.icon}</span>
              <span>{items.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
