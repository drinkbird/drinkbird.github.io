---
layout: post
title: "The worst mistake of many software startups"
excerpt: "Is it all about fast results? What's your true role as an engineer?"
permalink: /all-about-results
comments: true
categories: blog
featured: true
image:
  feature: crash-test.jpg
  credit: stillbreathing.co.uk
  creditlink: "https://www.stillbreathing.co.uk/2015/11/15/crash-test-dummies"
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

Ask your boss what does she think is the most important aspect of a software project, and the response will usually be something along the lines of delivering a number of features *on time* and *on budget*. For software startups, the *time* part usually given more weight.

It sounds like it's all about results, and although perfectly reasonable, it doesn't mention anything about another - vital - ingredient of every single software project: *structural quality*.

Projects having low structural quality suffer from various defects and regressions. They are hard to maintain, hard to extend, and most importantly they frustrate or even harm the business, the customers and the users.

The real questions are, why most startups suffer from it, and who's really responsible for keeping a project's structural quality high?

Let's discuss some common misconceptions about software engineering, highlight your true role as an engineer, and ultimately expose the reason why so many software startups fail: having the wrong mentality about speed.

# The first word of software is 'soft'

It's essential for us to keep in mind the intention for inventing software in the first place. We conceived it as a vehicle for making the behavior of computers and machines easy to change. By producing software that's hard to change we essentially beat the purpose of its very existence.

There are two values of software: the value of its *behavior* and the value of its *structure* (softness). Which of these two values is the most important, you ask? If you have worked in the software industry for more than a day, you know very well that software requirements tend to change - a lot.

<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/3oKIPpwk3iV0ZdsW5i" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/jenga-3oKIPpwk3iV0ZdsW5i">via GIPHY</a></p>

Stakeholders and users expect to have the ability to change the behavior of a program without paying high cost. This means that a program that's hard to change can become useless very quickly. On the other hand, a program that's easy to change is much more valuable, as it can keep adapting to new requirements and keep working over the lifetime of the system.

Therefore, structure should be given priority over behavior in all but the most urgent situations. We will discuss such situations below, but first we need to make an important point.

# You are not done when the program works

Many programmers work in a way that aligns with what we described as the boss's definition of importance, thinking that their value as professionals comes from speed of development.

They know they are paid a lot, so they get stressed about delivering a lot of functionality within short amounts of time. As a result, they typically focus on just getting the code to work. Once they achieve it, they immediately jump to their next task in hope to go as fast as possible.

Eventually, they realize how slow they are actually going and how hard it is to deliver new functionality, especially without causing regressions with every single change. That makes them feel like they are failing, which in turn causes them to rush even more.

You know where this vicious cycle leads to, you have seen it before. What these programmers leave behind is a trail of horrible, unmaintainable, unreadable, tangled and fragile code full of hacks, shortcuts and terrible tradeoffs.

![Road stripes]({{ site.baseurl }}/images/stripes.jpg)

We've already discussed the values of *behavior* and *structure*. Let's now put them into more context. Implementing some behavior is just the first (and easiest) step. The next one is to clean the code and get its structure right. As Kent Beck puts it:

> First make it work, then make it right.<br/>
> -- Kent Beck

You should first make it work because structure supports behavior, so you need to have that behavior in place to figure out how good structure would look like. On the other hand, structure is more important than behavior, so you should prioritize fixing problems of structure over problems of behavior.

To clarify, the structure of the current story has higher priority than the behavior of the next story. In other words, you get a story to work, then you get its structure right, and you don't work on the next story until that structure is right.

You may be asking, what happens when your boss doesn't give you the time to follow that process? What should you do when your boss doesn't understand the importance of that process? What is your true role as an engineer?

# As an engineer you are a stakeholder in the system

That's right. As an engineer, you have a stake in the success of the system you work on. Your entire career, your reputation, even your employment depends on the success of your projects.

Nowadays most software companies award their engineers with stocks and stock options, a fact that further proves that claim. These companies know well that their engineers are in fact stakeholders, and they want them to know too.

As a stakeholder, you have a say in how a system is designed, structured, developed and evolved. It's your fingers on the keyboard; it's your head on the line too.

![Digging]({{ site.baseurl }}/images/digging.jpg)

But you're more than just a stakeholder. You're an engineer, and with that comes the duty to create systems in ways that do no harm to either behavior or structure.

# Protecting the system's structural quality is your responsibility

It's not your boss's job to worry about the quality of the system's structure; it's your job. Your boss simply assumes that you always protect the structural quality while implementing "urgent" behaviors.

Does your boss understand the SOLID principles? Does your boss understand Dependency Inversion, Design Patterns, Test Driven Development? Does your boss understand the principles of good software design? Or is your boss's understanding limited only to behavior?

If you don't protect the structural quality of your system, who will?

