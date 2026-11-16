import { readdir, readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const siteUrl = process.env.SITE_URL;
const basePath = process.env.BASE_PATH;

if (!siteUrl || !basePath) {
  console.warn('IndexNow skipped: SITE_URL or BASE_PATH is missing.');
  process.exit(0);
}

try {
  const keyFiles = (await readdir('public')).filter((name) => /^[a-f0-9]{8,128}\.txt$/i.test(name));
  if (keyFiles.length !== 1) throw new Error(`Expected one IndexNow key file, found ${keyFiles.length}.`);

  const keyFile = keyFiles[0];
  const key = basename(keyFile, '.txt');
  const keyContent = (await readFile(join('public', keyFile), 'utf8')).trim();
  if (keyContent !== key) throw new Error('IndexNow key file content does not match its filename.');

  const baseUrl = new URL(basePath, siteUrl);
  const keyLocation = new URL(keyFile, baseUrl).href;
  const urlList = [
    new URL('courses/ai-devops/', baseUrl).href,
    new URL('courses/', baseUrl).href,
  ];

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: baseUrl.host, key, keyLocation, urlList }),
  });

  if (response.ok) {
    console.log(`IndexNow accepted ${urlList.length} URL(s) for ${baseUrl.host}.`);
  } else {
    console.warn(`IndexNow notification returned HTTP ${response.status}; deployment remains successful.`);
  }
} catch (error) {
  console.warn(`IndexNow notification failed; deployment remains successful: ${error.message}`);
}
