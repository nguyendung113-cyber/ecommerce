import "./Header.css";
import { useLocation } from "react-router-dom";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  isImage?: boolean;
}

const Header = () => {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Tổng quan", icon: "https://img.icons8.com/ios-filled/50/home.png", isImage: true, path: "/" },
    { id: "products", label: "Quản lý sản phẩm", icon: "https://img.icons8.com/ios-filled/50/fast-moving-consumer-goods.png", isImage: true, path: "/products" },
    { id: "inventory", label: "Nhập kho PC",  icon: "https://img.icons8.com/ios-filled/50/warehouse-1.png", isImage: true, path: "/inventory" },
    { id: "settings", label: "Cài đặt", icon: "https://img.icons8.com/ios-filled/500/settings.png", isImage: true, path: "/settings" },
    { id: "support", label: "Hỗ trợ", icon: "https://img.icons8.com/ios-glyphs/30/customer-support.png", isImage: true, path: "/support" },
  ];

  const location = useLocation();

  const activeMenuItem = menuItems.find(item => item.path === location.pathname);

  return (
    <header className="dashboard-header">
      <div className="header-left">
          <h3>{activeMenuItem ? activeMenuItem.label : ""}</h3>
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
