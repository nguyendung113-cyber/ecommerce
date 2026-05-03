import React, { useEffect, useState } from 'react';
import { adminApi } from '../api/adminApi';

const AdminOrders: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await adminApi.getOrders();
            setOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        try {
            await adminApi.updateOrderStatus(orderId, newStatus);
            fetchOrders();
        } catch (error) {
            console.error("Lỗi cập nhật trạng thái", error);
            alert("Có lỗi xảy ra khi cập nhật");
        }
    };

    if (loading) return <div className="p-10 text-center">Đang tải...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-secondary">Quản lý Đơn hàng</h1>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Mã Đơn</th>
                            <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Khách hàng</th>
                            <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Ngày đặt</th>
                            <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tổng tiền</th>
                            <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-6 font-bold text-primary text-sm">#ORD{order.id.toString().padStart(4, '0')}</td>
                                <td className="p-6">
                                    <p className="text-sm font-bold text-secondary">{order.user?.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{order.phone}</p>
                                    <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">{order.address}</p>
                                </td>
                                <td className="p-6 text-sm font-medium text-gray-500">
                                    {new Date(order.created_at).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="p-6 text-sm font-black text-secondary">${order.total_price}</td>
                                <td className="p-6 text-right">
                                    <select 
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider outline-none cursor-pointer border-2 border-transparent focus:border-primary/30 transition-all ${
                                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
