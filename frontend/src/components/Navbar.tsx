import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Navbar: React.FC = () => {
    const { getCartCount, toggleCart } = useCartStore();
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary-700 tracking-tight">
                            PC <span className="text-gray-900">MASTER</span>
                        </Link>
                    </div>
                    
                    <div className="hidden md:flex space-x-8">
                        <Link to="/products" className="text-gray-600 hover:text-primary-600 font-medium transition">Sản phẩm</Link>
                        <Link to="/categories" className="text-gray-600 hover:text-primary-600 font-medium transition">Danh mục</Link>
                        <Link to="/build-pc" className="text-gray-600 hover:text-primary-600 font-medium transition">Xây dựng PC</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-primary-600 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button onClick={toggleCart} className="p-2 text-gray-400 hover:text-primary-600 transition relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {getCartCount() > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>
                        <Link to="/login" className="bg-primary-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-700 transition">
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
