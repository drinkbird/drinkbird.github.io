---
layout: post
title: "High code churn is not your friend"
excerpt: "3+1 root causes of high code churn that can kill your project"
permalink: /code-churn
comments: true
categories: blog
featured: true
mermaid: true
image:
  feature: churn.png
#  credit: pixabay
#  creditlink: "https://pixabay.com/en/truck-concrete-mixer-truck-heavy-2194948/" # https://pixabay.com/p-146916/ # CC0
reads:
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

In the [previous article](http://blog.drinkbird.com/all-about-results) we discussed about a high-impact mistake of many software companies, especially startups, and that is focusing on a program's behavior while letting its structure decay.

It's now time to discuss an often overlooked symptom of serious, underlying problems of software projects: *high code churn*. 


## Why is high code churn considered alarming?

By *code churn* we generally refer to the lines of code added, modified or removed from a codebase between two versions of the software, or between any given commit / pull request and its parent.

As [research](https://www.researchgate.net/publication/2816801_Code_Churn_A_Measure_for_Estimating_the_Impact_of_Code_Change) has shown, there is a strong connection between high volumes of code churn and the number of defects discovered while testing, hence such measurements are great for predicting a system's fault density.

By making changes in an uncontrollable fashion we force a system to live in a constant state of flux where bugs are easily introduced, the chance of merge conflicts is always high, and knowledge spreads thin amongst a team, as it becomes harder and harder for programmers to keep track of what is happening in their codebase.

Let's examine some of the prevailing root causes of such a situation.


### 1. The urge for writing code fast

Productivity, such a topic! How often do you feel that productivity is the single most important thing at your workplace?

As programmers we are generally quite nearsighted about what really makes us productive. Many of us believe that our productivity derives from our ability to write as much code as possible, as fast as possible.

<div class="giphy">
<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/JIX9t2j0ZTN9S" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
</div>

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

In reality, most new lines of code written under a distorted urge for productivity don't present these values. That way of thinking is in fact actually harmful for productivity, both the individual's and the team's.

We shouldn't forget that every new line of code that goes into a system is another line of code that us and our team has to maintain. Every new box in our architectural diagram is a new potential point of failure. Hence, there has to be a really good reason for adopting that extra weight.

> Measuring software productivity by lines of code is like measuring progress on an airplane by how much it weighs. -- Bill Gates

Instead of focusing on the speed of writing, we should be focusing on the speed of reading, as reading existing code is what we typically spend most of our time on.


### 2. Being in the Zone

The Zone (also known as Flow) is a state of consciousness we often reach after concentrating on a task for some time without being interrupted. Attention is increased, focus gets sharper and thoughts flow effortlessly. Athletes and musicians achieve their best performance in that state.

It's a popular belief amongst programmers that we as well perform our best while in the Zone. Although that's a decent assumption, it's not a very accurate one.

Musicians and athletes perform well in the Zone because their practice is mostly consisted of repeatable actions that exercise both muscle and standard memory.

<div class="giphy">
<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/26ybvdttvnrXFmaBy" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
</div>

Programming is quite different, as we don't have to deal with instinctive reactions, nor to retype chunks of code from memory. On the contrary, it's a highly creative process that involves hard and long thinking between regular breaks, as our brain can't withstand working non-stop at high capacity for very long.

The Zone is a state that leaves little room for deep thinking and creates a strong urge to keep moving, writing and changing as much code as possible. On the other hand we still need to be able to concentrate without having interruptions that take us out of the headspace.

The [pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) combines the best of both worlds: We focus on a single task for a predetermined amount of time (usually 25 minutes), then take a small break (usually 5 minutes), and repeat that cycle several times per day. This approach allows us to concentrate enough to get the job done without being trapped into the Zone and start churning like there's no tomorrow.

It also allows us to regularly interact with others, respond to emails, and handle many types of interruptions in a structured way. Our co-workers build confidence that their questions will be answered in a timely fashion, and helps them resist the urge for interrupting us.

![Interruptions]({{ site.baseurl }}/images/ProgrammerInterrupted.jpg)
<p class="text-center">Image source: <a href="http://heeris.id.au/">Jason Heeris</a></p>

### 3. Poor management and professional churners

In some companies, code churn measurements are not used as a means of evaluating the density of defects, but rather as indicators of development effort. There is often an unspoken rule that the top committer is also the most productive member of a team.

Can you spot the paradox?

Such workplaces essentially push programmers towards stirring-up the codebase. It's usually the inexperienced programmers that take the bait and try to make their name appear on the source control history as much as possible, even if it means just moving chunks of code around. The more pointless changes they make, the more productive they are seen as.

It's also the same people who will do whatever it takes to be the first ones to patch a production issue and collect more stars from the management, making a bigger mess in the process. What the management doesn't often realize is that those people's unrestrained stir-up is the root cause of many such issues.

<div class="giphy">
<div style="width:100%;height:0;padding-bottom:101%;position:relative;"><iframe src="https://giphy.com/embed/xOmBBnZNN1oRy" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
</div>

Another characteristic of professional churners is their constant attempt to reinvent the wheel and develop everything by themselves, no matter if a given problem has already been solved a thousand ways.

Imagine your team building a house and one of your crew to spending their time trying to assemble a washing machine from scratch, because "no washing machines on the market are up to our standards". This approach is known as the [Not Invented Here syndrome](https://en.wikipedia.org/wiki/Not_invented_here), and is a disease for our industry.

![Too busy]({{ site.baseurl }}/images/too-busy.png)

We should only build things that are unique to what our business does and can be considered as a strategic asset, and either buy commercial components or use open-sourced ones for everything else.

It's always easy to experiment and learn on someone else's dollar, but as true professionals we should admit when there is no actual problem to be solved and push towards spending our time on things that really worth our employer's investment.

It's also our obligation to mentor less experienced and less principled programmers, and help them understand how arbitrarily stirring-up the code can hurt themselves and their projects. On that end, we shouldn't forget that leading by example is much more effective than confrontation.


### +1. Leaky abstractions

Have you ever found yourself changing one little thing in one side of a project only to realize that it had a knock-on effect to several other layers? That's a strong indicator of not adhering to the [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle):

* High-level modules should not depend on low-level modules. Both should depend on abstractions.
* Abstractions should not depend on details. Details should depend on abstractions.

*Leaky abstractions* are those that *do* depend on details. Every module depending on such abstractions gets tighly-coupled to such details, resulting in high-viscosity, fragile systems where is often easier to add a hack than change the code in a way that fits the program's design.

As an example, imagine an MVC application that handles user registrations using the following flow of control:

<div class="mermaid">
graph TD;
    uc[User Controller]-->ubl[User Business Logic];
    ubl-->urp[User Repository];
    urp-->upsql[User SQL Persistance];
</div>

What would happen if the the SQL implementation details of the persistance layer were leaked all the way up to the business layer? If we had to make changes to the SQL-specific code, such as restructuring tables for better performance, or even swapping the SQL implementation altogether in favor of another technology, both the repository and business logic layers would have to change as well.

I'll never forget a fellow programmer's reply when I once asked how things were going at his workplace:

> If I get any further away from the task at hand chasing ripple effects in our system I'm going to end up in a data center checking fuses in plugs.

High code churn is often a symptom of not adhering to the Dependency Inversion Principle and having lots of leaky abstractions. We should keep an eye for the signs at all times and react the moment we discover such problems, before they get a chance to spread further.


## Is the churn caused by extensive refactoring an exception?

Refactoring is the third and equally important part of the Red-Green-Refactor cycle of [TDD](https://en.wikipedia.org/wiki/Test-driven_development).

It does not appear on a schedule, but rather we do it every time we work on a user story as a matter of discipline, exactly as doctors wash their hands before and after they operate on a patient.

For that reason we expect changes in code to be as targeted and minimal as the scope of a well-defined story.

<div class="giphy">
<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/iRTWQWg3cSEfe" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
</div>

Hence, churn caused by extensive refactoring is generally a symptom of decayed code structure. As we've discussed before, it's our responsibility as engineers to [protect the structure](http://blog.drinkbird.com/all-about-results) at all costs.


## High churn + Lack of automated tests = Death march

A good automated test suite has our backs, since it allows us to always keep refactoring and cleaning the code without having the risk of breaking behavior.

In the absence of tests, we have much less confidence about improving the structure of our code as we progress, hence refactoring is often left as a high-risk, low-importance task for the future.

> Imagine trying to learn to be a trapeze artist in the circus without having that big net that allows us to make mistakes; we'd never progress beyond swinging back and forth! <br/>-- ‎Gerard Meszaros, {% include link.html title="XUnit Test Patterns" url="https://www.amazon.com/xUnit-Test-Patterns-Refactoring-Code/dp/0131495054?tag=drin04-20" %}

In code bases where churn volume is high but coverage by unit, integration and acceptance tests is not adequate, technical debt prevails and the cost of corrective maintenance skyrockets. In such scenarios, teams typically end up spending most of their time and energy firefighting, rather than evolving the system by solving interesting business problems.

<div class="giphy">
<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/3o6UBpHgaXFDNAuttm" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
</div>

It's systems like these that prematurely turn programmers into managers.


## Summary

Always keep an eye for high churn in your codebase. Avoid using it as a metric for individual programmers' performance, but rather treat it as a red flag and start looking for the underlying cause as soon as you realize that your system suffers from it.

Sometimes the root cause is cultural and sometimes purely technical. Make sure you understand what you're dealing with before you take any action, but also make sure that you *do* take some action.

The more a codebase decays, the more difficult and costly it becomes to fix it. If you ignore the symptoms and let the decay spread, it won't be long before the cost of maintaining your system surpasses the benefits the business enjoys out of it.

Remember that the most effective way of solving a problem is to prevent it from happening in the first place. In the case of addressing intensive codebase stir-ups, it boils down to discipline and professionalism.
