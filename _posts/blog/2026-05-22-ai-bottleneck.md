---
layout: post
title: "The bottleneck AI just moved"
excerpt: "Generative AI makes writing code faster. That speeds up a step that was rarely the constraint, while piling pressure on the ones that always were."
permalink: /ai-bottleneck/
comments: true
categories: blog
featured: true
mermaid: true
image:
  feature: ai-bottleneck.jpg
reads:
  - thegoal
  - thegoalgraphicnovel
  - accelerate
  - devops
  - thephoenix
  - radicalcandor
  - turntheshiparound
  - peopleware
---

# The bottleneck AI just moved

A familiar pattern is playing out across the industry. Generative AI tools land in the IDE, leadership sets expectations that output should rise accordingly, and in many places the message goes further: ship faster with fewer engineers, or with no engineers at all. The intent is understandable. The execution, in most cases I have observed, optimizes the wrong part of the system.

In my [previous post](https://blog.drinkbird.com/ai-speed/) I argued that AI accelerates code creation but engineering still depends on clarity and deliberate decisions, and that speed without judgment is not engineering. That post looked at the cultural and decision-making cost of the current moment. This one pulls a different thread from the same situation and looks at the *system* cost, what happens to throughput when a non-constraint suddenly runs faster and the constraint does not.

## A short detour through The Goal

Eliyahu Goldratt's {% include link.html tag="thegoal" %} introduced the *Theory of Constraints*, and the idea is simple enough to fit in a paragraph. Any system that turns inputs into outputs has exactly one constraint at a time, a single step that limits the throughput of the whole. Improvements made anywhere else look like progress on a dashboard but do not move the system. Worse, speeding up a non-constraint usually piles inventory in front of the real bottleneck, which makes things slower, not faster.

The classic example is a factory. A faster machine upstream of a slow one does not produce more finished goods. It produces more half-finished work waiting in a queue, more storage costs, more defects discovered late, and a longer cycle time from order to delivery. The instinct to make every station faster is the instinct that breaks the line.

Software delivery is a system too, and it has a constraint.

## Writing code was rarely the constraint

The previous post made the case that coding is not the hard part of engineering. Theory of Constraints lets us say something stronger and more measurable: coding was also rarely the *bottleneck*. If you look honestly at where time goes between a problem being understood and a change being safely in production, the typing of the code is a small slice. The larger slices are clarifying what is actually wanted, designing something that fits the existing system, reviewing the change with enough rigor to catch what matters, testing it under realistic conditions, integrating it without breaking neighbors, deploying it safely, and operating it once real traffic arrives.

Generative AI accelerates the typing. That is genuinely useful, and I am not here to argue otherwise. The problem is that accelerating a non-constraint, on its own, does not increase throughput. It increases the rate at which work arrives at the next step.

The next step is review and integration. That step is performed by senior engineers, and it was already under pressure before any of this started.

## Where the queue is forming

When the volume of generated code climbs while the review capacity stays flat, the queue in front of review grows. Reviewers face two unattractive options. They can hold the line on quality, in which case the queue gets longer and the apparent productivity gains evaporate at the merge boundary. Or they can lower their standards to keep up, in which case the code that lands is less consistent, less maintainable, and accumulates subtle defects that surface weeks or months later as incidents, regressions, and rewrites.

In practice teams drift toward the second option, because the first is visible and the second is not. The cost is real, but it is paid on a delay, and it is paid by a different budget than the one being measured. The previous post described what this drift looks like from a cultural angle, with reviews growing quiet and scrutiny softening under pressure. The same drift, viewed as a system, is a queue management failure.

This is the part that matters: the constraint did not disappear. It moved, and it got heavier. Review, integration, and the long tail of maintaining what was merged are now under more load than before, performed by the same people, with the same hours in the day. *Local efficiency at the keyboard is being converted into global inefficiency at the bottleneck.* That is the failure mode Goldratt described forty years ago, applied to a new tool.

![the queue moved]({{ site.baseurl }}/images/ai-bottleneck-1.png)

There is a secondary effect worth naming briefly. The same logic that treats code generation as a substitute for engineering tends to treat junior engineers as a substitute cost line. That trade looks clean on a spreadsheet and is corrosive over a five-year horizon, because the supply of senior engineers is not a renewable resource that refills itself. I will come back to this in a future post, because it deserves more than a paragraph.

## The good news is also a constraint problem

None of the above is an argument against using these tools. It is an argument against using them as if writing code were the limiting step. Once the constraint is named, the tools fit into the picture cleanly, and in two complementary ways.

**The first is to apply AI directly at the constraint.** If review, integration, and operability are where throughput is lost, that is where the leverage is. AI is genuinely useful for first-pass review comments, drafting tests against a change, flagging missing observability, generating and maintaining documentation that reviewers and on-call engineers rely on, summarizing diffs, surfacing related code that a reviewer should also look at, and reducing the cognitive cost of understanding unfamiliar parts of the system. None of this replaces senior judgment. It compresses the work around that judgment so more of it can happen in the same hour.

**The second is to apply AI to non-constraint toil so that senior capacity is freed up for the constraint.** Boilerplate, scaffolding, migrations of mechanical shape, regex-grade refactors, throwaway scripts, and the long tail of small tasks that nobody learns anything from are reasonable candidates. The point is not that this work becomes faster in isolation, since by definition speeding up a non-constraint does not raise throughput on its own. The point is that the hours it used to consume can be redirected to the place that actually limits the system.

The principle underneath both is the same. Identify the constraint, then decide what tools and people should do in service of it. Anything else is local optimization, and local optimization is what The Goal spends a whole book warning against.

![working at the constraint]({{ site.baseurl }}/images/ai-bottleneck-2.png)

## What this asks of leadership

The question is not whether to adopt AI. That decision has been made in most organizations, and on the engineering side I think it is the right one. The question is what success is measured against.

If success is measured by lines generated, pull requests opened, or seats reduced, the system will optimize for those things, and the cost will appear elsewhere as slower delivery, fragile code, rising incident rates, and senior engineers leaving for places that treat the work more seriously. If success is measured by end-to-end throughput, by the time from a real problem being understood to a real change running safely in production, then the tools have a clear job and the org has a clear way to tell whether they are doing it.

Frameworks like {% include link.html tag="accelerate" %} and {% include link.html tag="devops" %} already give us the metrics for that conversation, and have for years. They were useful before generative AI, and they are more useful now, because they measure the system rather than the keyboard.

Engineering leaders are in a good position to reframe the conversation upward. The argument does not require pushing back on AI, and it does not require defending headcount as a value in itself. It requires naming the constraint, showing where load is accumulating, and proposing a measurement of throughput that survives contact with reality. That is a conversation senior leadership tends to engage with, because it is denominated in the language they already use to run the business.

In a future post I want to take the positive half of this seriously and go deeper into what it actually looks like to put AI at the constraint, with concrete patterns for review, testing, observability, and documentation. The framing matters, but the practice is where the throughput shows up.

Until next time, Tasos.