---
layout: post
title: "Become a better software developer by bursting the Bubble of Ego"
excerpt: "I must admit that I used to be a bit territorial about my code, but not anymore, and let me tell you why." 
permalink: /bursting-the-bubble-of-ego/
comments: true
categories: blog
featured: true
image:
  feature: change-of-heart.jpg
  credit: ForWallpaper.com
  creditlink: http://www.forwallpaper.com/wallpaper/change-of-heart-473905.html
reads:
  - thecleancoder
  - cleancode
  - refactoring
  - codecomplete
  - softskills
---

Most software developers are a bit territorial about their code, to say the least. They generally don't like other people messing with their work, since they believe that they are the only ones who can completely understand and judge what they are doing.

I must admit that I used to think like that, but not anymore, and let me tell you why.

## Motivation through some hard numbers
A typical programming exercise in college doesn't require more than 500 lines of code in average, and it's usually done in solo. On the other hand, an ordinary industry project could require more than 500,000 lines of code. Ford's new GT has [10,000,000 lines](http://www.digitaltrends.com/cars/the-ford-gt-uses-more-lines-of-code-than-a-boeing-787/) of *mission critical* code, which is more than what a Boeing 787 has. Moreover, large software systems can cost as much as a skyscraper or an aircraft carrier.

It's hard to explain to a new computer science graduate or someone who has only worked in relatively small projects why you need engineering discipline, design patterns, conventions and well-established procedures. The type of effort described above doesn't simply require the same kind of skills in a larger scale, but a completely new skill set altogether.

In addition, as mentioned in Steven McConnell's book, {% include link.html title="Code Complete 2" url="http://www.amazon.co.uk/dp/0735619670?tag=drin04-20" %}, the cost of fixing defects in software, both in terms of money and human effort, increases dramatically between the various phases of the software's life cycle. When a defect is detected early, during the Requirements phase, it has a cost of X. The same defect, if caught during the Architecture phase it can cost up to 3X, during the Construction phase between 5X and 10X, during the System Test phase 10X, and finally during the Post-Release phase between 10X and 100X.

It is apparent that the magnitude of responsibility, as well as the amount of quality work that needs to be done on any real world project, cannot be an one-man show. Truly great results *always* originate from team effort. But what could possibly be the biggest obstacle of high-quality teamwork?

![Bursting the buble of ego]({{ site.baseurl }}/images/ego.jpg)

## The curse of knowledge
During the process of writing code for a new feature, we have a good understanding of what this feature is supposed to do and how it fits in the bigger picture. We are in a unique position to know exactly what we are thinking at the time we are writing the code. Everyone else doesn’t know what we know and we are obviously aware of that. However, it is almost impossible for us to imagine not knowing what we know at a certain moment in time. 

This is in fact a cognitive bias called *the curse of knowledge*, which constitutes a major, insidious cause of code 
deterioration and technical debt. It directly affects our decision making process and relentlessly short-circuits our sense of objectivity. Although the code we produce appears to be perfectly readable at the moment of writing, it may in fact be hard to read by everyone else, **including the future versions of ourselves** as our memory is volatile.

In his [blog](http://blogs.msdn.com/b/peterhal/archive/2006/01/04/509302.aspx), Peter Hallam mentions that as software developers, we tend to spend more than 70% of our time understanding existing code, as this is a fundamental prerequisite in maintaining, correcting or extending a system. Now, imagine what could happen if every one of us would always produce code that clearly shows its intentions, that can be easily read and understood by anyone, and it's so expressive that comments could be regarded as mere noise.

There are two particular quotes befitting exactly this way of thinking. Martin Fowler, in his book {% include link.html title="Refactoring" url="http://www.amazon.co.uk/dp/0201485672?tag=drin04-20" %}, says: 

> Any fool can write code that a computer can understand. Good programmers write code that humans can understand.

On the other hand, Robert C. Martin, in his book {% include link.html title="Clean Code" url="http://www.amazon.co.uk/dp/0132350882?tag=drin04-20" %}, says:

> Every time you express yourself in code, you should pat yourself on the back. Every time you write a comment, you should grimace and feel the failure of your ability of expression.

Such clarity in code can only originate from team effort. Again, what could possibly be the biggest obstacle of high-quality teamwork?

![Bursting the buble of ego, again]({{ site.baseurl }}/images/ego2.jpg)

## Ego is just a bubble we need to burst, and fast!

It all starts with self-awareness. Try to observe your own behavior and feelings next time you find yourself in one of the following situations:

* Someone suggests a correction to your work during a code review, or makes a change to a piece of code you are the original author of.
* Someone makes a case about the technology to be used in your next project, or simply starts a discussion about comparing different operating systems or technologies.
* Someone brags about their career achievements.

The list can be really long, but you get the point. If you really want to achieve great things as a software developer, start by being humble and truly value the opinions of others.

So what was the latest ego-driven experience you had in software development? Feel free to share in comments below.
