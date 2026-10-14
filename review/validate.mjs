import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let checked=0;
for(const name of ['README.md','index.html','github.html','responsive.html']) {
  const content=await fs.readFile(path.join(root,name),'utf8');
  assert(!/\{\{[A-Z_]+\}\}/.test(content),`${name}: unresolved template`);
  const ids=[...content.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${name}: duplicate IDs`);
  for(const [,ref] of content.matchAll(/(?:href|src|srcset)="([^"]+)"/g)) {
    if(/^(?:https?:|mailto:|data:|#)/.test(ref))continue;
    const target=path.resolve(root,ref.split('#')[0]);
    assert(target.startsWith(root+'/'),`${name}: path leaves repository`);
    await fs.access(target);checked++;
  }
  for(const [tag] of content.matchAll(/<img\b[^>]*>/g))assert(/\balt="[^"]*"/.test(tag),`${name}: image without alt`);
  if(name==='README.md') {
    assert(!/<(?:script|style|iframe|video)\b/i.test(content),'Unsupported README markup');
    assert.equal((content.match(/-showcase\.webp/g)||[]).length,6,'Six product images');
    assert(!content.includes('img.shields.io'),'README assets must be self-hosted');
  }
}
const profile=JSON.parse(await fs.readFile(path.join(root,'data/profile.json'),'utf8'));
assert(profile.bio.length<=160,'GitHub bio must fit the 160-character field');
for(const id of profile.featured) {
  const m=await sharp(path.join(root,'assets',`${id}-showcase.webp`)).metadata();
  assert.equal(m.width,1100);assert.equal(m.height,750);
}
for(const item of JSON.parse(await fs.readFile(path.join(root,'data/screen-sources.json'),'utf8'))) {
  const hash=createHash('sha256').update(await fs.readFile(path.join(root,item.file))).digest('hex');
  assert.equal(hash,item.sha256,`Source image changed: ${item.file}`);
  assert(item.publicSource.startsWith('https://luca.ooo/images/work/'));
}
for(const name of ['hero.svg','hero-mobile.svg']) {
  const s=await fs.readFile(path.join(root,'assets',name),'utf8');
  assert(s.includes('prefers-reduced-motion'),'Animation needs a reduced-motion fallback');
  assert(!/<script|foreignObject|https?:\/\/(?!www.w3.org)/i.test(s),'SVG must be self-contained');
}
console.log(`Validated ${checked} local references, image accessibility, 6 showcase dimensions, asset provenance, README restrictions, and profile bio length.`);
