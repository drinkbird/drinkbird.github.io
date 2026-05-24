---
course_slug: jekyll-engineering-blog-github-pages
module_slug: building-the-blog
chapter_slug: tags-categories-navigation
module_dir: 03-building-the-blog
chapter_filename: 05-tags-categories-navigation
module_id: 3
chapter_id: 5
module_title: "Applied: Building the blog itself"
chapter_title: "Tags, categories, and post navigation that actually helps readers"
---

# Tags, Categories, and Post Navigation That Actually Helps Readers

> Module 3 · Chapter 5 - Applied: Building the blog itself

## What you'll learn
- When tags help readers and when they create dead pages with one post each.
- The Jekyll distinction between `categories` and `tags`, and which one to use when.
- How to generate a tag index page with a single Liquid loop - no plugin needed.
- How to add previous/next post navigation using `page.previous` and `page.next`.
- How to build a "series" pattern via a `series:` front-matter key, for posts that belong together.

## Concepts

Most blogs over-tag. A new writer adds five tags to every post and within three months has a cloud where half the tags point to exactly one post. Tag pages exist to help readers find related work; a tag with one post is a dead page. The rule of thumb: **don't introduce a tag until you have three posts that fit it, and prune tags that don't grow.**

Jekyll has two built-in taxonomies. **Categories** participate in the URL - `category: rate-limiting` shows up under `/rate-limiting/2026/01/15/post-title/` (depending on your permalink pattern). They behave like hierarchical sections. **Tags** are flat metadata - they don't affect URLs and a post can have many. For an engineering blog, the typical answer is **one category per post** (or none) and **two or three tags**. Categories carve the site into sections; tags cross-cut.

A tag index page is one of Jekyll's easiest custom pages because `site.tags` is a hash of tag-name → list-of-posts that Liquid can iterate directly. No plugin, no generator. The trade-off: each tag doesn't get its own URL - clicking scrolls to an anchor on the index rather than navigating to a dedicated page. That's fine for a dozen tags; if you want one URL per tag, the `jekyll-archives` plugin does it but isn't on the GitHub Pages safelist, so it requires the Actions build we set up in Module 5.

Previous/next navigation at the bottom of a post is the highest-value navigation element on a blog. Jekyll exposes `page.previous` and `page.next` automatically - they refer to siblings in chronological order. Most reader sessions arrive on one post from a search result; if the next post is one click away, pages-per-session roughly doubles. Wire it up on day one.

The **series pattern** is for posts that belong together as an ordered unit. Tags don't fit (unordered); categories don't fit (structural). Use a `series:` front-matter key on each member post, then build a small Liquid filter that finds siblings.

## Walkthrough

Add categories and tags to a post - note that both keys take either a string or a list:

```yaml
---
title: "Adaptive rate limiting in production"
date: 2026-01-15
category: rate-limiting             # one category; participates in URLs
tags: [reliability, observability]  # two tags; flat metadata
series: "Rate limiting at scale"    # optional series key for grouping
series_order: 2                     # explicit order within the series
---
```

Build the **tag index page** at `tags.html`:

```liquid
---
layout: default
title: Tags
permalink: /tags/
---
{% raw %}
{%- assign sorted_tags = site.tags | sort -%}
<nav class="tag-cloud">
  {%- for tag in sorted_tags -%}
    {%- assign name = tag[0] -%}
    {%- assign count = tag[1] | size -%}
    <a href="#tag-{{ name | slugify }}">
      {{ name }} <small>({{ count }})</small>
    </a>
  {%- endfor -%}
</nav>

{%- for tag in sorted_tags -%}
  {%- assign name = tag[0] -%}
  {%- assign posts = tag[1] -%}
  <section id="tag-{{ name | slugify }}">
    <h2>{{ name }}</h2>
    <ul>
      {%- for post in posts -%}
        <li>
          <time>{{ post.date | date: "%Y-%m-%d" }}</time>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </li>
      {%- endfor -%}
    </ul>
  </section>
{%- endfor -%}
{% endraw %}
```

Two passes through `site.tags`: one for the cloud at the top, one for the per-tag sections below. The `#tag-<slug>` anchor links scroll the reader to the right section. The Liquid `slugify` filter handles tags with spaces or capitals so `My Tag` becomes `my-tag` in the URL fragment.

**Previous/next navigation** in `_includes/post-nav.html`:

