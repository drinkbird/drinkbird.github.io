---
layout: course-index
course_slug: jekyll-engineering-blog-github-pages
permalink: /courses/jekyll-engineering-blog-github-pages/
title: "How to create an engineering blog with Jekyll and host it on GitHub Pages on a custom domain"
image: course-jekyll.jpg
description: "A free, hands-on course that takes you from your first `jekyll new` to a polished engineering blog live on your own domain - with SEO, social previews, GitHub Actions deployment, dark mode, and a writing workflow you can sustain."
last_updated: 2026-05-24
depth: intermediate
goal: "Ship a polished personal engineering blog with a custom domain."
time_budget: "10-15 hours (deep)"
created_at: 2026-05-24T00:41:11Z
modules:
  - id: 1
    slug: foundations
    dir: 01-foundations
    title: "Foundations: From web pages to a Jekyll site"
    summary: "Get oriented to static site generation, install Jekyll locally, and understand the shape of a Jekyll project end-to-end."
    learning_objectives:
      - "Explain what a static site generator is and why Jekyll fits an engineering blog"
      - "Install Ruby and Jekyll on macOS/Linux without polluting the system Ruby"
      - "Read a Jekyll project layout and the role of `_config.yml`"
      - "Write a first post with front matter and Markdown"
      - "Run the local build and serve loop and inspect the generated `_site`"
  - id: 2
    slug: jekyll-model
    dir: 02-jekyll-model
    title: "The Jekyll model: Layouts, Liquid, and content"
    summary: "Internalise Jekyll's templating and content model so you can shape it to your blog rather than fight the defaults."
    learning_objectives:
      - "Compose pages from layouts and includes"
      - "Read and write Liquid templates with confidence"
      - "Design a permalink structure deliberately"
      - "Decide when a custom collection is justified"
      - "Drive site-wide content from `_data/*.yml`"
  - id: 3
    slug: building-the-blog
    dir: 03-building-the-blog
    title: "Applied: Building the blog itself"
    summary: "Use the Jekyll model to build the actual blog - pick a starting point, customize it tastefully, and shape the reader's path through the site."
    learning_objectives:
      - "Choose between a starter theme and building from scratch"
      - "Override theme files without forking the whole gem"
      - "Design the homepage, post page, and archive deliberately"
      - "Set up code blocks and typography suited to engineering writing"
      - "Build helpful navigation with tags and categories"
  - id: 4
    slug: production-polish
    dir: 04-production-polish
    title: "Production polish: SEO, social, feeds, analytics"
    summary: "Add the production-grade niceties that turn a working blog into one people can actually find, share, and follow."
    learning_objectives:
      - "Set up SEO meta tags and a sitemap"
      - "Make shared links render rich previews on social platforms"
      - "Publish a sensible RSS feed"
      - "Add privacy-friendly analytics without dark patterns"
      - "Keep page weight under control with responsive images"
  - id: 5
    slug: github-pages-and-custom-domain
    dir: 05-github-pages-and-custom-domain
    title: "GitHub Pages and a custom domain"
    summary: "Deploy the blog to GitHub Pages, switch to GitHub Actions when you outgrow the safelist, and wire up a custom domain end-to-end."
    learning_objectives:
      - "Understand the difference between the Pages built-in build and Actions-based builds"
      - "Set up a user or project Pages site correctly"
      - "Build with GitHub Actions for full plugin support"
      - "Configure DNS for an apex or `www` custom domain"
      - "Enforce HTTPS and verify the live deployment"
  - id: 6
    slug: capstone
    dir: 06-capstone
    title: "Capstone: Workflow, polish, and what's next"
    summary: "Make the blog something you can sustain - a writing workflow that fits your editor, CI guardrails for prose, performance and accessibility passes, and a sense of when to grow further."
    learning_objectives:
      - "Set up a writing workflow that respects drafts and scheduled posts"
      - "Add editorial CI: link checking, HTML validation, spell check"
      - "Run a meaningful performance audit and act on it"
      - "Pass an accessibility check and implement dark mode well"
      - "Decide what to invest in next (search, comments, newsletter)"
---

This course walks you end-to-end from "what is a static site generator?" to a polished engineering blog live on your own domain - with editorial CI, sensible analytics, social previews, dark mode, and a writing workflow you can actually sustain.

It is heavily applied. Each chapter ends with a short quiz so you can check that the ideas stuck before you move on. Use the **Mark chapter as complete** button at the bottom of each chapter to track your progress on this device - there's no account and nothing leaves your browser.
