import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types';

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            
            addItem: (product, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find(item => item.id === product.id);
                    if (existingItem) {
                        return {
                            items: state.items.map(item =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            )
                        };
                    }
                    return { items: [...state.items, { ...product, quantity }] };
                });
                // Mở giỏ hàng khi thêm sản phẩm mới
                set({ isOpen: true });
            },
            
            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter(item => item.id !== productId)
                }));
            },
            
            updateQuantity: (productId, quantity) => {
                set((state) => ({
                    items: state.items.map(item =>
                        item.id === productId
                            ? { ...item, quantity: Math.max(1, quantity) }
                            : item
                    )
                }));
            },
            
            clearCart: () => set({ items: [] }),
            
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            
            getCartTotal: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },
            
            getCartCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            }
        }),
        {
            name: 'pc-master-cart', // tên lưu trong localStorage
            partialize: (state) => ({ items: state.items }), // chỉ lưu items, không lưu isOpen state
        }
    )
);
