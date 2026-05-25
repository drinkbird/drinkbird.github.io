---
chapter_id: 4
chapter_slug: front-matter-and-first-post
chapter_title: "Front matter, Markdown, and writing your first post"
chapter_summary: "Covers YAML front matter, the `YYYY-MM-DD-slug.md` filename convention for posts, the kramdown dialect (attribute lists, footnotes, intra-word underscore gotchas), and the `_drafts/` plus `--drafts` workflow. Reader writes a real draft post, previews it, and publishes it via `git mv` into `_posts/`."
---

## What you'll learn
- What YAML front matter is, the keys you'll set on every post, and what they control.
- The filename convention `YYYY-MM-DD-slug.md` and what Jekyll does with each part.
- The kramdown dialect Jekyll uses, and where it diverges from CommonMark.
- How to use `_drafts/` and `jekyll serve --drafts` for posts in progress.

## Concepts

Every Markdown or HTML file Jekyll processes begins with **front matter** - a small block of YAML fenced by three dashes. The presence of front matter (even an empty one: `---\n---`) is the signal that turns a "plain file Jekyll should copy" into "a page Jekyll should render". Without front matter, your `index.md` becomes a literal Markdown file at `/index.md`; with front matter, it becomes the homepage. Inside the block you set keys that the layout and Liquid templates read as `page.<key>`. The conventions worth knowing are short. `layout: post` picks the template under `_layouts/post.html`. `title` is the post's display title. `date` overrides the date inferred from the filename (only needed if you want a time, not just a day). `tags` and `categories` group posts and feed the URL via `permalink`. You can invent any other key - `description`, `cover_image`, `draft: true` - and read it back in templates. The [Jekyll front matter docs](https://jekyllrb.com/docs/front-matter/) list the built-in keys.

The filename convention for posts is non-negotiable: `_posts/YYYY-MM-DD-some-slug.md`. Jekyll parses the date out of the filename and the slug out of the remaining text. A file like `welcome.md` or `2026-1-15-welcome.md` (single-digit month, no leading zero) is silently skipped - there's no warning. The date controls publication: posts dated in the future are excluded unless you pass `--future`. The slug is used in the URL according to your `permalink` setting. This means you can reorder, retitle, or move a post by changing the filename - but it also means the filename is part of the URL contract once you publish, so think before renaming.

