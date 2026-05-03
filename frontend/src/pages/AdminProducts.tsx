import React, { useEffect, useState } from 'react';
import { adminApi } from '../api/adminApi';
import Button from '../components/Button';

const AdminProducts: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category_id: '1', // Default category
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await adminApi.getProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('stock', formData.stock);
        data.append('category_id', formData.category_id);
        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            if (editingId) {
                // For update, laravel needs _method=PUT inside FormData
                data.append('_method', 'PUT');
                await adminApi.updateProduct(editingId, data);
            } else {
                await adminApi.createProduct(data);
            }
            setIsModalOpen(false);
            fetchProducts();
            // Reset form
            setFormData({ name: '', price: '', stock: '', category_id: '1' });
            setImageFile(null);
            setEditingId(null);
        } catch (error) {
            console.error("Lỗi lưu sản phẩm", error);
            alert("Có lỗi xảy ra khi lưu sản phẩm");
        }
    };

    const handleEdit = (product: any) => {
        setFormData({
            name: product.name,
            price: product.price.toString(),
            stock: product.stock.toString(),
            category_id: product.category_id.toString()
        });
        setEditingId(product.id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            try {
                await adminApi.deleteProduct(id);
                fetchProducts();
            } catch (error) {
                console.error("Lỗi xóa sản phẩm", error);
                alert("Có lỗi khi xóa");
            }
        }
    };

    const openCreateModal = () => {
        setFormData({ name: '', price: '', stock: '', category_id: '1' });
        setImageFile(null);
        setEditingId(null);
        setIsModalOpen(true);
    };

    if (loading) return <div className="p-10 text-center">Đang tải...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-secondary">Quản lý Sản phẩm</h1>
                <Button onClick={openCreateModal}>+ Thêm sản phẩm</Button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Sản phẩm</th>
                            <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Danh mục</th>
                            <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Giá</th>
                            <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Kho</th>
                            <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                            {p.image ? (
                                                <img src={`http://localhost:8000${p.image}`} alt={p.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                                            )}
                                        </div>
                                        <div className="font-bold text-secondary text-sm max-w-[250px] truncate">{p.name}</div>
                                    </div>
                                </td>
                                <td className="p-6 text-sm font-medium text-gray-500">{p.category?.name}</td>
                                <td className="p-6 text-sm font-black text-primary">${p.price}</td>
                                <td className="p-6 text-sm font-bold text-gray-600">{p.stock}</td>
                                <td className="p-6 text-right space-x-2">
                                    <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-blue-50 text-blue-600 font-bold rounded-lg text-xs hover:bg-blue-100">Sửa</button>
                                    <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-50 text-red-600 font-bold rounded-lg text-xs hover:bg-red-100">Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <h2 className="text-2xl font-black text-secondary mb-6">
                            {editingId ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Tên sản phẩm</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Giá ($)</label>
                                    <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Tồn kho</label>
                                    <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Hình ảnh</label>
                                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Hủy</button>
                                <Button type="submit">{editingId ? 'Cập nhật' : 'Thêm mới'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
