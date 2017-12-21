---
layout: page
title: "Recommended books for software developers"
excerpt: "These are the books that have changed my life. Updated: 11-08-2016"
date: 2015-08-07 00:00:00
permalink: /books/
comments: true
categories: blog
featured: true
image:
  feature: books.png
  credit: Freepik
  creditlink: http://www.freepik.com/free-vector/book-collection-in-flat-design_764791.htm
page-key: books
subscribe_source: books
reads: 
  - thecleancoder
  - softskills
  - smartandgetsthingsdone
  - codecomplete
  - agileppp
  - cleancode
  - pragmaticprogrammer
  - artofunittesting
  - refactoring
  - hfdesignpatterns
  - gofdp
  - dpruby
  - 97things
  - csharpindepth
  - aspnetmvc5
  - jsgoodparts
  - leanstartup
  - steallikeanartist
  - showyourwork
  - interactiondesign
nextreads:
  - effectiveusecases
  - userstoriesapplied
  - legacycode
  - themythicalmanmonth
---

## Not all books have the same lifespan

Some people believe that since technology advances so rapidly, books become obsolete the moment they hit the shelves. Although that's true in some occasions, it ignores an important distinction between different book types.

Knowledge is divided into two categories, *information* and *fundamentals*. The former includes specific knowledge that helps people deal with certain problems and usually has a short lifespan, whereas the latter includes broadly applicable knowledge which isn't constrained to a specific implementation and can be relevant for years.

![The hierarchy of knowledge]({{ site.baseurl }}/images/hierarchy_of_knowledge.png)

Especially books around people and behavior can be relevant for a lifetime, as technology changes but people don't.

Having a solid skill set based on fundamentals can help us learn new technologies on demand, rapidly adapt to new requirements and ultimately live a more fulfilled professional life. Skills based on information have to be built on top of fundamentals.

### Don't judge a book by its ~~cover~~ programming language

Some books that target fundamental knowledge utilize specific programming languages to illustrate their examples. You shouldn't get discouraged and reject the book if you haven't worked with that language before, or even if you don't intend to use it in the future. Fundamental knowledge is widely applicable, and you might notice that reading material about a different programming language makes you a stronger programmer at your main one.

## My book collection (Updated Dec 2017)

This is a hand-picked collection of books that have greatly helped me skyrocket my career and become a better professional. I've read most of them more than once, as the additional experiences I acquire between reads help me see those books in a different light, so and every single time I get to learn something new. I strongly believe that these books worth your time and deserve a spot at your bookcase.

*Full disclosure: when you buy books using the links below I receive some Amazon credits. It doesn't cost you anything extra, but it helps me buy more books <3*

-----

{% for read_key in page.reads %}
<div id="{{read_key}}"></div>
{% assign book = site.reads[read_key] %}
{% assign book_key = read_key %}
{% include book.html %}

-----

{% endfor %}

## Next on my list

-----

{% for read_key in page.nextreads %}
<div id="{{read_key}}"></div>
{% assign book = site.reads[read_key] %}
{% assign book_key = null %}
{% include book.html %}

-----

{% endfor %}

{% include subscribe-inpost.html %}