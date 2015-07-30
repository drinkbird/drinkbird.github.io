---
layout: page
title: Recommended books for software developers
excerpt: These are the books that have changed my life.
permalink: /books/
page-key: books
image:
  feature: books.png
  credit: Freepik
  creditlink: http://www.freepik.com/free-vector/book-collection-in-flat-design_764791.htm
---

## A few thoughts on books

Some people argue that since technology advances so rapidly, technical books become obsolete the moment they hit the shelves. Such argument simply doesn't stand, as long as books are chosen wisely.

There are two distinct categories of knowledge: *information* and *fundamentals*. The former includes specific knowledge that helps people deal with certain problems and usually have a short lifespan, such as *how to program in C# 5 using Entity Framework 6*, whereas the latter includes broadly applicable knowledge which isn't constrained to a specific implementation and can last a lifetime, such as *soft skills for software developers*.

Having a solid skillset based on fundamentals can help professionals learn new technologies on demand, rapidly adapt to new requirements and ultimately live a more fulfilled life. Skills based on information have to be built on top of that.

![The hierarchy of knowledge]({{ site.baseurl }}/images/hierarchy_of_knowledge.png)

### A word of caution

Some books that target fundamental knowledge utilize specific programming languages to illustrate their examples. The readers shouldn't get discouraged or intimidated if they haven't worked with that language before, or if they don't intend to use it in the future. As mentioned above, fundamental knowledge is widely applicable, and that fact extends to other programming languages as well.

## My book collection

Here is a hand-picked collection of the books that have greatly helped me improve my life, both in a professional and a personal level. I've read most of them more than once. Every single time I get to learn something new by seeing those books in a different light, mostly due to the additional experiences I have acquired between reads. I strongly believe that these books are totally worth the reader's time.

{% for book in site.books %}
{% include book.html %}
{% include books/{{ book.tag }}.html %}
{% endfor %}