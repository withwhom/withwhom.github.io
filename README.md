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

Body text. Inline math is $$|G| = [G:H]\,|H|$$ inside a sentence; display
math is `$$` on its own lines with a blank line before and after:

$$
[G : K] = [G : H]\,[H : K]
$$
```

Commit and push to `main`. GitHub Pages rebuilds the site; the new scrap
appears in the **Latest scrap** panel and at the top of the **Scraps** list,
at `/scraps/<slug>/`, and in `feed.xml`.

Notes:

- `layout`, `title`, `date`, `tags` are required; `source` is optional and is
  shown as the small-caps label on the panel and the scrap page.
- Math: write `$$…$$` for both inline and display in Markdown. (KaTeX's
  `\( \)` delimiters only work in raw HTML blocks, because kramdown eats the
  backslashes in ordinary Markdown text.) kramdown decides inline vs display
  by placement: inside a paragraph is inline, on its own lines is display.
- Never write a bare `|` inside `$$…$$` in Markdown or YAML text. kramdown
  parses tables before math, so a one-line paragraph containing `|` turns into
  a table. Use `\lvert G \rvert`, `\vert`, or `\mid` instead (`\|` will not
  work: inside math it means a double bar). Raw HTML blocks are exempt.
- Raw HTML is fine. The theorem/proof classes from the home page
  (`thm`, `thm-head`, `thm-body`, `proof`, `proof-head`, `qed`) are available.

## Open questions

Edit `_data/open_questions.yml`. Each item has a `question` and an optional
`note`; both accept Markdown and `$$…$$` math.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>. The `Gemfile` pins the `github-pages` gem so
the local build matches what GitHub builds.
