---
layout: post
title: "NIH: Reinventing the wheel is immoral"
excerpt: "The Not Invented Here syndrome is a disease for the software industry. Learn how to spot it and eliminate it."
permalink: /not-invented-here
comments: true
categories: blog
featured: true
image:
  feature: NIH.png
#  credit: pixabay
#  creditlink: "https://pixabay.com/en/no-stopping-sign-road-sign-signage-910003/" # CC0
reads:
  - cleanarchitecture
  - xunit
  - thecleancoder
  - agileppp
  - cleancode
  - refactoring
  - legacycode
  - codecomplete
  - leanstartup
  - artofunittesting
  - softskills
  - themythicalmanmonth
  - effectiveusecases
  - userstoriesapplied
  - domaindrivendesign
  - pragmaticprogrammer
  - gofdp
  - hfdesignpatterns
  - 97things
  - dpruby
---

Every modern software service or product is comprised of several different moving parts, from simple tooling to runtimes, frameworks, libraries, messaging systems, data stores, web servers, load balancers, caches and much more. Companies hire us, software engineers, to put that puzzle together and help them fulfill their business goals, which usually include making or saving money.

Oftentimes part of our job is to decide (or influence the decision) on whether to build a given component in-house, or use an existing opensource / proprietary solution off the shelf. Each choice comes with its own cost and risk, and the answer is not always straightforward, but ultimately we are responsible for providing an educated and fully-informed input.

In many cases, such a decision might affect the system's overall cost, quality, security, timeline, required talent etc. Needless to say that it cannot be taken lightly.

Unfortunately, the industry is plagued by a cognitive bias called [the Not Invented Here syndrome](https://en.wikipedia.org/wiki/Not_invented_here) (NIH), which drives us towards rejecting all possible existing solutions by default, in favor of implementing a new one from scratch.

![Reinvent all the things]({{ site.baseurl }}/images/reinvent.png)

# Standing upon the shoulders of giants

Today we have many spectacular solutions at our disposal. We are able to perform extremely hard tasks with ease, due to decades of hard work and pioneering by our predecessors.

In any given software stack, all common and recurring problems have already been solved. The solutions come in many forms, such as high-level language features, functions within a platform's standard client library, or third-party components. When consuming an external system there is usually an accompanying client library to help us. When working on the cloud there are myriads of services and features we can snap together and formulate elegant solutions.

That's really extraordinary. It means that we can avoid tons of expensive technical work that others have already done for us, as it generally doesn't make sense to waste resources coding things we can buy or get ready-made. Instead, we can focus on spending our time doing what we were hired for in the first place, that is delivering value by coding our business rules into working software.

![Isaac Newton Quote. If I have seen further than others it is by standing upon the shoulders of giants.]({{ site.baseurl }}/images/isaac-newton-giants.jpg)

If we were building a new house we would buy ready-made cabinets, doors, windows, kitchen counters, ovens, refrigerators, dishwashers etc. Unless we were some kind of mechanical/woodworking geniuses, we wouldn't consider building them ourselves.

When building software systems we are supposed to do the same thing. It makes no sense to write our own mechanisms for things like logging, caching, dependency injection, user authentication / authorization, XML/JSON serialization, load balancing, analytics, web apis, and many many more.

Yet so many of us fall into the NIH trap, often causing irreversible damage to our system and business. What kind of thinking could lead us into such a mess? Let's examine some common misconceptions.

## Misconception 1: In-house implementations are faster to develop

We tend to believe that writing our own code is faster than learning how to use someone else's. And because we're always too busy, we feel that we don't have enough time to properly evaluate existing solutions. 

![Too busy]({{ site.baseurl }}/images/too-busy.jpg)

When we do evaluate an existing solution, the process is often superficial and biased. We only spend a few moments brushing over the basics just to quickly reject them as inelegant, complex or unsuitable. The idea of a shiny new implementation quickly takes over, and a proverbial hand starts patting us on the back for the great job we're about to do.

What really happens is that in-house implementations *feel* like they are quicker to develop, but usually the fast part is coming up with a rough idea of what needs to be done. Dealing with detailed planning, execution, quality assurance and maintenance phases, though, is a whole different story.

Any solution should come *at minimum* with a good suite of automated tests and sufficient documentation, and skipping any of that in hope to go faster is a recipe for disaster. Such speed benefits are only short-term, and the technical debt we create of ourselves slows us down significantly just a few steps later.

Speed-wise, we should also be thinking about how good our team is with estimations. Do we miss our targets often? Do we spend most of our time fixing bugs, while core business behaviors are left waiting in the backlog? If any of that is true, it's probably not a good idea to put more work our way, especially if we can avoid it by using an existing implementation.

## Misconception 2: In-house implementations are cheaper








Before committing to a new implementation we should think hard about why existing solutions don't work for us.




* In-house implementations regarded as more controlled
* In-house implementations regarded as cheaper (licensing)
* In-house implementations regarded as better (overhead, lack of documentation, lack of tests, battle tested)
* In-house implementations regarded as more secure (security through obscurity)
* Bonus: CV-Driven Development (learning on someone else's dollar)

innovative?



imaginary scaling problems





WASTE

In many companies NIH is a major source of wasted resources. Left unchecked, it can turn a codebase into a graveyard of ambitious half-baked projects.

focus on building business logic.

Am I the chosen one?


* we are fully-aware of the different cost and risk that each choice bears
* we clearly communicate that information to our team members and tech leads
* we put our system's best interests before our personal ones (after all, [as engineers we are also stakeholders](http://blog.drinkbird.com/all-about-results) of the systems we work on)

# The different cost and risk of each choice


context and principles.

Just keep in mind that the ease and simplicity of scaling that we can get today is built on decades of hard work and pioneering of our predecessors.

innovation bears the burden of proof




half-baked solutions is the most reliable way to self-sabotage our systems
