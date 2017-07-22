---
layout: post
title: "It's all about results... or is it?"
excerpt: "Also known as 'Speed: The Mother of all Software Defects'"
permalink: /all-about-results
comments: true
categories: blog
featured: true
image:
  feature: speed-kills.jpg
  credit: youngcardriver.com
  creditlink: "http://youngcardriver.com/driving/speed-kills/"
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

Ask your boss what does she think is the most important aspect of a software project, and the response will usually be something along the lines of delivering a number of promised features *on time* and *on budget*.

It's all about results, and although perfectly reasonable, it doesn't mention anything about another - absolutely vital - ingredient of every single project: *quality*.

Low-quality projects suffer from various defects and regressions. They are hard to maintain, hard to extend, and most importantly they frustrate or even harm their users and stakeholders.

The real question is, who's really responsible for keeping a project's quality high? Let's expose some common misconceptions about software engineering and discuss your true role as an engineer.

# The first word of software is 'soft'

It's essential for us to keep in mind the intention for inventing software in the first place. We conceived it as a vehicle of making the behavior of computers and machines easy to change. By producing software that's hard to change we essentially beat the purpose of its very existence.

There are two values of software: the value of its *behavior* and the value of its *structure* (softness). Which of these two values is the most important, you ask? If you have worked in the software industry for more than a day, you will know that software requirements tend to change a lot.

![SOLID]({{ site.baseurl }}/images/solid-jenga.jpg)

Stakeholders and users expect to have the ability to change the behavior of a program without paying high cost. This means that a program that's hard to change can become useless very quickly. On the other hand, a program that's easy to change is much more valuable, as it can keep adapting to new requirements and keep working over the lifetime of the system.

Therefore, structure should be given priority over behavior in all but the most urgent situations. We will discuss such situations below, but first we need to make an important point.

# You are not done when the program works

Many programmers work in a way that aligns with what we described as the boss's definition of importance, thinking that their value as professionals comes from speed of development.

They know they are paid a lot, so they get stressed about delivering a lot of functionality within short amounts of time. As a result they typically focus on just getting the code to work. Once they achieve it, they immediately jump to their next task in hope to go as fast as possible.

Eventually, they realize how slow they are actually going and how hard it is to deliver new functionality, especially without causing regressions with every single change. That makes them feel like they are failing, which in turn causes them to rush even more.

You know where this vicious cycle leads to, you have seen it before. What these programmers leave behind is a trail of horrible, unmaintainable, unreadable, tangled and fragile code full of hacks, shortcuts and terrible tradeoffs.

![Road stripes]({{ site.baseurl }}/images/stripes.jpg)

We've already discussed the values of *behavior* and *structure*. Now we'll put them into more context. Implementing some behavior is just the first (and easiest) step. The next one is to clean the code and get its structure right. As Kent Beck puts it:

> First make it work.
> Then make it right.
> -- Kent Beck

You should first make it work because structure supports behavior, so you need to have that behavior in place in order to figure out how good structure would look like. On the other hand, structure is more important than behavior, so you should prioritize fixing problems of structure over problems of behavior.

So the structure of the current story has higher priority than the behavior of the next story. In other words, you get a story to work, then you get its structure right, and you don't work on the next story until that structure is right.

You may be asking, what happens when your boss doesn't give you the time to do you job properly? What should you do when that process is not even in place where you work? What is your true role?

# You are a stakeholder of the system

That's right. As an engineer you have a stake at the success of the system you work on. Your entire career, your reputation, even your employment depends on the success of your projects.

Nowadays most software companies award their engineers with stocks and stock options, a fact that further proves that claim. These companies know well that their engineers are in fact stakeholders and they want them to feel it too.

And as a stakeholder you have a say in how a system is designed, structured, developed and evolved. It's your fingers on the keyboard and your head on the line too.

![Digging]({{ site.baseurl }}/images/digging.jpg)

But you're more than just a stakeholder. You're an engineer, and with that comes the duty to create systems in ways that do no harm to either behavior or structure.

# Protecting the system's structural quality is your responsibility

It's not your boss's job to worry about the quality of the system's structure; it's your job. Your boss simply assumes that you always protect the structural quality while implement really urgent behaviors.

Does your boss understand the SOLID principles? Does your boss understand Dependency Inversion, Design Patterns, Test Driven Development? Does your boss understand the principles of good software design? Or is your boss's understanding limited only to behavior? 

One of the main reasons you were hired is because you know how to build software systems well, you know how to structure them in such a way that they last, and with that knowledge comes the responsibility to build the best product you can.

On top of that, you were also hired for your ability to know when things are about to go wrong. You know how to detect numerous problems before they happen, so it's part of your responsibilities to speak up when you smell trouble.

You may now be asking, what if your boss insists that you forget about the structure and just focus on behavior?

# You should refuse taking action that opposes your duties

You should refuse to take action that purposefully harms the structural quality of the system. You have the right to refuse because you are a stakeholder. You have the duty to refuse because you are an engineer.

Yes, there will probably be some confrontation, and yes, it will most likely be uncomfortable, but most managers expect to negotiate to get the things they want. They don't admit it, but they appreciate people who do the same. It won't be professional on your end to just cave in and simply agree on everything.

