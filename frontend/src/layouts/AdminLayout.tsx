import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const menuItems = [
        { name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: '/admin' },
        { name: 'Sản phẩm', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', path: '/admin/products' },
        { name: 'Đơn hàng', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', path: '/admin/orders' },
        { name: 'Khách hàng', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', path: '/admin/customers' },
        { name: 'Cài đặt', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', path: '/admin/settings' },
    ];

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#F8F9FB] flex font-sans">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-gray-100 transition-all duration-300 flex flex-col z-20`}>
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-100">P</div>
                    {isSidebarOpen && <span className="text-xl font-black text-secondary tracking-tighter">PC MASTER</span>}
                </div>

                <nav className="flex-grow px-4 space-y-2 mt-4">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${isActive ? 'bg-primary text-white shadow-xl shadow-indigo-100' : 'text-gray-400 hover:bg-gray-50 hover:text-secondary'}`}
                            >
                                <svg className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                </svg>
                                {isSidebarOpen && <span className="font-bold text-sm">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-50">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-4 w-full text-red-400 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all group"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {isSidebarOpen && <span className="font-bold text-sm">Đăng xuất</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-24 bg-white border-b border-gray-100 px-10 flex items-center justify-between z-10">
                    <div className="relative w-96">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </span>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border-transparent rounded-2xl py-3 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-sm" 
                            placeholder="Tìm kiếm đơn hàng, sản phẩm..."
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-primary transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-4 border-l pl-6 border-gray-100">
                            <div className="text-right">
                                <p className="text-sm font-black text-secondary">{user.name}</p>
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{user.role}</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-primary font-black overflow-hidden shadow-inner border-2 border-white">
                                {user.name?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-grow overflow-y-auto p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;