![GOTO](https://imgs.xkcd.com/comics/goto.png)
<p class="text-center">Image source: <a href="https://xkcd.com/292/">xkcd.com</a></p>

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

That of course doesn't mean that you should be inflexible. After all, you and the business have a common goal, to succeed, and you only succeed or fail together as a team, so...

# Know the rules well, so you can break them efficiently

It's not all black and white. There will be situations that you're very close to the goal, and your customer expects the solution tomorrow. In such cases where you know that the structure is close, and the system only suffers from a few minor structural defects, you can go ahead and ship it.

**But**, once you ship, the next step is to clean up the system and fix these structural problems **before** you implement any new behavior. By knowingly letting defects to accumulate you act unprofessionally, allowing all future behaviors to be built upon defective structure.

![Under the rug]({{ site.baseurl }}/images/rug.png)
<p class="text-center">Original image source: <a href="https://quotesfest.com/download/77684fb5326153258b28cc6c8e52e04e0ec91e5b.html">quotesfest.com</a></p>

The same goes for hotfixes and urgent situations. And *urgent* refers to something that could be proven catastrophic for your company or system and should be fixed right away, e.g. a production bug that makes your company lose 10000$ per minute.

It's extremely rare for properly engineered systems to suffer from such defects. New functionality is always *important*, but in 99.9% of the cases it's not *urgent*. *Importance* and *urgency* are two very different concepts, which are wrongfully used interchangeably in many situations. On that extend... 

# A software startup is not an urgent situation

Unfortunately, many software startups have a very specific mindset that somehow urges them to write messy, inflexible software, as quickly as possible. It is as if they are competing at some race and must get to the finish line first, whatever means necessary, leaving a huge trail of debris in their wake.

![Move Fast and Break Things](https://imgs.xkcd.com/comics/move_fast_and_break_things.png)
<p class="text-center">Image source: <a href="https://xkcd.com/1428/">xkcd.com</a></p>

One thing that's certain about a software startup is that you're going to build the wrong product. No product survives intact from the hands of users. As soon as you expose your product to the users you'll realize that you have built it wrong in a million ways, and you'll need to change it and adapt, again and again.

Remember what makes software *soft*? Good structure! If your system suffers from poor structural quality, and you can't change it easily enough because you have made a mess, you are bound to fail.

Messy code slows down software startups long before they get to the finish line. It causes all kinds of problems, defects and regressions. And as soon as they realize it, they panic; they rush even more, causing even more harm, and heading straight down the good ol' death spiral we discussed before.

<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/Xbaqq8NCa7yaA" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/working-Xbaqq8NCa7yaA">via GIPHY</a></p>

These startups would be much better off, and they would go much faster, if they acted professionally and protected the structure of the system from harm.

That mentality of rushing usually stems from the Business side, as they keep trying to discover the right product to build. Although that's a legit concern, it should not affect the Engineering side negatively.

There are [proven techniques](http://blog.drinkbird.com/lean-startup-book-review/) for building a product incrementally, using it as a subject of rapid experimentation, and pivoting or persevering depending on the findings. This approach results in the Business engaging with Engineering only when necessary, and at the right basis. That way there are no excuses for making a mess.

# What if you don't want all that responsibility?

Unfortunately, lots of programmers feel that way. They simply want to be told what to do and just do it. They try to avoid confrontation at all cost. They never say no, no matter how justified this answer would be, in favor of job security, more money, or other toxic reasons.

These people usually end up keeping a passive-aggressive stance that not only doesn't help the business, but ends up causing even more problems.

![Passive-aggressive]({{ site.baseurl }}/images/passive-aggressive.jpg)

Programmers who feel that way should be paid minimum wage, because that's how much their work output is worth - if not less.

Of course, it's your boss's right to fire you if they don't agree with your methods, but if your professionalism makes you lose your job, chances are that you work for the wrong boss in the first place.

# And what if you don't work on an important piece of software?

At this point you may be wondering, does everything discussed still apply for any kind of software, or just for high-risk systems? What if you are working on a chat application, or a simplistic web portal where users can order t-shirts?

What if someone using your chat application has a heart attack and the last thing he does is to send a message for help? What would happen if that message goes nowhere because your software is problematic?

What if your t-shirt portal leaks sensitive information that will be used by somebody to steal your customers' money?

The software you are working on may not have the potential to [kill people](https://en.wikipedia.org/wiki/2009%E2%80%9311_Toyota_vehicle_recalls), but it's very easy to underestimate the harm it can cause.

> Tech excellence should be a goal of every company involved with software development, no matter if that's part of their main business or not.

Unfortunately, lots of them have a strategy of hiring many low-cost programmers instead of fewer but highly-skilled ones, thinking that quantity is more important that quality.

<div style="width:100%;height:0;padding-bottom:70%;position:relative;"><iframe src="https://giphy.com/embed/rAm0u2k17rM3e" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/pokemon-school-college-rAm0u2k17rM3e">via GIPHY</a></p>

What these companies actually achieve is to be in a constant state of firefighting and bug triaging. Their programmers are constantly burned out, and their work environment is nothing but healthy. Needless to say, that you don't want to be one of these programmers.

# Summary

It's you, the engineer, who's responsible for maintaining the structural quality of the system you work on. The business side asks you to implement urgent behaviors while assuming that you keep the structural quality of the system high.

You negotiate, if needed, for your rights as a stakeholder, and you stand by your duties as an engineer. You make tradeoffs when necessary, but never more that you can afford.

<div style="width:100%;height:0;padding-bottom:41%;position:relative;"><iframe src="https://giphy.com/embed/Lvand4cUuA6xG" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/life-seth-rogen-this-is-the-end-Lvand4cUuA6xG">via GIPHY</a></p>

The code that you produce should always be your best work, and you should never allow the structure and behavior of the system to degrade and get out of hand.

Many software startups have a wrong mentality around speed, confusing the speed of developing software with that of figuring out the right product to build. Remember, speed kills, it's the mother of all software defects.

> In software, it never pays to rush. The only way to go fast is to go well.<br/> -- Robert C. Martin

You can be all about results, but make sure that you don't just focus on behavior while letting the structure to rot, making all kinds of bad tradeoffs along the way. This is not only unprofessional, but also leads to harming the business, the customers and the users. Don't be that guy.

# References

Almost the entirety of this article's contents come from Robert C. Martin's [Clean Coders video series](https://cleancoders.com/videos). I highly encourage you to get the whole video series and watch it again and again, as it contains extremely valuable knowledge for our craft. It is also available in [Safari Books Online](https://www.safaribooksonline.com/library/view/clean-coder-clean/9780134843803/).