```liquid
{% raw %}<nav class="post-nav" aria-label="Adjacent posts">
  {%- if page.previous -%}
    <a class="prev" href="{{ page.previous.url | relative_url }}">
      <small>Previous</small>
      <span>{{ page.previous.title }}</span>
    </a>
  {%- endif -%}
  {%- if page.next -%}
    <a class="next" href="{{ page.next.url | relative_url }}">
      <small>Next</small>
      <span>{{ page.next.title }}</span>
    </a>
  {%- endif -%}
</nav>{% endraw %}
```

Include it from `_layouts/post.html` near the end:

```liquid
{% raw %}{%- include post-nav.html -%}{% endraw %}
```

`page.previous` is the post published *before* this one (chronologically older); `page.next` is the one after (chronologically newer). The variable names are about position in the posts array, not "older" and "newer" - surface them with explicit labels so the reader knows which direction is which.

**Series navigation** is a tighter loop. In `_includes/series-nav.html`:

```liquid
{% raw %}{%- if page.series -%}
  {%- assign siblings = site.posts
        | where: "series", page.series
        | sort: "series_order" -%}
  {%- if siblings.size > 1 -%}
    <aside class="series">
      <h3>Part of the series: {{ page.series }}</h3>
      <ol>
        {%- for sib in siblings -%}
          <li{% if sib.url == page.url %} aria-current="page"{% endif %}>
            {%- if sib.url == page.url -%}
              {{ sib.title }}
            {%- else -%}
              <a href="{{ sib.url | relative_url }}">{{ sib.title }}</a>
            {%- endif -%}
          </li>
        {%- endfor -%}
      </ol>
    </aside>
  {%- endif -%}
{%- endif -%}{% endraw %}
```

`where: "series", page.series` filters every post to those that match the current post's series. The `series_order` sort imposes an explicit reading order so you don't depend on publish dates. `aria-current="page"` marks the current item for assistive tech and for CSS styling.

## How it fits together

```mermaid
flowchart LR
  fm[front matter: tags, category, series] --> jekyll[Jekyll build]
  jekyll --> tagidx[/tags/ index page]
  jekyll --> postnav[Previous/Next on each post]
  jekyll --> seriesnav[Series nav on series posts]
```

Three navigation surfaces, all driven by the same per-post front matter. No plugins, no JavaScript.

## Common pitfalls

| Pitfall | Why it happens | Fix |
|---|---|---|
| Tag cloud full of one-post tags. | Tags were added eagerly with no pruning. | Set a "three posts before a tag exists" rule; periodically rename or merge thin tags. |
| Wanting one URL per tag, no plugin available on GitHub Pages. | `jekyll-archives` isn't on the Pages safelist. | Use a single tag index page with anchors, or move to the Actions build (Module 5). |
| "Previous" links forward in time, confusing readers. | `page.previous` is the post *before* this one in publish order - chronologically older. | Use explicit labels ("Older / Newer") or rely on series nav for ordered reading. |
| Series posts published in different orders. | Sorting siblings by date when `series_order` isn't set. | Add a `series_order:` integer to every series post and sort by it explicitly. |
| Categories accidentally appearing in URLs. | The `category` key participates in default permalink patterns. | Either choose this behaviour deliberately, or override `permalink:` to exclude `:categories`. |

## Exercises

1. Audit your existing tags. Count how many posts each tag has. Merge or remove every tag with fewer than three posts. Update the affected posts.
2. Build the tag index at `/tags/` and link to it from the site footer. Confirm the in-page anchors jump to the right section.
3. Pick one multi-post topic on your blog. Add `series:` and `series_order:` to each post and include `series-nav.html` in the post layout. Verify the current post is rendered as plain text, not a link.

## Recap & next
- Categories participate in URLs; tags don't. Use one category per post and a small handful of tags.
- A tag index page is a single Liquid loop over `site.tags` - no plugin needed.
- Wire up `page.previous` / `page.next` on every post; it doubles pages-per-session for almost no work.
- Use a `series:` + `series_order:` pattern for posts that belong together as an ordered unit.
- Prune tags. Three-post minimum keeps the cloud useful.

Next, **SEO basics with `jekyll-seo-tag` - titles, descriptions, sitemap, robots** opens Module 4. The blog is built; now we make it findable, shareable, and measurable.

