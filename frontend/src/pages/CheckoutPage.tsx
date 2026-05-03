import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import api from '../api/axios';

const CheckoutPage: React.FC = () => {
    const { items, getCartTotal, clearCart } = useCartStore();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (items.length === 0) {
            setError('Giỏ hàng của bạn đang trống.');
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            const payload = {
                ...formData,
                items: items.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            await api.post('/orders', payload);
            
            // Thành công
            clearCart();
            setIsSuccess(true);
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 401) {
                setError('Vui lòng đăng nhập để tiếp tục thanh toán.');
                // Optionally redirect to login:
                // navigate('/login');
            } else {
                setError(err.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-24 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h1 className="text-4xl font-black text-secondary mb-4">Đặt hàng thành công!</h1>
                <p className="text-gray-500 mb-8 font-medium text-lg">
                    Cảm ơn bạn đã mua sắm tại PC MASTER. Đơn hàng của bạn đang được xử lý và sẽ sớm giao đến bạn.
                </p>
                <div className="space-x-4">
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark hover:-translate-y-0.5 transition-all active:translate-y-0 shadow-lg shadow-primary/30"
                    >
                        Tiếp tục mua sắm
                    </button>
                    {/* Chức năng xem đơn hàng sẽ làm ở Phase 2, tạm thời ẩn đi hoặc cho điều hướng về dashboard */}
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-black text-secondary mb-4">Giỏ hàng của bạn đang trống</h2>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors"
                >
                    Tiếp tục mua sắm
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-black text-secondary mb-8">Thanh toán</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Order Form */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-secondary mb-6">Thông tin giao hàng</h2>
                    
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            <div>
                                <strong className="block font-bold mb-1">Không thể đặt hàng</strong>
                                {error}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên</label>
                            <input 
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Nhập họ và tên..."
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại</label>
                            <input 
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="Nhập số điện thoại..."
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Địa chỉ nhận hàng</label>
                            <textarea 
                                name="address"
                                required
                                rows={3}
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Nhập địa chỉ chi tiết..."
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark hover:-translate-y-0.5 transition-all active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-8 rounded-3xl h-fit">
                    <h2 className="text-xl font-bold text-secondary mb-6">Tóm tắt đơn hàng</h2>
                    
                    <div className="space-y-4 mb-6">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-center gap-4">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-secondary line-clamp-1">{item.name}</p>
                                    <p className="text-xs text-gray-500 font-medium mt-1">Số lượng: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-bold text-primary">
                                    ${(item.price * item.quantity).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Tạm tính</span>
                            <span className="font-medium">${getCartTotal().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Phí giao hàng</span>
                            <span className="font-medium">Miễn phí</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-200">
                            <span className="text-lg font-bold text-secondary">Tổng cộng</span>
                            <span className="text-2xl font-black text-primary">${getCartTotal().toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
