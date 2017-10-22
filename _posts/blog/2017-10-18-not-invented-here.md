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

Unfortunately, the industry is plagued by a cognitive bias called the *[Not Invented Here](https://en.wikipedia.org/wiki/Not_invented_here)* syndrome (NIH), which drives us towards rejecting all possible existing solutions by default, in favor of implementing a new one from scratch.

![Reinvent all the things]({{ site.baseurl }}/images/reinvent.png)

# Standing on the shoulders of giants

Today we have many spectacular solutions at our disposal. We are able to perform extremely hard tasks with ease, due to decades of hard work and pioneering by our predecessors.

In any given software stack, all common problems have already been solved. The solutions come in many forms, such as high-level language features, functions of a platform's standard client library, or third-party components. When consuming a third-party system there is usually an accompanying client library to help us. When working on the cloud there are myriads of services and features we can snap together and formulate elegant solutions.

That's really extraordinary. It means that we can stand on the shoulders of giants and avoid tons of expensive labor that others have already done for us, as it generally doesn't make sense to code things we can buy or get prefabricated. Instead, we can exclusively focus on spending our time doing what we were hired for in the first place, that is delivering value by coding our unique business rules into working software.

If we were building a new house we would buy ready-made cabinets, doors, windows, kitchen counters, ovens, refrigerators, dishwashers etc. Unless we were some kind of mechanical/woodworking geniuses, we wouldn't consider building them ourselves. When building software systems we should do the same thing. It would make no sense to write our own mechanisms for doing things like dependency injection, serving http requests, logging, caching, user authentication / authorization, XML/JSON serialization, load balancing, analytics, etc.

Yet so many of us fall into the NIH trap and fail spectacularly. We end up reinventing the wheel again and again, until our project's budget is blown and most fellow programmers have left us in search of a better, more sane team.

What kind of mindset could lead us into such a mess?

Pitfalls:

* In-house implementations regarded as more flexible
* In-house implementations regarded as cheaper (licensing)
* In-house implementations regarded as better (overhead, lack of documentation, lack of tests, battle tested)
* In-house implementations regarded as more secure (security through obscurity)
* Bonus: CV-Driven Development (learning on someone else's dollar)





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