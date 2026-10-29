# withwhom.github.io

A mathematical scrapbook, built with Jekyll and served by GitHub Pages.
Live at <https://withwhom.github.io>.

## Adding a scrap

One scrap = one Markdown file in `_posts/`, named `YYYY-MM-DD-slug.md`:

```markdown
---
layout: scrap
title: "Cosets and Lagrange's theorem"
date: 2026-09-13
tags: [group theory]
source: "Fraleigh §10"   # optional
---

One or two sentences summarising the scrap. This first paragraph is the
excerpt shown on the home page.

Body text. Inline math is $$\lvert G \rvert = [G:H]\,\lvert H \rvert$$ inside a sentence; display
math is `$$` on its own lines with a blank line before and after:

$$
[G : K] = [G : H]\,[H : K]
$$
```

The full spec (front matter, slug rules, three-part body, notation) lives in
`.claude/skills/math-scrap/SKILL.md`; follow it. Open a pull request into
`main`. Once merged, GitHub Pages rebuilds the site; the new scrap
appears in the **Latest scrap** panel and at the top of the **Scraps** list,
at `/scraps/<slug>/`, and in `feed.xml`.

Notes:

- `layout`, `title`, `date`, `tags` are required; `source` is optional and is
  shown as the small-caps label on the panel and the scrap page.
- Math: write `$$…$$` for both inline and display in Markdown. kramdown
  decides inline vs display by placement (inside a paragraph is inline, on
  its own lines is display) and emits `\( \)` or `\[ \]`, which KaTeX
  renders in the browser. Writing `\( \)` directly only works in raw HTML
  blocks, because kramdown eats the backslashes in ordinary Markdown text.
- Never write a bare `|` inside `$$…$$` in Markdown or YAML text. kramdown
  parses tables before math, so a one-line paragraph containing `|` turns into
  a table. Use `\lvert G \rvert`, `\vert`, or `\mid` instead (`\|` will not
  work: inside math it means a double bar). Raw HTML blocks are exempt.
- Raw HTML is fine. The theorem/proof classes from the home page
  (`thm`, `thm-head`, `thm-body`, `proof`, `proof-head`, `qed`) are available.

## Open questions

Shown at `/questions/`. Edit `_data/open_questions.yml`. Each item has a `question` and an optional
`context`; both accept Markdown and `$$…$$` math.

## Conjugle

A daily French conjugation game at `/conjugle/`: a standalone page in
`conjugle/` (no site layout). Sentences live in `conjugle/data.js`; after
editing them run `node scripts/check-conjugle.js` (CI runs it on every pull
request). The data format and the rules for new sentences are in `CLAUDE.md`.

## Site structure

Shared pieces live in `_includes/` (head, sidebar, theme toggle, footer,
KaTeX) and are assembled by `_layouts/default.html`. Sidebar tabs come from
`_data/navigation.yml`; see `CLAUDE.md` for how to add a tab and how to add a
redirect when an address changes.

## Local preview

Use **Ruby 3.3** (what GitHub Pages runs). Jekyll 3.x, which the
`github-pages` gem pins, fails to start on Ruby 3.4+ (`csv` and other gems
are no longer bundled). On macOS:

```bash
brew install ruby@3.3
echo 'export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"' >> ~/.zshrc   # Intel Mac: /usr/local/opt/ruby@3.3/bin
```

Open a new terminal, check `ruby -v` shows 3.3, then from the repository folder:

```bash
bundle config set --local path vendor/bundle
bundle install
LANG=C.UTF-8 bundle exec jekyll serve
```

Then open <http://localhost:4000>. The `Gemfile` pins the `github-pages` gem so
the local build matches what GitHub builds. If you ever installed gems with
a different Ruby, run `rm -rf vendor Gemfile.lock` first.
