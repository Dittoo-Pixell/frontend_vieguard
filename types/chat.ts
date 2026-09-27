export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'user' | 'admin';
  messageText?: string | null;
  imageAttachment?: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  adminId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  messages?: ChatMessage[];
  unreadCount?: number;
}
