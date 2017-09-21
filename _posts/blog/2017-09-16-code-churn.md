---
layout: post
title: "High code churn is not your friend"
excerpt: "3+1 sources of churn you need to keep an eye for"
permalink: /code-churn
comments: true
categories: blog
featured: true
image:
  feature: churn.png
#  credit: pixabay
#  creditlink: "https://pixabay.com/en/truck-concrete-mixer-truck-heavy-2194948/" # https://pixabay.com/p-146916/ # CC0
reads:
  - thecleancoder
  - agileppp
  - cleancode
  - refactoring
  - legacycode
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
  - softskills
  - dpruby
  - csharpindepth
  - interactiondesign
  - showyourwork
  - codecomplete
---

In the [previous article](#) we discussed about a high-impact mistake of most software companies, especially startups, and that is focusing on behavior while letting the structure of the system degrade.

In this article we're going to discuss about an oftenly overlooked problem of the software development process, one that if left unchecked can cause great instability and grief. That is *high code churn*.

By *code churn* we generally refer to the lines of code added, modified or removed from a code base between two versions of the software, or between any given commit / pull request and its parent.


## Why is high code churn such an issue?

As [research](https://www.researchgate.net/publication/2816801_Code_Churn_A_Measure_for_Estimating_the_Impact_of_Code_Change) has shown, there is a strong connection between high code churn and the number of defects discovered while testing, hence such measurements are great for predicting a system's fault density.

High churn forces the system to live in a constant state of flux where bugs are easily introduced, the chance of merge conflicts is always high, and often the rate of change superseeds the team members' brain capacity to keep track of what is happening in the system, so knowledge spreads thin.

Things get more interesting when a codebase is not adequetly covered by unit, integration and acceptance tests. In such cases the cost of corrective maintenance skyrockets and instead of focusing on evolving the system, firefighting becomes the norm.

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/3o6UBpHgaXFDNAuttm" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

Such high-viscosity, unreliable systems are quite prone to failure. They can leave companies exposed to their customers and stakeholders, or even lead them to bankrupcy. It's systems like these that prematurely turn programmers into managers.

///
What could be the root cause of high code churn? As it turns out it's usually a symptom of other, deeper problems within a codebase / team. Let's examine some of these problems.


## 1. Writing code fast

Productivity, such a topic! How often do you feel that productivity is the single thing that matters at your workplace?

As programmers we are generally quite nearsighted about what really makes us productive. Many of us believe that our productivity derives from our ability to write as much code as possible, as fast as possible.

<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/JIX9t2j0ZTN9S" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

One problem with that line of thought is that writing code is only a small part of the overall software engineering process. Let's name a few more parts:

* problem definition and analysis
* requirements development
* software architecture
* detailed design
* construction planning
* integration
* unit testing
* integration testing
* acceptance testing
* optimization
* corrective maintenance
* building
* debugging
* deploying
* tooling
* meetings
* research

Even if we assume that every new line of code has a clear puprose, is easily readable and defect-free, we can still realize that writing code fast would only have a negligible positive effect on the overall productivity of a team.

In reality, most new lines of code written under a distorted urge of productivity don't present these values. As previously discussed, that way of thinking is actually harmful for productivity, both the individual's and the team's.

We shouldn't forget that every new line of code that goes into a codebase is another line of code that us and our team has to maintain. Every new box in our architectural diagram is a new potential point of failure. Hence, there has to be a really good reason for uptaking this extra weight.

> Measuring software productivity by lines of code is like measuring progress on an airplane by how much it weighs. -- Bill Gates

Also, instead of focusing on the speed of writing, we should instead be focusing on the speed of reading.

## 2. The Zone

The Zone is a state of consciousness characterized by sharp focus, increased attention and boosted mental performance. It's also the state where athletes and musicians perform the best. But it's not just them.

Although not always possible to achieve, many programmers push themselves intentionally into the Zone. 




And when they finally do, they feel more productive than ever


 thoughts flow so effortlessly that they can't stop themselves writing lines of code by the bulk.




 feel the most productive. Thoughts flow effortlessly and we have trouble stopping our fingers from writing code.


## 3. Poor management and Professional churners

In some companies, code churn measurements are not used as a means of evaluating the density of defects, but rather as indicators of development effort. There is often an unspoken rule that the top committer is also the most productive member of a team.

Can you spot the paradox?

Such workplaces essentially push programmers towards causing more churn. It's usually the inexperienced programmers that take the bait and try to make their name appear on the source control history as much as possible, even if it means just moving chunks of code around. The more the churn they cause, the more productive they are seen as.

It's the same ones who will jump in first to fix a production bug and collect more stars from the management. On the other hand the management doesn't realize that those people's churn is often the root cause of defects in the first place.

<div style="width:100%;height:0;padding-bottom:101%;position:relative;"><iframe src="https://giphy.com/embed/xOmBBnZNN1oRy" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

Another symptom of professional churners is their constant attempt to reinvent the wheel and develop everything themselves, no matter if a given problem has been well-defined and well-solved by the rest of the industry. Imagine your team building a house and one of your crew to spending his time trying to assemble a washing machine from scratch.

It's always easy to learn on somebody else's dollar. Developers' time is extremely expensive and should be spent wisely. We should only build things that are unique to what we do and can be considered a strategic asset, otherwise we should simply buy commercial components, or use opensourced ones.

It's our obligation to mentor less experienced and less principled programmers, and help them understand how churning can hurt them and the project. We should always be willing to sit down and offer help when is needed. Leading by example is the best way to help them develop a strong sense of professionalism.

## +1. Leaky abstractions

How to oppose that urge of producing more code? We need to always program with intention.