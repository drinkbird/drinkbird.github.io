# DrinkBird Blog

Source for [blog.drinkbird.com](https://blog.drinkbird.com), a Jekyll site deployed to GitHub Pages via GitHub Actions.

## Local development

First-time setup on a fresh machine:

```sh
brew bundle                 # installs ruby@3.3 + node
echo 'export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"' >> ~/.zshrc
exec zsh
bundle install
npm install                 # also runs `npm run uglify` via postinstall
```

Run the site locally:

```sh
npm run serve               # uglifies, then runs `bundle exec jekyll serve`
```

Then open <http://localhost:4000>.

`npm run serve` is preferred over `bundle exec jekyll serve` directly because it regenerates `assets/js/scripts.min.js` from the source first. If `scripts.min.js` is already fresh and you want `--livereload`, plain `bundle exec jekyll serve --livereload` still works.

## Editing site JavaScript

Edit `assets/js/scripts.js`, then run any of:

- `npm run serve` — uglifies and starts the local server
- `npm run uglify` — regenerates `scripts.min.js` only
- `npm install` — also runs uglify (via `postinstall`)

`assets/js/scripts.min.js` is gitignored and not committed. CI regenerates it from source on every deploy, so the only file in the repo is `scripts.js`.

## Generating cover images

Posts and courses use ~1.97:1 JPGs as feature/cover images (the size `_includes/image-feature-list.html` and the course card both expect). To convert any source image (PNG / JPG / WebP / AVIF / GIF / TIFF) into that format:

```sh
npm install                              # first time only — installs sharp
npm run cover -- images/source.png       # → images/source-0.jpg, 1420×720, ~90 KB
```

Output goes next to the input with `-0.jpg` appended to the basename. If the source aspect ratio matches the target it's just resized; otherwise sharp crops to fill using its `attention` strategy (picks the most salient region so faces/focal points survive).

The 1420×720 default is 2× the on-page canonical 710×360 size — same aspect ratio (so existing layouts are unaffected), comfortably above LinkedIn's 1200px-width threshold for full-banner link previews, and provides retina assets that browsers downscale on display. Older 710-wide images keep working alongside new ones.

Flags:

- `--quality 1-100` (default `88`) — drop to `82` to squeeze tighter for photos; raise to `92`+ for maximum fidelity.
- `--position center|top|bottom|left|right|entropy|attention` — override the crop strategy when sharp's smart crop guesses wrong.
- `--size WxH` — override the dimensions, e.g. `--size 1200x627` (LinkedIn's exact ratio) or `--size 710x360` (the old preset).

For courses, set the resulting filename as the `image:` value in `_courses/<slug>/course.json` and re-run `ruby scripts/sync-courses-data.rb` so Liquid picks it up.

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

Pushes to `master` trigger `.github/workflows/jekyll.yml`, which:

1. Checks out the repo
2. Sets up Ruby (3.3) + Node (24) with Bundler and npm caches
3. `npm ci` (which also re-runs `npm run uglify` via the `postinstall` hook)
4. `bundle exec jekyll build` with `JEKYLL_ENV=production`
5. Uploads `_site/` as a Pages artifact and deploys via `actions/deploy-pages`

Production is served at <https://blog.drinkbird.com>. The whole pipeline takes ~1.5 minutes end to end.

The `Gemfile` still pins to the `github-pages` gem so local Jekyll/Liquid versions match production. Moving to plain Jekyll 4.x is unlocked by Actions but hasn't been done yet — see [issue #34](https://github.com/drinkbird/drinkbird.github.io/issues/34).

### Force-running a deploy

From the [Actions tab](https://github.com/drinkbird/drinkbird.github.io/actions/workflows/jekyll.yml), use **Run workflow** (the `workflow_dispatch` trigger). Useful for redeploying after fixing something external, e.g. flipping a feature flag in `_config.yml`.
