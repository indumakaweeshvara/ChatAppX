import { io } from 'socket.io-client';

// Replace with your backend URL (e.g., your local IP for mobile testing)
// Update this to your public backend URL (e.g. from Render or ngrok)
const DEV_URL = 'http://127.0.0.1:5000';
const PROD_URL = 'https://solaris-backend.onrender.com'; // Change this once deployed

const SOCKET_URL = __DEV__ ? DEV_URL : PROD_URL;

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

  sendReaction(data) {
    if (this.socket) {
      this.socket.emit('send_reaction', data);
    }
  }

  updateStatus(status) {
    if (this.socket) {
      this.socket.emit('update_status', status);
    }
  }

  onReactionReceived(callback) {
    if (this.socket) {
      this.socket.on('receive_reaction', callback);
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
