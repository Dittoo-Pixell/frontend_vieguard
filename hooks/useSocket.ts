'use client';

import { useEffect, useCallback, useState } from 'react';
import { getSocket } from '@/lib/socket';
import { ChatMessage } from '@/types/chat';

export function useSocket() {
  const socket = getSocket();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [socket]);

  // Specific backend Socket.IO events (namespace /ws/website)
  const joinConversation = useCallback(
    (conversationId: string | number) => {
      socket.emit('conversation:join', String(conversationId));
    },
    [socket]
  );

  const sendMessage = useCallback(
    (data: { conversationId: string | number; messageText?: string; imageAttachment?: string }) => {
      socket.emit('message:send', {
        ...data,
        conversationId: String(data.conversationId),
      });
    },
    [socket]
  );

  const onNewMessage = useCallback(
    (callback: (message: ChatMessage) => void) => {
      socket.on('message:new', callback);
      return () => {
        socket.off('message:new', callback);
      };
    },
    [socket]
  );

  // Generic emit & on helpers
  const emit = useCallback(
    (event: string, data: any) => {
      socket.emit(event, data);
    },
    [socket]
  );

  const on = useCallback(
    (event: string, callback: (data: any) => void) => {
      socket.on(event, callback);
      return () => {
        socket.off(event, callback);
      };
    },
    [socket]
  );

  return {
    socket,
    isConnected,
    joinConversation,
    sendMessage,
    onNewMessage,
    emit,
    on,
  };
}
