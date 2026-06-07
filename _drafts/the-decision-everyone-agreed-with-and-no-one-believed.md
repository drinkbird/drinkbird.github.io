---
layout: post
title: "The decision everyone agreed with and no one believed"
excerpt: "Unanimous decisions can hide real objections. Psychological safety and structured dissent surface them before sunk costs harden a bad call."
permalink: /false-consensus/
comments: true
categories: blog
tags:
  - leadership
featured: true
image:
  feature: decision-meeting-cover-1x.jpg
reads:
  - fivedysfunctions
  - thinkingfastandslow
  - toyotakata
  - thefearlessorg
  - crucialconversations
  - radicalcandor
  - turntheshiparound
  - thegoal
  - peopleware
  - multipliers
  - daretolead
  - debuggingteams
  - communicationforengineers
  - resilientmgmt
  - managinghumans
  - highoutputmgmt
  - managerspath
  - executiveprimer
  - thinkinginsystems
  - creativityincbook
  - accelerate
  - devops
  - leanstartup
  - effectiveengineer
---

The meeting lasted fifty minutes and ended early, even though the technical lead suspected the plan would leave the team maintaining a difficult integration for years and described the complexity as manageable. The product manager doubted that customers had asked for the capability, yet turned that concern into something to validate later. The VP thought the timeline was optimistic, but asked whether tighter milestones would make it work.

The concerns were technically raised, but only as implementation details or follow-up work that could not affect the decision, so all three approved the plan.

Nobody forced the decision through, and there was no obvious moment where somebody failed to listen. The room asked sensible questions about implementation before everyone nodded, which made it look like a good meeting.

Six months later, the decision was consuming roughly a quarter of the team's capacity as the integration problem arrived and the roadmap bent around the commitment. In separate conversations, each of the people who approved it said some version of the same thing: *I never thought it was the right call.*

