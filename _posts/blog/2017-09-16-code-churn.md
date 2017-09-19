---
layout: post
title: "High code churn is not your friend"
excerpt: "Have you fallen into the productivity trap?"
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

What could be the root cause of high code churn? As it turns out it's usually a symptom of other, deeper problems within a codebase / team. Let's examine some of these problems.


## Vanity metrics of productivity - Take #1

Productivity, such a topic! How often do you feel that productivity is the single thing that matters at your workplace?

As programmers we are generally quite nearsighted about what really makes us productive. Many of us believe that our productivity derives from our ability to write as much code as possible, as fast as possible.

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

In reality, most new lines of code written under a distorted urge of productivity don't present these values. As previously discussed, that way of thinking is harmful for productivity, both the individual's and the team's.

Every new line of code that goes into a codebase is another line of code that you and your team has to maintain. Every new box in your architectural diagram is a new potential point of failure. Hence, there has to be a really good reason for uptaking this extra weight.

> Measuring software productivity by lines of code is like measuring progress on an airplane by how much it weighs. -- Bill Gates

Instead of focusing on the speed of writing, we should instead be focusing on the speed of reading.


## Vanity metrics of productivity - Take #2

In some companies, code churn measurements are not used as a means of evaluating the density of defects, but rather as indicators of development effort. There is often an unspoken rule that the highest committer is also the most productive member of a team.

Can you spot the paradox?

Such workplaces drive programmers towards causing more churn, even if that means just moving chunks of code around. The more their name appears on the source control history and the more code they add or change, the more productive they are seen as.

<div style="width:100%;height:0;padding-bottom:101%;position:relative;"><iframe src="https://giphy.com/embed/xOmBBnZNN1oRy" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

The moment a production bug emerges, these programmers will typically jump first to fix it, just to get more attention from the management. What the latter fails to realize though, is that those people's churn is often the root cause of defects in the first place.

On the other hand, principled programmers who only commit what's absolutely necessary and produce high-quality work with minimal defects, usually fly under the management's radar in such environments.

As company culture is extremely hard to change, such toxic workplaces are best to be avoided. Fortunately in most cases it's easy to get in touch with people already working at a given company, read glassdoor comments if available, and most importantly, ask the proper questions during the interview process.


## Leaky abstractions

How to oppose that urge of producing more code? We need to always program with intention.