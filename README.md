# DrinkBird Blog

Source for [blog.drinkbird.com](https://blog.drinkbird.com), a Jekyll site published via GitHub Pages.

## Local development

First-time setup on a fresh machine:

```sh
brew bundle                 # installs ruby@3.3 + node
echo 'export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"' >> ~/.zshrc
exec zsh
bundle install
```

Run the site locally:

```sh
bundle exec jekyll serve --livereload
```

Then open <http://localhost:4000>.

## Editing site JavaScript

The site loads `assets/js/scripts.min.js` (not the unminified source). After editing `assets/js/scripts.js`, regenerate the minified file:

```sh
npm install                 # first time only
npm run uglify
```

Commit both `scripts.js` and `scripts.min.js` together so they don't drift.

## Writing posts

- Posts live in `_posts/blog/` and are named `YYYY-MM-DD-slug.md`.
- Book metadata (title, URL, cover) is defined once in `_config.yml` under `reads:` and reused everywhere.

### Linking to a book in body copy

Use the `link.html` include with just the book key - title and affiliate URL come from `_config.yml`:

```liquid
{% include link.html tag="thefearlessorg" %}
```

Override the display text by passing `title="…"`. For non-book links, use `url="…"` and `title="…"` directly.

### Featuring a book in the sidebar or as a card

- Sidebar list: add the key to the post's `reads:` front-matter array.
- In-article card: `{% include book_inarticle.html %}` (set `book` first via Liquid).

## Writing courses

Courses live under `_courses/<course-slug>/`:

- `course.json` - course metadata (modules + chapters)
- `<NN-module-slug>/<NN-chapter-slug>.md` - chapter content (each must have YAML front matter; if it teaches Liquid, wrap the body in `{% raw %}…{% endraw %}`)
- `<NN-module-slug>/<NN-chapter-slug>.quiz.json` - quiz for that chapter

After editing `course.json` or any `.quiz.json`, regenerate the Liquid-readable mirror under `_data/`:

```sh
ruby scripts/sync-courses-data.rb
```

The course landing page lives at `_courses/<course-slug>/index.md` (overrides the layout to `course-index` and sets an explicit `permalink: /courses/<slug>/`). The top-level `/courses/` listing reads from `site.data.courses` - anything synced into `_data/courses/` shows up there automatically.

## Deployment

Pushes to `master` are built and deployed automatically by GitHub Pages. The `Gemfile` pins to the `github-pages` gem so local builds match production.
