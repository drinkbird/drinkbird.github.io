---
course_slug: jekyll-engineering-blog-github-pages
module_slug: foundations
chapter_slug: installing-ruby-and-jekyll
module_dir: 01-foundations
chapter_filename: 02-installing-ruby-and-jekyll
module_id: 1
chapter_id: 2
module_title: "Foundations: From web pages to a Jekyll site"
chapter_title: "Installing Ruby and Jekyll locally (just enough Ruby)"
chapter_summary: "Walks through installing a managed Ruby via rbenv (with one-paragraph notes on asdf) on macOS and Linux, explains why the system Ruby is off-limits, and scaffolds a working site with `jekyll new`. Covers Bundler and the Gemfile at surface level only, and establishes the `bundle exec jekyll serve` habit."
---

# Installing Ruby and Jekyll Locally (Just Enough Ruby)

> Module 1 · Chapter 2 - Foundations: From web pages to a Jekyll site

## What you'll learn
- Why not to use the Ruby that came pre-installed on your machine.
- How to install a managed Ruby with `rbenv` (or `asdf`) on macOS and Linux.
- The minimum Bundler and `Gemfile` model you need - and no more.
- How to scaffold a working Jekyll site with `jekyll new` and confirm it builds.

## Concepts

Jekyll is a Ruby program, distributed as a "gem" (Ruby's name for a package). To run it you need a Ruby interpreter, the `gem` command, and Bundler - the dependency manager that pins versions. Setup is the part of Jekyll most likely to bite you, almost entirely because of how Ruby is installed on the system.

macOS ships a system Ruby, but it lives under `/usr/bin/ruby` (or `/usr/bin/ruby` symlinked to a system-managed copy) and is owned by the operating system. Installing gems into it requires `sudo`, the version is whatever Apple decided to ship that year, and macOS reserves the right to remove it entirely in a future release - see [Apple's macOS deprecation notice for scripting language runtimes](https://developer.apple.com/documentation/macos-release-notes/macos-catalina-10_15-release-notes#Scripting-Language-Runtimes). Most Linux distros are friendlier but pin you to whatever the package maintainer chose. The right move is to install Ruby into your home directory under a version manager. Don't touch the system Ruby; pretend it isn't there.

The two version managers worth using are [`rbenv`](https://github.com/rbenv/rbenv) and [`asdf`](https://asdf-vm.com/). They do the same thing: install multiple Ruby versions side by side, switch between them per directory via a `.ruby-version` file, and shim the `ruby`, `gem`, `bundle`, and `jekyll` commands so the right version runs in the right project. If you only manage Ruby, `rbenv` is the simpler choice. If you already manage Node, Python, and Go on the same machine, `asdf` consolidates them under one tool - you trade a little setup for fewer mental contexts. Pick one; the rest of this course assumes `rbenv` but the commands map directly.

Once Ruby is in place, `gem install bundler` gives you Bundler. Bundler reads a `Gemfile` (a small Ruby DSL listing your dependencies) and resolves a consistent set of versions into `Gemfile.lock`. For a Jekyll project this matters because the Jekyll ecosystem has plugins, and the plugin versions need to agree with your Jekyll version. Commit both files. Run `bundle install` once after cloning a Jekyll project. Run `bundle exec jekyll serve` instead of `jekyll serve` so Bundler chooses the right versions - the `bundle exec` prefix is a habit worth forming early. That's the entire Ruby toolchain you need to know about. The [official Jekyll installation guide](https://jekyllrb.com/docs/installation/) covers the same ground if you hit a platform-specific snag.

`jekyll new mysite` scaffolds a project: a `Gemfile`, a `_config.yml`, a sample post, an About page, and a dependency on the [`minima`](https://github.com/jekyll/minima) theme - a clean, readable default that ships with Jekyll itself. Minima is good enough to publish, and we'll customise or replace it in Module 3. For now, the goal is a green build and a working preview at `http://127.0.0.1:4000`.

## Walkthrough

### macOS with `rbenv`

```bash
# Install rbenv and ruby-build via Homebrew.
brew install rbenv ruby-build

# Wire rbenv into the shell so its shims take precedence over system Ruby.
# Add this to ~/.zshrc (zsh is the default macOS shell since Catalina).
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
exec zsh

# Install a recent stable Ruby. Check https://www.ruby-lang.org/en/downloads/
# for the current release; this is the version you'd pin per project.
rbenv install 3.3.5
rbenv global 3.3.5

# Sanity check - should NOT report /usr/bin/ruby.
which ruby
ruby --version
```

### Linux (Debian/Ubuntu) with `rbenv`

```bash
# Build tools rbenv needs to compile Ruby. These are the dependencies
# called out by the ruby-build wiki - install them or compilation fails partway.
sudo apt-get update
sudo apt-get install -y git curl autoconf bison build-essential \
  libssl-dev libyaml-dev libreadline-dev zlib1g-dev libncurses-dev \
  libffi-dev libgdbm-dev

# Install rbenv as a git checkout (the project's preferred method on Linux).
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init - bash)"' >> ~/.bashrc
exec bash

rbenv install 3.3.5
rbenv global 3.3.5
```

### Install Jekyll and scaffold a site

```bash
# Bundler is the only gem we install globally - everything else
# goes through a project's Gemfile.
gem install bundler jekyll

# Scaffold a new site. This creates ./mysite with a Gemfile, _config.yml,
# a sample post under _posts/, and the minima theme as a dependency.
jekyll new mysite
cd mysite

# Pin this project's Ruby so future shells get the right interpreter.
rbenv local 3.3.5    # writes .ruby-version

# Resolve and install the gems listed in Gemfile.
bundle install

# Build and serve at http://127.0.0.1:4000. The --livereload flag refreshes
# the browser whenever a source file changes - worth it during development.
bundle exec jekyll serve --livereload
```

Open the URL. You should see a Minima-styled page with one sample post titled "Welcome to Jekyll!". Stop the server with `Ctrl+C`. That's the toolchain working end to end.

### One paragraph on the `Gemfile`

Open `Gemfile` in the scaffold:

```ruby
source "https://rubygems.org"
gem "jekyll", "~> 4.3"
gem "minima", "~> 2.5"
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end
```

`source` is the package registry. Each `gem` line declares a dependency and a version constraint (`~> 4.3` means "any 4.3.x, but not 4.4"). The `:jekyll_plugins` group is special - Jekyll auto-loads anything in it. You'll add to this file in later chapters; for now, knowing it exists and that `bundle install` consumes it is enough.

## Common pitfalls

| Pitfall | Why it happens | Fix |
|---|---|---|
| `gem install` asks for `sudo` or fails with "permission denied". | You're installing into the system Ruby in `/usr/bin/`. | Install a managed Ruby with `rbenv` and ensure `which ruby` shows your home directory. |
| `jekyll serve` runs an old Jekyll despite the `Gemfile` pinning a new one. | The bare `jekyll` command resolves to whatever gem version is first on `PATH`, ignoring `Gemfile.lock`. | Use `bundle exec jekyll serve` so Bundler picks the pinned version. |
| Switching projects breaks because the wrong Ruby is active. | No `.ruby-version` in the project directory; `rbenv` defaults to the global one. | Run `rbenv local 3.3.5` in each project to pin its Ruby. |
| `rbenv install 3.3.5` fails with an OpenSSL error on Linux. | Missing build deps; `ruby-build` compiles from source. | Install the dependencies listed above (`libssl-dev`, `libyaml-dev`, etc.) and retry. |
| `Gemfile.lock` conflicts on every pull. | Different team members are running different Ruby versions and Bundler resolves differently. | Commit `.ruby-version`, agree on a single Ruby version, and commit `Gemfile.lock`. |

## Exercises

1. Install `rbenv` (or `asdf` if you prefer), then install the latest stable Ruby. Confirm `which ruby` points inside your home directory, not `/usr/bin/`.
2. Run `jekyll new mysite`, then `bundle exec jekyll serve`. Open `http://127.0.0.1:4000`, then read `_posts/` to find the sample post's source. Edit its title, save, and watch the live reload pick it up.
3. Inside `mysite`, run `bundle exec jekyll --version` and `jekyll --version` separately. Are they the same? Explain in one sentence why they might differ.

## Recap & next

- The system Ruby is off-limits; use a version manager (`rbenv` or `asdf`) installed under your home directory.
- Install Bundler once; from then on use `bundle exec` to run Jekyll with the gems pinned in `Gemfile.lock`.
- `jekyll new mysite` produces a working Minima-themed site you can serve locally with one command.
- Pin a Ruby per project with `rbenv local` so collaborators don't drift.
- The `Gemfile` is the project's dependency manifest - surface knowledge is enough at this stage.

Next, **Anatomy of a Jekyll site: directory layout and `_config.yml`** - open up the scaffolded site and learn what every directory and the central config file do.

