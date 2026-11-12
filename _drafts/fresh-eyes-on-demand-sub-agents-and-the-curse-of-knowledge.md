---
layout: post
title: "Fresh Eyes on Demand: Sub-Agents and the Curse of Knowledge"
excerpt: "You cannot un-know what you know. A sub-agent with a fresh context can help you spot what your docs or reviews leave unexplained. It is a cheap check you can repeat, as long as you understand its limits."
date: 2026-11-11 00:00:00
permalink: /fresh-eyes-on-demand-sub-agents-and-the-curse-of-knowledge/
comments: true
categories: blog
tags:
  - ai
  - leadership
---

Three years ago I wrote about [the curse of knowledge](https://blog.drinkbird.com/the-curse-of-knowledge/). Once we know something, we struggle to imagine not knowing it.

In Elizabeth Newton's 1990 Stanford experiment, people tapped out well-known songs for others to identify. They expected listeners to name the tune half the time. Listeners managed one song in forty. The tappers could hear the melody in their heads and could not switch it off.

Most of my advice was about team culture. I also suggested a simple test: ask a colleague who has not worked on your project to try your documentation.

It works, but that colleague is busy. They are also only fresh once. After the first read, they know more about the system and may start filling gaps without noticing.

Coding tools now offer another source of fresh readers: sub-agents that start without the main conversation's context. That makes an old technique much easier to use.

## Why trying harder does not work

Knowing about the bias does little to stop it. The economists who [named it in 1989](https://www.cmu.edu/dietrich/sds/docs/loewenstein/CurseknowledgeEconSet.pdf) tested whether money and feedback would help. People still struggled to set aside extra information when it paid to do so. Feedback alone did little, and even market pressure only cut the effect by about half.

Experience can make this worse. The more you know about a system and its history, the more you leave unsaid. A staff engineer's two-line ticket may be clear only to the staff engineer. A decision record that says "for the usual reasons" assumes the reader already knows those reasons.

That is why onboarding feedback and usability tests help. We watch someone who lacks our context and see where they struggle. The hard part is finding enough fresh readers.

## What a fresh context gives you

In most agentic coding tools, a sub-agent [runs in its own context window](https://code.claude.com/docs/en/sub-agents). It receives a separate brief rather than the conversation that produced the work. It may also load project instructions and open files.

It has not followed the three-hour discussion about why the retry logic looks strange. It does not know what everyone agreed in last week's meeting. You get a reader who needs the document to explain itself.

You can revise the document and send it to another fresh sub-agent. The cost is low enough to make that a routine check, even for small ticket changes.

A new hire may hesitate to tell a senior engineer that a design doc lost them on page two. That is one reason [psychological safety](https://blog.drinkbird.com/psychological-safety/) matters. A sub-agent has no reputation to protect. Its confusion may also be easier for the author to hear.

## Where I would point it

In [The bottleneck AI just moved](https://blog.drinkbird.com/ai-bottleneck/) I argued for using AI where work gets held up. Review and integration need help, including better documentation. Here are four ways to use a fresh sub-agent there.

**The cold read, for design docs and decision records.** Give it just the document. Ask it to explain why the chosen option won over the alternatives. Compare its answer with what you meant. The differences show what stayed in your head.

**The clean room, for READMEs and runbooks.** Have it follow the instructions in a clean environment and record where it had to guess. Find the missing steps before a new hire has to.

**The first question, for tickets and specs.** Before assigning a ticket, ask a fresh sub-agent what it needs to know to start. These may be the questions your engineer would ask on day three, or never feel able to ask.

**The maintainer's review, for pull requests.** Give the reviewer only the diff and the description. The author knows the reasoning behind the change. Will an on-call engineer understand it at 3 a.m. next year?

## Where the idea breaks

A fresh context does not make the agent objective. There are limits to what this check can tell you.

**Blank context is not blank knowledge.** The sub-agent already knows a lot about software. Think of it as an experienced contractor on day one. It may spot an unexplained service name or a missing setup step. It may understand jargon that confuses your product manager.

**It fills gaps quietly.** A person may stop at a missing step and ask for help. A model may guess and carry on. Success with a runbook does not prove the instructions are complete. Ask for assumptions and questions before a verdict. A specific place it got stuck tells you more than a general "it worked".

**Fresh is not the same as independent.** If the same model writes and reviews the code, both runs can share blind spots. A new context separates the review from the author's reasoning. It does not undo the model's training or its tendency to agree with how a task is framed.

**The intended reader still has the final say.** An agent's review cannot tell you whether a real new hire or customer will understand. It can help catch obvious gaps before they have to.

## The curse moves into the brief

The brief has to come from someone who already holds the context. It might be you or a lead agent deep into a long session. Either way, the tapper writes the instructions.

Ask a reviewer to "check that my fix for the race condition in the cache is correct" and you have already supplied a diagnosis. The reviewer may follow it rather than question it. You asked for fresh eyes, then told them where to look.

Vague briefs cause problems too. Anthropic's engineers [found that sub-agents misunderstood short tasks or repeated each other's work](https://www.anthropic.com/engineering/built-multi-agent-research-system).

The curse has not gone away, but the brief gives you one short text to examine. Hidden assumptions are easier to spot in a twelve-line handoff than across a hundred conversations.

A few habits keep the brief clean:

- Give the sub-agent only what the real reader will have.
- State the task and the audience. Leave your conclusions out.
- Ask for questions and assumptions before a verdict.
- When the result is wrong, read the brief before you blame the agent.

## What this asks of leaders

An agent needs the same context a new colleague would. What changes is how quickly you discover it is missing. A person may work around a vague brief for weeks. An agent can expose the problem in minutes.

Use that feedback to improve the documents your people rely on. Start with one that newcomers struggle with and run a cold read this week. In your next doc review, ask: "What did the fresh reader get wrong?"

The advice from 2023 still matters. We have to close the gaps the agent finds and build a team where people feel safe saying "I don't follow".

In that earlier post, I wrote about breaking the curse. I would put it more modestly now. We still cannot unhear the song. But we can ask for a fresh listener whenever we need one, and test what we left unsaid.

Take care, Tasos.
