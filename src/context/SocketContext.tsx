import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { getEnvs } from '@/shared';
import { useAuthStore } from '@/store/auth';

interface SocketContextType {
  socket: Socket | null;
}

const { VITE_SOCKETIO_URL } = getEnvs();

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useAuthStore(s => s.user);

  useEffect(() => {
    if (user) {
      const newSocket = io(VITE_SOCKETIO_URL);
      newSocket.emit('register', user?.id!);

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
};
