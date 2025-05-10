import { initSentry } from '@/config/sentry';
import { httpServer, io } from '@/config/socket';
import { PORT } from '@/utils/constants';

initSentry();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('chat:message', (msg) => {
    io.emit('chat:message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server + WebSocket listening on http://localhost:${PORT}`);
});