This was one of the meetings behind [the $2M bug that wasn't in the code]({{ site.baseurl }}/organizational-behavior/). By the time the implementation problems became visible, the expensive part had already happened. The relevant information had been in the room, but none of it made it into the decision.

![three approvals casting different shadows]({{ site.baseurl }}/images/decision-meeting-alignment.png)

## Agreement is not alignment

We tend to treat a unanimous decision as evidence that a group is aligned. In this case, it only proved that nobody had objected clearly enough to force a choice.

The technical lead softened the integration risk because the VP appeared enthusiastic and because challenging the direction without a fully formed alternative felt unhelpful. The product manager turned a weak customer case into a follow-up because engineering had already invested time in the proposal and reopening it felt like moving the goalposts. The VP converted doubt into a delivery question because the lead and the PM, the people closest to the work, did not raise an objection.

Each person interpreted the absence of a clear objection as confidence. The technical lead assumed product and the VP understood the customer and business case. The VP assumed the people closest to the work would object if the technical risk were serious. The product manager saw engineering discussing implementation and assumed the proposal had more momentum than it really did.

*Groupthink* is the familiar term for groups prioritizing agreement over realistic evaluation. I used to associate it with an overbearing leader silencing a timid room, but the version I have seen is less dramatic and more difficult to spot: capable people edit their contributions according to what they think the room already believes.

The *Abilene paradox* describes this particular case more precisely: a group chooses an outcome that none of its members particularly wants because each incorrectly believes the others want it. It does not require deception or a toxic culture; reluctance to reopen work that looks close to completion is often enough.

## The item nobody actually discussed

The agenda said the meeting was about deciding *whether* to proceed. Most of the conversation was about *how* to proceed.

Questions about how to deliver the plan sound like scrutiny, but they quietly assume the decision itself has already been made. Once a room has spent twenty minutes discussing milestones, returning to "should we do this at all?" feels like taking the meeting backwards. I have seen this happen often enough that implementation detail now makes me suspicious when the decision is supposedly still open.

The proposal also arrived after several weeks of visible preparation. None of that made it the right plan, but it changed the social weight of saying no: rejecting it meant invalidating work from people in the room, while approving it kept things moving.

A proof of concept can settle far more than the narrow question it was built to answer. An experienced engineer may present it as an experiment, while the room experiences it as a nearly completed decision because it already runs. Anyone proposing a different direction now carries the burden of arguing against its technology and structure, often without having been given equivalent time to build an alternative.

Prototypes are useful, but the team should write down which question the prototype is testing and which choices remain open. Otherwise, the proof of concept acquires production status simply because it is the only option that already exists.

{% include link.html title="Daniel Kahneman's Thinking, Fast and Slow" tag="thinkingfastandslow" %} describes how readily we search for evidence that supports the story already in front of us. In a group, that confirmation bias becomes social: once a proposal looks like the emerging consensus, people stop asking what would disprove it and start contributing reasons it could work.

![the one item nobody actually discussed]({{ site.baseurl }}/images/decision-meeting-agenda.png)

## Seniority speaks before words do

The VP did not order anyone to agree because they did not need to. Seniority changes a conversation before the senior person says anything: their early reactions become clues about where the answer is heading, and everyone else must decide whether a half-formed concern is important enough to oppose that direction.

Leaders often respond by saying that anyone can speak up, and usually mean it, but the invitation is not a process. It still leaves the person with the least power deciding whether to spend social capital slowing down a plan that senior people appear to support.

{% include link.html title="Amy Edmondson's The Fearless Organization" tag="thefearlessorg" %} defines psychological safety as the shared belief that speaking up is safe, but announcing that safety is easy. The useful evidence is how the room responds when somebody delays or challenges a favored decision.

As I argued in [You can't threaten your way to effective engineering]({{ site.baseurl }}/psychological-safety/), engineering judgment does not survive fear. People surface their strongest objections only when they trust that colleagues will treat the objection as an attempt to improve the decision rather than as obstructive behavior. In a low-trust environment, concerns arrive pre-softened because the person raising them is managing the risk to both the project and their reputation.

You can usually see the real level of trust when somebody asks to delay a decision: whether the room becomes curious or impatient, and whether the person gets credit for finding risk early or acquires a reputation for being hard to work with. Those reactions teach the team far more than any statement about speaking up.

## Once public, the decision started defending itself

Approving the plan once was costly, but continuing to approve it at every monthly review cost much more. As implementation continued, the integration proved harder than expected while customer demand remained unclear, yet each review asked how to get the plan back on track rather than whether it still deserved to exist.

This is *escalation of commitment*, reinforced by the *sunk cost fallacy*. Time and money already spent cannot improve the future value of a plan, but they still become arguments for spending more. Once the decision is public, reversing it also means explaining why the earlier judgment was wrong. At that point the organization is protecting reputations as well as the project. {% include link.html title="Daniel Kahneman's Thinking, Fast and Slow" tag="thinkingfastandslow" %} is a useful guide to the broader family of biases involved here.

There is an uncomfortable individual version of the same dynamic. Publicly supporting a plan while privately doubting it creates *cognitive dissonance*. Reopening the decision resolves the conflict, but so does deciding that the original concern was probably overstated. After a few months of defending the plan, people can sincerely remember themselves as having supported it more strongly than they did.

The team also had a convenient explanation that was not entirely false: difficult transformations always look worse in the middle, so every warning sign could be interpreted as proof that the team needed to stay committed.

{% include link.html title="Patrick Lencioni's The Five Dysfunctions of a Team" tag="fivedysfunctions" %} calls this *artificial harmony*: avoiding conflict does not remove disagreement, but moves it into private conversations while leaving the decision untouched. People continue delivering a plan they no longer defend when speaking honestly.

I also dislike how casually *disagree and commit* gets used in these situations. The principle is useful after the disagreement has been examined and a clear decision owner needs to make the call. It becomes a way to close discussion when somebody's concern passes without scrutiny and further challenge is treated as a failure to commit. There has to be a real disagreement before anyone can reasonably be asked to commit.

By the time the plan was finally reduced, the organization had paid for the original decision many times over.

## The dissent that did not quite happen

Looking back, the warning signs were present in the first meeting, although none looked serious on its own. After the most senior person spoke early, discussion stayed on execution until the group reached a unanimous vote without defining what evidence would reverse it.

Look for these signals:

1. *Fast unanimity on a consequential decision.* Real tradeoffs usually create real disagreement, so immediate consensus should increase scrutiny rather than end it.
2. *The senior person frames the answer before others have formed a view.* Even a casual preference can anchor the room.
3. *Nobody asks to think overnight.* Important decisions sometimes deserve a slower cognitive pace than the meeting calendar allows.
4. *Concerns appear after the meeting, one person at a time.* The corridor conversation is evidence that the meeting process failed.
5. *The group can explain how to execute the plan but not what would invalidate it.* A decision without reversal criteria is a commitment looking for evidence.

Silence in a decision meeting can reflect agreement, but it can also mean that speaking does not feel worth the cost, and this meeting treated both as consent.

![the dissent that didn't quite happen]({{ site.baseurl }}/images/decision-meeting-dissent.png)

## Build dissent into the process

Asking people to be braver is not much of a process improvement, because a consequential decision should not depend on somebody volunteering to become the difficult person in the room.

There is still craft in how an objection is raised. In [The Inverted Pyramid of Problem-Solving]({{ site.baseurl }}/the-inverted-pyramid-of-problem-solving/), I described the *Thought-Provoker* as someone who can say, "Here is the problem; what do you think we should do about it?" That framing matters here because dissent lands better when it invites the room to solve a shared problem rather than asking one person to win an argument.

I like Toyota's *andon cord* as a comparison because a worker who sees a problem can stop the production line before defective work continues downstream. The interruption protects production, and the improvement routines described in {% include link.html title="Toyota Kata" tag="toyotakata" %} similarly depend on making problems visible early enough to learn from them. Decision meetings need the same norm: a credible concern should bring attention and help, not a debate about whether the person is being a smooth collaborator.

The following practices make dissent easier to surface without relying on someone to interrupt the room.

1. *Run an anonymous straw poll before discussion.* Ask everyone to rate their confidence in the proposal before senior voices anchor the room, then show the distribution rather than only the average. A room that looks aligned may discover that everybody independently voted three out of ten.
2. *Have the most senior person speak last.* They can ask questions, but should avoid offering an early position that everyone else will unconsciously edit around.
3. *Assign a rotating Devil's Advocate.* Give somebody responsibility for building the strongest case against the proposal, regardless of their personal view. Rotating the role prevents dissent from becoming one person's permanent job.
4. *Run a pre-mortem.* Assume the decision failed badly twelve months from now and ask people to write down why before discussing answers. I have found that concerns are easier to raise when they arrive as part of the exercise rather than as an interruption to momentum.
5. *Use a red team for decisions with a large blast radius.* Give a separate group the context and time to challenge the assumptions. Their findings need a formal response, otherwise the red team is only another meeting.
6. *Write reversal criteria before approval.* Agree on what evidence will trigger a pause, reduction or cancellation while everyone can still imagine that evidence arriving.

Bad decisions will still happen, but these practices make it harder to ignore information the organization already has.

## What I would change about that meeting

I would change the structure of the meeting before asking anything different from the people in it.

Before discussion, each person would record whether they supported the proposal and which assumption they considered most fragile. The VP would speak last, and the group would hear the strongest case against the investment before writing down the conditions under which it would stop.

I would also make "I would like to think about this overnight" an acceptable outcome. Fifty minutes is an arbitrary amount of time in which to make a decision that a team may maintain for years.

The plan might still have been approved because the technical lead could have been wrong about the integration or customer demand could have appeared. Disagreement alone does not make the minority right, but at least the organization would have known what it was betting on.

Instead, it spent six months discovering concerns that were already present in the first fifty-minute meeting.

Take care, Tasos.
