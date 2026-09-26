export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'rental' | 'payment' | 'chat' | 'system';
  referenceId?: string | null;
  isRead: boolean;
  createdAt: string;
}
