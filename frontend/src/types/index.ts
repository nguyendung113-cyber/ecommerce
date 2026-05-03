export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Product {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    price: number;
    stock: number;
    specs: Record<string, string>;
    image: string;
    category?: Category;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'sales';
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}
