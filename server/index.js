import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`[Socket.io] Client ${socket.id} joined room ${roomId}`);
    socket.to(roomId).emit('player-joined', { playerId: socket.id });
  });

  socket.on('game-action', (data) => {
    const { roomId, action } = data;
    console.log(`[Socket.io] Action in room ${roomId}:`, action);
    socket.to(roomId).emit('game-action', action);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`[CardComposer Server] Running on http://localhost:${PORT}`);
});
