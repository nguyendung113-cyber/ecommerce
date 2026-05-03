import api from './axios';

export const adminApi = {
    // Dashboard
    getDashboardStats: async () => {
        const response = await api.get('/admin/dashboard');
        return response.data;
    },

    // Products
    getProducts: async () => {
        const response = await api.get('/admin/products');
        return response.data;
    },
    createProduct: async (formData: FormData) => {
        const response = await api.post('/admin/products', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    updateProduct: async (id: number, formData: FormData) => {
        // Laravel needs _method=PUT in FormData or we just use POST in routes
        const response = await api.post(`/admin/products/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    deleteProduct: async (id: number) => {
        const response = await api.delete(`/admin/products/${id}`);
        return response.data;
    },

    // Orders
    getOrders: async () => {
        const response = await api.get('/admin/orders');
        return response.data;
    },
    updateOrderStatus: async (id: number, status: string) => {
        const response = await api.put(`/admin/orders/${id}/status`, { status });
        return response.data;
    }
};
