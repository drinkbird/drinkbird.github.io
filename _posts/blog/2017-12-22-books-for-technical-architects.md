---
layout: page
title: "Best 3 books on Software Architecture to read in 2018"
excerpt: "Level-up your new year's resolutions!"
permalink: /best-books-on-software-architecture/
comments: true
categories: blog
featured: true
image:
  feature: archbooks.jpg
# https://pixabay.com/en/architect-book-books-shelf-791707/
subscribe_source: arch-books
reads:
  - cleanarchitecture
  - buildingmicroservices
  - dataintensive
---

Having survived an intensive year of designing, developing, shipping and operating numerous cloud-native microservices at scale, makes me appreciate the books that helped me step up my engineering game.

The following 3 books are by far the best resources on software architecture you can add to your *TODO* list for 2018. They are ideal for all software engineers and technical architects who deal with any kind of cloud / distributed systems.

-----

{% for read_key in page.reads %}
{% assign book = site.reads[read_key] %}
{% assign book_key = read_key %}
{% assign display_book_description = true %}
{% include book.html %}

-----

{% endfor %}

Got any book suggestions of your own? Don't hesitate to drop a line in the comments below! And if you're hungry for more, have a look at at my full hand-picked collection of [recommended books for software developers]({{ site.url }}/books/). Happy new year, and happy reading!

-----

{% include subscribe-inpost.html %}