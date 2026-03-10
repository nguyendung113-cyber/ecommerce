import "./Sidebar.css";
import logoPcMaster from "../../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  isImage?: boolean;
}

function Sidebar() {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Tổng quan", icon: "https://img.icons8.com/ios-filled/50/home.png", isImage: true, path: "/" },
    { id: "products", label: "Quản lý sản phẩm", icon: "https://img.icons8.com/ios-filled/50/fast-moving-consumer-goods.png", isImage: true, path: "/products" },
    { id: "inventory", label: "Nhập kho PC",  icon: "https://img.icons8.com/ios-filled/50/warehouse-1.png", isImage: true, path: "/inventory" },
    { id: "settings", label: "Cài đặt", icon: "https://img.icons8.com/ios-filled/500/settings.png", isImage: true, path: "/settings" },
    { id: "support", label: "Hỗ trợ", icon: "https://img.icons8.com/ios-glyphs/30/customer-support.png", isImage: true, path: "/support" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logoPcMaster} alt="PCMASTER Logo" />
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.id} className="menu-items">
            <NavLink to={item.path} className={({ isActive }) => isActive ? "btn-sidebar active" : "btn-sidebar"}>
              <span className="menu-icon">
                {item.isImage ? (
                  <img src={item.icon} width="20" height="20" alt={item.label} />
                ) : (
                  item.icon
                )}
              </span>
              <span className="menu_label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;