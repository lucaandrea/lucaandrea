# Luca Andrea profile draft

Created September 22, 2026. Private repository review edition. The owner
authorized uploading the complete draft to lucaandrea/lucaandrea as a private
repository. Making it public and displaying it on the profile still require
separate approval. Account settings and deployment are unchanged.
The draft is separate from the Second Brain repository and Obsidian vault.

## Open the draft

- HTML/CSS experience: http://127.0.0.1:43174/
- Phone-sized review frame: http://127.0.0.1:43174/responsive.html
- Approximate GitHub README layout: http://127.0.0.1:43174/github.html

The main experience is plain HTML, CSS, JavaScript, and local SVG artwork.
Opening the committed preview requires no installed runtime dependencies.
To regenerate github.html, run `npm ci --ignore-scripts` and `npm run build`. The main experience
does not fetch remote assets. The GitHub layout loads three Shields badges.

To restart the local server from this folder:

```sh
python3 -m http.server 43174 --bind 127.0.0.1
```

You can also open index.html directly as a local file.

## What informed the content

The profile's positioning combines current public evidence with a limited
review of local professional notes. No private project names, employee data,
internal metrics, private URLs, or source-note bodies were copied into the
publication package.

- Role: supplied by Luca in this task and corroborated by his public posts.
- Grid: Luca's public post sharing Replit's employee-hub showcase:
  https://www.linkedin.com/posts/luca-andrea_one-of-many-examples-of-whats-possible-when-activity-7468756111131582464-Y8Uq
- Browser desktop: Luca's public demo and accompanying description:
  https://www.linkedin.com/posts/luca-andrea_there-is-an-ongoing-debate-in-the-tech-community-activity-7434776130030600193-CMk7
- Repository identity, visibility, forks, and public counts: GitHub API,
  checked September 22, 2026. The unauthenticated refresh script returned
  11 public repositories, of which 8 are forks.
- The GT7 dashboard README identifies chrshdl/gt7-simdash as its upstream;
  the draft credits it even though GitHub marks Luca's copy as non-fork.
- Work scope and operating approach: the authoritative vault's
  `20 Areas/Work.md` (reviewed September 15), `40 Knowledge/Studio operating model.md`
  (derived from the September 11 voice note), and selected curated project
  pages. These informed high-level wording, not claims of current adoption.
- Existing repository documentation and local project metadata corroborated
  the mix of TypeScript/web, Python, and native Swift work.

All product artwork is original conceptual illustration, not a screenshot.
No deployment, adoption, revenue, savings, or audience-reach metrics are claimed.

## Verification performed

- Opened the main preview in a new Dia tab and inspected desktop screenshots.
- Switched to dark theme; the visual state and accessible button label changed.
- Applied the company filter; two company stories remained and the result count
  changed to 02. Restored all four stories.
- Opened the Grid story dialog and confirmed its content and source link.
- Dismissed that dialog with Escape; focus returned to its trigger.
- Inspected the 374 CSS-pixel phone frame, including the hero and project area.
  Fixed hero wrapping and removed artwork cropping at this breakpoint.
- Inspected the GitHub README draft in the phone frame; the mobile hero source,
  badges, and text rendered.
- `node --check app.js`, `node --check review/build-github.mjs`, and
  `node --check scripts/refresh-public-stats.mjs` passed.
- An inline Python audit parsed all 11 SVG files as XML, confirmed unique IDs,
  valid local anchors and image alt text in all 3 HTML pages, and fetched all
  22 local references successfully over HTTP.
- Ran `node scripts/refresh-public-stats.mjs` against the public API.
  Corrected an SVG escaping error and reran the XML audit successfully.

These are local checks. Physical-phone testing, final GitHub sanitization,
GitHub image caching, and the hosted scheduled workflow remain unverified.
The Second Brain application's code was not part of these edits, so its
application tests/build were not run for this standalone design artifact.

## Publication boundary

The user approved creating the repository privately and uploading the complete
draft. Public visibility and public profile display are still pending approval.

- `README.md` and `assets/` are the profile package at the repository root.
  The HTML previews, artwork generators, scripts, and review notes are included
  alongside them. No separate copy of the profile README needs to be maintained.
- The README uses SVGs, badges, links, tables, and native details disclosures.
  It does not depend on JavaScript or page-level custom CSS.
- The main HTML/CSS experience is a separate website concept. Its custom
  layout, filters, dialogs, and theme control do not run inside a GitHub README.
- The workflow is gated by `github.event.repository.private == false`.
  While private, its job is skipped. After approved public visibility, it can
  refresh public metadata and commit the generated asset using the repository's
  built-in Actions token. No personal access token is used.
