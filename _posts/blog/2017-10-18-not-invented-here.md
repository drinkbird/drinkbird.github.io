---
layout: post
title: "NIH: Reinventing the wheel is immoral"
excerpt: "The Not Invented Here syndrome is a disease for the software industry. Learn how to spot it and prevent it."
permalink: /not-invented-here
comments: true
categories: blog
featured: true
image:
  feature: NIH.png
#  credit: pixabay
#  creditlink: "https://pixabay.com/en/no-stopping-sign-road-sign-signage-910003/" # CC0
# image: https://pixabay.com/en/balance-swing-equality-measurement-2108024/
# image: https://pixabay.com/en/padlock-castle-key-security-closed-934429/
reads:
  - cleanarchitecture
  - thecleancoder
  - cleancode
  - xunit
  - agileppp
  - refactoring
  - legacycode
  - codecomplete
  - leanstartup
  - artofunittesting
  - cleanarchitecture
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

Yet so many of us fall into the NIH trap, often causing irreversible damage to our system and business. What kind of thinking could lead us into such a mess? Let's examine some common preconceptions.

## Preconception 1: In-house implementations are faster to develop

We tend to believe that writing our own code is faster than learning how to use someone else's. And because we're always too busy, we feel that we don't have enough time to properly evaluate existing solutions. 

![Too busy]({{ site.baseurl }}/images/too-busy.jpg)

When we do evaluate an existing solution, the process is often superficial and biased. We only spend a few moments brushing over the basics just to quickly reject them as inelegant, complex or unsuitable. The idea of a shiny new implementation quickly takes over, and a proverbial hand starts patting us on the back for the great job we're about to do.

What really happens is that in-house implementations *feel* like they are quicker to develop, but usually the fast part is coming up with a rough idea of what needs to be done. Dealing with detailed planning, execution, quality assurance and maintenance phases, though, is a whole different story.

Any solution should come *at minimum* with a good suite of automated tests and sufficient documentation, and skipping any of that in hope to go faster is a recipe for disaster. Such speed benefits are only short-term, and the technical debt we create of ourselves slows us down significantly just a few steps later.

Speed-wise, we should also be thinking about how good our team is with estimations. Do we miss our targets often? Do we spend most of our time fixing bugs, while core business behaviors are left waiting in the backlog? If any of that is true, it's probably not a good idea to put more work our way, especially if we can avoid it by using an existing implementation.

## Preconception 2: In-house implementations are cheaper

What if using an existing solution comes with a paid license or support plan? Wouldn't then be cheaper to build rather than buy?

A commercial license is typically priced at a small fracture of the total design, implementation and maintenance costs of a given software solution. We could argue that we are only interested in a subset of the features available in that solution, and if we were to build them ourselves we wouldn't have to productionalize them independently. Although valid, these points don't prove which choice is cheaper.

The most underestimated costs are those of maintenance. As mentioned previously, we tend to end up with half-baked solutions in favor of short-term speed. What we end up with is a mess that is very expensive to maintain, extend, or onboard people with.

The moment such an implementation leaves our hands it becomes legacy, and the next time somebody in the team or company needs something similar will probably end up with yet another custom one. That cost is already high, without even considering the implications of a bug ending up in production.

![Balancing costs]({{ site.baseurl }}/images/balance-2108024_640.jpg)

Let's not forget opensource. For every standard component of a software system there are typically multiple opensource offerings we can take advantage of, and most of them can be used for free. Most importantly, we have the option to look at their source code, contribute, or even fork them and drive them towards a different direction if needed.

Many opensource solutions come with optional support plans. Through these we can get answer to specific questions, recommendations, and first class support when a problem occurs. That is also usually cheaper than having to develop, document, test and maintain the code ourselves.

Although obvious, I have to mention that development time is quite expensive, which means that custom solutions that are slower to develop (properly) are also more expensive.

## Preconception 3: In-house implementations are more secure

