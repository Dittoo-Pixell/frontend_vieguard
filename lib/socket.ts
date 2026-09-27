import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    let token = '';
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/accessToken=([^;]+)/);
      if (match) token = match[1];
    }

    socket = io(`${SOCKET_URL}/ws/website`, {
      withCredentials: true,
      auth: { token },
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
