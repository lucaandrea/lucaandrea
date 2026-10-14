import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'assets');
const projects = JSON.parse(await fs.readFile(path.join(root, 'data/projects.json'), 'utf8'));
const profile = JSON.parse(await fs.readFile(path.join(root, 'data/profile.json'), 'utf8'));
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const text = (x,y,s,size=20,fill='#f4f2e8',extra='') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${extra}>${esc(s)}</text>`;
const svg = (w,h,body,title) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title"><title id="title">${esc(title)}</title><style>text{font-family:Arial,Helvetica,sans-serif}.serif{font-family:Georgia,serif;font-style:italic}.signal{animation:travel 14s linear infinite;stroke-dasharray:2 15}@keyframes travel{to{stroke-dashoffset:-170}}@media(prefers-reduced-motion:reduce){.signal{animation:none}}</style>${body}</svg>`;
async function logo(file,x,y,size) {
  const data=await sharp(path.join(assets,'logos',file)).resize(size,size,{fit:'contain',background:'#00000000'}).png().toBuffer();
  return `<image x="${x}" y="${y}" width="${size}" height="${size}" href="data:image/png;base64,${data.toString('base64')}"/>`;
}

for (const mobile of [false,true]) {
  const w=mobile?600:1200, h=mobile?760:540;
  let b=`<defs><radialGradient id="glow"><stop stop-color="#657341" stop-opacity=".34"/><stop offset="1" stop-color="#101410" stop-opacity="0"/></radialGradient><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#ffffff" opacity=".09"/></pattern><clipPath id="bounds"><rect width="${w}" height="${h}" rx="24"/></clipPath></defs><g clip-path="url(#bounds)"><rect width="${w}" height="${h}" fill="#111611"/><rect width="${w}" height="${h}" fill="url(#grid)"/><ellipse cx="${mobile?340:950}" cy="${mobile?590:240}" rx="400" ry="350" fill="url(#glow)"/>`;
  b+=text(42,46,'LUCA ANDREA',18,'#dfff83','letter-spacing="3" font-weight="700"');
  if(!mobile)b+=text(900,46,'SAN FRANCISCO · EARTH',13,'#a3ada0','letter-spacing="1.6"');
  b+=text(40,mobile?121:144,'An operator’s instinct.',mobile?44:57,'#f4f2e8','class="serif"');
  b+=text(40,mobile?179:216,'A builder’s curiosity.',mobile?44:57,'#dfff83','class="serif"');
  b+=`<rect x="42" y="${mobile?216:254}" width="316" height="36" rx="18" fill="#253023" stroke="#42513b"/>`;
  b+=text(59,mobile?239:277,'AI CHIEF OF STAFF AT REPLIT',14,'#e4eadc','letter-spacing="1"');
  b+=text(42,mobile?302:355,'I turn the way people work',mobile?26:29);
  b+=text(42,mobile?339:396,'into software that works for them.',mobile?26:29);
  if(!mobile)b+=text(42,490,'OPERATIONS  /  AI  /  PRODUCT DESIGN',13,'#9fae98','letter-spacing="2"');
  const cx=mobile?300:937,cy=mobile?566:277,rx=mobile?217:201,ry=mobile?145:173;
  b+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx+39}" ry="${ry+34}" fill="none" stroke="#384632"/><ellipse class="signal" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#b8d37d" stroke-width="1.5"/><ellipse cx="${cx}" cy="${cy}" rx="${rx-60}" ry="${ry-55}" fill="none" stroke="#384632"/><circle cx="${cx}" cy="${cy}" r="64" fill="#1e281c" stroke="#788958"/><circle cx="${cx}" cy="${cy}" r="49" fill="#263622"/>`;
  b+=await logo('replit.svg',cx-28,cy-30,56);
  b+=text(cx-47,cy+88,'AI STUDIO',14,'#dfff83','letter-spacing="2"');
  for (let i=0;i<6;i++) {
    const a=(i*60-105)*Math.PI/180,x=Math.round(cx+rx*Math.cos(a)),y=Math.round(cy+ry*Math.sin(a));
    const p=projects.find(p=>p.id===profile.featured[i]);
    b+=`<path d="M${cx} ${cy}L${x} ${y}" stroke="#546748" opacity=".5"/><rect x="${x-29}" y="${y-29}" width="58" height="58" rx="16" fill="#f3f1e7" stroke="#d8e2ca"/>`;
    b+=await logo(p.logo,x-21,y-21,42);
  }
  b+='</g>';
  await fs.writeFile(path.join(assets,`hero${mobile?'-mobile':''}.svg`),svg(w,h,b,'Luca Andrea. An operator’s instinct. A builder’s curiosity. AI Chief of Staff at Replit.'));
}

