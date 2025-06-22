import { writeFile } from 'fs/promises';
import { unflatten } from 'flat';
import fetch from 'node-fetch';

const languages = ['eng', 'ita'];

for (const lng of languages) {
  const LOCO_URL = `https://localise.biz/api/export/locale/${lng}.json?format=multi-json&key=${import.meta.env.VITE_LOCO_API_KEY}`;
  const TARGET_PATH = `./src/i18n/${lng}.json`;

  try {
    const res = await fetch(LOCO_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status} – ${res.statusText}`);

    const flatData = await res.json();
    const nestedData = unflatten(flatData);
    const content = JSON.stringify(nestedData, null, 2) + '\n';

    await writeFile(TARGET_PATH, content, 'utf-8');
    console.log(`✅ Saved ${lng} to ${TARGET_PATH}`);
  } catch (err) {
    console.error(`❌ Failed ${lng}:`, err.message);
    process.exit(1);
  }
}
