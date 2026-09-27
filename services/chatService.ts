import apiClient from '@/lib/axios';
import { ApiResponse } from '@/types/common';
import { ChatMessage } from '@/types/chat';

export const chatService = {
  async getMessages(): Promise<ApiResponse<ChatMessage[]>> {
    return apiClient.get('/chat/messages');
  },

  async sendMessage(data: { messageText?: string; imageAttachment?: string }): Promise<ApiResponse<ChatMessage>> {
    return apiClient.post('/chat/messages', data);
  },
};
