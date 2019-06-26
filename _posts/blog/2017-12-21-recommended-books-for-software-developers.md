---
layout: page
title: "Recommended books for Software Industry professionals"
excerpt: "Book collections on Software Engineering, DevOps, Architecture and Management. Updated June 2019."
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
  - software-engineering-architecture-microservices
  - software-engineering-software-development
  - software-engineering-career-building-professionalism-inspiration
  - governance-product-technical-project-management

reads:
  - careerguide
  - cleanarchitecture
  - buildingmicroservices
  - dataintensive
  - cleancode
  - 97things
  - softskills
  - thecleancoder
  - smartandgetsthingsdone
  - pragmaticprogrammer
  - codecomplete
  - artofunittesting
  - xunit
  - refactoring
  - hfdesignpatterns
  - gofdp
  - dpruby
  - leanstartup
  - theaccidentalcreative
  - steallikeanartist
  - showyourwork
  - interactiondesign
  - nojsyet1
  - agileppp
  - aspnetcoremvc
  - csharpindepth
  - fsharp3
nextreads:
  - peopleware
  - themythicalmanmonth
  - userstoriesapplied
  - clrviacsharp
  - legacycode
  - realworldfp
---

{% capture intro %}
<div class="collection-anchor" id="collection-top"></div>
**Updated June 2019**

These hand-picked book collections have helped my skyrocket my career in the Software Industry. Apart from pushing me to become a better professional, they have also inspired me to pursue personal goals and overall achieve more in life. This intro used to be much longer, and all the book descriptions used to be in this page, but I have decided to move [my thoughts on books](#thoughts) to the end and book descriptions at their respective collection's page.

Whether you are a Software Engineer, DevOps Engineer, Architect or Manager, I guarantee that you can find something that deserves a spot in your personal book collection. Most of the books in this list I have read more than once, as the experiences I acquire between reads help me see that knowledge in a different light.

> You can only connect the dots looking backwards. -- Steve Jobs

I tend to update this list about once or twice a year. To get notified when this happens, you can <a href="http://eepurl.com/b_W2G9" target="_blank">subscribe to the DrinkBird newsletter</a> (a very low frequency newsletter).

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

Especially books around people and behavior can be relevant for a lifetime, as technology changes but people don't.

Having a solid skill set based on fundamentals can help us learn new technologies on demand, rapidly adapt to new requirements and ultimately live a more fulfilled professional life. Skills based on information have to be built on top of fundamentals.

*Note: I have included a few exceptional books that live in the cross section between information and fundamentals. I make an effort to keep those in my lists only as long as they remain relevant.*

### Don't judge a book by its ~~cover~~ programming language

It is common for books that target fundamental knowledge to utilize specific programming languages to illustrate their examples. Some people get discouraged and reject the book if they haven't worked with that language before, or have no intention of using it in the future.

Fundamental knowledge is widely applicable. Learning a concept or technique in one technology stack and transferring the implementation to another should be business as usual. Smart engineers have no such limits.

### Success is a process, not a moment

Investing in your craft takes a lot of time and effort. Reading one book won't bring you success overnight, but creating a habit of reading books regularly - along with plenty of practice - will definitely transform you to a better engineer and stronger professional.

Got any book suggestions of your own? Don't hesitate to drop a line in the comments below!

Did you enjoy this post? Spread the word by giving it a share, and happy coding! `:)`
