export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image?: string;
  specs?: any;
  category?: Category; // Dấu ? để tránh lỗi nếu database chưa kịp load category
}
