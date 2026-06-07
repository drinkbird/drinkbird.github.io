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

The meeting lasted fifty minutes and ended early.

The technical lead suspected the plan would leave the team maintaining a difficult integration for years. They mentioned some implementation complexity, but described it as manageable. The product manager doubted that customers had asked for the capability, but turned that concern into something to validate later. The VP thought the timeline was optimistic and the return uncertain, but asked whether tighter milestones would make it work.

So the concerns were technically raised. They were just raised in forms that could not affect the decision: a detail to manage, a follow-up action and a delivery question.

All three approved the plan.

Nobody forced the decision through. There was no argument and no obvious moment where somebody failed to listen. A proposal was presented, the room asked sensible questions about implementation, and everyone nodded when the conversation reached them. It looked like a good meeting.

Six months later, the decision was consuming roughly a quarter of the team's capacity. The integration problem had arrived. The roadmap was bending around the commitment. The timeline had slipped. In separate conversations, each of the people who approved it said some version of the same thing: *I never thought it was the right call.*

This was one of the meetings behind [the $2M bug that wasn't in the code]({{ site.baseurl }}/organizational-behavior/). By the time the implementation problems became visible, the expensive part had already happened. The people with the relevant information had been in the room, and the decision still left without it.

![three approvals casting different shadows]({{ site.baseurl }}/images/decision-meeting-alignment.png)

## Agreement is not alignment

We tend to treat a unanimous decision as evidence that a group is aligned. In this case, it only proved that nobody had objected clearly enough to force a choice.

The technical lead did not make the integration risk blocking because the VP appeared enthusiastic and because challenging the direction without a fully formed alternative felt unhelpful. The product manager turned a weak customer case into a follow-up because engineering had already invested time in the proposal and reopening it felt like moving the goalposts. The VP converted doubt into a delivery question because the lead and the PM, the people closest to the work, did not raise an objection.

Each person interpreted the absence of a clear objection as confidence. The technical lead assumed product and the VP understood the customer and business case. The VP assumed the people closest to the work would object if the technical risk were serious. The product manager saw engineering discussing implementation and assumed the proposal had more momentum than it really did.

*Groupthink* is the familiar term for groups prioritizing agreement over realistic evaluation. I used to associate it with an overbearing leader silencing a timid room. The version I have seen is less dramatic and more difficult to spot. Everyone can be competent, well-intentioned and willing to listen, while each person edits their contribution according to what they think the room already believes.

The *Abilene paradox* describes this particular case more precisely: a group chooses an outcome that none of its members particularly wants because each incorrectly believes the others want it. It does not require deception or a toxic culture. A little politeness, deference and reluctance to reopen work that looks close to completion will do.

## The item nobody actually discussed

The agenda said the meeting was about deciding whether to proceed. Most of the conversation was about how to proceed.

Questions about sequencing, staffing and delivery sound like scrutiny, but they quietly assume the decision itself has already been made. Once a room has spent twenty minutes discussing milestones, returning to "should we do this at all?" feels like taking the meeting backwards. I have seen this happen often enough that implementation detail now makes me suspicious when the decision is supposedly still open.

The proposal also arrived with slides, estimates and several weeks of preparation behind it. None of that made it the right plan, but it changed the social weight of saying no. Rejecting it now meant invalidating visible work from people in the room. Approving it kept the work moving and made the meeting feel productive.

{% include link.html title="Daniel Kahneman's Thinking, Fast and Slow" tag="thinkingfastandslow" %} describes how readily we search for evidence that supports the story already in front of us. In a group, that confirmation bias becomes social. Once a proposal looks like the emerging consensus, people stop asking what would disprove it and start contributing reasons it could work.

![the one item nobody actually discussed]({{ site.baseurl }}/images/decision-meeting-agenda.png)

## Seniority speaks before words do

The VP did not order anyone to agree. They did not need to.

Seniority changes a conversation before the senior person says anything. Their questions receive more attention and their early reactions become clues about where the answer is heading. If they speak first, even tentatively, everyone else now has to decide whether their concern is important enough to oppose the most senior interpretation in the room. Most concerns do not feel that important when they are still half-formed.

Leaders often respond by saying that anyone can speak up, and usually mean it. But the invitation is not a process. It still leaves the person with the least power deciding whether to spend social capital slowing down a plan that the senior people appear to support. Kind leaders and an open-door policy do not remove that calculation.

Psychological safety, as described in {% include link.html title="Amy Edmondson's The Fearless Organization" tag="thefearlessorg" %}, is the shared belief that speaking up is safe. But safety is not established by announcing it. It is established by what happens when somebody delays a decision, challenges a favored proposal or admits that they cannot yet support the plan.

As I argued in [You can't threaten your way to effective engineering]({{ site.baseurl }}/psychological-safety/), engineering judgment does not survive fear. People surface their strongest objections only when they trust that colleagues will treat the objection as an attempt to improve the decision, not as evidence that they are negative, obstructive or difficult to work with. In a low-trust environment, concerns arrive pre-softened because the person raising them is managing two risks at once: the risk to the project and the risk to their reputation.

You can usually see the real level of trust when somebody asks to delay a decision. Does the room become curious, or impatient? Does the person get credit for finding risk early, or acquire a reputation for being hard to work with? Those reactions teach the team far more than any statement about speaking up.

## Once public, the decision started defending itself

Approving the plan once was costly. Continuing to approve it at every monthly review cost much more.

As implementation continued, evidence accumulated that the original concerns were valid. The integration was harder than expected. Customer demand remained unclear. Delivery dates moved. Yet each review framed the question as how to get the plan back on track, not whether the plan still deserved to exist.

This is *escalation of commitment*, reinforced by the *sunk cost fallacy*. Time and money already spent cannot improve the future value of a plan, but they still become arguments for spending more. Once the decision is public, reversing it also means explaining why the earlier judgment was wrong. At that point the organization is protecting reputations as well as the project. {% include link.html title="Daniel Kahneman's Thinking, Fast and Slow" tag="thinkingfastandslow" %} is a useful guide to the broader family of biases involved here.

There is an uncomfortable individual version of the same dynamic. Publicly supporting a plan while privately doubting it creates *cognitive dissonance*. Reopening the decision resolves the conflict, but so does deciding that the original concern was probably overstated. After a few months of defending the plan, people can sincerely remember themselves as having supported it more strongly than they did.

The team also had a convenient explanation: difficult transformations always look worse in the middle. It was not false, which made it especially useful. Every warning sign could be interpreted as proof that the team needed to stay committed.

{% include link.html title="Patrick Lencioni's The Five Dysfunctions of a Team" tag="fivedysfunctions" %} calls this *artificial harmony*. Avoiding conflict does not remove disagreement. It moves disagreement into private conversations while leaving the decision untouched. People continue delivering a plan they no longer defend when speaking honestly.

I also dislike how casually *disagree and commit* gets used in these situations. The principle is useful when the disagreement has been made explicit, the tradeoffs have been examined and a clear decision owner needs to make the call. It becomes a way to close discussion when somebody hints at a concern, watches it pass without scrutiny and is then expected to treat further challenge as a failure to commit. There has to be a real disagreement before anyone can reasonably be asked to commit.

By the time the plan was finally reduced, the organization had paid for the original decision many times over.

## The dissent that did not quite happen

Looking back, the warning signs were present in the first meeting. None of them looked serious on its own.

The vote was unanimous. The most senior person spoke early. Questions focused on execution rather than assumptions. Nobody asked for time to think. Nobody could describe what evidence would cause the group to reverse the decision. The meeting ended with relief rather than conviction.

Look for these signals:

1. *Fast unanimity on a consequential decision.* Real tradeoffs usually create real disagreement. Immediate consensus should increase scrutiny, not end it.
2. *The senior person frames the answer before others have formed a view.* Even a casual preference can anchor the room.
3. *Nobody asks to think overnight.* Important decisions sometimes deserve a slower cognitive pace than the meeting calendar allows.
4. *Concerns appear after the meeting, one person at a time.* The corridor conversation is evidence that the meeting process failed.
5. *The group can explain how to execute the plan but not what would invalidate it.* A decision without reversal criteria is a commitment looking for evidence.

Silence in a decision meeting can mean agreement, uncertainty, resignation, deference or simply that speaking does not feel worth the cost. The meeting treated all five as consent.

![the dissent that didn't quite happen]({{ site.baseurl }}/images/decision-meeting-dissent.png)

## Build dissent into the process

Asking people to be braver is not much of a process improvement. Courage helps, but a consequential decision should not depend on somebody volunteering to become the difficult person in the room.

I like Toyota's *andon cord* as a comparison. A worker who sees a problem can signal it and stop the production line so the issue can be addressed before defective work continues downstream. The interruption is part of protecting production, not an act against production. The improvement routines described in {% include link.html title="Toyota Kata" tag="toyotakata" %} depend on making problems visible early enough to learn from them. Decision meetings need a similar norm: raising a credible concern should bring attention and help, not a debate about whether the person is being a smooth collaborator.

A few practices make dissent easier to surface.

1. *Run an anonymous straw poll before discussion.* Ask everyone to rate their confidence in the proposal before senior voices anchor the room. Show the distribution, not only the average. A room that looks aligned may discover that everybody independently voted three out of ten.
2. *Have the most senior person speak last.* They can ask questions, but should avoid offering an early position that everyone else will unconsciously edit around.
3. *Assign a rotating Devil's Advocate.* Give somebody responsibility for building the strongest case against the proposal, regardless of their personal view. Rotating the role prevents dissent from becoming one person's permanent job.
4. *Run a pre-mortem.* Assume the decision failed badly twelve months from now and ask people to write down why before discussing answers. I have found that concerns are easier to raise when they arrive as part of the exercise rather than as an interruption to momentum.
5. *Use a red team for decisions with a large blast radius.* Give a separate group the context and time to challenge the assumptions. Their findings need a formal response, otherwise the red team is only another meeting.
6. *Write reversal criteria before approval.* Agree on what evidence will trigger a pause, reduction or cancellation while everyone can still imagine that evidence arriving.

None of these practices guarantee a good decision. They improve the odds that the decision is made using information the organization already has.

## What I would change about that meeting

I would change the structure of the meeting before asking anything different from the people in it.

Before discussion, each person would record whether they supported the proposal, their confidence level and the assumption they considered most fragile. The VP would speak last. Someone would be assigned to argue that the customer problem did not justify the investment. The group would write down the conditions under which it would stop.

I would also make "I would like to think about this overnight" an acceptable outcome. Fifty minutes is an arbitrary amount of time in which to make a decision that a team may maintain for years.

The plan might still have been approved. The technical lead might have been wrong about the integration, the customer demand might have appeared and the timeline might have held. Disagreement does not make the minority right.

But the organization would at least have known what it was betting on. Instead, it spent six months discovering concerns that were already present in the first fifty-minute meeting.

Take care, Tasos.
