import { writeFile } from 'fs/promises';
import 'dotenv/config';

const languages = ['en', 'it'];

for (const lng of languages) {
  const LOCO_URL = `https://localise.biz/api/export/locale/${lng}.json?format=nested-json&key=${process.env.VITE_LOCO_API_KEY}`;
  const TARGET_PATH = `./src/i18n/${lng}.json`;

  try {
    const res = await fetch(LOCO_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status} – ${res.statusText}`);

    const json = await res.json();
    const content = JSON.stringify(json, null, 2) + '\n';

    await writeFile(TARGET_PATH, content, 'utf-8');
    console.log(`✅ Saved ${lng} to ${TARGET_PATH}`);
  } catch (err) {
    console.error(`❌ Failed to fetch ${lng}:`, err.message);
    process.exit(1);
  }
}
