import React, { useState } from 'react';
import './InventoryPage.css';
import axios from "axios";

interface InventoryRecord {
  id: number;
  time: string;
  name: string;
  quantity: number;
  status: string;
}

const InventoryPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'GPU',
    quantity: 0,
    price: 0,
  });

  const [history, setHistory] = useState<InventoryRecord[]>([
    { id: 1, time: '14:20 - 20/03', name: 'RAM Corsair Vengeance 16GB', quantity: 20, status: 'Thành công' }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Gửi dữ liệu đến Laravel Backend
      const response = await axios.post('http://localhost:8000/api/inventory/import', {
        name: formData.name,
        quantity: formData.quantity
      });

      if (response.data.status === 'success') {
        // 2. Tạo record mới để hiển thị ngay lên bảng lịch sử
        const newRecord: InventoryRecord = {
          id: Date.now(), // Tạo ID tạm thời bằng timestamp
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('vi-VN'),
          name: formData.name,
          quantity: formData.quantity,
          status: 'Thành công'
        };

        // 3. Cập nhật State để UI thay đổi ngay lập tức
        setHistory([newRecord, ...history]);
        
        // 4. Thông báo và reset form
        alert(response.data.message);
        setFormData({ ...formData, name: '', quantity: 0, price: 0 }); 
        (e.target as HTMLFormElement).reset(); // Xóa trắng các ô input trên giao diện
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const msg = error.response?.data?.message || "Lỗi hệ thống!";
        alert("Lỗi: " + msg);
      }
  };

  return (
    <div className="inventory-page">
      <div className="page-header">
        <h1>Nhập Kho Linh Kiện</h1>
        <p>Quản lý lô hàng nhập kho hệ thống PC MASTER</p>
      </div>

      <div className="inventory-grid">
        <div className="card form-card">
          <div className="card-title">
            <span className="accent-bar"></span>
            <h3>Thông tin nhập hàng</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Tên linh kiện</label>
              <input 
                type="text" 
                placeholder="VD: VGA ASUS RTX 4060..." 
                value={formData.name} // Ràng buộc value để dễ reset
                required 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Loại</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>CPU</option>
                  <option>GPU</option>
                  <option>RAM</option>
                  <option>Mainboard</option>
                </select>
              </div>
              <div className="input-group">
                <label>Số lượng</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  value={formData.quantity || ''} // Tránh hiện số 0 mặc định gây khó chịu
                  required 
                  onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Giá nhập dự kiến (VNĐ)</label>
              <input 
                type="number" 
                placeholder="10.000.000" 
                value={formData.price || ''}
                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
              />
            </div>

            <button type="submit" className="btn-primary">Xác nhận nhập kho</button>
          </form>
        </div>

        <div className="card history-card">
          <div className="card-title">
            <h3>Lịch sử nhập gần đây</h3>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {history.map(item => (
                  <tr key={item.id}>
                    <td>{item.time}</td>
                    <td className="product-name">{item.name}</td>
                    <td className="qty-plus">+{item.quantity}</td>
                    <td><span className="status-badge">{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;