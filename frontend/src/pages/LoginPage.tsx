import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Button from '../components/Button';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const res = await api.post('/login', { email, password });
            localStorage.setItem('auth_token', res.data.access_token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            if (res.data.user.role === 'admin' || res.data.user.role === 'sales') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Email hoặc mật khẩu không chính xác.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-secondary tracking-tighter mb-2">
                        PC <span className="text-primary font-black">MASTER</span>
                    </h1>
                    <p className="text-gray-400 font-medium tracking-tight">Chào mừng bạn quay trở lại</p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-bold border border-red-100 text-center">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1 transition-colors group-focus-within:text-primary">Email Address</label>
                            <input
                                type="email"
                                required
                                className="block w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:ring-0 focus:border-primary transition-all duration-200 text-gray-900 placeholder-gray-400 font-medium"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1 transition-colors group-focus-within:text-primary">Password</label>
                            <input
                                type="password"
                                required
                                className="block w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:ring-0 focus:border-primary transition-all duration-200 text-gray-900 placeholder-gray-400 font-medium"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button type="submit" loading={loading} className="w-full text-lg h-14">
                        Đăng nhập ngay
                    </Button>
                </form>
                
                <div className="mt-10 pt-8 border-t border-gray-50">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 text-center">Truy cập nhanh</p>
                    <div className="flex gap-3">
                        <div 
                            className="flex-1 bg-gray-50 p-4 rounded-2xl cursor-pointer hover:bg-indigo-50 hover:border-indigo-100 border border-transparent transition-all group"
                            onClick={() => {setEmail('admin@pcmaster.com'); setPassword('Anhdung001');}}
                        >
                            <p className="text-[10px] font-black text-primary uppercase mb-1">Admin</p>
                            <p className="text-xs text-gray-500 font-bold group-hover:text-indigo-900 truncate">admin@pcmaster.com</p>
                        </div>
                        <div 
                            className="flex-1 bg-gray-50 p-4 rounded-2xl cursor-pointer hover:bg-green-50 hover:border-green-100 border border-transparent transition-all group"
                            onClick={() => {setEmail('user@gmail.com'); setPassword('Anhdung001');}}
                        >
                            <p className="text-[10px] font-black text-green-600 uppercase mb-1">User</p>
                            <p className="text-xs text-gray-500 font-bold group-hover:text-green-900 truncate">user@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
