import apiClient from '@/lib/axios';
import { ApiResponse } from '@/types/common';
import { Order, CreateOrderDto } from '@/types/order';

export const orderService = {
  async createOrder(data: CreateOrderDto): Promise<ApiResponse<Order>> {
    return apiClient.post('/orders', data);
  },

  async getMyOrders(params?: { status?: string; type?: string }): Promise<ApiResponse<Order[]>> {
    return apiClient.get('/orders', { params });
  },

  async getOrderById(id: string | number): Promise<ApiResponse<Order>> {
    return apiClient.get(`/orders/${id}`);
  },

  async uploadPaymentProof(formData: FormData): Promise<ApiResponse<any>> {
    return apiClient.post('/payments/proof', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
