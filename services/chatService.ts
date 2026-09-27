import apiClient from '@/lib/axios';
import { ApiResponse } from '@/types/common';
import { ChatMessage, Conversation } from '@/types/chat';

export const chatService = {
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    return apiClient.get('/chat/conversations');
  },

  async getOrCreateConversation(): Promise<ApiResponse<Conversation>> {
    return apiClient.post('/chat/conversations', {});
  },

  async getMessages(conversationId: string | number): Promise<ApiResponse<ChatMessage[]>> {
    return apiClient.get(`/chat/conversations/${conversationId}/messages`);
  },
};
