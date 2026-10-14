# Your profile, your controls

Bookmark this page. These controls use your existing GitHub sign-in; only you
or someone you've given repository access can change the page.

**[Edit the page ↗](https://github.com/lucaandrea/lucaandrea/edit/main/README.md)**
&nbsp; · &nbsp;
**[Edit bio, website & portrait ↗](https://github.com/settings/profile)**
&nbsp; · &nbsp;
**[Visibility settings ↗](https://github.com/lucaandrea/lucaandrea/settings#danger-zone)**

## Edit the page

1. Open **Edit the page** above.
2. Change the words in the editor. Keep the image lines for the visual layout.
3. Use **Preview**, then **Commit changes…** and save directly to `main`.

Your changes appear on [your GitHub profile](https://github.com/lucaandrea).
No local tools or build are needed. Normal project builds preserve these edits.
For the small bio, website, or portrait beside the page, use **Edit bio, website
& portrait** instead.

## Hide or unpublish

1. Open **[Visibility settings](https://github.com/lucaandrea/lucaandrea/settings#danger-zone)**.
2. In **Danger Zone**, choose **Change repository visibility → Make private**.
3. Follow GitHub's confirmation steps.

This removes the portfolio README from your public profile and hides this
repository. Your files and editing history stay available to you. To republish,
use the same setting and choose **Make public**.

Your GitHub account, avatar, short bio, and other public repositories remain
visible. Change the account fields separately in
[profile settings](https://github.com/settings/profile) if needed. Making this
repository private cannot recall copies visitors have already saved.

This is GitHub's recommended way to
[remove a profile README](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme#removing-a-profile-readme).

## Ask Codex to do it

You can simply say:

> Hide my GitHub profile portfolio by making lucaandrea/lucaandrea private.

or:

> Republish my GitHub profile portfolio from lucaandrea/lucaandrea.

## Optional local shortcuts

From this repository, with the GitHub CLI signed in as an administrator:

```sh
pnpm profile:hide
```

To show it again:

```sh
pnpm profile:show
```

These commands only change visibility for `lucaandrea/lucaandrea`.

## Artwork and larger revisions

The editable page is `README.md`. The artwork lives in `assets/`. Builders can
use Node 24 and `pnpm build` to refresh artwork and previews while keeping your
README text. `data/profile.json` supplies preview fields and template defaults;
changing it does not update your GitHub account automatically.

`pnpm profile:regenerate` deliberately replaces the README with the template
from `review/build-profile.mjs`. Use it only when you want to replace manual
copy edits; previous committed versions remain in GitHub's file history.
