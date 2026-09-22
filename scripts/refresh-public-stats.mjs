import { mkdir, writeFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Deliberately unauthenticated: this profile only reports public metadata.
const endpoint = 'https://api.github.com';
const user = 'lucaandrea';
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': `${user}-profile` };
async function get(route) {
  const response = await fetch(`${endpoint}${route}`, { headers, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`GitHub ${response.status}: ${route}`);
  return response.json();
}
const repos = [];
for (let page = 1; ; page++) {
  const batch = await get(`/users/${user}/repos?type=owner&per_page=100&page=${page}`);
  if (!Array.isArray(batch)) throw new Error('Unexpected repository response');
  repos.push(...batch.filter(repo => repo.private === false));
  if (batch.length < 100) break;
}
const forks = repos.filter(repo => repo.fork).length;
const date = new Date().toISOString().slice(0, 10);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="238" viewBox="0 0 1200 238" role="img" aria-labelledby="title desc">
<title id="title">Luca's public GitHub workbench</title>
<desc id="desc">${repos.length} public repositories, ${forks} forks, ${repos.length - forks} non-fork repositories. Updated ${date}. Public metadata only.</desc>
<rect width="1200" height="238" rx="18" fill="#111820"/>
<g font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif">
<text x="38" y="40" fill="#ABB4C0" font-size="13" letter-spacing="2">THE PUBLIC WORKBENCH</text>
<text x="1162" y="40" text-anchor="end" fill="#ABB4C0" font-size="12">UPDATED ${date} · UTC</text>
<path d="M38 61H1162M425 84V189M813 84V189" fill="none" stroke="#303842"/>
${[[repos.length,'PUBLIC REPOSITORIES',38],[forks,'FORKS &amp; EXPLORATIONS',463],[repos.length-forks,'NON-FORK REPOSITORIES',850]].map(([value,label,x])=>`<text x="${x}" y="140" fill="#F9F4ED" font-size="62" font-weight="650">${value}</text><text x="${x}" y="174" fill="#BAC3CF" font-size="13" letter-spacing="1.1">${label}</text>`).join('')}
<circle cx="44" cy="212" r="3" fill="#EF8155"/><text x="57" y="216" fill="#9EAAB8" font-size="12">Public metadata only. Includes forks; private work is excluded.</text>
</g></svg>`;
const output = fileURLToPath(new URL('../assets/activity.svg', import.meta.url));
await mkdir(path.dirname(output), { recursive: true });
await writeFile(`${output}.tmp`, svg);
await rename(`${output}.tmp`, output);
console.log(`Updated public snapshot: ${repos.length} repositories / ${forks} forks / ${date}`);
