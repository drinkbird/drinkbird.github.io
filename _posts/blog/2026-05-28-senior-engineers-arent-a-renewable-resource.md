---
layout: post
title: "Senior engineers aren't a renewable resource"
excerpt: "The supply of senior engineers does not refill itself. Cutting juniors to fund AI tooling looks clean on a quarter but corrodes a five-year horizon."
date: 2026-05-28 00:00:00
permalink: /senior-engineers-arent-a-renewable-resource/
comments: true
categories: blog
image:
  feature: seniors-1x.jpg
reads:
  - themythicalmanmonth
  - peopleware
  - accelerate
  - apprenticeship
  - staffengineer
  - managerspath
  - multipliers
  - teamtopologies
  - elegantpuzzle
  - highoutputmgmt
  - radicalcandor
  - turntheshiparound
  - effectiveengineer
  - drive
  - managinghumans
  - thinkinginsystems
  - fivedysfunctions
  - resilientmgmt
  - crucialconversations
featured: true
---

In [The bottleneck AI just moved]({{ site.baseurl }}/ai-bottleneck/) I flagged a side effect of the current moment and promised to come back to it: *the supply of senior engineers is not a renewable resource that refills itself*. That sentence has been doing more work in conversations than I expected, so it earns its own post.

The pattern is easy to describe. A team trims its junior headcount, often framed as "funding the AI tooling spend", on the reasonable-sounding logic that generative tools cover the work juniors used to do. Two years later, the senior engineers who carried that team are leaving and there is nobody internal to promote into the gap. Hiring laterally takes nine to twelve months per seat, costs more than the savings and lands engineers who do not yet know the system. The replacements that do arrive then need senior review themselves, which falls on a smaller pool of seniors so the loop tightens.

This is not a story about whether AI is useful but rather about a pipeline with a long transit time being mistaken for a tap that can be turned on and off.

None of this is hypothetical anymore. Over the past several months, multiple large engineering organizations (the kind with public CTOs and quarterly earnings calls) have disclosed that they exhausted their annual AI tooling budget within a single quarter, with monthly API costs of five hundred to two thousand dollars per engineer. In at least one case, the executive team has said publicly that the next conversation is about comparing token consumption directly against the cost of engineering headcount. The trade this post is about is no longer a thought experiment, but rather it is being made explicitly, in public, by companies large enough that everyone else is watching how it lands.

## The pipeline is a queue, and the queue is long

Becoming a senior engineer takes roughly five to seven years of working in real systems, under people who already know what good looks like, and on problems with consequences. There are exceptions in both directions, but the distribution is tight enough that organizations should plan around it. That five-to-seven-year transit time is the relevant fact because it means the seniors you will need in 2031 are the juniors you are hiring (or not hiring) today.

You do not get to skip the queue by hiring laterally. The lateral market is the same pool every other company is fishing in. The price clears at whatever the most desperate buyer will pay and the engineers who arrive bring expertise in *some* system, not in *yours*. Onboarding a senior into a new codebase / domain / team is itself a six-to-twelve month investment, and the people best placed to do that onboarding are the seniors you already have, whose time you were trying to protect in the first place. The most cost-effective seniors are the ones you grew.

{% include link.html tag="themythicalmanmonth" %} makes the point in its original form: some work cannot be parallelized, and throwing bodies at a delayed project makes it later. Growing senior engineers is the canonical instance. You cannot accelerate a five-year process by spending more in year four.