- Publishing this HTML experience as a site is a separate deployment choice.
- The suggested sidebar bio in github.html is only a proposal. It has not
  been saved to the account. Existing avatar and profile settings are untouched.
- Review the high-level AI Studio leadership and work-area wording before
  approving the final public text.

## Session Change Log

| File | Changed | Why | Verify |
| --- | --- | --- | --- |
| index.html | Added the full profile experience and accessible story dialogs. | Review the profile as a complete visual narrative. | Open the main preview and explore the work. |
| styles.css | Added desktop/mobile layouts, badges, light/dark styling, focus states and reduced-motion rules. | Make the draft usable across screen sizes. | Switch theme and open Phone view. |
| app.js | Added project filters, story content, theme switching and dialog controls. | Let visitors explore the work interactively. | Filter to Company building; open a story; press Escape. |
| responsive.html | Added an interactive 374-pixel iframe with website/README switching. | Review the small-screen layout on this Mac. | Open Phone view and switch modes. |
| github.html | Rendered the README locally with an approximate GitHub shell. | Separate supported profile content from the standalone website design. | Open GitHub layout and expand a details section. |
| README.md | Drafted the profile, public case studies, source links, credits and badges. | Prepare the actual GitHub profile content for review. | Compare it with github.html. |
| assets/builder.svg | Added the original builder illustration. | Give the HTML hero a visual identity. | Inspect the hero illustration. |
| assets/hero.svg | Added the desktop README banner. | Introduce the role and point of view visually. | Open GitHub layout at desktop width. |
| assets/hero-mobile.svg | Added a compact README banner. | Preserve readable text on phones. | Open GitHub layout in Phone view. |
| assets/work-map.svg | Added a visual map of six work areas. | Explain the breadth of the role. | Read What I build in the README preview. |
| assets/work-map-mobile.svg | Added the stacked work-area map. | Keep labels readable on smaller screens. | Inspect What I build in Phone view. |
| assets/grid.svg | Added a conceptual Grid case-study illustration. | Show the employee-hub idea without private screenshots. | Inspect the first project card. |
| assets/macos.svg | Added a conceptual browser-desktop illustration. | Show the public experiment visually. | Inspect the second project card. |
| assets/toolkit.svg | Added the desktop tool-badge strip. | Make the technology mix scannable. | Open The workbench in GitHub layout. |
| assets/toolkit-mobile.svg | Added the two-row tool-badge strip. | Keep badge labels readable on phones. | Open The workbench in Phone view. |
| assets/activity.svg | Generated a dated public-repository snapshot. | Provide honest dynamic metadata with forks separated. | Read the dated card or run the refresh script. |
| assets/footer.svg | Added a closing visual and invitation. | Finish the README with a consistent identity. | Scroll to the end of GitHub layout. |
| scripts/refresh-public-stats.mjs | Added unauthenticated public-only metadata generation. | Refresh counts without exposing private work. | Run `node scripts/refresh-public-stats.mjs`. |
| .github/workflows/profile.yml | Prepared the daily/manual snapshot workflow. | Keep future public profile counts current. | Read the workflow; actual hosted execution is pending approval. |
| review/build-art.py | Added the source generator for original SVG artwork. | Keep the visuals reproducible. | Run `python3 review/build-art.py`. |
| review/build-github.mjs | Added the local Markdown preview generator. | Keep README preview content aligned with its source. | Run `npm ci --ignore-scripts` then `npm run build`; markdown-it is pinned in the lockfile. |
| REVIEW.md | Recorded sources, checks, files and the publication boundary. | Make review and continuation straightforward. | Read this document. |

## Private repository packaging

- The profile README, assets, scripts, and GitHub workflow now live at the
  repository root. All preview links and generators follow that layout.
- package.json and package-lock.json pin the local Markdown preview builder.
  node_modules, local caches, credentials, and temporary files are excluded.
- The stats workflow skips its job while the repository is private.
- The website remains a local preview. GitHub Pages is not configured.

Packaging validation passed: `npm run build`, JavaScript/Python syntax checks,
all 11 SVG XML parses, and 47 local asset/anchor references across the README
and three previews. The 25-file package contains no absolute Mac paths or
credential-shaped values checked by the focused scan. The workflow condition
explicitly skips private repositories; hosted execution is still unverified.

| Additional file | Changed | Why | Verify |
| --- | --- | --- | --- |
| package.json | Added the preview builder commands and pinned Markdown renderer. | Rebuild the preview from this repository alone. | Run `npm ci --ignore-scripts` and `npm run build`. |
| package-lock.json | Locked preview-tool dependencies. | Keep the installed renderer reproducible. | Run `npm ci --ignore-scripts`. |
| .gitignore | Excluded dependencies, credentials, caches and temporary files. | Keep the repository limited to the reviewable draft. | Run `git status --ignored --short`. |
