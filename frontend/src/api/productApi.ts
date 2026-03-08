import axios from "axios";
import type { Product } from "../types/product";

const API_BASE_URL = "http://127.0.0.1:8080/api";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error);
    throw error;
  }
};
