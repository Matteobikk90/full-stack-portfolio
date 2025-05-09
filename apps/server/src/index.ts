import app from '@/app';
import { initSentry } from '@/config/sentry';

initSentry();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
