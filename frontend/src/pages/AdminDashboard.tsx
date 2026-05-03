import React, { useEffect, useState } from 'react';
import { adminApi } from '../api/adminApi';

const AdminDashboard: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await adminApi.getDashboardStats();
                setData(res);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex justify-center items-center h-full min-h-[500px] text-red-500 font-bold">
                Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.
            </div>
        );
    }

    const stats = [
        { name: 'Tổng doanh thu', value: data.stats.revenue, change: '+5%', color: 'text-green-600', bg: 'bg-green-50', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { name: 'Tổng số đơn hàng', value: data.stats.orders, change: '+2%', color: 'text-blue-600', bg: 'bg-blue-50', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
        { name: 'Tổng khách hàng', value: data.stats.customers, change: '+8%', color: 'text-red-600', bg: 'bg-red-50', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-black text-secondary">Dashboard Overview</h1>
                <p className="text-gray-400 font-medium mt-1">Chào mừng bạn quay lại với hệ thống quản trị PC MASTER.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((item) => (
                    <div key={item.name} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex items-center justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${item.color.replace('text', 'bg')}`}></div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.name}</p>
                            </div>
                            <h2 className="text-3xl font-black text-secondary">{item.value}</h2>
                            <p className={`text-xs font-bold ${item.color}`}>{item.change} <span className="text-gray-300 font-medium">so với tháng trước</span></p>
                        </div>
                        <div className={`w-16 h-16 ${item.bg} rounded-3xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/></svg>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Sales Chart (Placeholder) */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm space-y-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black text-secondary">Sales Data</h3>
                        <button className="text-primary font-bold text-sm hover:underline">Chi tiết</button>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-4">
                        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                <div className="w-full relative flex flex-col justify-end h-full bg-gray-50 rounded-2xl overflow-hidden">
                                    <div className="bg-primary-100 group-hover:bg-primary transition-colors" style={{ height: `${h-20}%` }}></div>
                                    <div className="bg-primary group-hover:bg-primary-dark transition-colors" style={{ height: `${20}%` }}></div>
                                </div>
                                <span className="text-[10px] font-black text-gray-300 uppercase">T{i+2}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm space-y-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black text-secondary">Top Products</h3>
                    </div>
                    <div className="space-y-6">
                        {data.topProducts.map((p: any) => (
                            <div key={p.id} className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-indigo-50 group-hover:text-primary transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-sm font-bold text-secondary line-clamp-1">{p.name}</h4>
                                    <p className="text-[10px] font-bold text-gray-300 uppercase">{p.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-secondary">{p.price}</p>
                                    <p className="text-[10px] font-bold text-primary">{p.sold}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Latest Transactions */}
            <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black text-secondary">Giao dịch mới nhất</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] border-b border-gray-50">
                                <th className="pb-6">Mã Đơn</th>
                                <th className="pb-6">Khách hàng</th>
                                <th className="pb-6">Sản phẩm</th>
                                <th className="pb-6">Ngày</th>
                                <th className="pb-6">Số tiền</th>
                                <th className="pb-6 text-right">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {data.transactions.map((t: any) => (
                                <tr key={t.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-6 text-sm font-bold text-primary">{t.id}</td>
                                    <td className="py-6 text-sm font-bold text-secondary">{t.customer}</td>
                                    <td className="py-6 text-sm font-medium text-gray-500 max-w-[200px] truncate">{t.product}</td>
                                    <td className="py-6 text-sm font-medium text-gray-400">{t.date}</td>
                                    <td className="py-6 text-sm font-black text-secondary">{t.amount}</td>
                                    <td className="py-6 text-right">
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                                            t.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                            t.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {t.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
