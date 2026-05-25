---
chapter_id: 3
chapter_slug: building-with-github-actions
chapter_title: "Building with GitHub Actions for full plugin support"
chapter_summary: "Provides a complete `.github/workflows/pages.yml` using `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages` with `ruby/setup-ruby` and `bundler-cache`. Explains the required `pages: write` and `id-token: write` permissions, the `github-pages` environment, build/deploy job split, concurrency control, and `JEKYLL_ENV=production`."
---

{% raw %}
## What you'll learn
- The three official actions that make up a Pages deploy from Actions: `configure-pages`, `upload-pages-artifact`, `deploy-pages`.
- How to set up Ruby and cache Bundler so re-runs take seconds, not minutes.
- The permissions and environment the deploy job needs, and why both are required.
- A complete, copy-pasteable workflow that builds Jekyll with arbitrary gems and deploys to Pages.
- Where preview builds for pull requests fit, and the trade-off of adding them.

## Concepts

When you set the deploy source in Settings → Pages to "GitHub Actions", GitHub stops running its built-in Jekyll build entirely. Your repository is now expected to produce a static site artifact and call the official deploy action to publish it. Three actions, all maintained by GitHub, do this work. [`actions/configure-pages`](https://github.com/actions/configure-pages) configures the runner for Pages (it can also export the resolved site URL, useful when `_config.yml`'s `url` should track the Pages settings). [`actions/upload-pages-artifact`](https://github.com/actions/upload-pages-artifact) packages a directory - typically `_site/` - into the specific artifact format Pages expects. [`actions/deploy-pages`](https://github.com/actions/deploy-pages) takes that artifact and publishes it. The reference docs are at [docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

For Ruby, use [`ruby/setup-ruby`](https://github.com/ruby/setup-ruby). It installs the requested Ruby version, and with `bundler-cache: true` it runs `bundle install` and caches the resulting `vendor/bundle` keyed off `Gemfile.lock`. The first run takes a couple of minutes; subsequent runs with an unchanged lockfile are seconds. Always commit `Gemfile.lock` to the repo - without it the cache key is unstable and you'll reinstall every gem on every push.

The deploy job needs two permissions you have to declare explicitly because the workflow defaults won't grant them: `pages: write` (to publish) and `id-token: write` (for the OIDC token the deploy action exchanges for short-lived credentials). It also needs to target a specific deployment environment, conventionally called `github-pages`. The environment exists implicitly - you don't need to create it in the UI - and it's what enforces concurrency and the "only deploy from the default branch" guardrail you can configure in Settings → Environments.

Split the workflow into two jobs. **Build** does the Jekyll work and uploads the artifact. **Deploy** depends on build and calls `deploy-pages`. The split exists because the deploy job needs more permissions than the build job - keep blast radius small by isolating them. It also makes the build job cheap to fan out for things like PR previews, where you want to build but not deploy to production.

Preview deploys for pull requests are tempting and worth knowing about, even briefly. The cleanest way is a second workflow triggered on `pull_request` that runs only the build job and uploads a regular artifact (not a Pages artifact), so reviewers can download the rendered HTML or you can wire it to a third-party preview service. GitHub Pages itself only publishes one production deployment per repo, so you can't have a "real" preview URL without a separate hosting target. Mention it, decide if you need it, move on.

## Walkthrough

Create `.github/workflows/pages.yml`. This is the full, working workflow - drop it in unchanged for a typical Jekyll blog with arbitrary gems:

```yaml
# .github/workflows/pages.yml
name: Build and deploy Jekyll to Pages

on:
  push:
    branches: [main]
  # Allow manual reruns from the Actions tab, useful when DNS or domain settings change.
  workflow_dispatch:

# Pages requires these two; nothing else needs write access.
permissions:
  contents: read
  pages: write
  id-token: write

# Cancel an in-flight deploy if a newer push lands; never queue overlapping deploys.
concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          # Needed by jekyll-last-modified-at and similar plugins that read git history.
          fetch-depth: 0

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          # Pin to whatever your Gemfile pins. .ruby-version is read automatically.
          ruby-version: "3.3"
          bundler-cache: true  # runs `bundle install` and caches gems

      - name: Configure Pages
        # Exports the resolved site URL/path; harmless if _config.yml already sets `url`.
        uses: actions/configure-pages@v5

      - name: Build site
        # JEKYLL_ENV=production enables minification, analytics, and similar prod-only includes.
        env:
          JEKYLL_ENV: production
        run: bundle exec jekyll build --trace

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: _site

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

A few lines are worth reading slowly. `fetch-depth: 0` matters if any plugin reads git history; the default shallow clone has only the latest commit and plugins like `jekyll-last-modified-at` will report wrong timestamps without it. `JEKYLL_ENV: production` is what activates the production paths in your templates (analytics snippets, minification toggles, the `if jekyll.environment == "production"` guards you wrote in Module 4). The `concurrency` block prevents two pushes from racing; if you push three commits in a minute, only the last one deploys. The `environment` block on the deploy job is what associates this deploy with the `github-pages` environment, which is required by `deploy-pages` and surfaces the deployment in the repo's Environments view.

Flip the deploy source in the UI before the first push:

```text
Settings → Pages → Build and deployment
  Source: GitHub Actions
  Save
```

Push to `main`. The Actions tab shows two job nodes - `build` then `deploy`. When both go green, the live URL is in the deploy job's output and on the environment page. Subsequent pushes with no `Gemfile.lock` change should complete in roughly a minute.

## How it fits together

```mermaid
flowchart LR
  push[git push to main] --> build[build job]
  build -->|checkout + setup-ruby + jekyll build| artifact[Pages artifact]
  artifact --> upload[upload-pages-artifact]
  upload --> deploy[deploy job]
  deploy --> deploy_pages[deploy-pages] --> live[live Pages site]
```

Build produces the artifact; deploy publishes it. The split is what lets the build job stay low-privilege.

## Common pitfalls

| Pitfall | Why it happens | Fix |
|---|---|---|
| `deploy-pages` fails with "Resource not accessible by integration" | Missing `id-token: write` (and/or `pages: write`) in the workflow's `permissions:` block. | Add both permissions at workflow level as shown above. |
| Build runs but the live site doesn't update | Deploy source is still set to "Deploy from a branch" - Actions ran but Pages is ignoring its artifact. | Settings → Pages → Source: GitHub Actions. |
| First deploy works, every subsequent push reinstalls all gems | `Gemfile.lock` isn't committed, so the Bundler cache key changes each run. | Commit `Gemfile.lock`. |
| `jekyll.environment` is `"development"` on the live site | The `build` step is missing `env: JEKYLL_ENV: production`. | Add it on the step that runs `jekyll build`. |
| Two pushes land within a minute; the older one wins the race | No `concurrency` group, so deploys run in parallel and the slower one finishes second. | Add `concurrency: { group: pages, cancel-in-progress: true }`. |

## Exercises

1. Drop the workflow above into your repo, switch the deploy source to GitHub Actions, and push. Confirm both jobs go green and the live URL appears in the deploy job output.
2. Re-add `jekyll-picture-tag` (or any non-safelist plugin) to your `Gemfile`, push, and verify the rendered `<picture>` elements are now in the production HTML - the thing that was silently broken in Chapter 5.1 should now work.
3. Add a `pull_request` trigger to a second workflow that runs only the `build` job and uploads `_site/` as a regular artifact (use `actions/upload-artifact`, not the Pages variant). Confirm you can download the HTML from a PR.

## Recap & next
- `configure-pages`, `upload-pages-artifact`, and `deploy-pages` are the three official actions; you almost never need anything else.
- `ruby/setup-ruby` with `bundler-cache: true` handles install and caching; commit `Gemfile.lock` so the cache key is stable.
- `pages: write` and `id-token: write` are required permissions; the `github-pages` environment is required on the deploy job.
- Split build and deploy into separate jobs to keep deploy permissions minimal.
- Concurrency groups prevent overlapping deploys; `JEKYLL_ENV=production` is what activates Module 4's production-only template paths.

Next, **Buying and pointing a custom domain: DNS records, apex vs `www`, the `CNAME` file** - point a real domain at your live site.


{% endraw %}
