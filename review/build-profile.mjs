import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projects = JSON.parse(await fs.readFile(path.join(root,'data/projects.json'),'utf8'));
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const intro = "I'm the AI Chief of Staff at Replit, based in San Francisco. I lead AI Studio, where I work with teams to turn operational problems into products built around the way they actually work.";
const why = "I build internal tools because the gaps between systems become work for people: finding an answer, coordinating a trip, reviewing a contract, assembling account context. I connect that context and design the next step into the product, from the first conversation through the rollout, teaching, and continued improvement.";
const tech = [['Replit','FF3C00','replit'],['TypeScript','3178C6','typescript'],['React','202A32','react'],['Node.js','416445','nodedotjs'],['PostgreSQL','4169E1','postgresql'],['Python','3776AB','python'],['SwiftUI','C9532C','swift'],['MCP','4F5C66',null]];
const badge = (label,color,logo=null) => `<img src="https://img.shields.io/badge/${encodeURIComponent(label).replaceAll('-','--')}-${color}?style=flat-square${logo?'&amp;logo='+logo+'&amp;logoColor=white':''}" alt="${esc(label)}" />`;
const picture = (id,alt) => `<picture><source media="(max-width: 600px)" srcset="assets/${id}-mobile-card.svg"><img src="assets/${id}-card.svg" width="100%" alt="${esc(alt)}" /></picture>`;
const details = p => `<details>\n<summary><b>${esc(p.name)} — why I build it</b></summary>\n\n${p.detail}\n\n**The workflow:** ${p.flow.join(' → ')}.\n\n</details>`;
let readme = `<p align="center"><picture><source media="(max-width: 600px)" srcset="assets/hero-mobile.svg"><img src="assets/hero.svg" width="100%" alt="Luca Andrea — AI Chief of Staff at Replit. Building the company with AI." /></picture></p>

<p align="center">
  <a href="https://replit.com">${badge('Replit · AI Chief of Staff','E84A16','replit')}</a>
  <a href="https://luca.ooo">${badge('luca.ooo · Portfolio','35493F')}</a>
  <a href="https://agi2asi.ai">${badge('agi2asi.ai · Curiosity','574365')}</a>
  <a href="https://www.linkedin.com/in/luca-andrea/">${badge('LinkedIn · Luca Andrea','496D89')}</a>
  <a href="https://x.com/agi2asi">${badge('@agi2asi','20252D','x')}</a>
</p>

<p align="center"><a href="#why-internal-tools">Why internal tools</a> &nbsp; / &nbsp; <a href="#inside-ai-studio">Inside AI Studio</a> &nbsp; / &nbsp; <a href="#more-of-the-studio">The toolbox</a> &nbsp; / &nbsp; <a href="#how-i-work">How I work</a></p>

### Ciao, I'm Luca.

${intro.replace('AI Chief of Staff at Replit','**AI Chief of Staff at [Replit](https://replit.com)**')}

**Operator by instinct. Builder by practice. People first. Then the software.**

## Why internal tools

${why}

The question I start with: **where does the work get stuck?**

## Inside AI Studio

My work spans travel, company knowledge, support, legal, revenue, and the tools that help teams build. Each product starts with a particular workflow and the people responsible for it.

`;
for(const p of projects.slice(0,6)) {
 readme += `### ${p.name}\n\n${picture(p.id,`${p.name}: ${p.headline} ${p.flow.join(' → ')}.`)}\n\n${p.summary}\n\n**Why:** ${p.why}\n\n${p.tags.map(tag=>badge(tag,p.accent.slice(1))).join(' ')}\n\n${details(p)}\n\n`;
}
readme += `## More of the Studio

<p><picture><source media="(max-width: 600px)" srcset="assets/toolbox-mobile.svg"><img src="assets/toolbox.svg" width="100%" alt="The Studio toolbox: PULSE, Hireflow, Asset Lab, Kaishi, Vibecode Time, and AI Studio." /></picture></p>

`;
for(const p of projects.slice(6)) {
 readme += `<details>\n<summary><b>${p.name}</b> · ${p.domain}</summary>\n\n<img src="assets/logos/${p.logo}" width="56" height="56" alt="${p.name} logo" />\n\n${p.summary}\n\n**Why:** ${p.why}\n\n${p.detail}\n\n</details>\n\n`;
}
readme += `Alongside these products, my work includes the **Design Gallery**: reusable Canvas examples that help more people design and build. The wider Studio portfolio also includes **Repforce**, a team-led CRM and revenue intelligence effort.

## How I work

| Listen | Build | Learn | Enable |
| :--- | :--- | :--- | :--- |
| Understand the people, the friction, and the information behind the work. | Turn one useful workflow into something the team can try. | Observe use, gather feedback, and improve the details. | Teach it, document it, establish ownership, and keep it useful. |

<details>
<summary><b>The principles behind the products</b></summary>

- **Start with the person.** Understand the work before choosing where AI belongs.
- **Give intelligence a clear job.** Find context, prepare a draft, or make the next action easier.
- **Keep sources and decisions visible.** People should understand what informed an answer and what needs their review.
- **Design the whole experience.** The interface, permissions, handoffs, and everyday details are part of the product.
- **Stay after the prototype.** Teaching, ownership, feedback, and maintenance make a tool useful over time.

</details>

<p align="center">${tech.map(t=>badge(...t)).join(' ')}</p>

## Beyond the profile

[**luca.ooo**](https://luca.ooo) — my portfolio and [field notes](https://luca.ooo/insights/ai-chief-of-staff) on operations, AI, and product design.

[**agi2asi.ai**](https://agi2asi.ai) — the curiosity behind the work, exploring what increasingly capable AI lets one person make.

<p><img src="assets/footer.svg" width="100%" alt="People first. Then the software. Luca Andrea — Replit AI Studio." /></p>

<p align="center"><a href="mailto:ciao@luca.ooo">Say ciao ↗</a> &nbsp; · &nbsp; <a href="https://www.linkedin.com/in/luca-andrea/">LinkedIn ↗</a> &nbsp; · &nbsp; <a href="https://x.com/agi2asi">X / @agi2asi ↗</a></p>
`;
await fs.writeFile(path.join(root,'README.md'), readme);
const card = (p,i) => `<article id="project-${p.id}" class="project ${i>=6?'toolbox-project':''}" data-category="${p.category}">${i<6?`<button class="project-art" data-story="${p.id}" aria-label="Explore ${p.name}">${picture(p.id,`${p.name}: ${p.headline}`)}<span class="art-link" aria-hidden="true">↗</span></button>`:`<div class="product-lockup"><img src="assets/logos/${p.logo}" width="64" height="64" alt="${p.name} logo"><div><span class="eyebrow">${p.domain}</span><h3>${p.name}</h3></div></div>`}<div class="project-content"><div class="project-tags">${p.tags.map(t=>`<span class="tag orange">${t}</span>`).join('')}</div>${i<6?`<h3>${p.headline}</h3>`:''}<p>${p.summary}</p><p class="project-why"><strong>Why it matters.</strong> ${p.why}</p><button class="project-detail" data-story="${p.id}">Inside ${p.name} <span aria-hidden="true">↗</span></button></div></article>`;
const placeholders = {
 INTRO:esc(intro), WHY:esc(why),
 LOGO_NAV:projects.map(p=>`<a href="#project-${p.id}" class="project-jump" title="${p.name}"><img src="assets/logos/${p.logo}" alt="" width="36" height="36"><span>${p.name}</span></a>`).join(''),
 FILTERS:[['all','All products'],['operations','Operations'],['knowledge','Knowledge'],['enablement','Enablement']].map(([id,label])=>`<button class="filter ${id==='all'?'active':''}" data-filter="${id}" aria-pressed="${id==='all'}">${label} <span>${projects.filter(p=>id==='all'||p.category===id).length}</span></button>`).join(''),
 FLAGSHIPS:projects.slice(0,6).map(card).join('\n'),
 TOOLBOX:projects.slice(6).map((p,i)=>card(p,i+6)).join('\n'),
 TECH_BADGES:tech.map(([name])=>`<span>${name==='Replit'?'<img src="assets/logos/replit.svg" width="16" height="22" alt="">':''}${name}</span>`).join(''),
 PROJECT_DATA:JSON.stringify(projects.map(({source,...p})=>p)).replaceAll('<','\\u003c')
};
let html=await fs.readFile(path.join(root,'review/index.template.html'),'utf8');
for(const [key,value] of Object.entries(placeholders)) html=html.replaceAll(`{{${key}}}`,value);
await fs.writeFile(path.join(root,'index.html'),html);
console.log(`Built README and HTML experience for ${projects.length} internal products.`);
