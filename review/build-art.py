from pathlib import Path
from html import escape
import base64
import json
import re
import textwrap

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
PROJECTS = json.loads((ROOT / 'data/projects.json').read_text())


def logo(name, x, y, size, key):
    path = ASSETS / 'logos' / name
    if path.suffix == '.png':
        encoded = base64.b64encode(path.read_bytes()).decode()
        return f'<image x="{x}" y="{y}" width="{size}" height="{size}" href="data:image/png;base64,{encoded}"/>'
    source = path.read_text()
    source = source[source.index('<svg'):]
    ids = re.findall(r'\bid="([^"]+)"', source)
    for old in ids:
        source = source.replace(f'id="{old}"', f'id="{key}-{old}"').replace(f'url(#{old})', f'url(#{key}-{old})').replace(f'href="#{old}"', f'href="#{key}-{old}"')
    opening = re.search(r'<svg\b[^>]*>', source).group()
    opening = re.sub(r'\s(?:width|height|x|y)="[^"]*"', '', opening)
    opening = opening[:-1] + f' x="{x}" y="{y}" width="{size}" height="{size}" preserveAspectRatio="xMidYMid meet">'
    return re.sub(r'<svg\b[^>]*>', lambda _: opening, source, count=1)


def text(x, y, value, size=22, color='#29332e', weight=400, spacing=None):
    tracking = f' letter-spacing="{spacing}"' if spacing else ''
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}"{tracking}>{escape(value)}</text>'


