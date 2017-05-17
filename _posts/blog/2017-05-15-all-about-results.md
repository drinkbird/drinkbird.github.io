---
layout: post
title: "It's all about results... or is it?"
excerpt: "The art of trading short term gain for long term pain"
permalink: /all-about-results
comments: true
categories: blog
featured: true
image:
  feature: whattopickupnext.png
reads:
  - fsharpforcsharpdevs
  - functionalreactive
  - microservices
  - buildingmicroservices
  - microservicearch
  - domaindrivendesign
  - streamingarch
  - softskills
  - legacycode
  - effectiveusecases
  - userstoriesapplied
  - artofunittesting
  - themythicalmanmonth
---

If you ask a businessperson what's the most important thing about a project, they will usually tell you that it's delivering *on time* and *on budget*. But what about *quality*? More often than not, it's not even considered as a priority but rather as something *nice to have*.

In contrast with other industries though, software development's end products have no material form, their size and complexity are at least tricky to perceive, and parts of them that could make them or break them could be well-hidden within their 1s and 0s. The user interacts through some interface, and that's usually all they see; everything else is hidden underneath.

On top of that, a seemingly small change in a project's requirements can easily translate to great amounts of additional manhours, or what's been asked can simply be impossible to implement. The tricky part, though, is effectively communicating these kinds of problems to the business, [who sometimes won't take *no* for an answer](http://blog.drinkbird.com/the-doctor-and-the-demanding-patient-metaphor-do-no-harm/).

![Tasks](https://imgs.xkcd.com/comics/tasks.png)
<p class="text-center">Image source: <a href="https://xkcd.com/1425/">xkcd.com</a></p>

## Blurred lines

The constant pressure for [producing new features and fixing bugs under tight deadlines](http://blog.drinkbird.com/the-surgeon-and-the-deadline/) can easily blur our judgement. These activities may require extensive rework of the existing code base, but usually there is also some dirty shortcut that might get the job done with just a few lines of code.

It might create some mess and break a few tests but you can just skip those and clean up the code later. It's all about being agile, moving fast and delivering results...

![Move Fast and Break Things](https://imgs.xkcd.com/comics/move_fast_and_break_things.png)
<p class="text-center">Image source: <a href="https://xkcd.com/1428/">xkcd.com</a></p>

Or even better, you can opt-out of running tests altogether! Can't get more agile than that...

![Roll Safe with Tests]({{ site.baseurl }}/images/tests-roll-safe.png)

## Staying out of debt

Sarcasm aside, lowering your standards when quality work seems out of reach feels like a natural reaction, but in reality it's an unbalanced tradeoff, a short term-gain in exchange for some long-term pain, also known as *technical debt*.

The problem with debt is that it needs to be paid off, *with interest*. Left unpaid, technical debt can easily pile up and lead to technical bankruptcy, when making a change in code ends up being more expensive than the value this change provides.

Having engineering discipline, [being team a player](http://blog.drinkbird.com/bursting-the-bubble-of-ego/), and operating professionally under pressure are all prerequisites for your project's long-term success, *given that you care about that*.

Wait, what?

![Confused]({{ site.baseurl }}/images/squirrel-confused.png)
<!-- https://pixabay.com/en/squirrel-reading-books-surprise-304021/ -->

## Why wouldn't someone care about their project's long-term success?

I'm glad you asked.

As the software industry keeps growing exponentially, there is a big push to get more and more people into it. Inevitably, it also becomes more and more difficult for companies to find talented people with the right mindset. Therefore, hiring standards keep relaxing while at the same time the average quality of developers keeps dropping.

Especially when combined with all the challenges mentioned earlier in the article, that fact brings some interesting side effects into the mix, causing a number of behavioral patterns to emerge. Let's describe some of the most prominent ones.

### Novices

Uncle Bob has written an excellent [article](http://blog.cleancoder.com/uncle-bob/2014/06/20/MyLawn.html) about how the industry is overall dominated by novice developers, and is in fact going to remain in a state of perpetual immaturity - indefinitely. Given the demographics presented in the article, the ratio of novice to experienced developers within the average software company is *16:1*!

Novice developers want to learn as much as they can, experiment with different approaches / programming languages / frameworks, apply what they just saw at a blog / tutorial / book / conference without necessarily solving a real problem or be aware of the risks, and they typically produce tons of brute-force style code, often by copying and pasting snippets from the internet.

![Google-Fu]({{ site.baseurl }}/images/googlefu.jpg)

It's not unusual for such a person to create more debt than the actual value he/she brings to the table, and yet that's fine as it's part of their learning journey and something to be expected. The point here is that young programmers usually focus on building up their career, but their goals don't necessarily include the long-term success of the project they happen to be working on.

When working with such people try to be extra patient and understanding. Provide good guidance and explain as much as possible, in order to set a good example and lead them towards becoming better professionals. Mentoring novice programmers has actually been one of the most rewarding elements of my career; it's fun and I usually end up learning something new when I engage into conversations with them.

### Hipsters

Programming hipsters count more as "know it all" posers rather than actual computer scientists. They strategically avoid industry standards, battle-tested approaches, or widely used libraries, often characterizing them as "too mainstream".

Instead, they prefer to keep reinventing the wheel and roll their own implementations, which of course are done in the most complex and inefficient way possible to demonstrate their superior intellect. Of course nobody else can maintain their solutions, which backfire sooner or later anyway.

![Hipsort]({{ site.baseurl }}/images/hipsort.png)
<p class="text-center">Original image source: <a href="http://www.broadsheet.ie/tag/typewriter/">broadsheet.ie</a></p>

In case they decide to not implement everything from scratch, they will typically try to use something that's still in alpha or beta, and has no support structure or community.

Programming hipsters are found among the most reliable sources of technical debt. They never really care about the project, but rather  

There's not much you can do when called to work with such a person, apart from raising your con


### Dinosaurs

![Fossil Keyboard]({{ site.baseurl }}/images/fossil-keyboard.jpg)
<p class="text-center">Image source: <a href="http://boingboing.net/2009/04/06/fossil-keyboard.html">boingboing.net</a></p>

### Job Security Specialists

![Fossil Keyboard]({{ site.baseurl }}/images/computer-user-roots.jpg)
<p class="text-center">Image source: <a href="https://geroldblog.com/2011/11/04/humor/computer-user-roots/">geroldblog.com</a></p>

### Gold Diggers

![Under the rug]({{ site.baseurl }}/images/rug.png)
<p class="text-center">Original image source: <a href="https://quotesfest.com/download/77684fb5326153258b28cc6c8e52e04e0ec91e5b.html">quotesfest.com</a></p>





in order to keep the business temporarily happy, as themselves keep crossing off items from their personal agendas.

Their motives may vary, but the end result is always the same; any project they touch ends up with loads of technical debt, or even bankrupt. It's usually not too long before small regressions start causing problems, but the root causes are typically swept under the rug .




 Although the business keeps getting some short-term benefits for a while, the amount of debt makes it harder and harder for new changes to be integrated to the codebase. 

keeps receiving their short-term benefits for some time, it's usually too late 





*I highly doubt that somebody who reads this blog falls into that category. In case you do, [welcome to your tape](http://www.urbandictionary.com/define.php?term=Welcome%20to%20your%20Tape).*




### Novices & Mentors

For an young and inexperienced programmer, the energy, enthusiasm and curiosity for the job often leads to code being produced by the kilo (or the pound, depending on where you live), mostly by copying and pasting from books and Stack Overflow. It's not unusual for such a person to create more mess than the actual value he/she brings to the table. And yet that's fine, as it's part of their learning journey and something to be anticipated.

![Google-Fu]({{ site.baseurl }}/images/googlefu.jpg)

The problem is in the numbers. Uncle Bob has written an excellent [article](http://blog.cleancoder.com/uncle-bob/2014/06/20/MyLawn.html) about how the industry is overall dominated by novice developers, and is in fact going to remain in a state of perpetual immaturity - indefinitely. Given the demographics presented in the article, the ratio of novice to experienced developers within the average software company is *16:1*!

For the experienced person, that ratio is a whole different challenge. They don't just have to deliver on time and on budget, but mentor the novices and clean up after their mistakes too. Such a situation can easily get out of control. It can eventually drive the experienced person to lose perspective, forget about the project's long-term success, and instead focus on making it through the day having a working build.

On the other hand, young programmers want to learn as much as they can, experiment with different approaches / programming languages / frameworks, apply what they just read in a blog / saw at a conference without usually solving a real problem or calculating the risk first, and overall build up on their experience and reputation. In other words, a young programmer's goals don't necessarily involve the long-term success of the project they happen to be working on.

### Hipsters


### Dinosaurs & job security enthusiasts













The rush to produce results - *any results* - before the deadline leads to poor decisions, messy code bases, regressions, unhappy developers, and most importantly, unhappy users.




