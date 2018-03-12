---
layout: post
title: "The «20% Rule» of Thriving Technology Organizations"
excerpt: "Slack time is vital to growth"
permalink: /twenty-percent-rule/
comments: true
categories: blog
featured: true
image:
  feature: collaboration.jpg
# https://pixabay.com/en/action-analysis-business-2277292/
reads:
  - careerguide
  - cleanarchitecture
  - buildingmicroservices
  - dataintensive
  - cleancode
  - 97things
  - softskills
  - thecleancoder
# https://about.gitlab.com/handbook/values/
---

A key characteristic of a thriving technology organization is the ability to rapidly experiment and verify numerous hypotheses. That way, it can keep adapting to what the marketplace really needs and win big, while keeping true to its own vision.

For such an organization to be able to create unique value propositions and execute efficiently on its customer promises, software has to remain *soft*. That is, to be easy to change with the minimum required effort possible, without causing unintentional side-effects with every change.

![Stop Side Effects]({{ site.baseurl }}/images/stop-side-effects.jpg)

In other words, software quality has to be kept high throughout the software's life span - [from the very beginning](http://blog.drinkbird.com/all-about-results). And although quality is so important, paradoxically organizations often choose to sacrifice it in favor of speed, or more accurately, a false promise of speed. According to [the First Law of Programming](http://wiki.c2.com/?FirstLawOfProgramming):

> Lowering quality lengthens development time.

## Code and Processes Degrade Over Time

The ability of each organization to fulfill its mission diminishes in direct proportion to the reduction of its software quality and the accumulation of [technical debt](http://wiki.c2.com/?WardExplainsDebtMetaphor).

Technical debt occurs either "naturally" as changes are made to a project[¹](#ex1), or even without doing anything, e.g. an operating system / library / product version we use is no longer supported, or a security vulnerability has been discovered.

Organizations that don't actively and systematically pay down on technical debt, sooner or later find themselves so burdened by the weight of daily workarounds for problems left unaddressed, that all they can do is making the interest payment on their technical debt. In other words, they are no longer able to complete any new work.

![Entropy]({{ site.baseurl }}/images/entropy.jpg)

And it's not just software that degrades over time. As Mike Rother describes in his book [Toyota Kata](http://it-books.club/books/toyota-kata/isbn/0071635238), due to chaos and entropy, processes that are not continuously improved degrade as well. Organizations that are unable or unwilling to realize that truth, don't just keep suffering from their current problems, but their suffering grows over time.

This leads us to an interesting conclusion:

> Improvement of daily work is more important than daily work itself.

## Slack Time is Vital to Growth

In his excellent talk [Twelve Ways to Make Code Suck Less](https://www.youtube.com/watch?v=nVZE53IYi4w), Venkat Subramaniam refers to one of his favorite books called "Gun, Germs and Steel", and he describes how first people evolved from being savages to developing culture.

At first, people had to hunt for food every day in order to survive. No hunting meant starvation and death, so they always had to be on the run for food. At one point they figured out that they can do agriculture and domesticate animals, and they could keep those animals close by and eat them whenever they needed to.

That was awesome! Once people were able to take days off hunting, they started creating songs, art and more. They started developing culture.

![Culture]({{ site.baseurl }}/images/culture.jpg)

> Culture started developing when people had slack time.

Venkat emphasizes that numerous organizations tend to forget this and work people to death. That doesn't help us at all for getting better at what we do, so what we really need is those slack times, and we need them on schedule.

## The 20% Rule

The following is an excerpt from the [The DevOps Handbook](http://it-books.club/books/the-devops-handbook/isbn/1942788002), a massive hit and must-read for everyone involved in decision making within a technology organization[²](#ex2).

*After the near-death experience of eBay in the late 1990s, Marty Cagan, author of [Inspired: How To Create Products Customers Love](http://it-books.club/books/inspired/isbn/1119387507), the seminal book on product design and management, codified the following lesson:*

*The deal [between product owners and] engineering goes like this: Product management takes 20% of the team’s capacity right off the top and gives this to engineering to spend as they see fit. They might use it to rewrite, re-architect, or re-factor problematic parts of the code base...whatever they believe is necessary to avoid ever having to come to the team and say, ‘we need to stop and rewrite [all our code].’ If you’re in really bad shape today, you might need to make this 30% or even more of the resources. However, I get nervous when I find teams that think they can get away with much less than 20%.*

![The DevOps Handbook]({{ site.baseurl }}/images/devops-handbook.jpg)

*Cagan notes that when organizations do not pay their “20% tax,” technical debt will increase to the point where an organization inevitably spends all of its cycles paying down technical debt. At some point, the services become so fragile that feature delivery grinds to a halt because all the engineers are working on reliability issues or working around problems.*

> By dedicating 20% of our cycles so that Dev and Ops can create lasting countermeasures to the problems we encounter in our daily work, we ensure that technical debt doesn’t impede our ability to quickly and safely develop and operate our services in production. Elevating added pressure of technical debt from workers can also reduce levels of burnout.

## Conclusion

So there you have it. To set themselves up for success, software development and operation teams need to allocate 20% of their schedule (e.g. one day per week or one week per month) to slack time. That is, time they won't have to spend implementing any new functionality, but rather investing on refactoring, automation, architecture, design, and other non-functional requirements that can improve quality.

Product and project managers are expected to push for postponing improvement work in favor of creating new functionality. Nevertheless, we need to keep emphasizing that improvement of daily work is more important than daily work itself, and that teams need to have specific capacity allocated for this.

Prioritizing any improvement effort is quite challenging by nature, especially when dealing with complex systems. The irony is that organizations that suffer the most and need to improve their ways as soon as possible, are also the ones that have the most limited amount of time to invest on improvement, as everybody could be constantly dealing with production incidents just to barely survive technical bankruptcy.

Don't let that happen to your organization. Take action today!

---

<div id="ex1"></div>

¹ Lowering quality intentionally is not called *technical debt*. That is called **sabotage**.

<div id="ex2"></div>

² One could argue that today, every organization is in fact a technology organization.

