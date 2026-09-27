import apiClient from '@/lib/axios';
import { ApiResponse } from '@/types/common';
import { Product, Category, ProductFilterParams } from '@/types/product';

export const productService = {
  async getProducts(params?: ProductFilterParams): Promise<ApiResponse<Product[]>> {
    return apiClient.get('/products', { params });
  },

  async getProductById(id: string | number): Promise<ApiResponse<Product>> {
    return apiClient.get(`/products/${id}`);
  },

  async getCategories(): Promise<ApiResponse<Category[]>> {
    return apiClient.get('/categories');
  },

  async getAvailability(
    id: string | number,
    params: { variantId?: string; pickupDate: string; returnDate: string }
  ): Promise<ApiResponse<any>> {
    return apiClient.get(`/products/${id}/availability`, { params });
  },
};
