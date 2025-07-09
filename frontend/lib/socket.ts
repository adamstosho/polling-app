import { io, Socket } from 'socket.io-client';
import { getToken } from './api';

class SocketClient {
  private socket: Socket | null = null;
  private static instance: SocketClient;

  private constructor() {}

  static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  connect() {
    const token = getToken();
    if (!token || this.socket?.connected) return;

    // Use the same base URL as the API, but without the /api suffix
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';
    
    this.socket = io(baseUrl, {
      query: { token },
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to Socket.io server at:', baseUrl);
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from Socket.io server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket.io connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinPoll(pollId: string) {
    if (this.socket) {
      console.log('🔗 Joining poll room:', pollId);
      this.socket.emit('join-poll', pollId);
    } else {
      console.warn('⚠️ Cannot join poll room: Socket not connected');
    }
  }

  leavePoll(pollId: string) {
    if (this.socket) {
      console.log('🔌 Leaving poll room:', pollId);
      this.socket.emit('leave-poll', pollId);
    }
  }

  onPollUpdate(pollId: string, callback: (options: any) => void) {
    if (this.socket) {
      console.log('👂 Listening for updates on poll:', pollId);
      this.socket.on(`poll-${pollId}-updated`, callback);
    } else {
      console.warn('⚠️ Cannot listen for updates: Socket not connected');
    }
  }

  offPollUpdate(pollId: string, callback: (options: any) => void) {
    if (this.socket) {
      console.log('🔇 Stopping updates for poll:', pollId);
      this.socket.off(`poll-${pollId}-updated`, callback);
    }
  }

  getSocket() {
    return this.socket;
  }
}

export default SocketClient;