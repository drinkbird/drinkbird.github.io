---
layout: page
title: "Recommended books for professionals of the Software Industry"
excerpt: "A collection of reads for Software Engineers, DevOps Engineers, Architects and Managers. Updated June 2019."
permalink: /books/
comments: true
categories: blog
featured: true
image:
  feature: books2.png
# creditlink: http://www.freepik.com/free-vector/book-collection-in-flat-design_764791.htm
page-key: books
subscribe_source: books
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
oldreads:
  - aspnetmvc5
  - jsgoodparts
---

{% capture intro %}
## Updated June 2019

This hand-picked collection of books has helped my skyrocket my career in the Software Industry. Apart from pushing me to become a better professional, they have also inspired me to pursue personal goals and overall achieve more in life. This intro used to be much longer, but I have decided to move [my thoughts on books](#thoughts) to the end, and cut right to the chase instead.

Whether you are a Software Engineer, DevOps Engineer, Architect or Manager, I guarantee that you can find something that deserves a spot in your personal book collection. Most of the books in this list I have read more than once, as the experiences I acquire between reads help me see that knowledge in a different light.

> You can only connect the dots looking backwards. -- Steve Jobs

I tend to update this list about once a year. To get notified when this happens, you can <a href="http://eepurl.com/b_W2G9" target="_blank">subscribe to the DrinkBird newsletter</a> (this is a very low frequency newsletter).

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

-----

{% for read_key in page.reads %}
{% assign book = site.reads[read_key] %}
{% assign book_key = read_key %}
{% assign display_book_description = true %}
{% include book.html %}

-----

{% endfor %}

## Other reads

-----

{% for read_key in page.nextreads %}
{% assign book = site.reads[read_key] %}
{% assign book_key = read_key %}
{% assign display_book_description = false %}
{% include book.html %}

-----

{% endfor %}

## Older recommendations

-----

{% for read_key in page.oldreads %}
{% assign book = site.reads[read_key] %}
{% assign book_key = read_key %}
{% assign display_book_description = true %}
{% include book.html %}

{% endfor %}


-----

<div class="anchor" id="thoughts"></div>
## Not all books have the same lifespan

Some people believe that since technology advances so rapidly, books become obsolete the moment they hit the shelves. Although that's true in some occasions, it ignores an important distinction between different book types.

Knowledge is divided into two categories, *information* and *fundamentals*. The former includes specific knowledge that helps people deal with certain problems and usually has a short lifespan, whereas the latter includes broadly applicable knowledge which isn't constrained to a specific implementation and can be relevant for years.

![The hierarchy of knowledge]({{ site.baseurl }}/images/hierarchy_of_knowledge.png)

Especially books around people and behavior can be relevant for a lifetime, as technology changes but people don't.

Having a solid skill set based on fundamentals can help us learn new technologies on demand, rapidly adapt to new requirements and ultimately live a more fulfilled professional life. Skills based on information have to be built on top of fundamentals.

I have also included a few exceptional books that live in the cross section between information and fundamentals. These are tagged as `Niche` and make the most sense for people who work day to day with these specific technologies.

### Don't judge a book by its ~~cover~~ programming language

Some books that target fundamental knowledge utilize specific programming languages to illustrate their examples. You shouldn't get discouraged and reject the book if you haven't worked with that language before, or even if you don't intend to use it in the future. Fundamental knowledge is widely applicable, and you might notice that reading material about a different programming language makes you a stronger programmer at your main one.
