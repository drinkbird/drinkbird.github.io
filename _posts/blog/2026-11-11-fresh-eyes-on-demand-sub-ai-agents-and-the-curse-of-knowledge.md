---
layout: post
title: "Fresh eyes on demand: AI sub-agents and the Curse of Knowledge"
excerpt: "You cannot un-know what you know, which is why the curse of knowledge resists good intentions. An AI sub-agent with a fresh context can help you spot what your docs or reviews lack in explanation."
date: 2026-11-11 00:00:00
permalink: /fresh-eyes-on-demand-ai-sub-agents-and-the-curse-of-knowledge/
comments: true
categories: blog
image:
  feature: curse-ai-cover-1x.jpg
  alt: "A robot points out a missing connection in a diagram while an engineer considers the context held in his mind."
tags:
  - ai
  - leadership
reads:
  - madetostick-amazon
  - thinkingfastandslow
  - communicationforengineers
  - onwritingwell-amazon
  - thefearlessorg
  - effectiveusecases
  - userstoriesapplied
  - pragmaticprogrammer
  - apprenticeship
  - debuggingteams
  - radicalcandor
  - crucialconversations
  - creativityincbook
  - multipliers
  - turntheshiparound
  - peopleware
  - staffengineer
  - toyotakata
  - thinkinginsystems
  - effectiveengineer
  - teamtopologies
  - managerspath
  - resilientmgmt
  - highoutputmgmt
  - accelerate
  - thegoal
---

