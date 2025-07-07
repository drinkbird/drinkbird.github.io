---
layout: post
title: "The $2M bug that wasn't in the code"
excerpt: "Why Software Engineers who master Organizational Behavior outbuild, outinnovate, and outlast everyone else"
permalink: /organizational-behavior/
comments: true
categories: blog
featured: true
mermaid: true
image:
  feature: ob.jpg
reads:
  - accelerate-amazon
  - peopleware
  - communicationforengineers
  - habit
  - softskills
  - remote
  - thecleancoder
  - codecomplete
  - pragmaticprogrammer
  - agiledev
  - leanstartup
  - careerguide
  - legacycode
  - effectiveusecases
  - userstoriesapplied
---

At some point in the past, I witnessed a company invest three years of collective ambition in breaking down a monolith into microservices. The vision was bold: empower teams to be more autonomous and move faster. Everyone wanted to be part of something transformative, and no one wanted to be the one who played it safe.

But somewhere between the whiteboard dreams and the daily grind, we underestimated the gaps forming beneath us. The initiative became less about the best way forward and more about proving that we could build every part ourselves. Buy vs build debates were held, but always with a bias toward building. After all, what's more satisfying for an ambitious engineer than [leaving your own architectural fingerprint on the company]({{ site.baseurl }}/not-invented-here)? And while we were at it, why not overengineer components in hopes of turning them into patents or conference talks?

As the months dragged on, the sunk cost fallacy quietly took hold. We'd already invested so much time, energy and even reputations that pulling back felt unthinkable. Every new challenge was met with *We've come this far, we can't turn back now.* The original goals, team autonomy and velocity, got lost in a sea of integration headaches, duplicated efforts and communication breakdowns. We didn't just accumulate technical debt. We also accumulated organizational debt. The project incurred $2M in wasted effort, while the system ultimately suffered from many of the tradeoffs that microservices present, and with none of the intended benefits. The costliest bugs weren't in the code, but in our decision-making, our unchecked ambition, and our inability to challenge our own narrative. 

![pivot or crash]({{ site.baseurl }}/images/paperplanes.jpg)

And here's the uncomfortable truth: In software, we obsess over technical flaws, but it's the breakdowns in communication, motivation and team dynamics that quietly sink the most projects.

