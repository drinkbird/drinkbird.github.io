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

Unfortunately, the industry is plagued by a cognitive bias called the *Not Invented Here* syndrome (NIH). This makes us reject all possible existing solutions by default, and drives us towards reinventing the wheel.

![Reinvent all the things]({{ site.baseurl }}/images/reinvent.png)

In-house implementation pros:
* no license issues

Pitfalls:
In-house implementations regarded as more flexible
In-house implementations regarded as cheaper
In-house implementations regarded as better (overhead, lack of documentation, lack of tests)
In-house implementations regarded as more secure (security through obscurity)
In-house implementations regarded as interesting challenges for the team (learning on someone else's dollar)
Bonus: CV-Driven Development


WASTE
graveyard of ambitious wheel reinventions

focus on building business logic.




* we are fully-aware of the different cost and risk that each choice bears
* we clearly communicate that information to our team members and tech leads
* we put our system's best interests before our personal ones (after all, [as engineers we are also stakeholders](http://blog.drinkbird.com/all-about-results) of the systems we work on)

# The different cost and risk of each choice


context and principles.