Three years ago I wrote about [the curse of knowledge](https://blog.drinkbird.com/the-curse-of-knowledge/), a cognitive bias that affects the way we communicate and work. Once we know something, we struggle to imagine not knowing it.

In Elizabeth Newton's 1990 Stanford experiment, people tapped out well-known songs for others to identify. They expected listeners to name the tune half the time, but listeners managed 1 song in 40. The tappers could hear the melody in their heads and could not switch it off.

![A man taps a tune on a table, hearing a full melody in his mind, while the listener hears only isolated beats.]({{ site.baseurl }}/images/curse-ai-1.png)

Most of my advice was about team culture, including psychological safety, plain language and a habit of asking questions. I also suggested a simple test, to ask a colleague who has not worked on your project to try your documentation and see how it reads.

It is a good advice, but has a supply problem. That colleague is busy, plus they are only fresh once. After the first read they know more about the system and may start filling gaps without noticing.

This post is about a new source of fresh readers. Agentic coding tools can now delegate work to sub-agents that start with an empty context. I think that property matters more to engineering leaders than it first appears, as it makes an old technique much easier to use.

## Why trying harder does not work

Knowing about the bias does little to stop it. The economists who [named it in 1989](https://www.cmu.edu/dietrich/sds/docs/loewenstein/CurseknowledgeEconSet.pdf) tested whether money and feedback would fix it. People still struggled to set aside extra information even when paid to do so. Feedback alone did little, and even market pressure only cut the effect by about half.

Seniority can make things worse. The more you know about a system and its historical context, the more your communication compresses. A staff engineer's 2-line ticket may be clear only to the staff engineer. A decision record that says "for the usual reasons" assumes the reader already knows those reasons.

Alas, every reliable countermeasure we have is external. Hallway usability tests, new-hire onboarding feedback, asking someone to explain it back etc., all work by finding a mind that does not contain the knowledge and watching where it stumbles. So the technique was never the limit, but the supply of unknowing minds was.

## What a fresh context gives you

In most AI agentic coding tools, a sub-agent [runs in its own context window](https://code.claude.com/docs/en/sub-agents). It receives a separate brief rather than the conversation that produced the work, and may also load project instructions and open files.

That is the listener's position, manufactured on demand. It has not followed the 3-hour discussion about why the retry logic looks strange and does not know what everyone agreed in last week's meeting. You get a reader who needs the document to explain itself. Based on its feedback, you can revise the document and send it to another fresh sub-agent. The cost is low enough to make that a routine check, even for small ticket changes.

This is more than a novelty. A new hire may hesitate to tell a senior engineer that a design doc lost them on page 2, which is one reason why [psychological safety](https://blog.drinkbird.com/psychological-safety/) matters. A sub-agent has no reputation to protect, so its confusion may also be easier for the author to hear.

## Where I would point it

In [The bottleneck AI just moved](https://blog.drinkbird.com/ai-bottleneck/) I argued for using AI where work gets held up. Review and integration need help, including better documentation. Here are 4 ways to use a fresh sub-agent there:

1. **The cold read, for design docs and decision records.** Give it just the document and ask it to explain why the chosen option won over the alternatives. Then compare its answer with what you meant, and the differences will show what stayed in your head.

1. **The clean room, for READMEs and runbooks.** Have it follow the instructions in a clean environment and record where it had to guess. That way you can find the missing steps before a new hire has to.

1. **The first question, for tickets and specs.** Before assigning a ticket to a person or agent, ask a fresh sub-agent what it needs to know to start. These may be the questions your engineer would ask on day 3, or never feel comfortable to ask.

1. **The maintainer's review, for pull requests.** Give the reviewer only the diff and the description. The author knows the reasoning behind the change, but will an on-call engineer understand it at 3 am next year?

![A robot pauses at a gap in a path of instruction sheets as an engineer looks back from farther along the path.]({{ site.baseurl }}/images/curse-ai-2.png)

## Where the idea breaks

A fresh context does not make the AI objective. I think that is the wrong lesson, as there are limits to what such check can tell you.

1. **Blank context is not blank knowledge.** The sub-agent may have never seen your system, but it already knows a lot about software and it has read more about Kubernetes, OAuth, event sourcing, etc. than anyone on your team. Think of it as an experienced contractor on day one, not as a junior engineer or a customer. It may spot missing local context, such as an unexplained service name or a missing setup step, though may also use jargon that every engineering knows but confuses your product manager.

1. **It fills gaps quietly.** A person may stop at a missing step and ask for help, but an AI model may infer something plausible and carry on. So a sub-agent that succeeds with your runbook does not prove that the instructions are complete. You should ask for its assumptions and questions before any verdict, and treat "it worked" as weaker evidence than "it got stuck here".

1. **Fresh is not the same as independent.** If the same model writes and reviews the code, both runs can share blind spots. A new context separates the review from the author's reasoning but does not undo the model's training or its tendency to agree with how a task is framed.

1. **The intended reader still has the final say.** An agent's review cannot tell you whether a real new hire or customer will understand. The agent's job is to make sure they are not the first to find the obvious holes.

## The curse moves into the brief

The brief has to come from someone who already holds the context. That is either you or an orchestrating agent deep into a long session, and both are tappers.

Ask a reviewer to "check that my fix for the race condition in the cache is correct" and you have handed over your conclusions ("there was a race, it lived in the cache and this change fixes it"). You essentially asked for fresh eyes and then told them where to look.

![An engineer guides a robot's magnifying glass toward one part of a diagram while a broken connection elsewhere goes unnoticed.]({{ site.baseurl }}/images/curse-ai-3.png)

Anthropic's engineers [described the same failure](https://www.anthropic.com/engineering/built-multi-agent-research-system) from the other side. When a lead agent handed out short and vague tasks, the sub-agents misread them or repeated each other's work.

So the curse has not gone away, but it gets concentrated to one short artifact ("the handoff") and I think that is a real improvement. A bias that is spread across several conversations is materially invisible, but one sitting in a 12-line brief can be read, iterated and fixed.

### A few habits keep the brief clean:

* Give the sub-agent only what the real audience will have.
* State the task and the audience. Leave your conclusions out.
* Ask for questions and assumptions before a verdict.
* When the result is wrong, read the brief before you blame the agent.

## What this asks of leaders

Writing for an agent is the same skill as writing for a new hire, a peer team, or even yourself a year from now, and all of them need the context made explicit. What changes is how quickly you discover it is missing. A person may work around a vague brief for weeks, but an agent can expose the problem in minutes.

Teams that pay attention to those failures write better tickets. They also keep better decision records and have better onbarding docs for their people.

There is a huge leadership opportunity here and it costs very little to start. For example, you can pick one document that every newcomer struggles with and run a cold read on it. Separately, you can make "what did the fresh reader get wrong?" a normal question in design and doc review.

By the way, none of that retires the advice from 2023. We have to close the gaps the agent finds and build a team where people feel safe saying "I don't follow".

In that earlier post, I wrote about breaking the curse. I would put it more modestly now, as we cannot unhear the song, and no tool will change that. What has changed is that we can summon a listener whenever we want one, and that turns a bias we could only warn people about into one we can test for.

Take care, Tasos.
