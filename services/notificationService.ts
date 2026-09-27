import apiClient from '@/lib/axios';
import { ApiResponse } from '@/types/common';
import { Notification } from '@/types/notification';

export const notificationService = {
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    return apiClient.get('/notifications');
  },

  async markAsRead(id: string | number): Promise<ApiResponse<null>> {
    return apiClient.patch(`/notifications/${id}/read`);
  },
};
