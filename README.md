# KU Pokerbots

The website for **KU Pokerbots**, the KU AI poker-bot hackathon (Saturday, April 3, 2027 · Lawrence, KS).

It's a plain static site (HTML, CSS and a little JavaScript) with no build step, no framework and no dependencies.

> **Status:** not live yet. GitHub Pages isn't enabled and the custom domain is pending (see [Deployment](#deployment)).

## Quick start

```bash
git clone https://github.com/KU-AIO/PokerBotWebsite.git
cd PokerBotWebsite
python -m http.server 8000
```

Open <http://localhost:8000>. Chrome caches the CSS from this server, so **hard-refresh (Ctrl+Shift+R)** after editing styles. A hard refresh also replays the hero's entrance animation.

## Project layout

| Path | What it is |
| --- | --- |
| `index.html` | The whole site: hero, timeline, FAQ, organizers, sponsor call-out, footer |
| `404.html` | Not-found page; repeats the wordmark and footer |
| `assets/css/style.css` | All styles |
| `assets/js/hero.js` | Hero motion only (win-probability count-up, card lift on scroll). The page is complete without it, and it does nothing for visitors who prefer reduced motion |
| `assets/fonts/` | Self-hosted Archivo and JetBrains Mono (`.woff2`), with their OFL licence texts |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

The fonts are **latin-only subsets**, so the suit symbols (♠ ♥ ♦ ♣) and arrows render from the visitor's system fonts. That's intentional; don't swap fonts to "fix" it.

## Updating event content

The source of truth for all event content is the **["Website Info" Google Doc](https://docs.google.com/document/d/1wufYtaWbn5iW5F_hB7v3Mp3RnTpxlkMMX13KzdAuURI/edit)** in the KU AI Club shared drive. Access to the doc is granted separately from this repo, so ask Heagen if you can't open it.

How a change reaches the site (Heagen runs the sync; this is here for reference):

1. Edit the Google Doc.
2. Copy the change into the matching HTML in `index.html` (and in `404.html` if it touches the footer or wordmark).
3. Preview locally (see [Quick start](#quick-start)).
4. Commit and push.

Anything under the doc's **Parked** heading stays off the site.

> ⚠️ **Change the doc first.** An edit made only in the HTML will be overwritten the next time the site is synced from the doc.

Where each piece of content lives in `index.html`:

| Content | Where |
| --- | --- |
| Event date and place, pitch line, register button | `.hero-copy` (`.meta`, `.pitch`, `.actions`) |
| Timeline | `ol.timeline`: one `<li>` per row, with `.tl-date` and `.tl-what` |
| FAQ | `.faq-grid`: one `.faq-item` per entry (`<h3>` question, `<p>` answer) |
| Organizers | `ul.team`: one `li.person` per name (names only, ordered by first name) |
| Sponsor call-out | `.cta` (`#sponsor`), with the email link |
| Contact and social links | `footer.site-footer` (also in `404.html`) |

## Pending decisions

Anything still waiting on a decision is marked in the HTML with a comment like:

```html
<!-- TBD(open): event Discord; when decided add <a ...>Join Discord</a> -->
```

List them all with:

```bash
grep -n "TBD(open)" index.html 404.html
```

To resolve one, do what the comment says and delete the comment.

## Deployment

The plan is **GitHub Pages**, serving branch `main` from the root folder (`/`). Nothing needs building; Pages serves the files directly, and `404.html` becomes the site's 404 page.

- This repo is private, and Pages on a private repo needs a paid GitHub plan or GitHub Education for the org.
- The custom domain `kupokerbots.org` is on hold until KU licensing approves it. After that, add a `CNAME` file at the repo root containing `kupokerbots.org` and set the domain under **Settings → Pages**.

## Contributing

Small fixes are welcome.

- Branch off `main` and open a pull request.
- Commit messages follow `<type>: <description>`, where the type is one of `feat`, `fix`, `docs`, `refactor` or `chore`.
- Check the page at desktop width and at phone width (~390px). There should be no horizontal scrolling.
- Keep it static: no build step, frameworks or package managers.
- Event content changes go through the Google Doc (see [Updating event content](#updating-event-content)).

## Maintainer

Heagen Bell ([heagenb03](https://github.com/heagenb03)). For questions, ask in the KU AI org or email `kuaiorganization@gmail.com`.
