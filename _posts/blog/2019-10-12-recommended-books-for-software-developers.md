---
layout: page
title: "Recommended books for Software Industry professionals"
excerpt: "Recommended reading on engineering leadership, software architecture, craft, and career."
permalink: /books/
comments: true
categories: blog
featured: true
image:
  feature: books2.png
# creditlink: http://www.freepik.com/free-vector/book-collection-in-flat-design_764791.htm
page-key: books
subscribe_source: books
book_collections:
  - leadership-people-and-teams
  - engineering-organizations-and-delivery
  - software-architecture-and-systems
  - craft-and-career
start_here:
  - peopleware
  - thephoenix
  - accelerate
  - radicalcandor
---


{% capture intro %}
<div class="collection-anchor" id="collection-top"></div>

Most of these books I have read more than once, and a few I keep gifting to colleagues. They are the ones that actually shifted how I think about software and the teams that build it. Not the ones that sounded impressive on a reading list, and not the ones that go out of date when the framework does.

The *Leadership, People & Teams* collection is the biggest. The higher I have gone in my career, the less my problems have been technical. The other three collections are the canon I leaned on while I was mostly writing code, and they still earn their place.

I update this list every so often. *Last updated: May 2026.* To get notified of future updates, <a href="#mc_embed_signup">subscribe to the DrinkBird newsletter</a>.

[My thoughts on books](#thoughts) live at the end.

<p class="affiliate-disclosure"><small><strong>Affiliate disclosure:</strong> book links are Amazon affiliate links. Buying through them doesn't cost you more, and it helps me buy the next round of books.</small></p>

<p class="collection-jumplist">
{% for book_collection_key in page.book_collections %}{% assign book_collection = site.books | where: 'slug', book_collection_key | first %}<a href="#collection-{{ book_collection.slug }}">{{ book_collection.title }}</a>{% unless forloop.last %} · {% endunless %}{% endfor %}
</p>

{% endcapture %}

<div class="row">
  <div class="col-md-3 col-md-push-9">
    {% include author.html %}
    {% include subscribe-aside.html %}
  </div>
  <div class="col-md-9 col-md-pull-3">
    {{ intro | markdownify }}
  </div>
</div>

{% if page.start_here %}
-----

<div class="collection-anchor" id="collection-start-here"></div>

## Start here

If you only read five from this list, read these. Together they cover the people, the organisation, the systems, and the craft of leading engineers without losing what makes engineering good.

<div class="row display-flex">
{% for book_key in page.start_here %}
  {% assign book = site.reads[book_key] %}
  <div class="col-xs-6 col-sm-4 col-md-3">
    {% include book-short.html %}
  </div>
{% endfor %}
</div>

<a href="#collection-top">Back to top</a>

{% endif %}

{% for book_collection_key in page.book_collections %}
  {% assign book_collection = site.books | where: 'slug', book_collection_key | first %}

-----

<div class="collection-anchor" id="collection-{{book_collection_key}}"></div>

## {{ book_collection.title }}
{{ book_collection.content | markdownify }}

{% if book_collection.spotlight %}
  {% assign spotlight_key = book_collection.spotlight %}
  {% assign spotlight_book = site.reads[spotlight_key] %}
<div class="row collection-spotlight">
  <div class="col-xs-6 col-sm-4 col-md-3">
    {% assign book = spotlight_book %}
    {% assign book_key = spotlight_key %}
    {% include book-short.html %}
  </div>
  <div class="col-xs-12 col-sm-8 col-md-9">
    <h3 class="spotlight-header">Spotlight: <em>{{ spotlight_book.title }}</em></h3>
    <p class="lead">{{ book_collection.spotlight_pitch }}</p>
    <p><a href="{{ book_collection.url }}#{{ spotlight_key }}">Read why this book matters</a> · <a href="{{ book_collection.url }}">View the full collection</a></p>
  </div>
</div>
{% endif %}

<div class="row display-flex">
  {% for book_key in book_collection.books %}
    {% unless book_key == book_collection.spotlight %}
      {% assign book = site.reads[book_key] %}
  <div class="col-xs-6 col-sm-4 col-md-3">
    {% include book-short.html %}
  </div>
    {% endunless %}
  {% endfor %}
</div>

<a href="#collection-top">Back to top</a>

{% endfor %}

-----

<div class="anchor" id="thoughts"></div>

## Thoughts on books

### Not all books have the same lifespan

Technologies move quickly, which makes some people believe books become obsolete the moment they hit the shelves. That's true in narrow cases. The more useful distinction is between *information* and *fundamentals*.

Information is the specific knowledge that helps you solve today's problem in today's stack: API changes, framework idioms, configuration recipes. Short half-life. Fundamentals are the underlying ideas that apply across stacks and decades: how to model a domain, how to instrument a system, how to lead the people who build it. Books about people and behaviour especially can be relevant for a lifetime, because technology changes but people don't.

![The hierarchy of knowledge]({{ site.baseurl }}/images/hierarchy_of_knowledge.png)

The lists above are heavily weighted toward fundamentals. A few entries live at the boundary. I keep them as long as they remain relevant and drop them when they don't.

### Success is a process, not a moment

Reading one book won't transform your career. Reading regularly across years, especially across topics outside your current job, will. The habit compounds faster than the work.

Got a book worth adding to one of these lists? Drop a line in the comments.
