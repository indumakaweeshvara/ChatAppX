import { io } from 'socket.io-client';

// Replace with your backend URL (e.g., your local IP for mobile testing)
const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  socket = null;

  connect() {
    this.socket = io(SOCKET_URL);
    
    this.socket.on('connect', () => {
      console.log('Connected to Galactic Backend');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Galactic Backend');
    });
  }

  joinRoom(roomId) {
    if (this.socket) {
      this.socket.emit('join_room', roomId);
    }
  }

  sendMessage(data) {
    if (this.socket) {
      this.socket.emit('send_message', data);
    }
  }

  onMessageReceived(callback) {
    if (this.socket) {
      this.socket.on('receive_message', callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export const socketService = new SocketService();