![the pipeline isn't running]({{ site.baseurl }}/images/senior-1.jpg)

## What seniors do that AI does not

It is worth being precise about the work, because the easiest version of this argument turns into nostalgia. Plenty of what senior engineers used to spend their day on, AI now handles well, which is fine. The interesting question is what is left.

The work that is left clusters into a few categories. Deciding what the system should *not* do and why, and being willing to defend that decision when the room pushes back. Reading a change in the context of the system it lands in, including the parts that exist for reasons nobody has written down. Naming the failure mode that nobody has thought of yet, because they have not yet seen it happen three times in two previous jobs. Designing the interface between two teams so that the seam holds when the requirements change next quarter. Telling a junior (in language they can actually use) *why* a particular approach is wrong here even though it worked fine in the last codebase.

The common thread is *judgment under ambiguity, informed by pattern recognition that comes from years of consequence*. AI is good at producing plausible local solutions. It is not (at least yet) the thing that decides which problem is worth solving, what trade-offs the organization can live with or what the system will look like in three years if this design choice compounds. Those decisions remain stubbornly human and the humans who make them well are the ones who have made them badly a few times before, in safe enough settings to learn.

That is the second piece of the pipeline argument. Seniors are not just doing senior work, they are also producing the conditions under which the next cohort can learn to do it. Juniors absorb judgment by being adjacent to it. By sitting in design discussions where a senior changes their mind in public, by getting a review comment that explains *why* rather than just *what*, by watching how an experienced engineer scopes down a problem that arrived too large. AI does not produce that adjacency, but rather produces output, and the two are not interchangeable.

## The corrosive loop

Once the trade has been made the dynamics tend to run in a single direction.

Cut juniors, and the volume of code arriving at senior reviewers does not fall, because the [the bottleneck I described last time]({{ site.baseurl }}/ai-bottleneck/) is still loaded by generated output. The review load on seniors rises because there is nobody below them to take the first pass on the work that is genuinely entry-level. The mentoring that used to happen in those first-pass reviews stops happening because there is nobody to mentor. Senior engineers spend more of their week on reviewing and less on the architectural work they were hired to do. The work they actually find meaningful contracts toward zero.

Seniors leave, some for other companie, where the trade has not yet been made, some leave the profession entirely because the version of the job left over after the cuts is not the one they signed up for. The seniors who remain are now reviewing a larger volume of code with fewer collaborators, which accelerates the same exit dynamic.

At this point, even if the organization reverses course and starts hiring juniors again, the bench needed to grow them has thinned. Mentoring is also a skill and it sits with the seniors who have just walked. You can buy back the salary line in a quarter, because budget decisions reverse on the same timescale they were made. You cannot buy back the apprenticeship capacity in a quarter, because that capacity is made of specific people doing specific work together. Rebuilding it means rebuilding the team itself.

![the handoff didn't happen]({{ site.baseurl }}/images/senior-2.jpg)

## What the OB literature has been saying for decades

Organizational Behavior research has a precise vocabulary for what is being lost in this trade, and it is worth using it because the precision changes the conversation with finance and the executive team.

The first concept is *tacit knowledge*. Most of what makes a senior engineer effective is not written down, and a meaningful portion is not even *writable* down. It is a mix of pattern recognition, taste and a felt sense of where the bodies are buried in the system. Tacit knowledge transfers through extended contact between people working on the same problem. When you remove the people who would absorb it (or the people who would transfer it) you do not just lose a salary slot. You lose the only mechanism by which that knowledge propagates.

The second is *succession planning*. Mature organizations think of senior roles as positions that need a named and developing successor at all times, on the assumption that any given senior may leave / get promoted / burn out. The succession bench is the visible health metric for whether the pipeline is functioning. A team with no one ready to step up in two years is a team that has stopped investing in its own continuity, regardless of how the current quarter looks.

The third is *organizational learning*, referring to the capacity of an organization to revise how it works in response to what it has learned, rather than only what it has produced. Learning lives in people, and specifically in the relationships between people who have done work together. When you remove the cohorts that connect senior practitioners to early-career engineers, you do not merely lose the future seniors but rather you break the loop by which the organization understands what it knows.

Two books I would put on the desk of any leader making this trade right now. {% include link.html tag="peopleware" %} remains the conscience of this conversation. DeMarco and Lister documented (decades ago) that the cost of replacing tacit knowledge in a team is far larger than the salary it appears to save, and the intervening forty years have not made them wrong. {% include link.html tag="accelerate" %} makes the empirical case from a different angle. Team *capability*, including the ability to learn, is itself the leading indicator of delivery performance. Strip capability out and the lagging metrics will follow, on a delay long enough to be invisible until it is too late!

## Why this trade looks clean on a quarter

The accounting works against the right answer here, and it is worth naming honestly. On a quarterly P&L, a junior engineer is a clear cost with a fuzzy near-term contribution. Generative AI tooling is a smaller cost with a much louder narrative, and one that lands better in investor conversations. Cutting the first to fund the second produces a margin improvement that shows up in the period it is made, and the cost of the trade is paid in periods that nobody is yet held accountable for.

The five-year picture is the inverse. The savings compound away to nothing once you start paying lateral premiums to replace the seniors who left. The cost of the rebuilt pipeline starts from a worse position than the one you cut, because the bench that would have done the rebuilding is no longer there. And the work that finally moves the organization forward (the architecture decisions, the platform investments, the difficult migrations) slows down or stalls because the people who would have led that work are spending their hours triaging review queues.

This is the part of the conversation where senior leadership has the most leverage, because they are the only ones with a horizon long enough to see the cost. A line manager optimizing their team for the next quarter will make this trade every time. A VP of Engineering with a five-year mandate, talking to a CFO who can be moved by a credible model of replacement cost, can choose not to.

![the investment can still be made]({{ site.baseurl }}/images/senior-3.jpg)

## What to do about it

I do not think the answer is to refuse the AI tooling, or to defend headcount as a value in itself. The answer is to be deliberate about the pipeline as a thing that needs investment, and to make that investment legible.

A few practices that, in my experience, hold up.

1. *Treat apprenticeship as a deliberate practice, not a side effect of having juniors in the room.* That means assigning specific seniors as mentors with named protégés, carving out explicit time for the mentoring and reviewing the *quality* of mentoring as part of the senior engineer's job (not as something that happens after their real work is done). {% include link.html tag="apprenticeship" %} by Hoover and Oshineye is a fine starting point for the structure and it is short enough that nobody can claim they did not have time to read it.

2. *Make review time a load-bearing investment.* If senior engineers are reviewing AI-generated code in the spare moments between everything else, the review quality drops, the mentoring opportunity is wasted and the seniors learn to dislike the part of the job that used to teach the next cohort. Block time. Cap throughput. Treat thoughtful review as a deliverable, not as overhead.

3. *Measure senior hours invested in mentoring as a leading indicator.* Lagging indicators, attrition, internal-promotion rate, time to productivity for new hires, will tell you whether the pipeline is working only after the damage is done. The leading indicator is whether senior engineers are actually spending hours on the next cohort, and that is observable if you choose to observe it.

4. *Hire and protect juniors deliberately, with the five-year horizon in mind.* This is not charity! It is the cheapest possible way to source the seniors you will need in 2031. Treat it as an investment line in the engineering budget, not a discretionary one.

None of this is novel. Most of it appears in the books I have already linked. The reason it is worth restating now is that the current narrative is making the opposite case loudly, and quiet good practice tends to lose to loud bad practice unless someone is willing to keep restating it.

The senior engineers you will rely on in five years are the ones being mentored (or not mentored) this quarter. That is the whole argument.

Take care, Tasos.
