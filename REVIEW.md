# Private profile draft

Revised September 22, 2026 around Luca's internal AI Studio work.
The repository is private. Publication and activation on the public profile
remain a separate, user-approved step. GitHub Pages is not enabled.

## Review the result

- `README.md`: the profile content GitHub renders.
- `github.html`: local approximation of the GitHub profile layout.
- `index.html`: standalone HTML/CSS experience with filters, project stories,
  logo navigation, and light/dark themes.
- `responsive.html`: a narrow browser frame for reviewing either version.

```sh
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:43174/ or http://127.0.0.1:43174/github.html.

The README uses images, badges, links, a table, and native `details` sections.
GitHub does not run the HTML concept's JavaScript or custom page CSS inside
a profile README. The sidebar avatar in the local GitHub approximation is a
monogram placeholder; it does not change the account avatar or biography.

## Editorial direction

The profile explains why Luca builds internal tools: information gaps and
handoffs become extra work for people. Each product is described through its
purpose, the people it serves, and the workflow it helps connect.

The six main visual stories are Volare, Grid, Grep, Support Station, Counsel,
and Revenue Copilot. The broader toolbox includes PULSE, Hireflow, Asset Lab,
Kaishi, Vibecode Time, and the AI Studio workbench. Design Gallery is named
as an enablement initiative. Repforce is attributed to the wider team-led
portfolio, rather than presented as Luca's individually authored product.

The profile does not enumerate public experiments or forks, and the former
public repository counters and refresh workflow have been removed.

Descriptions concern the products' purpose and scope. They do not assert
uniform deployment, company-wide adoption, savings, or independently verified
business outcomes. AI Studio's expanded story retains its pilot context.

## Research and provenance

Read live in a browser on September 22, 2026:

- https://luca.ooo/ — professional positioning and six selected internal products.
- https://luca.ooo/insights/ai-chief-of-staff — workflow, sources, product design,
  visible decisions, and ownership after the prototype.
- https://agi2asi.ai/ — the personal curiosity and building practice behind the work.

Local evidence was read from project READMEs, product overviews, the current
Luca-Portfolio project descriptions, and the curated Studio portfolio registry.
Raw private notes, customer information, employee records, and internal metrics
are not included in this repository.

`data/projects.json` records the source file(s) for each product description.
Those paths are relative to the local GitHub checkout directory. The copy is
an editorial synthesis, not a transcript of internal documentation.

### Product marks

`data/asset-sources.json` records source paths, source revisions, source hashes,
output hashes, and transformations for every copied mark. Source repositories
were read only. Most artwork is copied unchanged; Counsel is proportionally
resized to 256px. Inline SVG composition prefixes IDs to prevent collisions.

| Mark | Source |
| --- | --- |
| Replit symbol and wordmark | Grid's Replit brand kit |
| Volare | Current Volare source asset |
| Grid | Grid's closed stack app icon |
| Grep | Grep's current product mark |
| Support Station | Support Station's SVG favicon |
| Counsel | Counsel's legal app logo |
| Revenue Copilot | Existing company app mark used by Grep and AI Studio |
| PULSE | Employee download hub's PULSE icon |
| Hireflow | Hiring UI's logo.svg |
| Asset Lab | Existing company app mark used by Grep and AI Studio |
| Kaishi | Kaishi's app icon |
| Vibecode Time | Vibecode's transparent product mark |
| AI Studio | Studio workbench's current app icon |

Revenue Copilot and Asset Lab use the existing portfolio marks already shared
between the company's app catalog and Studio, rather than newly invented logos.
The large product banners are workflow illustrations, not screenshots or
representations of live company data.

## Editing and regeneration

1. Edit product copy in `data/projects.json`.
2. Edit shared profile copy and README structure in `review/build-profile.mjs`.
3. Edit standalone page structure in `review/index.template.html`.
4. Edit artwork in `review/build-art.py`, behavior in `app.js`, and CSS in `styles.css`.
5. Run `npm run build` to regenerate the artwork, README, and both HTML previews.

No application dependencies were added. Markdown-it remains a build-only
preview dependency; Python's standard library generates the SVG artwork.

## Verification

- `npm run build` regenerated the profile and both previews successfully.
- `node --check` passed for the profile builder and interactive behavior.
- SVG XML parsing, unique IDs, and embedded-image checks passed.
- All copied logo hashes match the recorded output hashes.
- Desktop preview: all product images loaded; no horizontal page overflow.
- Knowledge filter returned Grid, Grep, and Kaishi; the Kaishi story opened;
  Escape closed it and returned focus to its trigger.
- README preview: all images and badges loaded; 13 native disclosure sections.
- Phone viewport at 390px: responsive artwork selected; no horizontal page
  overflow; light and dark layouts visually inspected.
- All filters returned the expected products: Operations 5, Knowledge 3,
  Enablement 4, and All 12. Counsel's story opened and closed on the phone.
- The README Grep disclosure expanded to show its story and workflow.
- Browser console reported no errors for the phone preview.
- 118 local references passed; image alt attributes and document IDs validated.
- GitHub’s Markdown API preserved all 13 disclosure sections, eight responsive
  pictures and sources, and 46 images.
- `git diff --check` passed. Repository metadata confirmed private visibility
  and Pages disabled before updating the remote.

Public profile rendering and physical-device behavior remain unverified.
The repository stays private pending Luca's review.

## Session Change Log

| Files | Changed | Why | Verify |
| --- | --- | --- | --- |
| `README.md`, `github.html` | Internal-product stories, purpose, badges, and personal-site links | Present the company-building work | Read the private repository's README or local GitHub preview |
| `index.html`, `review/index.template.html` | Twelve-product portfolio and logo navigation | Make the broader Studio easy to explore | Open the standalone preview and choose a product |
| `app.js`, `styles.css` | Portfolio filters, shared stories, identity layouts | Support exploration on desktop and phone | Filter Knowledge; open Kaishi; press Escape; switch theme |
| `data/projects.json`, `review/build-profile.mjs` | Shared product copy and deterministic generation | Keep the README and HTML content aligned | Edit one project and run `npm run build` |
| `assets/logos/*`, `data/asset-sources.json` | Source-project marks and provenance | Give each product its real identity | Compare source and output hashes |
| `assets/*-card.svg`, `assets/builder.svg`, `assets/hero*.svg`, `assets/toolbox*.svg`, `assets/footer.svg`, `review/build-art.py` | Responsive artwork built around the product marks | Show the breadth of the work visually | Inspect desktop and phone previews |
| `review/build-github.mjs` | Updated preview explanation | Clarify GitHub's supported rendering | Read the preview footer |
| `package.json` | One build command for all generated output | Make review reproducible | Run `npm run build` |
| Former statistics script, workflow, and unused artwork | Removed public-counter and demo material | Keep the profile focused on internal work | Search the profile content and inspect the Git diff |
| `REVIEW.md` | Current research, editing, and verification record | Make the draft reviewable | Follow the review steps above |
