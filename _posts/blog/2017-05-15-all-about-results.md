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
  - 97things
  - softskills
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

![Tasks](https://imgs.xkcd.com/comics/tasks.png)
<p class="text-center">Image source: <a href="https://xkcd.com/1425/">xkcd.com</a></p>

One of the main reasons you were hired is because you know how to build software systems well, you know how to structure them in such a way that they last, and with that knowledge comes the responsibility to build the best product you can.

On top of that, you were also hired for your ability to know when things are about to go wrong. You know how to detect numerous problems before they happen, so it's part of your responsibilities to speak up when you smell trouble.

You may now be asking, what if your boss insists that you forget about the structure and just focus on behavior?

# You should refuse taking action that opposes your duties

You should refuse to take action that purposefully harms the structural quality of the system. You have the right to refuse because you are a stakeholder. You have the duty to refuse because you are an engineer.

Yes, there will probably be some confrontation, and yes, it will most likely be uncomfortable, but most managers expect to negotiate to get the things they want. They don't admit it, but they appreciate people who do the same. It won't be professional on your end to just cave in and simply agree on everything.

![Negotiating]({{ site.baseurl }}/images/negotiation.jpg)
<p class="text-center">Image source: <a href="http://www.stoneupdate.com/news-info/company-insider/979-caesarstone-fends-off-kibbutz-challenge">stoneupdate.com</a></p>

As an engineer you have [responsibilities that no boss can override](http://blog.drinkbird.com/the-doctor-and-the-demanding-patient-metaphor-do-no-harm/). You don't need permission to do your duty, you just do it. Taking responsibility for things of great importance and sticking to your guns to protect them is the professional thing to do.

On that extend, no software system should ship unless a software engineer approves it. It's the exact same principle as with [civil engineers](https://en.wikipedia.org/wiki/Civil_engineering) and buildings.

That of course doesn't mean that you should be inflexible. After all, you and the business have a common goal - success - and you both succeed and fail as a team, so...

# Know the rules well, so you can break them efficiently

It's not all black and white. There will be situations that you're very close to the goal, and your customer expects the solution tomorrow.

In such cases where you know that the structure is close, and the system suffers from minor structural defects only, you can go ahead and ship it.

**But**, once you ship, the next step is to cleanup the system and fix these structural problems *before* you implement any new behavior. By knowingly allowing defects to accumulate you act unprofessionally, allowing all future behaviors to be built upon defective structure.

![Under the rug]({{ site.baseurl }}/images/rug.png)
<p class="text-center">Original image source: <a href="https://quotesfest.com/download/77684fb5326153258b28cc6c8e52e04e0ec91e5b.html">quotesfest.com</a></p>

The same goes for hotfixes and really urgent situations. And *urgent* refers to something that could be proven catastrophic for your company or system and should be fixed right away, eg. a production bug that makes your company lose 10000$ per minute.

It's extremely rare for properly engineered systems to suffer from such defects. As for new functionality, it's *important* but not *urgent*, and these are two different things. On that extend... 

# A software startup is not an urgent situation

Unfortunately most software startups have a very specific mindset that urges them to write messy, inflexible software as quickly as possible.

It is as if they are competing at some race and have to get to the finish line first, whatever means necessary, leaving a huge trail of debris in their wake.

![Move Fast and Break Things](https://imgs.xkcd.com/comics/move_fast_and_break_things.png)
<p class="text-center">Image source: <a href="https://xkcd.com/1428/">xkcd.com</a></p>

One thing that's certain about a software startup is that you're going to build the wrong product. No product survives intact from the hands of users. As soon as you expose your product to the users you'll realize that you have built it wrong in a million ways, and you'll need to change it and adapt, again and again.

Remember what makes software *soft*? Good structure! If your system suffers from defects and you can't change it because you have made a mess, you are bound to fail.

Messy code slows down software startups long before they get to the finish line. They cause all kinds of problems, defects and slowdowns. This makes them rush even more, causing even more harm, and leading them to the same death spiral we discussed previously - just much sooner.

These startups would be much better off, and they would go much faster, if they acted professionally and protected the structure of the system from harm.

> In software, it never pays to rush. The only way to go fast is to go well.<br/> -- Robert C. Martin

Don't confuse that rush with that of the business side to discover and build the right product. That should not affect the engineering side, as there are [proven techniques](http://blog.drinkbird.com/lean-startup-book-review/) for building the right product incrementally, and only engage engineering when absolutely necessary. That way there are no excuses for making a mess.

# What if you don't want all that responsibility?

Unfortunately, lots of programmers feel that way. They simply want to be told what to do and just do it. They try to avoid confrontation at all cost. They never say no, no matter how justified this answer would be, in favor of job security or more money.

These people usually end up keeping a passive-aggressive stance that not only doesn't help the business, but ends up causing even more problems.

`¯\_(ツ)_/¯`

That kind of behavior is partly justified for juniors because they might not know any better, but not for anybody else.

Programmers who feel that way should be paid minimum wage, because that's exactly how much their work output is worth.

Of course it's your boss's right to fire you if they don't agree with your methods, but if your professionalism leads your boss to fire you, chances are that you work for the wrong boss in the first place.

# Summary

It's you, the engineer, who's responsible for maintaining the structural quality of the system you work on. The business side just asks for behaviors while always assuming that you keep the structural quality high.

You negotiate if needed for your rights as a stakeholder, and you stand by your duties as an engineer. You make tradeoffs when necessary, but never more tradeoffs that you can afford.

<div style="width:100%;height:0;padding-bottom:41%;position:relative;"><iframe src="https://giphy.com/embed/Lvand4cUuA6xG" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/life-seth-rogen-this-is-the-end-Lvand4cUuA6xG">via GIPHY</a></p>

The code that you produce should always be your best work, and you should never allow the structure and behavior of the system to get out of hand.

Remember, speed kills, it's the mother of all software defects. You can be all about results, but make sure that you don't just focus on behavior while letting the structure rot. This is not just unprofessional, but usually leads to harming the business, the customers and the users.

Don't be that guy.

# References

Almost the entirety of this article's content comes from Robert C. Martin's [Clean Coders video series](https://cleancoders.com/videos). I highly encourage you to sign up and purchase all Uncle Bob's videos, as they contain extremely valuable knowledge for our craft. The video series is also available in [Safari Books Online](https://www.safaribooksonline.com/library/view/clean-coder-clean/9780134843803/).
