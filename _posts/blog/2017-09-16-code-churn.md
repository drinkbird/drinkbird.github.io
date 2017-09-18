---
layout: post
title: "Code churn is not your friend"
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

In this article we're going to discuss about an oftenly overlooked problem of the software development process, one that can cause great instability and grief if left unchecked, and that is high *code churn*.

## The problem

By *code churn* we generally refer to the lines of code added, modified or removed from a code base, from one version to another. We can think of *versions* as any two points in time, such as two released versions of the software, or any given commit / pull request and its parent.

A high volume of code churn is a symptom of unhealthy codebases and / or teams. It is somewhat acceptable for new projects, when their core behavior and structure are still in flux and in the process of being forged through numerous decisions and iterations. But once the dust settles and the system stabilizes, there should be a very good reason for introducing a high volume of churn (there usually isn't).



Why is high code churn such a problem? 
- instability - viscosity - unmaintainability - knowledge spread

// It boils down to a single word, *instability*, and neither users nor stakeholders are very happy about working with instable, unreliable systems.

## The vanity metrics of productivity

How often do you feel that productivity is the single thing that matters at your workplace? Of course you want to be productive, and your boss wants you to be too, but how is that quality perceived and measured?

### Added lines of code

As programmers we are generally quite nearsighted about what makes us productive. Many of us believe that our productivity derives from our ability to write as much code as possible, as quickly as possible. And if it's us who believe it, it's only natural that our boss - who typically has a limited or no technical background - does too.

One problem with that line of thought is that writing code is only a small part of the overall software engineering process. Let's name a few more:

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

In reality, most new lines of code written under a distorted urge of productivity don't present those values. In fact the usually contribute towards harming the team's productivity.

Every new line of code that goes into a codebase is another line of code that you and your team has to maintain. Every new box in your architectural diagram is a new potential point of failure. Hence, there has to be a really good reason for uptaking this extra weight.

> Measuring software productivity by lines of code is like measuring progress on an airplane by how much it weighs. -- Bill Gates


// Viscosity

// https://giphy.com/gifs/xOmBBnZNN1oRy?utm_source=media-link&utm_medium=landing&utm_campaign=Media%20Links&utm_term=https://www.google.com/