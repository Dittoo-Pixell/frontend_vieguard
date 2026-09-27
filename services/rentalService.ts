import apiClient from '@/lib/axios';
import { ApiResponse } from '@/types/common';
import { Accessory } from '@/types/rental';

export const rentalService = {
  async getAccessories(): Promise<ApiResponse<Accessory[]>> {
    return apiClient.get('/accessories');
  },

  async getAccessoryById(id: string | number): Promise<ApiResponse<Accessory>> {
    return apiClient.get(`/accessories/${id}`);
  },
};
