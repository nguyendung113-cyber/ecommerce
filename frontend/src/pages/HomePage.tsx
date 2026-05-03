import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import type { Product } from '../types/index';
import Button from '../components/Button';
import { useCartStore } from '../store/cartStore';

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        api.get('/products')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <header className="mb-20 text-center space-y-4">
                <h1 className="text-5xl font-black text-secondary tracking-tight sm:text-6xl">
                    PC <span className="text-primary">MASTER</span> CORE
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
                    Giải pháp linh kiện máy tính cao cấp cho game thủ và chuyên gia.
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden group">
                        <div className="aspect-square bg-gray-50 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase">
                                New Arrival
                            </div>
                        </div>
                        <div className="p-8">
                            <p className="text-[10px] text-primary font-black mb-2 uppercase tracking-[0.2em]">
                                {product.category?.name || 'Component'}
                            </p>
                            <h3 className="text-lg font-bold text-secondary mb-4 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                                {product.name}
                            </h3>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-2xl font-black text-secondary">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                </span>
                                <Button 
                                    variant="primary" 
                                    className="!p-3 !rounded-xl"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addItem(product);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