[As an engineer you have responsibilities that no boss can override](http://blog.drinkbird.com/the-doctor-and-the-demanding-patient-metaphor-do-no-harm/). You don't need permission to do your duty, you just do it. Taking responsibility for things of great importance and sticking to your guns to protect them is the professional thing to do. On that extend, no software system should ship unless a software engineer approves it. It's the exact same principle as with [civil engineers](https://en.wikipedia.org/wiki/Civil_engineering) and buildings.

Of course it's not all black and white. There will be situations that you're very close to the goal, and your customer expects the solution tomorrow. In such cases where you know that the system only suffers from minor structural defects, you can go ahead and ship it.

**BUT**, once you ship, the next step is to cleanup the system and fix these structural problems *before* you implement any new behavior. By knowingly allowing defects to accumulate you act unprofessionally, allowing all future behaviors to be built upon defective structure.

The same goes for hotfixes and really urgent situations. Urgent means something that could be proven catastrophic for your company or system and should be fixed right away, eg. a bug that makes your company lose 10000$ per minute. On that extend:

# A software startup is not an urgent situation


# Engineers who take no responsibility should be paid minimum wage


# Summary


# References



As for the matter of speed, Robert C. Martin gives us a crystal clear answer:

> In software, it never pays to rush. The only way to go fast is to go well. - Robert C. Martin

 What if you're told to just keep delivering features and ignore everything else until you are told otherwise?

# A software startup is not an urgent situation

requiring you to write messy, inflexible software. In fact the opposite is true. One thing that's absolutely certain about a software startup is that you are producing the wrong product. No product survives contact with the users. As soon as you put a product in the users' hands you will find out that you have built the product wrong in a hundred million ways and if you can't change it because you've made a mess you are doomed.

they have this mentality that they are in some kind of devilishly urgent rush and they just have to get to the finish line and leave a huge mess in their wake.

The truth is that that mess slows them down long before they get to the finish line causing all kinds of problems, and defects, and slowdowns, which makes them rush even more, making an even bigger mess.

They would be a lot better off - they would get done a lot faster with a lot fewer problems if they just protected the structure of the system from harm.



a production issue that costs the company 10.000$ a minute.




protecting the structure also protects behavior (regressions).



But what about *quality*? More often than not, it's not even considered as a priority but rather as something *nice to have*.

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

When working with such people try to be extra patient and understanding. Provide good guidance and explain as much as possible, in order to set a good example and lead them towards becoming better professionals. Mentoring novice programmers has actually been one of the most rewarding elements of my career; apart from being fun, I usually end up learning something new myself.

### Hipsters

Programming hipsters count more as "know it all" posers rather than actual computer scientists. They strategically avoid industry standards, battle-tested approaches, or widely used libraries, often characterizing them as "too mainstream".

Instead, they prefer to keep reinventing the wheel and roll their own implementations, which of course are done in the most complex and inefficient way possible to demonstrate their superior intellect. Of course nobody else can maintain their solutions, which backfire sooner or later anyway.

![Hipsort]({{ site.baseurl }}/images/hipsort.png)
<p class="text-center">Original image source: <a href="http://www.broadsheet.ie/tag/typewriter/">broadsheet.ie</a></p>

In case they decide to not implement everything from scratch, they will typically try to use something that's still in alpha or beta, and has no support structure or community.

Programming hipsters are guaranteed sources of technical debt for any kind of project, big or small. It's their niche. The only reason they would care about a project's success would be to show off more effectively and hope for recognition. Not exactly the kind of results you would expect from a software professional.

Unfortunately, some of them have made their way into places you would never expect to find them. If you are unlucky enough to work with one, just be aware of what to expect. Eventually, someone will have to clean up after them, and there's a good opportunity that this someone is you.

### Cave-Coders

They started their career with a *bang*, but it turned out to be a firework. These people focused too much and too long on a limited number of technologies or techniques and never bothered to keep up with the industry, usually claiming they were "too busy" or that "old ways are the best".

While software development is in general a highly-opinionated profession, there is one hard rule: **keep learning or leave the industry**. Holding forever on what you learned once upon a time and refusing to evolve is like running with your car on a highway forever and never bother checking your gas tank level. Failure guaranteed.

Cave coders are easy to spot, typically because they use obsolete languages, libraries, tooling, operating systems etc., that are not even being supported by their manufacturers anymore. Their code usually has no tests, and one little change can cause terrible regressions.

One thing they are very efficient at is making excuses for sticking to their ways and not evolving. They won't read technical books because *"theory is alright but what happens in the real world is another story"*. They won't read blogs, tutorials, or go to conferences because *"what others do in their projects solve their own specific problems, not ours"*.

![Fossil Keyboard]({{ site.baseurl }}/images/fossil-keyboard.jpg)
<p class="text-center">Image source: <a href="http://boingboing.net/2009/04/06/fossil-keyboard.html">boingboing.net</a></p>

In general, hey won't accept anything they are not already familiar with. The worse part is that many of them recognize their inability or unwillingness to train on new technologies and eventually jump into management roles, where they usually don't have to code a lot (or at all) but they can more efficiently steer their teams towards a cliff.

If you come across such people try to minimize contact. If they become your manager, run. And ju=ust to be clear, being a cave-coder does not imply a certain age. I'd say that anyone working in the industry for more than about 7-10 years is in danger of falling into this category.

Cave-coders would care about a project's long-term success only if it comes with personal benefits and job security. Speaking of which, ...

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




