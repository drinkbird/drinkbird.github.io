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
  - turntheshiparound
  - radicalcandor
---


{% capture intro %}
<div class="collection-anchor" id="collection-top"></div>

These hand-picked book collections shaped how I think, how I build software, and how I lead engineers. The first collection, Leadership, People & Teams, is the centre of gravity: this is an engineering leadership blog, and these are the books I would hand to any engineer growing into the work of running teams and organisations.

Whether you are a Software Engineer, Tech Lead, Architect, or Manager, you will find something here that deserves a spot in your personal collection. I have read most of these more than once, as the experiences I acquire between reads help me see the same ideas in a different light. [My thoughts on books](#thoughts) live at the end.

> You can only connect the dots looking backwards. -- Steve Jobs

I update this list once or twice a year. To get notified when that happens, <a href="#mc_embed_signup">subscribe to the DrinkBird newsletter</a> (a very low frequency newsletter).

Jump to collection:

<ul>
{% for book_collection_key in page.book_collections %}{% assign book_collection = site.books | where: 'slug', book_collection_key | first %}
<li><a href="#collection-{{ book_collection.slug }}">{{ book_collection.title }}</a></li>
{% endfor %}
</ul>

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

<div class="collection-anchor" id="start-here"></div>

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

<a href="{{ book_collection.url }}">View full book descriptions</a>

  {% assign collection_books = book_collection.books %}
<div class="row display-flex">
  {% for book_key in collection_books %}
    {% assign book = site.reads[book_key] %}
  <div class="col-xs-6 col-sm-4 col-md-3">
    {% include book-short.html %}
  </div>
  {% endfor %}
</div>

<a href="#collection-top">Back to top</a>

{% endfor %}

-----

<div class="anchor" id="thoughts"></div>

## Thoughts on books

### Not all books have the same lifespan

Some people believe that since technology advances so rapidly, books become obsolete the moment they hit the shelves. Although that's true in some occasions, it ignores an important distinction between different book types.

Knowledge is divided into two categories, *information* and *fundamentals*. The former includes specific knowledge that helps people deal with certain problems and usually has a short lifespan, whereas the latter includes broadly applicable knowledge which isn't constrained to a specific implementation and can be relevant for years.

![The hierarchy of knowledge]({{ site.baseurl }}/images/hierarchy_of_knowledge.png)

Especially books about people and behaviour can be relevant for a lifetime, as technology changes but people don't.

A solid skill set based on fundamentals can help us learn new technologies on demand, rapidly adapt to new requirements and ultimately live a more fulfilled professional life. We have to build skills based on information on top of fundamentals.

*Note: I have included a few exceptional books that live in the cross-section between information and fundamentals. I try to keep those in my lists only as long as they remain relevant.*

### Don't judge a book by its ~~cover~~ programming language

It is common for books that target fundamental knowledge to utilise specific programming languages to illustrate their examples. Some people get discouraged and reject the book if they haven't worked with that language or have no intention of using it in the future.

Fundamental knowledge is widely applicable. Learning a concept or technique in one technology stack and transferring the implementation to another should be business as usual. Smart engineers have no such limits.

### Success is a process, not a moment

Investing in your craft takes a lot of time and effort. Reading one book won't bring you success overnight, but creating a habit of reading books regularly - along with plenty of practice - will transform you into a better engineer and stronger professional.

Got any book suggestions of your own? Don't hesitate to drop a line in the comments below!

Did you enjoy this post? Spread the word by giving it a share, and happy coding! `:)`
