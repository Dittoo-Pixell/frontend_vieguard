export interface Notification {
  id: string;
  recipientType: 'user' | 'admin';
  recipientId: string;
  type: string;
  title: string;
  message: string;
  relatedOrderId?: string | null;
  isRead: boolean;
  createdAt: string;
}
