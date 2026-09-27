import apiClient from '@/lib/axios';
import { ApiResponse } from '@/types/common';
import { StoreProfile } from '@/types/store';

export const storeService = {
  async getProfile(): Promise<ApiResponse<StoreProfile>> {
    return apiClient.get('/store-profile');
  },
};
