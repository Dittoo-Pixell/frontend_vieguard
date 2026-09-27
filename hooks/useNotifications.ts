'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@/services/notificationService';
import { Notification } from '@/types/notification';
import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';

export function useNotifications() {
  const queryClient = useQueryClient();
  const { on } = useSocket();
  const [realtimeNotifications, setRealtimeNotifications] = useState<Notification[]>([]);

  const { data: res, isLoading, error, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getNotifications(),
    retry: 1,
  });

  const apiNotifications: Notification[] = Array.isArray(res?.data) ? res.data : [];
  const notifications: Notification[] = [...realtimeNotifications, ...apiNotifications];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markReadMutation = useMutation({
    mutationFn: (id: string | number) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAsRead = (id: string | number) => {
    setRealtimeNotifications((prev) =>
      prev.map((n) => (n.id === String(id) ? { ...n, isRead: true } : n))
    );
    markReadMutation.mutate(id);
  };

  const markAllAsRead = () => {
    setRealtimeNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    notifications.forEach((n) => {
      if (!n.isRead) markReadMutation.mutate(n.id);
    });
  };

  // Listen for real-time notification events
  useEffect(() => {
    const cleanup = on('notification', (newNotif: Notification) => {
      setRealtimeNotifications((prev) => [newNotif, ...prev]);
    });
    return cleanup;
  }, [on]);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    refetch,
    markAsRead,
    markAllAsRead,
  };
}