Security is a huge concern of software systems. Especially when exposing a service over the internet, we need to make sure that we are doing everything we can to protect our customers and organization. Some think that third-party implementations are by definition less secure than in-house ones. That is a big trap.

We tend to think of in-house solutions as more secure mostly because the implementation details are hidden from public eyes, therefore any potential flaws won't be known to attackers. In Security Engineering this point of view is called [security through obscurity](https://en.wikipedia.org/wiki/Security_through_obscurity), and has been rejected by security experts as far back as 1851.

![Useless lock]({{ site.baseurl }}/images/padlock-934429_640.jpg)

Popular third-party implementations have been battle-tested again and again, in numerous different scenarios. Especially in opensource solutions, there many more people examining the source code and spotting possible vulnerabilities compared to in-house implementations.

The main point is, we should never assume that our implementations are more secure than alternatives, unless security experts are involved and security audits are done regularly.

## Preconception 4: In-house implementations are more innovative

Let's just pull this band-aid fast:

> Outside innovation is always bigger than Inside innovation

Unfortunately, there are many organizations claiming to be innovative without having a clue what that word really means. Most of these cases refer to in-house implementations that don't solve any new problems, but someone somehow somewhere convinced their boss or team that it's a good idea to reinvent the wheel.

And because those implementations are usually not that important for fulfilling the main mission of an organization, the resources allocated to them are not even close to what a proper solution would need. We've already discussed the consequences of half-baked implementations in previous sections.

![Innovation imagined VS Innovation budgeted]({{ site.baseurl }}/images/innovation.jpg)

Innovation boils down to having a community around you and not solving everything by yourself. It's like a spoken language; the more the people who speak it, the stronger it gets.

That's why many [top organizations in the industry have opensourced large parts of their stack](https://github.com/collections/open-source-organizations). They don't just help the community, but also themselves by tapping to the collective effort of numerous other organizations and individuals.

Most importantly, innovation bears the weight of proof. Academics have been practicing [the scientific method](https://en.wikipedia.org/wiki/Scientific_method) since the 17th century, and it's not a coincidence that most breakthroughs in both Computer Science and Software Engineering have been guided by academic research.

Truly [innovative organizations follow the same steps](https://research.google.com/pubs/papers.html), publishing scientific papers (or funding scientific researches), getting peer reviews, accepting external contributions and proving their hypotheses in a formal and structured way.

## Preconception 5: In-house implementations are better aligned to our business needs

Although it sounds reasonable, this preconception is also easy to misunderstand.

A typical software system is composed of several components, arranged within many different layers of abstraction. At the center we can find the use cases, the whole purpose for the system's existence. 

All other components are secondary and revolve around the use cases. Components like databases, frameworks, messaging systems, web frameworks - even the web itself - are implementation details.

*You can read more about software architecture in Robert C. Martin's excellent latest book, [Clean Architecture: A Craftsman's Guide to Software Structure and Design](http://geni.us/cleanarchitecture)*

Under most circumstances, building such components from scratch is a waste of resources, and it's much more preferable to use commercial or opensource third-party implementations instead. That way it becomes a matter of customizing and composing those components together to formulate our unique system.

> We should only build a component in-house if it's unique to what we do and can be considered as a strategic asset. We should buy or use opensource if our use of the component is not that special. 

# Reinventing the wheel is immoral

![Reinventing the wheel is the most reliable way to be left behind]({{ site.baseurl }}/images/reinventing.jpg)
<p class="text-center">Image source: <a href="https://www.aic.cuhk.edu.hk/web8/Reinventing%20the%20wheel.htm">aic.cuhk.edu.hk</a></p>

Am I the chosen one?

cv-driven development

Left unchecked, the NIH syndrome can turn a codebase into a graveyard of ambitious half-baked projects.

[as engineers we are also stakeholders](http://blog.drinkbird.com/all-about-results) of the systems we work on
