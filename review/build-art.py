from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1] / 'assets'
ROOT.mkdir(parents=True, exist_ok=True)

def svg(name, width, height, title, body):
    (ROOT / name).write_text(f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title"><title id="title">{escape(title)}</title><style>text{{font-family:Arial,Helvetica,sans-serif}}.mono{{font-family:Menlo,Consolas,monospace}}.signal{{stroke-dasharray:9 18;animation:flow 4s linear 1}}@keyframes flow{{from{{stroke-dashoffset:160}}to{{stroke-dashoffset:0}}}}@media(prefers-reduced-motion:reduce){{.signal{{animation:none}}}}</style>{body}</svg>''')

def block(x, y, size, color, depth=25):
    return f'<path d="M{x} {y}l{size} {-size/2} {size} {size/2} {-size} {size/2}Z" fill="{color}"/><path d="M{x} {y}l{size} {size/2}v{depth}l{-size} {-size/2}Z" fill="#b84523"/><path d="M{x+size} {y+size/2}l{size} {-size/2}v{depth}l{-size} {size/2}Z" fill="#e45f33"/>'

grid = ''.join(f'<path d="M{x} 0V600M0 {x}H800" stroke="#26313b" stroke-width=".6"/>' for x in range(0,801,40))
art = f'''<defs><radialGradient id="glow"><stop stop-color="#e76d40" stop-opacity=".19"/><stop offset="1" stop-color="#e76d40" stop-opacity="0"/></radialGradient></defs><rect width="800" height="600" fill="#111a22"/>{grid}<ellipse cx="405" cy="305" rx="320" ry="270" fill="url(#glow)"/>
<g fill="none" stroke="#516272" stroke-width="1.4"><path d="M394 180L625 310 400 446 166 310Z"/><path d="M394 218L558 311 400 408 231 310Z"/><path d="M166 310V340L400 476 625 340V310"/><path d="M400 446V476"/><path d="M394 180V218"/></g>
<g fill="none" stroke="#ff9165" stroke-width="2" class="signal"><path d="M187 120L187 212 278 264"/><path d="M606 117V210L493 275"/><path d="M402 392V514"/></g>
{block(304,269,90,'#ff9166',28)}{block(304,232,90,'#ffad85',28)}{block(304,195,90,'#ffc8a3',28)}
<g stroke="#445462" fill="#18232c"><rect x="91" y="56" width="192" height="86" rx="10"/><rect x="510" y="54" width="193" height="86" rx="10"/><rect x="280" y="495" width="244" height="61" rx="10"/></g>
<g fill="#f5ece1"><text x="117" y="91" font-size="13" letter-spacing="2">HUMAN CONTEXT</text><text x="117" y="116" fill="#a0adb8" font-size="13">People. Problems. Ideas.</text><text x="535" y="89" font-size="13" letter-spacing="2">AI CAPABILITY</text><text x="535" y="114" fill="#a0adb8" font-size="13">Agents. Models. Tools.</text><circle cx="305" cy="526" r="4" fill="#ff946b"/><text x="322" y="531" font-size="14" letter-spacing="1.5">WORKING SOFTWARE</text></g>
<g fill="#ffb38f"><circle cx="187" cy="154" r="3"/><circle cx="606" cy="175" r="3"/><circle cx="402" cy="459" r="3"/></g>
<text x="43" y="575" fill="#697b89" class="mono" font-size="11">IDEA → PROTOTYPE → PRODUCT → PRACTICE</text>'''
svg('builder.svg',800,600,'Human context and AI capability become working software',art)
heroart = art.replace('<rect width="800" height="600" fill="#111a22"/>','')
svg('hero.svg',1200,500,'Luca Andrea. AI Chief of Staff at Replit. Building the company with AI.',f'''<rect width="1200" height="500" rx="20" fill="#111a22"/><g transform="translate(590,-6) scale(.82)">{heroart}</g><text x="48" y="65" fill="#ff9b73" font-size="14" letter-spacing="2.5">LUCA ANDREA / SAN FRANCISCO</text><text x="44" y="170" fill="#f9f1e7" font-size="72" font-weight="700">Building the</text><text x="44" y="250" fill="#f9f1e7" font-size="72" font-weight="700">company</text><text x="44" y="330" fill="#ff9b73" font-size="72" font-weight="700">with AI.</text><path d="M48 376H115" stroke="#ff9b73" stroke-width="3"/><text x="48" y="420" fill="#d1d7dd" font-size="21">AI Chief of Staff @ Replit</text><text x="48" y="452" fill="#99a8b5" font-size="16">Real problems. Thoughtful products. Useful software.</text>''')
svg('hero-mobile.svg',600,650,'Luca Andrea. Building the company with AI.',f'''<rect width="600" height="650" rx="20" fill="#111a22"/><text x="36" y="51" fill="#ff9b73" font-size="17" letter-spacing="2">LUCA ANDREA / SAN FRANCISCO</text><text x="32" y="140" fill="#f9f1e7" font-size="63" font-weight="700">Building the</text><text x="32" y="211" fill="#f9f1e7" font-size="63" font-weight="700">company with AI.</text><text x="36" y="258" fill="#b6c1ca" font-size="23">AI Chief of Staff @ Replit</text><g transform="translate(50,286) scale(.64)">{heroart}</g>''')

domains = [('Knowledge & search','Find the answer. Keep the source.'),('People & operations','Build around the way teams work.'),('Travel & planning','Connect the moving parts.'),('Creative workflows','Bring ideas through to handoff.'),('Revenue tools','Make the next action clearer.'),('Developer experience','Give builders better tools.')]
for mobile in [False,True]:
    w,h = (600,800) if mobile else (1200,375)
    cells=''
    for i,(title,desc) in enumerate(domains):
        x,y = (24,75+i*117) if mobile else (24+(i%3)*390,74+(i//3)*145)
        cw = 552 if mobile else 372
        cells+=f'<rect x="{x}" y="{y}" width="{cw}" height="105" rx="12" fill="#fffdf8" stroke="#dfd9cf"/><text x="{x+20}" y="{y+31}" fill="#ad4825" class="mono" font-size="13">0{i+1}</text><text x="{x+20}" y="{y+62}" fill="#222d34" font-size="{25 if mobile else 22}" font-weight="600">{escape(title)}</text><text x="{x+20}" y="{y+87}" fill="#66717a" font-size="{17 if mobile else 16}">{escape(desc)}</text>'
    svg('work-map-mobile.svg' if mobile else 'work-map.svg',w,h,'Six areas of AI Studio work',f'<rect width="{w}" height="{h}" rx="18" fill="#f1ece3"/><text x="26" y="42" fill="#62665f" font-size="14" letter-spacing="2">ONE STUDIO. MANY WAYS TO MAKE WORK BETTER.</text>{cells}')

# Original conceptual product illustrations; no company data or screenshots.
cards=''
for i,(a,b) in enumerate([('Company resources','A useful front door'),('People & teams','Find your way around'),('Ask a question','Get to the source')]):
    y=148+i*88
    cards+=f'<rect x="620" y="{y}" width="497" height="70" rx="9" fill="#fffefa" stroke="#dcdcd2"/><rect x="637" y="{y+17}" width="36" height="36" rx="8" fill="{["#e0eacb","#f6d9be","#d7e5e8"][i]}"/><text x="691" y="{y+30}" fill="#24302c" font-size="18" font-weight="600">{escape(a)}</text><text x="691" y="{y+51}" fill="#747c74" font-size="14">{escape(b)}</text><text x="1085" y="{y+43}" fill="#747c74" font-size="21">↗</text>'
svg('grid.svg',1200,458,'Grid — a company home built around its people. Concept illustration.',f'''<rect width="1200" height="458" rx="20" fill="#e9eedf"/><text x="42" y="51" fill="#4b6346" font-size="14" letter-spacing="2">01 / COMPANY BUILDING</text><text x="39" y="164" fill="#23342b" font-size="79" font-weight="700">Grid.</text><text x="43" y="221" fill="#334a3d" font-size="29">A company home,</text><text x="43" y="260" fill="#334a3d" font-size="29">built around its people.</text><rect x="43" y="330" width="224" height="35" rx="17" fill="#d9e2cd"/><text x="62" y="353" fill="#42553b" font-size="14">PUBLIC REPLIT SHOWCASE ↗</text><rect x="592" y="63" width="554" height="355" rx="13" fill="#f4f5ec" stroke="#c8d2bc"/><path d="M592 113H1146" stroke="#d2d9c9"/><text x="620" y="96" fill="#354d3f" font-size="18" font-weight="600">grid</text><circle cx="1116" cy="88" r="12" fill="#ccd9bc"/>{cards}<text x="43" y="423" fill="#70826a" class="mono" font-size="11">KNOWLEDGE · PEOPLE · AI ASSISTANCE</text>''')

code=''.join(f'<rect x="{705 if i%3 else 689}" y="{175+i*19}" width="{[196,244,125,210,175,140][i%6]}" height="6" rx="3" fill="{["#788ca7","#ce9672","#647689"][i%3]}"/>' for i in range(8))
dock=''.join(f'<rect x="{746+i*41}" y="367" width="29" height="29" rx="7" fill="{["#df9368","#6e97b6","#9cab89","#c3ac91","#7c9099"][i]}"/>' for i in range(5))
svg('macos.svg',1200,458,'A desktop, reimagined in the browser. Concept illustration of a macOS-inspired web experiment.',f'''<rect width="1200" height="458" rx="20" fill="#15212c"/><text x="42" y="51" fill="#99b4c9" font-size="14" letter-spacing="2">02 / EXPLORING THE POSSIBLE</text><text x="39" y="154" fill="#f4eee6" font-size="55" font-weight="700">A desktop.</text><text x="39" y="217" fill="#f4eee6" font-size="55" font-weight="700">In a browser.</text><text x="43" y="266" fill="#a9b9c7" font-size="24">An experiment with Replit Agent.</text><rect x="43" y="330" width="222" height="35" rx="17" fill="#2e414f"/><text x="62" y="353" fill="#d8e6ef" font-size="14">WATCH THE WALKTHROUGH ↗</text><rect x="592" y="63" width="554" height="355" rx="13" fill="#273b4a" stroke="#496174"/><path d="M594 351Q773 51 1146 263V417H594Z" fill="#506d74"/><path d="M594 387Q817 164 1146 360V417H594Z" fill="#7f8c7d"/><rect x="625" y="117" width="432" height="219" rx="9" fill="#17242f" stroke="#5b6a75"/><path d="M625 148H1057M674 148V336" stroke="#40505e"/><circle cx="642" cy="133" r="4" fill="#d58870"/><circle cx="657" cy="133" r="4" fill="#c4ad71"/><circle cx="672" cy="133" r="4" fill="#98af8d"/><text x="814" y="137" fill="#a7b8c4" font-size="11">WORKSPACE</text>{code}<rect x="734" y="357" width="231" height="48" rx="13" fill="#1e303b"/>{dock}<text x="43" y="423" fill="#7e97aa" class="mono" font-size="11">INTERFACES · AGENTS · CONNECTED TOOLS</text>''')

labels=['Replit','TypeScript','React','Node.js','Python','Swift','SwiftUI','MCP']
for mobile in [False,True]:
    w,h,cols = (600,300,4) if mobile else (1200,170,8)
    items=''
    for i,label in enumerate(labels):
        x=20+(i%cols)*(140 if mobile else 147)
        y=63+(i//cols)*105
        items+=f'<rect x="{x}" y="{y}" width="{130 if mobile else 137}" height="82" rx="12" fill="#fffdfa" stroke="#e1dcd3"/><text x="{x+16}" y="{y+30}" class="mono" fill="#c25b34" font-size="15">{["▰","TS","⚛","JS","Py","↗","UI","◇"][i]}</text><text x="{x+16}" y="{y+61}" fill="#374047" font-size="17" font-weight="600">{label}</text>'
    svg('toolkit-mobile.svg' if mobile else 'toolkit.svg',w,h,'Replit, TypeScript, React, Node.js, Python, Swift, SwiftUI and MCP',f'<rect width="{w}" height="{h}" rx="18" fill="#f1ece3"/><text x="24" y="36" fill="#6d6c64" font-size="13" letter-spacing="2">ACROSS MY PROJECTS</text>{items}')
svg('footer.svg',1200,160,'Good ideas deserve to become real things. Let’s build.', '<rect width="1200" height="160" rx="18" fill="#f1ece3"/><text x="40" y="65" fill="#263138" font-size="34" font-weight="600">Good ideas deserve to become real things.</text><text x="40" y="113" fill="#b7522b" font-size="26">Let’s build. ↗</text>')
print('Created original SVG profile assets.')
