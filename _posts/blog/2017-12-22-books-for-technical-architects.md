---
layout: post
title: "Three architecture books I keep handing to engineers"
excerpt: "The patterns and trade-offs in these books outlast every framework cycle."
permalink: /best-books-on-software-architecture/
comments: true
categories: blog
tags:
  - books
  - architecture
featured: true
updated: 2026-05-26
image:
  feature: archbooks.jpg
# https://pixabay.com/en/architect-book-books-shelf-791707/
subscribe_source: arch-books
reads:
  - cleanarchitecture
  - buildingmicroservices
  - domaindrivendesign
  - releaseit
  - building-evolutionary-architectures
  - microservicespatterns
  - dataintensive
---

Architecture is one of those areas where the fundamentals barely move. Stacks change every couple of years, the patterns and trade-offs underneath them change far more slowly. These three books are the ones I keep handing to engineers stepping into distributed systems work, whether they're building cloud-native services or wrestling with a legacy monolith.

<p class="affiliate-disclosure"><small><strong>Affiliate disclosure:</strong> book links are Amazon affiliate links. Buying through them doesn't cost you more, and it helps me buy the next round of books.</small></p>

-----

{% for read_key in page.reads %}
{% assign book = site.reads[read_key] %}
{% assign book_key = read_key %}
{% assign book_display_description = true %}
{% include book.html %}

-----

{% endfor %}

Got any book suggestions of your own? Don't hesitate to drop a line in the comments below! And if you're hungry for more, have a look at at my full hand-picked collection of [recommended books for Software Industry professionals]({{ site.url }}/books/). Happy reading!
