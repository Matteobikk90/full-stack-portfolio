import 'dotenv/config';
import { initSentry } from '@/config/sentry';
import { httpServer, io } from '@/config/socket';
import { registerChat } from '@/services/chat.service';
import { PORT } from '@/utils/constants';

initSentry();

registerChat(io);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server + WebSocket listening on http://localhost:${PORT}`);
});
