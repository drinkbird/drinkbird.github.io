source "https://rubygems.org"

# Pin Jekyll directly. The site is deployed via .github/workflows/jekyll.yml
# (actions/upload-pages-artifact + deploy-pages), so the github-pages safelist
# no longer applies and we can run on a current Jekyll release.
gem "jekyll", "~> 4.3"

# Required separately on Jekyll 4 when _config.yml sets `kramdown: input: GFM`.
gem "kramdown-parser-gfm"

# Stick with the libsass (sassc) Sass converter rather than the dart-sass
# default of jekyll-sass-converter 3.x. The bundled Bootstrap 3 Sass was
# written for libsass and dart-sass would error on its legacy syntax.
gem "jekyll-sass-converter", "~> 2.2"

# Plugins. Same set as before, just declared directly instead of inherited
# from the github-pages metapackage.
group :jekyll_plugins do
  gem "jekyll-sitemap"
  gem "jekyll-redirect-from"
  gem "jekyll-feed"
end

# Dev/local-only server bits.
gem "webrick"

# Stdlib gems no longer bundled by default in Ruby 3.4+.
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"