const screens={volare:'volare-mission-control',grid:'grid-resources',grep:'grep-answer',pulse:'pulse-admin',kaishi:'kaishi-dashboard',revenue:'revenue-intelligence'};
const colors={volare:'#faaa87',grid:'#d4ed96',grep:'#c4b4ee',pulse:'#9fd6e5',kaishi:'#e5caa0',revenue:'#92d5b8'};
for(const [i,id] of profile.featured.entries()) {
  const p=projects.find(p=>p.id===id),accent=colors[id];
  let b='<rect width="1100" height="750" rx="24" fill="#171d1a"/>';
  b+=text(38,43,`${String(i+1).padStart(2,'0')} / ${p.domain.toUpperCase()}`,15,accent,'letter-spacing="2"');
  b+='<rect x="38" y="73" width="64" height="64" rx="16" fill="#f4f2e8"/>';
  b+=await logo(p.logo,48,83,44);
  b+=text(120,119,p.name,40,'#f4f2e8','font-weight="700" letter-spacing="-1"');
  b+=text(38,175,p.headline,24,'#c0cabc');
  b+='<rect x="38" y="213" width="1024" height="478" rx="12" fill="#252e26"/>';
  b+=text(38,724,'ACTUAL INTERFACE / SAMPLE DATA',12,'#9ead99','letter-spacing="1.8"');
  b+=text(962,724,'EXPLORE ↗',12,accent,'letter-spacing="1"');
  const shot=await sharp(path.join(assets,'screens',`${screens[id]}.webp`)).resize(1024,478,{fit:'cover',position:'top'}).png().toBuffer();
  const mask=Buffer.from('<svg width="1024" height="478"><rect width="1024" height="478" rx="12" fill="white"/></svg>');
  const rounded=await sharp(shot).composite([{input:mask,blend:'dest-in'}]).png().toBuffer();
  await sharp(Buffer.from(svg(1100,750,b,p.name))).composite([{input:rounded,left:38,top:213}]).webp({quality:86}).toFile(path.join(assets,`${id}-showcase.webp`));
}

for(const mobile of [false,true]) {
  const w=mobile?600:1200,h=mobile?1080:430,cw=mobile?520:360;
  let b=`<rect width="${w}" height="${h}" rx="24" fill="#171d1a"/>`;
  const layers=[];
  for(const [i,p] of profile.experiments.entries()) {
    const x=mobile?40:34+i*386,y=mobile?32+i*345:30,sw=cw,sh=mobile?235:263;
    b+=text(x,y+sh+45,p.name,28,'#e6ebdc','font-weight="700"');
    b+=text(x,y+sh+77,p.line,mobile?19:15,'#9fad99');
    const input=await sharp(path.join(assets,'screens',`${p.screen}.webp`)).resize(sw,sh,{fit:p.id==='targa'?'contain':'cover',position:'top',background:'#232922'}).webp().toBuffer();
    layers.push({input,left:x,top:y});
  }
  await sharp(Buffer.from(svg(w,h,b,'After hours: LucaOS, Targa Fuel, and Music Lab'))).composite(layers).webp({quality:86}).toFile(path.join(assets,`experiments${mobile?'-mobile':''}.webp`));
}
let footer='<rect width="1200" height="174" rx="22" fill="#dfff83"/>';
footer+=text(42,70,'Good ideas deserve to become real things.',34,'#1e2a16','class="serif"');
footer+=text(43,129,'LET’S BUILD WHAT COMES NEXT.',16,'#344429','letter-spacing="2"');
footer+=text(1090,123,'↗',85,'#344429');
await fs.writeFile(path.join(assets,'footer.svg'),svg(1200,174,footer,'Good ideas deserve to become real things. Let’s build what comes next.'));
let mobileFooter='<rect width="600" height="280" rx="22" fill="#dfff83"/>';
mobileFooter+=text(34,73,'Good ideas deserve',40,'#1e2a16','class="serif"');
mobileFooter+=text(34,126,'to become real things.',40,'#1e2a16','class="serif"');
mobileFooter+=text(35,214,'LET’S BUILD WHAT COMES NEXT. ↗',19,'#344429','letter-spacing="1"');
await fs.writeFile(path.join(assets,'footer-mobile.svg'),svg(600,280,mobileFooter,'Good ideas deserve to become real things. Let’s build what comes next.'));
console.log('Built responsive hero, six real-interface cards, experiment artwork, and contact banner.');
