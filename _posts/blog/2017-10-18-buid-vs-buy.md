---
layout: post
title: "Software components: build or buy?"
excerpt: "The actual cost of each choice might be different than you think"
permalink: /build-vs-buy
comments: true
categories: blog
featured: true
image:
  feature: debttrap.png
#  credit: pixabay
#  creditlink: "https://pixabay.com/en/case-money-mousetrap-snap-to-96184/" # CC0
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

Oftentimes part of our job is to decide (or influence the decision) on whether to build a given component in-house, or use an opensource / proprietary solution off the shelf. Although such decisions depend on the context in which they are made, we have principles to guide us. Whatever we decide, we need to ensure that:

* we are fully-aware of the different cost and risk that each choice bears
* we clearly communicate that information to our team members and tech leads
* we put our system's best interests before our personal ones (after all, [as engineers we are also stakeholders](http://blog.drinkbird.com/all-about-results) of the systems we work on)

Let's discuss each point in more detail.


# The different cost and risk of each choice


