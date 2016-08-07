---
layout: page
title: "Recommended books for software developers"
excerpt: "These are the books that have changed my life. Updated: 13-12-2015"
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
reads: 
  - softskills
  - thecleancoder
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
## Some books can last for a lifetime

People sometimes argue that since technology advances so rapidly, technical books become obsolete the moment they hit the shelves. Such argument simply doesn't stand, as long as books are chosen wisely.

There are two distinct categories of knowledge: *information* and *fundamentals*. The former includes specific knowledge that helps people deal with certain problems and usually have a short lifespan, such as *how to program in C# 5 using Entity Framework 6*, whereas the latter includes broadly applicable knowledge which isn't constrained to a specific implementation and can last a lifetime, such as *soft skills for software developers*.

Having a solid skillset based on fundamentals can help professionals learn new technologies on demand, rapidly adapt to new requirements and ultimately live a more fulfilled life. Skills based on information have to be built on top of that.

![The hierarchy of knowledge]({{ site.baseurl }}/images/hierarchy_of_knowledge.png)

### Don't judge a book by its ~~cover~~ programming language

Some books that target fundamental knowledge utilize specific programming languages to illustrate their examples. You shouldn't get discouraged or intimidated if you haven't worked with that language before, even if you don't intend to use it in the future. As mentioned above, fundamental knowledge is widely applicable, and that fact also extends to other programming languages and paradigms.

## My book collection (Updated 06 Aug 2016)

This is a hand-picked collection of the books that have greatly helped me improve my life, both in a professional and a personal level. I've read most of them more than once. Every single time I get to learn something new by seeing those books in a different light, mostly due to the additional experiences I have acquired between reads. I strongly believe that these books are totally worth your time.

{% for read_key in page.reads %}
{% assign book = site.reads[read_key] %}
{% include book.html %}
{% include books/{{ read_key }}.html %}

-----

{% endfor %}

## Next on my list

<div class="row">
{% for read_key in page.nextreads %}
<div class="col-md-3">
{% assign book = site.reads[read_key] %}
{% include book.html %}
</div>
{% endfor %}
</div>

-----

{% include subscribe-inpost.html %}