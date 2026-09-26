export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'user' | 'admin';
  message: string;
  attachmentUrl?: string | null;
  createdAt: string;
  readAt?: string | null;
}

export interface Conversation {
  id: string;
  userId: string;
  adminId?: string | null;
  lastMessage?: string | null;
  lastMessageAt?: string | null;
  unreadCount?: number;
}
