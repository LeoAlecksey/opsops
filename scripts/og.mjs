// Генерация OG-картинок 1200×630 в public/og/. Запуск: npm run og (нужен playwright).
import { chromium } from 'playwright';
import { readdirSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const fm = (p) => `file://${root}/node_modules/@fontsource-variable/${p}`;
const accents = { teal: '#2dd4bf', green: '#5ee08a', blue: '#6aa8ff', amber: '#f2b45a', violet: '#a99bff', cyan: '#5fd4f4' };
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

const tpl = ({ eyebrow, title, sub, glyph, accent = '#2dd4bf', meta = '' }) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Onest;src:url(${fm('onest/files/onest-cyrillic-wght-normal.woff2')}) format('woff2');font-weight:100 900;unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}
@font-face{font-family:Onest;src:url(${fm('onest/files/onest-latin-wght-normal.woff2')}) format('woff2');font-weight:100 900}
@font-face{font-family:JBM;src:url(${fm('jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2')}) format('woff2');font-weight:100 800}
@font-face{font-family:JBM;src:url(${fm('jetbrains-mono/files/jetbrains-mono-cyrillic-wght-normal.woff2')}) format('woff2');font-weight:100 800;unicode-range:U+0400-045F}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#0a0e13;color:#e7edf3;font-family:Onest;position:relative;overflow:hidden}
.g{position:absolute;inset:0;background-image:linear-gradient(to right,rgb(148 178 208/.06) 1px,transparent 1px),linear-gradient(to bottom,rgb(148 178 208/.06) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 90% 90% at 80% 20%,#000 20%,transparent 75%)}
.glow{position:absolute;width:800px;height:600px;right:-200px;top:-260px;background:radial-gradient(closest-side,${accent}22,transparent)}
.w{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column}
.top{display:flex;align-items:center;gap:14px;font-family:JBM;font-size:20px;color:#7f8d9c;letter-spacing:.06em}
.mark{width:44px;height:44px}
.eb{margin-top:auto;font-family:JBM;font-size:20px;letter-spacing:.1em;text-transform:uppercase;color:${accent}}
h1{margin-top:18px;font-size:${title.length > 60 ? 50 : 60}px;line-height:1.08;letter-spacing:-.03em;font-weight:680;max-width:960px}
p{margin-top:20px;font-size:24px;color:#b4c0cc;max-width:900px;line-height:1.4}
.glyph{position:absolute;right:72px;top:56px;font-family:JBM;font-size:30px;color:${accent};padding:10px 18px;border:1px solid ${accent}55;border-radius:12px;background:${accent}14}
.meta{margin-top:28px;font-family:JBM;font-size:18px;color:#7f8d9c}
</style></head><body><div class="g"></div><div class="glow"></div><div class="w">
<div class="top"><svg class="mark" viewBox="0 0 32 32"><rect x="1" y="1" width="30" height="30" rx="8" fill="#111821" stroke="#2dd4bf" stroke-opacity=".45"/><path d="M8 11.5 12.5 16 8 20.5" fill="none" stroke="#2dd4bf" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><rect x="15" y="19" width="9" height="2.6" rx="1.3" fill="#e7edf3"/></svg>OPSOPS.EXPERTISE · SYSOPS · DEVOPS</div>
${glyph ? `<div class="glyph">${esc(glyph)}</div>` : ''}
<div class="eb">${esc(eyebrow)}</div><h1>${esc(title)}</h1>${sub ? `<p>${esc(sub)}</p>` : ''}${meta ? `<div class="meta">${esc(meta)}</div>` : ''}
</div></body></html>`;

const jobs = [
  { file: 'default', eyebrow: 'LEARN. BUILD. OPERATE.', title: 'Практические курсы по эксплуатации IT-инфраструктуры', sub: 'Linux и сеть, Proxmox, Ansible, GitLab CI, K3s и ИИ в DevOps — из реальных инцидентов и рабочих задач.' },
  { file: 'opsdeck', eyebrow: 'Open-source · MIT', title: 'OpsDeck — рабочее место DevOps-инженера в одном окне', sub: 'Терминал с AI-панелью, Kubernetes, базы данных, SSH, алерты. Linux, Windows, macOS.', glyph: 'Rust + Tauri' },
];
const dir = resolve(root, 'src/data/courses');
for (const f of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const c = JSON.parse(readFileSync(resolve(dir, f), 'utf8'));
  const meta = [c.category, c.price ? `${c.price} на Stepik` : 'в разработке', c.workload].filter(Boolean).join('  ·  ');
  jobs.push({ file: c.slug, eyebrow: 'Курс', title: c.title, sub: c.headline, glyph: c.cover.glyph, accent: accents[c.cover.accent], meta });
}

mkdirSync(resolve(root, 'public/og'), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const j of jobs) {
  const tmp = resolve(tmpdir(), 'opsops-og.html');
  writeFileSync(tmp, tpl(j));
  await page.goto(`file://${tmp}`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: resolve(root, `public/og/${j.file}.png`) });
  console.log('og:', j.file);
}
await browser.close();