According to the [Standish Group's CHAOS 2020 report](https://pm360consulting.ie/it-project-failure-rates-facts-and-reasons/), 66% of technology projects end in partial or total failure, with causes like poor requirements, planning, and communication - issues rooted in *people and process*, not just technology.
 
 [Google's Project Aristotle](https://www.nytimes.com/2011/03/13/business/13hire.html?smid=pl-share) revealed that psychological safety has a greater impact on code quality than skill alone.

What does this look like in practice?
* A brilliant design gets rejected because stakeholders weren't consulted, maybe because product and engineering never synced on priorities.
* A critical fix is delayed by unresolved team conflict.
* A top-performing engineer quits after months of unrecognized contributions.

If you've ever wondered why some environments thrive while others stall, despite having similar talent, resources and even the same tech stack, you're not alone. Anyone who has spent time in tech has seen projects fail for reasons that have little to do with technology itself. I used to chalk these differences up to luck, personalities, or *just the way things are.* But there's a deeper science at play.

## That is where Organizational Behavior (OB) comes in

I first encountered OB during my MBA studies, and what started as a single module quickly became a fascination. It opened my eyes to how much of what we call *instinct* or *gut feeling* in management is really just flying blind, especially in tech, where so many leaders rely on intuition instead of evidence

OB is a behavioral science that studies how people actually behave in organizations, not how we wish they would, or how the org chart says they should. It's a field that draws on psychology, social psychology, sociology, and even anthropology to decode why teams succeed or struggle, why change efforts fizzle, and why even the best code can't save a project when the human system is out of sync.

Put simply, OB gives you the analytical toolkit to decode these mysteries. Instead of being bewildered by workplace dynamics or relying on gut instinct, you can draw on decades of research to understand what's really happening beneath the surface.

The diagram below illustrates how all related fields contribute to OB and how their insights connect across individuals, groups, and organizations.

<div class="mermaid">
flowchart LR;
    subgraph S1 [Behavioral Science]
      A1[Psychology]
      A2[Social Psychology]
      A3[Sociology]
      A4[Anthropology]
    end
    subgraph S2 [Contributions]
      B1["
          Learning
          Motivation
          Personality
          Emotions
          Perception
          Leadership effectiveness
          Job satisfaction
          Individual decision making
          Performance appraisal
          Attitude measurement
          Employee selection
          Work design
          Work stress
      "]      
      B2["
          Behavioral change
          Attitude change
          Communication
          Group processes
          Group decision making
      "]
      B3["
          Communication
          Power
          Conflict
          Intergroup behavior
      "]
      B4["
          Formal organization theory
          Organizational technology
          Organizational change
          Organizational culture
      "]
      B5["
          Comparative values
          Comparative attitudes
          Cross-cultural analysis
      "]
      B6["
          Organizational culture
          Organizational environment
          Power
      "]
    end
    subgraph S3 [Unit of Analysis]
      C1(Individual)
      C2(Group)
      C3(Organization system)
    end
    A1 --> B1;
    A2 --> B2;
    A3 --> B3;
    A3 --> B4;
    A4 --> B5;
    A4 --> B6;
    B1 --> C1;
    B2 --> C2;
    B3 --> C2;
    B5 --> C2;
    B4 --> C3;
    B6 --> C3;
</div>

## From intuition to insight

In tech, we pride ourselves on making data-driven decisions. Yet, when it comes to people and teams, most still default to intuition or "what's always worked." OB challenges the habit and replaces simple answers with thoughtful analysis. It asks us to approach human systems with the same rigor we apply to debugging code or designing architecture: gather evidence, analyze context and test interventions.

Want to improve team collaboration? OB doesn't settle for vague advice like *communicate more*, but rather encourages you to examine both individual motivations and group norms. Why does one engineer always go quiet in meetings? Is it a lack of psychological safety, or are the expectations for participation simply unclear?

Struggling with resistance to a new initiative? Instead of assuming people *just don't like change,* OB research points to measurable factors such as psychological safety, clarity of communication and whether people feel their input actually matters. These are levers you can observe, influence and improve.

OB's multilevel lens is especially valuable in engineering environments, where complexity is the norm.

On an individual level, you may wonder why one engineer appears disengaged. Is it a misalignment of incentives, a lack of autonomy, or something else entirely? OB helps you move beyond labels and diagnose the root cause.

On a group level, you may wonder why your code review process sparks defensiveness or silence. Are your team's norms around feedback and learning really as healthy as you think they are? OB provides you with frameworks to identify and shift group dynamics.

At the organizational level, you may explore why some technical initiatives gain traction while others stall. Is it a question of culture, structure or leadership buy-in? OB helps you see how the broader system shapes every project's fate.

OB turns the *people part* of engineering from a black box into something you can analyze, understand and improve. And it's not about abandoning intuition, but rather supplementing it with solid research, battle-tested evidence and frameworks that have stood the test of time.

## Why this matters for your career
You might think that this is just a matter of *soft skills.* Here's the reality. Mastering OB is a career multiplier for engineers and technical leaders. The higher you go, the less your impact is measured by the code you write and the more it is measured by the teams you build, the decisions you influence, and the change you drive. Promotions, trust and opportunities gravitate toward those who can navigate complexity, not just in systems, but in people.

Engineers who understand OB don't just get their ideas heard - they get them adopted. They build teams that collaborate effectively and stay together, influence technical direction without needing formal authority and become the go-to problem solvers when projects stall or friction arises. In a fast-changing tech world, the ability to work with, lead, and inspire people is what separates those who merely keep up from those who get ahead. OB is the essential toolkit for engineers who want to move from individual contributor to true technical leader.

![Leading]({{ site.baseurl }}/images/chess.jpg)

## A continuous learning mindset
Understanding behavior isn't a one-and-done task. The world of work is constantly evolving, from remote teams and cross-cultural collaboration to new leadership models. OB encourages a mindset of continuous learning, staying curious, reading new research and treating team dynamics as a system you can observe and improve.

As an engineer or technical leader, this means adopting a data-driven approach to people, not just code. Read the latest research, look for patterns in your own organization, and be willing to experiment with new ways of working.

## Applying OB: Your next step
Given how central behavior is to team effectiveness, what's one puzzling challenge in your current workplace you could re-examine through the lens of OB? Maybe it's a recurring conflict in your standups, a stalled project, or a teammate who's suddenly disengaged. Try breaking it down using OB's levels of analysis: individual, group, and organization. What new insights emerge?

Remember that OB isn't about memorizing theories, but rather about building a habit of thoughtful observation and evidence-based action. It is essential knowledge for everyone who works for, with or leads other people today. And it doesn't promise easy answers, but it does offer a framework for asking better questions, which often is where real progress begins.

In upcoming posts, I'll dig into several OB topics like [why Conway's Law means your org chart might be your biggest architectural constraint](https://blog.drinkbird.com/conways-law/), how psychological safety can turn code reviews from battlegrounds into growth sessions, what really fuels (or kills) engineering motivation, and why OB is more critical than ever in the age of AI. Writing these is part of my own ongoing effort to debug my own leadership and level up, and I hope you'll learn alongside me.

So, which OB challenge do you want to tackle first in your environment?

Until next time, Tasos
