---
layout: post
title: "The Complete Collection of Microservices Books"
excerpt: "More than enough resources to keep you happily busy in 2019"
permalink: /microservices-books-complete-collection/
comments: true
categories: blog
featured: false
image:
  feature: microservices-books.jpg
reads:
---
Microservices, what a topic!

Everybody seems to be developing microservices, but if you ask a hundred people to describe their approach you will most likely get as many deviating answers.

The reasons are many, but it all boils down to *proper education*.

Blog posts and YouTube videos can be valuable sources of information, but I've found the signal-to-noise ratio to be quite low,  so I don't spend much of my time on these.

On the other hand, any work that is peer-reviewed and goes through a publishing process has a much better chance of giving a high return on investment.

In this post I provide the complete list of Microservices books that I have found to be of good value, and I'm confident that will help you get your skills to the next level.

## Microservice Patterns: With examples in Java, by Chris Richardson

This has been my favorite read of the year, and by far the best book about microservices out there. Chris Richardson has done a fantastic job combining theory with practical examples, while covering a wide range of patterns for Microservices from conception to execution.

Although the code examples are in Java, they can easily be mapped to whatever stack you happen to be working with. As a matter of fact I've already utilized many of the illustrated patterns in dotnet core.

If you can only pick one book to read this year, this is it.

{% assign read_key = "microservicespatterns" %}
{% assign book = site.reads[read_key] %}
{% include book_inarticle.html %}

## .NET Microservices: Architecture for Containerized .NET Applications, by Cesar de la Torre, Bill Wagner, Mike Rousos (free ebook)

Despite being targeted to dotnet core, I found the theory in this book to be exceptionally well presented and independent of the stack.

Now if you happen to work with dotnet core and/or the Azure cloud platform, this is a must-read as you have the additional benefit of using the code examples directly and learn new things about the platform.

It's also free to download, so can easily skim through it and verify whether the content looks valuable to you.

{% assign read_key = "dotnetmicroservices" %}
{% assign book = site.reads[read_key] %}
{% include book_inarticle.html %}

## Building Microservices: Designing Fine-Grained Systems, by Sam Newman

Sam Newman has put together an excellent guide which is now considered a classic, explaining all the ins and outs of moving from monolithic systems to smaller, fine-grained and self-contained services.

I highly recommend this book, especially for those who haven't worked with microservices before or have just gotten a taste and would like to see the bigger picture.

It is a relatively short book (I managed to finish it in less than a week) which doesn't focus on code but rather depicts the new set of practices, challenges and plenty of potential pitfalls that come with this given architectural style.

{% assign read_key = "buildingmicroservices" %}
{% assign book = site.reads[read_key] %}
{% include book_inarticle.html %}

## The Tao of Microservices, by Richard Rodger

This book presents a fresh approach on architecting microservices-based systems, in a succint, honest and conscise way that cuts right to the chase.

The detailed case study of the *nodezoo.com* system, including source code and documentation and accompanied by many great ideas one can utilize in the real world, makes this book stand out and worth exporing, even if you have already read every other book in the topic.

Especially if you work with Node and Javascript, you will find the code examples particularly valuable.

{% assign read_key = "tao-amazon" %}
{% assign book = site.reads[read_key] %}
{% include book_inarticle.html %}

## Microservices: Flexible Software Architecture, by Eberhard Wolff

This was actually the first book I read about microservices, a couple of years ago.

Although a bit dated now, it still includes a ton of useful information, and can be proven quite valuable especially for anyone who's interested in working with the AWS cloud platoform and the Netflix Java stack.

{% assign read_key = "microservices" %}
{% assign book = site.reads[read_key] %}
{% include book_inarticle.html %}

## Domain-Driven Design: Tackling Complexity in the Heart of Software, by Eric Evans

Domain-Driven Design has been proven to be an effective approach for splitting a problem domain into smaller parts and tackling those parts independently. It doesn't just boost our problem solving abilities, but also helps us better match the mental model of a problem domain to the design of our software.

Although the book was published long before microservices were a thing, it turns out that the *DDD* methodology is a natural fit for designing microservices. Hence, this is an essential read for anyone who works with microservices or intends to do so.

{% assign read_key = "dddericevans" %}
{% assign book = site.reads[read_key] %}
{% include book_inarticle.html %}

## Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems, by Martin Kleppmann

I've mentioned this book several times in my posts, and I intend to keep doing so. It's an extremely valuable read, not only for those who work with microservices, but really with any distributed application that revolves around data.

Data is in the heart of most challenges related to systems design today. Architects have plenty of data-centric challenges to tackle, including scalability, consistency, reliability, efficiency, and maintainability. On top of that there are numerous platforms and tools that can be leveraged to achieve each project’s design goals, including relational / document / graph databases, stream / batch processors, web APIs and message brokers.

Martin Kleppmann not only helps you make sense of all the buzzwords, but also guides you through this diverse landscape by doing deep dives of how each piece of technology works under the hood, what are their pros and cons, and under which circumstances it’s a good idea to use them. Apart from the theory, the book comes with plenty of practical advice you can start leveraging on your day to day work right away.

As of today, this is the most well-written, comprehensive and modern book about working with data. It’s destined to become a classic.

{% assign read_key = "dataintensive" %}
{% assign book = site.reads[read_key] %}
{% include book_inarticle.html %}

## The Devops Handbook, by Gene Kim, Patrick Debois, John Willis



{% assign read_key = "devops" %}
{% assign book = site.reads[read_key] %}
{% include book_inarticle.html %}

## Bonus: Microservices Development on Azure with Java [Video Course], by Tasos Piotopoulos

{% assign read_key = "azure-java-microservices" %}
{% assign book = site.reads[read_key] %}
{% include book_inarticle.html %}

## Conclusion

My gratitude goes to the authors, who have managed to distill their precious knowledge and deliver them into a convenient package, so powerful that can shape whole careers.

The books in this post can keep you happily busy for a really long time; depending on your reading pace, this could be more than a full year. A good goal would be roughly one book per month or two months. And if you're hungry for more, have a look at at my full hand-picked collection of [recommended books for software developers]({{ site.url }}/books/).

I suggest that you carve out between 30 or 60 minutes of reading a day, perhaps while commuting or during lunch, and I promise that it won't be long before you start noticing the difference in your perfomance at work.

Have you already read any of the books above? Is there any other good read about Microservices that is missing from the list? Let me know by dropping a comment below.

If you enjoyed this post and you would like to see more of my content, you can [subscribe to my newsletter](http://eepurl.com/b_W2G9) and I will keep you posted.

Happy new year and happy reading!<br>
Cheers,<br>Tasos
