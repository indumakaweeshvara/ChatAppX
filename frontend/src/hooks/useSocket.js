import { useEffect, useState } from 'react';
import { socketService } from '../services/socket';

export const useSocket = (roomId) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketService.connect();
    socketService.joinRoom(roomId);
    setIsConnected(true);

    return () => {
      socketService.disconnect();
    };
  }, [roomId]);

  return { isConnected };
};