Jekyll's Markdown engine is [kramdown](https://kramdown.gettalong.org/syntax.html), which is mostly CommonMark-compatible but has a few extensions and a few divergences worth knowing. Fenced code blocks with language tags work as you'd expect: ` ```ruby ` opens a Ruby block, rendered with the Rouge syntax highlighter we'll style in Module 3. Footnotes use `[^1]` and a definition `[^1]: text`. Tables use the GitHub pipe syntax. The kramdown-specific gift is **attribute lists** - appending `{: .callout #intro }` to a paragraph adds a class and id, which is how you style a callout box without dropping into raw HTML. The divergence from CommonMark to watch for: indented lists need a blank line before nested code blocks, and some `_underscore_` constructs inside words behave differently. When in doubt, render it and check.

`_drafts/` is where unfinished posts live. They have no date in the filename - just `_drafts/some-slug.md` - because they're not published yet. Normal `jekyll serve` and `jekyll build` ignore them; `jekyll serve --drafts` includes them, giving them today's date for sorting. The discipline is: write in `_drafts/`, preview with `--drafts`, then `git mv _drafts/some-slug.md _posts/2026-01-15-some-slug.md` to publish. That move is the entire publish workflow on a Jekyll blog.

## Walkthrough

Create your first real post:

```bash
# From the mysite/ root.
mkdir -p _drafts
$EDITOR _drafts/profiling-go-with-pprof.md
```

Write the file:

```markdown
---
layout: post
title: "Profiling Go services with pprof, by way of a real outage"
description: >-
  How a slow handler showed up in pprof's flame graph, and the
  one-line fix that took the p99 from 1.2s to 40ms.
tags: [go, profiling, performance]
---

The dashboard had been flat for weeks. Then on Tuesday the p99
on `/search` jumped from 40 ms to 1.2 s with no deploy, no
traffic spike, and no obvious cause in the logs.

I attached `pprof` to a live instance:

```bash
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
```

The flame graph put 70% of the time inside `regexp.Compile`,
called once per request from a logging middleware that should
have compiled the pattern at startup.

## The fix

```go
// Before: compiled on every request. Hot path; ~1ms each.
func redact(s string) string {
    re := regexp.MustCompile(`\b\d{16}\b`)
    return re.ReplaceAllString(s, "[REDACTED]")
}

// After: compiled once. Package-level var.
var cardPattern = regexp.MustCompile(`\b\d{16}\b`)

func redact(s string) string {
    return cardPattern.ReplaceAllString(s, "[REDACTED]")
}
```

The handler went back to 40 ms. The lesson isn't about `regexp`;
it's that `pprof` finds these in minutes if you've wired it in
*before* the outage[^1].

[^1]: See the [pprof tour](https://go.dev/blog/pprof) on the Go blog
      for the wiring details.
```

Preview the draft:

```bash
bundle exec jekyll serve --drafts --livereload
```

The post will show up on the homepage with today's date. Iterate until you're happy with it. When you're done, publish:

```bash
# Use the date you actually want to publish under.
git mv _drafts/profiling-go-with-pprof.md \
       _posts/2026-01-15-profiling-go-with-pprof.md
```

Now `bundle exec jekyll serve` (without `--drafts`) will include it, and the URL will follow your `permalink` setting.

A few kramdown tricks worth knowing:

```markdown
This paragraph gets a CSS class and an id.
{: .callout #intro }

A footnote reference[^note], and the body below.

[^note]: Footnotes render at the bottom of the post.

| Column A | Column B |
|----------|----------|
| values   | aligned  |
```

And, because it's the most common kramdown surprise, fenced code inside a list item:

```markdown
1. First step.

   ```bash
   # The blank line above and the four-space indent matter.
   echo "indented under the list item"
   ```

2. Second step.
```

## Common pitfalls

| Pitfall | Why it happens | Fix |
|---|---|---|
| A new post in `_posts/` never appears. | Filename doesn't match `YYYY-MM-DD-slug.ext` (missing leading zero, wrong separator). | Rename to `2026-01-15-slug.md` with hyphens between the date parts. |
| A draft is invisible even with `--drafts`. | The file is missing front matter or the YAML is malformed. | Add `---` fences with at least `layout` and `title`; YAML errors print on build. |
| `_italic_` rendering breaks inside a word like `foo_bar_baz`. | kramdown's emphasis rules differ from CommonMark on intra-word underscores. | Use asterisks (`*italic*`) for emphasis, or wrap snippets in backticks. |
| Future-dated post doesn't publish. | Jekyll excludes future dates by default. | Pass `--future` for local previews; on GitHub Pages, set `future: true` in `_config.yml`. |
| YAML front matter parse error: `did not find expected key`. | Unquoted colon in a value, e.g. `title: Profiling Go: by way of an outage`. | Quote the value: `title: "Profiling Go: by way of an outage"`. |

## Exercises

1. Create a draft under `_drafts/`, preview it with `--drafts`, then publish it by moving the file into `_posts/` with a dated filename. Confirm the URL matches your `permalink` setting.
2. In a post, add a footnote and a kramdown attribute list (`{: .note }`) on a paragraph. Inspect the rendered HTML in `_site/` and confirm the class and id appear on the right element.
3. Deliberately break the front matter by removing a closing `---`. Run `bundle exec jekyll build` and read the error message. Note the file and line number Jekyll reports - you'll see this exact failure mode again.

## Recap & next

- Front matter (a YAML block fenced by `---`) is what turns a Markdown file into a Jekyll-rendered page.
- Filenames in `_posts/` must be `YYYY-MM-DD-slug.ext`, with leading zeros - anything else is silently skipped.
- kramdown is mostly CommonMark with useful extras: attribute lists, footnotes, GitHub-style tables. Mind the intra-word underscore difference.
- `_drafts/` plus `--drafts` is the entire pre-publication workflow; `git mv` into `_posts/` is the publish step.
- Quote YAML values that contain colons to avoid the most common front-matter parse error.

Next, **The build pipeline: `jekyll build` vs `jekyll serve`, and what ends up in `_site`** - the two commands you'll run thousands of times, and how to read their errors.