def svg(name, w, h, title, body):
    (ASSETS / name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title"><title id="title">{escape(title)}</title><style>text{{font-family:Arial,Helvetica,sans-serif}}.trace{{stroke-dasharray:6 14;animation:signal 4s ease-out 1}}@keyframes signal{{from{{stroke-dashoffset:100}}to{{stroke-dashoffset:0}}}}@media(prefers-reduced-motion:reduce){{.trace{{animation:none}}}}</style>{body}</svg>\n')


def board(x=0, y=0, scale=1):
    body = '<rect width="680" height="580" rx="20" fill="#17222c"/>'
    body += text(28, 37, 'AI STUDIO / THE INTERNAL TOOLBOX', 13, '#b6c1c9', spacing=2)
    for i, p in enumerate(PROJECTS):
        cx, cy = 25 + i % 3 * 215, 60 + i // 3 * 125
        body += f'<rect x="{cx}" y="{cy}" width="200" height="111" rx="12" fill="#f7f3ec"/>'
        body += logo(p['logo'], cx+75, cy+12, 50, 'board-'+p['id'])
        body += f'<text x="{cx+100}" y="{cy+88}" text-anchor="middle" font-size="16" font-weight="600" fill="#263139">{escape(p["name"])}</text>'
    return f'<g transform="translate({x},{y}) scale({scale})">{body}</g>'

svg('builder.svg',680,580,'Twelve internal AI Studio products, with their source project logos',board())
hero = '<rect width="1200" height="540" rx="20" fill="#111a22"/>'
hero += logo('replit.svg',42,34,32,'hero-replit') + text(89,58,'REPLIT / AI CHIEF OF STAFF',16,'#f2c4ac',spacing=1.7)
hero += text(40,160,'Building the',65,'#faf4eb',700)+text(40,233,'company',65,'#faf4eb',700)+text(40,306,'with AI.',65,'#ff9c73',700)
hero += text(44,386,'Luca Andrea',27,'#f8f0e7',600)+text(44,423,'People first. Then the software.',21,'#bdc7cf')+text(44,491,'SAN FRANCISCO  ·  OPERATOR + BUILDER',13,'#8fa1ae',spacing=1.2)
hero += board(553,42,.82)
svg('hero.svg',1200,540,'Luca Andrea — AI Chief of Staff at Replit. Building the company with AI. Twelve internal products.',hero)
mobile = '<rect width="600" height="840" rx="20" fill="#111a22"/>'
mobile += logo('replit.svg',30,25,32,'mobile-replit')+text(79,49,'AI CHIEF OF STAFF AT REPLIT',17,'#f2c4ac',spacing=1)
mobile += text(30,135,'Building the',61,'#faf4eb',700)+text(30,206,'company with AI.',60,'#ff9c73',700)
mobile += text(34,264,'Luca Andrea · San Francisco',23,'#f8f0e7')+text(34,304,'People first. Then the software.',23,'#bdc7cf')
mobile += board(28,355,.8)
svg('hero-mobile.svg',600,840,'Luca Andrea — AI Chief of Staff at Replit. Building the company with AI.',mobile)

# Workflow illustrations are purpose diagrams, not live product screenshots.
for i,p in enumerate(PROJECTS[:6]):
    for narrow in (False, True):
        w,h=(600,370) if narrow else (1200,290)
        b=f'<rect width="{w}" height="{h}" rx="18" fill="{p["color"]}"/>'
        b+=text(32,37,f'{i+1:02d} / {p["domain"].upper()}',13,p['accent'],spacing=1.5)
        b+=f'<rect x="32" y="66" width="88" height="88" rx="18" fill="#fffdf8" fill-opacity=".85"/>'
        b+=logo(p['logo'],44,78,64,'card-'+p['id'])
        b+=text(144,120,p['name'],35 if narrow else 40,'#253139',700)
        lines=textwrap.wrap(p['headline'],40 if narrow else 45)
        for j,line in enumerate(lines): b+=text(32,197+j*31,line,24,'#394b50')
        if narrow:
            for j,label in enumerate(p['flow']):
                x=24+j*192
                b+=f'<rect x="{x}" y="278" width="177" height="59" rx="9" fill="#fffdf8" fill-opacity=".8"/>'
                b+=text(x+12,300,f'0{j+1}',11,p['accent'])+text(x+12,321,label,14,'#394b50',600)
        else:
            b+='<path d="M773 92V216" stroke="#b6b7ac" stroke-width="2" class="trace"/>'
            for j,label in enumerate(p['flow']):
                y=57+j*69
                b+=f'<rect x="735" y="{y}" width="431" height="56" rx="9" fill="#fffdf8" fill-opacity=".88"/>'
                b+=text(755,y+35,f'0{j+1}',15,p['accent'])+text(808,y+35,label,21,'#394b50',600)
        svg(p['id']+('-mobile' if narrow else '')+'-card.svg',w,h,f'{p["name"]}: {p["headline"]} Workflow illustration.',b)

for narrow in (False,True):
    w,h,cols=(600,720,2) if narrow else (1200,280,6)
    b=f'<rect width="{w}" height="{h}" rx="18" fill="#f1ece3"/>'
    b+=text(28,39,'MORE OF THE STUDIO TOOLBOX',14,'#69736c',spacing=1.8)
    cw=(w-40)//cols
    for i,p in enumerate(PROJECTS[6:]):
        x,y=20+i%cols*cw,65+i//cols*209
        b+=f'<rect x="{x+5}" y="{y}" width="{cw-10}" height="184" rx="12" fill="#fffdf8" stroke="#dfd9cf"/>'
        b+=logo(p['logo'],x+cw/2-33,y+18,66,'tool-'+p['id'])
        b+=f'<text x="{x+cw/2}" y="{y+119}" text-anchor="middle" font-size="21" font-weight="600" fill="#27343a">{escape(p["name"])}</text>'
        b+=f'<text x="{x+cw/2}" y="{y+153}" text-anchor="middle" font-size="14" fill="#67716b">{escape(p["tags"][0])}</text>'
    svg('toolbox'+('-mobile' if narrow else '')+'.svg',w,h,'PULSE, Hireflow, Asset Lab, Kaishi, Vibecode Time and AI Studio, with their source project logos.',b)

svg('footer.svg',1200,170,'People first. Then the software. Luca Andrea — Replit AI Studio.', '<rect width="1200" height="170" rx="18" fill="#111a22"/>'+logo('replit.svg',45,50,55,'footer-replit')+text(129,79,'People first. Then the software.',36,'#f9f1e7',600)+text(130,125,'LUCA ANDREA / REPLIT AI STUDIO',15,'#ff9c73',spacing=2))
print('Built responsive profile artwork using the source project logos.')
