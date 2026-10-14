# Visual GitHub profile — review record

Prepared October 14, 2026. The owner approved publication and requested quick
editing and unpublishing controls. See [MANAGE.md](MANAGE.md).

## The result

- `README.md` is the GitHub profile: animated Studio constellation, six product
  cards, a concise first-person introduction, an approach disclosure, a personal
  project gallery, and direct portfolio/contact links.
- `github.html` approximates GitHub's surrounding layout in light and dark
  themes, using the proposed public-portfolio portrait and account bio.
- `index.html` is an optional interactive portfolio preview with filters,
  project stories, keyboard support, and light/dark themes.
- `responsive.html` provides a phone frame for either preview.

The README uses GitHub-supported HTML and Markdown. The custom CSS, filters,
and dialogs run in the standalone preview only. Header motion is contained in
the SVG image, with a reduced-motion fallback. Hero, experiment, and contact
artwork have separate mobile sources. No external badge or statistics service
is needed to render the profile artwork.

## Prior work recovered

The available Codex chat list, archived chats, and local user-message history
were searched. The exact earlier profile conversation was not available;
ChatGPT history was unavailable for the signed-in account.

The private `lucaandrea/lucaandrea` repository contained the September 22 draft
and its detailed review record. Its two existing commits were:

- `7b0728ba1a` — private profile draft and browser previews.
- `c2f72f5ba9` — internal AI Studio portfolio stories and source-project marks.

That draft established the operator/builder positioning and emphasis on
internal products. This revision retains that emphasis, refreshes the public
selection, replaces abstract product diagrams with existing public screenshots,
shortens the copy, and gives the artwork a consistent olive/lime identity.

## Research and factual boundaries

Checked live on October 14, 2026:

- [luca.ooo](https://luca.ooo/) — AI Chief of Staff at Replit, San Francisco,
  operations/AI/product design, selected work, public screenshots, independent
  advisory, and contact links. The page was read in the browser.
- [Field notes](https://luca.ooo/insights/ai-chief-of-staff) — product approach;
  corroborated by the current `Luca-Portfolio` source.
- [GitHub account](https://github.com/lucaandrea) — identity and current public
  repositories, cross-checked through the authenticated GitHub API.
- Current `Luca-Portfolio/app/projects.tsx` and `app/project-screens.ts` — public
  project descriptions and exact sample/demo capture labels.
- The AI Studio README and implementation record — background context only;
  no private operational data or production screenshots are copied.
- Current public repository metadata for Free Sleep and Muse Gadget SDK —
  both are attributed as forks in the profile.

The six main products are Volare, Grid, Grep, PULSE, Kaishi, and Revenue Copilot.
LucaOS, Targa Fuel, and Music Lab show the personal creative practice. The copy
does not claim universal deployment, usage, savings, coding credentials, or
solo authorship of upstream open-source projects.

## Assets

`data/screen-sources.json` records the public URL, retrieval date, and SHA-256
for nine unchanged source screenshots from `luca.ooo/images/work/`. These are
already published sample/demo captures, not newly captured production views.
Generated project cards crop those captures to a consistent presentation frame.

`data/portrait-source.json` records the unchanged portrait already published
on luca.ooo, approved as the GitHub avatar.

`data/asset-sources.json` retains the September provenance for the existing
product marks. `review/build-visuals.mjs` uses those marks to generate the SVG
header and WebP project cards. No AI image generation service was used.

Both existing commits were checked for common credential/key patterns with
zero matches. This is a bounded pattern check, not a comprehensive security
audit. Public activation exposes all existing profile-repository history;
the featured products' private source repositories remain separate.

## Editing and running

Use Node 24 and pnpm. `.node-version` and `package.json` record the runtime.

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm test
pnpm preview
```

Open http://127.0.0.1:43174/github.html for the actual README approximation or
http://127.0.0.1:43174/ for the interactive preview.

- `README.md`: editable public page; routine builds preserve direct GitHub edits.
- `data/profile.json`: preview positioning, bio, selected products, experiments.
- `data/projects.json`: established product descriptions and source pointers.
- `review/build-profile.mjs`: optional README template and concise product summaries.
  `pnpm profile:regenerate` explicitly replaces the README with this template.
- `review/build-visuals.mjs`: artwork composition and image dimensions.
- `review/index.template.html`, `styles.css`, `app.js`: interactive preview.
- `review/build-github.mjs`: local GitHub layout.

Sharp is a build-only dependency using its packaged native binaries; install
scripts are disabled. No runtime application dependencies or server are added.
The earlier Python artwork builder and earlier source assets remain available
for historical comparison; the current build uses `build-visuals.mjs`.

## Verification

- Node 24: syntax checks, build, and asset/reference validation passed.
- Local references, image alt text, generated placeholders, duplicate HTML
  IDs, six image dimensions, source hashes, and bio length were validated.
- GitHub's Markdown API preserved the responsive picture sources, table,
  disclosure, links, and all six product images.
- Desktop and 390px phone layouts were inspected in both themes. All images
  loaded; there was no horizontal page overflow.
- Knowledge filtering showed Grid, Grep, and Kaishi. The Grep dialog opened;
  Escape closed it and returned focus to the Grep button. Theme switching worked.
- Browser console checks reported no errors or warnings.
- `git diff --check` passed.

The owner approved publication on October 14, 2026. PR #1 is merged, the
repository is public, and the approved bio, website, and portrait are saved.
Screenshots named `github-live-*` in `review/screenshots/` show the actual
signed-out public profile; the other screenshots retain the local previews.
Desktop (1280px) and mobile (390px) public rendering were checked: all nine
README images loaded, the three responsive sources switched on mobile, and
there was no horizontal page overflow. The Profile controls disclosure and
owner visibility menu were verified. A manual-edit sentinel also survived a
normal build byte-for-byte before being removed.

See [PROFILE_SETTINGS.md](PROFILE_SETTINGS.md) for the publication record and
[MANAGE.md](MANAGE.md) for the edit/unpublish guide.
