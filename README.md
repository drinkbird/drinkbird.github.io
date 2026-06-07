# DrinkBird Blog

Source for [blog.drinkbird.com](https://blog.drinkbird.com), a Jekyll site deployed to GitHub Pages via GitHub Actions.

## Local development

The local toolchain matches CI: Ruby 3.3, Bundler, Node.js 24 and npm. Run
`npm run doctor` (`npm.cmd run doctor` on Windows) at any time to check the
environment and installed dependencies.

### macOS setup

First-time setup on a fresh Mac:

```sh
brew bundle                 # installs ruby@3.3 + node
echo 'export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"' >> ~/.zshrc
exec zsh
bundle install
npm install                 # also runs `npm run uglify` via postinstall
npm run doctor
```

### Windows setup

Install [RubyInstaller with Devkit](https://rubyinstaller.org/) Ruby 3.3 and
[Node.js](https://nodejs.org/) 24 LTS first. The Ruby Devkit is required
because the pinned `sassc` gem contains native code.

Then run from PowerShell in the repository root:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/setup-windows.ps1
npm.cmd run doctor
```

The setup script initializes RubyInstaller's MSYS2/MinGW toolchain when needed,
installs the Bundler and npm dependencies and verifies the result. It does not
install Ruby or Node itself.

Use `npm.cmd`, `bundle.bat` and `ridk.cmd` in PowerShell if the machine's
execution policy blocks unsigned `npm.ps1`, `bundle.ps1` or `ridk.ps1` command
shims. This does not require changing the system execution policy.

Run the site locally:

```sh
npm run serve               # uglify → jekyll build → pagefind → jekyll serve
```

Then open <http://localhost:4000>.

`npm run serve` does the full pipeline so local previews match production: uglify the JS, build the site, build the Pagefind search index against `_site/`, then start `jekyll serve --skip-initial-build`. The workflow automatically uses `npm.cmd` and `bundle.bat` on Windows, and `npm` and `bundle` elsewhere. The Pagefind index survives jekyll's watch-mode rebuilds because `_site/pagefind/` is in `keep_files`, so search keeps working as you edit content. If you make a structural change and want a fresh index, restart with `npm run serve` (or just run `npm run pagefind` in another terminal).

If you don't care about local search and want a faster loop, `bundle exec jekyll serve --livereload` still works on its own (use `bundle.bat exec jekyll serve --livereload` in PowerShell, assuming `scripts.min.js` is already built).

## Editing site JavaScript

Edit `assets/js/scripts.js`, then run any of:

- `npm run serve` — uglifies and starts the local server
- `npm run uglify` — regenerates `scripts.min.js` only
- `npm install` — also runs uglify (via `postinstall`)

`assets/js/scripts.min.js` is gitignored and not committed. CI regenerates it from source on every deploy, so the only file in the repo is `scripts.js`.

## Generating cover images

Posts and courses use ~1.97:1 JPGs as feature/cover images (the size `_includes/image-feature-list.html` and the course card both expect). To convert any source image (PNG / JPG / WebP / AVIF / GIF / TIFF) into that format:

```sh
npm install                              # first time only - installs sharp
npm run cover -- images/source.png       # → images/source-1x.jpg + source-2x.jpg
```

The script writes a pair next to the input:

- `<basename>-1x.jpg` at 710×360 (standard-density displays)
- `<basename>-2x.jpg` at 1420×720 (retina / hi-DPI)

`_includes/image-feature-post.html` and `_includes/image-feature-list.html` detect the `-1x.` infix on the `feature:` filename and emit `<img srcset="...-1x.jpg 1x, ...-2x.jpg 2x">`. To opt a post in, set `feature: source-1x.jpg` in front matter. Bare filenames (no `-1x` suffix) keep rendering as a single `<img src>`, so existing posts are unchanged until you re-run the script and switch the front-matter reference.

Only use `-1x.jpg` in front matter when both files exist on disk. The include unconditionally derives `-2x.jpg` from the filename, so if you ran the script with `--no-2x` the browser will 404 on the missing retina file. For single-resolution images keep the bare filename and let the include fall back to single-src.

Retrofit warning: srcset only pays off when the source has more pixels than the 1x slot. If the source is already 710 wide, the script just upscales it to make the `-2x.jpg`, which means retina visitors download ~2.5× the bytes for the same visual quality. Only retrofit posts where you have a high-res original on hand.

If the source aspect ratio matches the target it's just resized; otherwise sharp crops to fill using its `attention` strategy (picks the most salient region so faces/focal points survive).

Flags:

- `--quality 1-100` (default `88`) - drop to `82` to squeeze tighter for photos; raise to `92`+ for maximum fidelity.
- `--position center|top|bottom|left|right|entropy|attention` - override the crop strategy when sharp's smart crop guesses wrong.
- `--size WxH` - override the **2x** dimensions, e.g. `--size 1200x627` (LinkedIn's exact ratio). The 1x is half each axis.
- `--no-2x` - skip the retina file when the source is already small enough that upscaling would just bloat bytes without adding detail.

For courses, set the resulting filename as the `image:` value in `_courses/<slug>/course.json` and re-run `ruby scripts/sync-courses-data.rb` so Liquid picks it up.

## Writing posts

- Posts live in `_posts/blog/` and are named `YYYY-MM-DD-slug.md`.
- Drafts live in `_drafts/` (no date prefix). Scaffold one with `npm run new-post -- "My Title"`; preview drafts locally with `npm run serve:drafts` (passes `--drafts --future` to Jekyll). When the draft is ready, move it into `_posts/blog/` and prefix the filename with the publish date.
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

The `Gemfile` pins Jekyll 4 directly (no `github-pages` gem). Deployment goes through `actions/upload-pages-artifact` + `deploy-pages` so the github-pages safelist no longer applies and we can use any plugin we want. The pinned plugins are declared explicitly: `jekyll-sitemap`, `jekyll-redirect-from`, `jekyll-feed`. `jekyll-sass-converter` is pinned to `~> 2.2` (libsass / sassc) because the bundled Bootstrap 3 Sass uses legacy syntax that dart-sass 3.x rejects.

### Force-running a deploy

From the [Actions tab](https://github.com/drinkbird/drinkbird.github.io/actions/workflows/jekyll.yml), use **Run workflow** (the `workflow_dispatch` trigger). Useful for redeploying after fixing something external, e.g. flipping a feature flag in `_config.yml`.

## Editorial CI

`.github/workflows/editorial.yml` runs three checks on every PR and on push to `master`, in parallel with (not gating) the deploy:

| Check        | Tool                                         | Behavior                    |
| ------------ | -------------------------------------------- | ---------------------------- |
| Internal links + image refs | [htmlproofer](https://github.com/gjtorikian/html-proofer) | Hard fail |
| External URLs | [lychee](https://github.com/lycheeverse/lychee) | Soft fail (`continue-on-error`) |
| Prose typos  | [typos](https://github.com/crate-ci/typos)   | Hard fail                    |

htmlproofer is run with `--disable-external` so it stays in its lane and leaves external URLs to lychee. `--ignore-urls '/^mailto:\?/'` skips share-by-email links (valid mailto URIs that htmlproofer's overly-strict mailto validator rejects).

### Running the checks locally

macOS:

```sh
gem install html-proofer                 # one-time
brew install typos-cli lychee            # one-time

bundle exec jekyll build                 # always re-build first
htmlproofer ./_site --disable-external --allow-hash-href \
  --ignore-empty-alt --no-enforce-https --ignore-urls '/^mailto:\?/'
typos                                    # respects _typos.toml at the repo root
lychee './_site/**/*.html' --max-concurrency 8 --accept 200,206,429
```

Windows PowerShell:

```powershell
gem install html-proofer                 # one-time
# Install typos and lychee from their release pages, then ensure both are on PATH.

bundle.bat exec jekyll build
htmlproofer ./_site --disable-external --allow-hash-href `
  --ignore-empty-alt --no-enforce-https --ignore-urls '/^mailto:\?/'
typos
lychee './_site/**/*.html' --max-concurrency 8 --accept 200,206,429
```

### `_typos.toml`

Bootstrap 3 Sass, minified JS bundles (`*.min.js`, `mermaid.min.js`, `glightbox.min.js`), the synced `_data/courses/` mirror, and lockfiles are excluded so we don't fight false positives in code we don't maintain. The `[default.extend-words]` block whitelists intentional words that look like typos: `Packt` (publisher), `Skelton` (Matthew Skelton, Team Topologies co-author), `Ceaser` (the CSS easing tool at matthewlein.com/ceaser/), and `teh` (used as a literal typo example in the editorial-CI course chapter).
