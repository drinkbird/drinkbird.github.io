---
layout: post
title: "The decision everyone agreed with and no one believed"
excerpt: "Three leaders approved a plan none of them trusted. Six months later, the team was spending a quarter of its capacity maintaining the agreement."
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
  - thefearlessorg
  - crucialconversations
  - radicalcandor
  - turntheshiparound
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
  - thegoal
  - toyotakata
  - effectiveengineer
---

The meeting lasted fifty minutes.

The technical lead suspected the plan would create an integration problem that the team would spend years maintaining. They mentioned some implementation complexity, then described it as manageable. The product manager doubted that customers had asked for the capability, but raised the point as something to validate later rather than a reason to stop. The VP thought the timeline was optimistic and the return uncertain, then asked whether the team could tighten the milestones.

The real concerns never emerged in a form the meeting could act on. Each was softened into a non-blocking comment, a detail to manage or a question about execution.

All three approved it.

There was no argument, no raised voice and no person forcing a decision over the objections of the room. The proposal was presented, a few implementation questions were asked, and each person nodded when the conversation reached them. The meeting ended early enough for everyone to feel it had gone well.

Six months later, the decision was consuming roughly a quarter of the team's capacity. The integration problem had arrived. The roadmap was bending around the commitment. The timeline had slipped. In separate conversations, each of the people who approved it said some version of the same thing: *I never thought it was the right call.*

This was one of the meetings behind [the $2M bug that wasn't in the code]({{ site.baseurl }}/organizational-behavior/). The expensive failure did not begin when somebody implemented the wrong thing. It began when a room full of capable people produced an agreement that none of them believed.

![three approvals casting different shadows]({{ site.baseurl }}/images/decision-meeting-alignment.png)

## Agreement is not alignment

We tend to treat a unanimous decision as evidence that a group is aligned. Sometimes it is. Sometimes it means the group has successfully removed every signal that would reveal disagreement.

The technical lead did not make the integration risk blocking because the VP appeared enthusiastic and because challenging the direction without a fully formed alternative felt unhelpful. The product manager turned a weak customer case into a follow-up because engineering had already invested time in the proposal and reopening it felt like moving the goalposts. The VP converted doubt into a delivery question because the lead and the PM, the people closest to the work, did not raise an objection.

Each person interpreted the absence of a clear objection as confidence. Each person's softened concern then became evidence for everyone else.

This pattern is often described through *groupthink*, the term Irving Janis introduced for the way cohesive groups can prioritize agreement over realistic evaluation. Groupthink does not require weak people or an overbearing leader. It only requires the social cost of disagreement to become slightly higher than the immediate cost of going along.

There is an even more precise description for what happened in that room: the *Abilene paradox*. A group collectively chooses an outcome that no individual member actually wants because every member incorrectly believes the others want it. Nobody is deceiving anyone. Everyone is trying to be reasonable. The result is a decision made on behalf of a preference that does not exist.

That is what makes the pattern dangerous. It looks like collaboration while it is happening.

## The item nobody actually discussed

The agenda said the meeting was about deciding whether to proceed. In practice, the room discussed how to proceed.

That distinction matters. Questions about sequencing, staffing and delivery create the appearance of scrutiny while quietly assuming the decision itself has already been made. Once the conversation moves into implementation detail, returning to "should we do this at all?" feels disruptive. The person who asks it appears to be taking the meeting backwards.

The proposal also arrived with slides, estimates and several weeks of preparation behind it. That work was not the same as evidence that the proposal was right, but it changed the social weight of saying no. Rejecting the plan now meant invalidating visible effort from people in the room. Approving it meant preserving momentum.

{% include link.html title="Daniel Kahneman's Thinking, Fast and Slow" tag="thinkingfastandslow" %} describes how readily we search for evidence that supports the story already in front of us. In a group, that confirmation bias becomes social. Once a proposal looks like the emerging consensus, people stop asking what would disprove it and start contributing reasons it could work.

![the one item nobody actually discussed]({{ site.baseurl }}/images/decision-meeting-agenda.png)

## Seniority speaks before words do

The VP did not order anyone to agree. They did not need to.

Seniority changes a conversation before the senior person says anything. Their questions receive more attention. Their early reactions become clues about the answer the room is moving toward. When they speak first, even tentatively, everyone else has to decide whether their concern is important enough to oppose the most senior interpretation in the room.

Leaders often respond to this problem by saying that anyone can speak up. The invitation is sincere, but it is not a process. It asks the person with the least power and the most to lose to overcome the dynamics created by everyone else. A team can have kind leaders, good intentions and an open-door policy while still producing silence in the moments that matter.

Psychological safety, as described in {% include link.html title="Amy Edmondson's The Fearless Organization" tag="thefearlessorg" %}, is the shared belief that speaking up is safe. But safety is not established by announcing it. It is established by what happens when somebody delays a decision, challenges a favored proposal or admits that they cannot yet support the plan.

As I argued in [You can't threaten your way to effective engineering]({{ site.baseurl }}/psychological-safety/), engineering judgment does not survive fear. People surface their strongest objections only when they trust that colleagues will treat the objection as an attempt to improve the decision, not evidence that they are negative, obstructive or difficult to work with. In a low-trust environment, concerns arrive pre-softened because the person raising them is managing both the risk to the project and the risk to their reputation.

The test is not whether dissent is permitted. The test is whether dissent changes the conversation without damaging the dissenter. A high-trust team does not merely allow someone to slow the meeting down. It treats that interruption as part of doing the work well.

## Once public, the decision started defending itself

The first bad decision was approving the plan. The more expensive decision was approving it again every month afterwards.

As implementation continued, evidence accumulated that the original concerns were valid. The integration was harder than expected. Customer demand remained unclear. Delivery dates moved. Yet each review framed the question as how to get the plan back on track, not whether the plan still deserved to exist.

This is *escalation of commitment*, reinforced by the *sunk cost fallacy*. Once a decision is public, reversing it feels like admitting that the earlier judgment was wrong. Time and money already spent cannot improve the future value of the plan, but they still become arguments for spending more. The reputations attached to the plan become part of what the organization is protecting. {% include link.html title="Daniel Kahneman's Thinking, Fast and Slow" tag="thinkingfastandslow" %} is a useful guide to the broader family of biases that make evidence feel less persuasive once a story and a commitment have formed.

*Cognitive dissonance* helps explain why this happens. Publicly supporting a plan while privately doubting it creates psychological tension. One way to resolve that tension is to reopen the decision. The easier way is to revise the private story: perhaps the concern was overstated, perhaps the team only needs more time, perhaps commitment itself will make the plan work. The longer people act as though they believe the decision, the easier it becomes to defend it as one they believed all along.

The group also had a story available: difficult transformations always look worse in the middle. That story was not false, which made it especially useful. It converted warning signs into proof that the team needed to stay committed.

This is where artificial harmony, one of the dysfunctions described in {% include link.html title="Patrick Lencioni's The Five Dysfunctions of a Team" tag="fivedysfunctions" %}, becomes expensive. Avoiding conflict does not remove disagreement. It pushes disagreement out of the meeting and leaves the decision itself untouched. People comply publicly, doubt privately and gradually detach from an outcome they are still responsible for delivering.

The phrase *disagree and commit* can make this worse when it is used too early. Properly applied, it means the disagreement was made explicit and examined, then a clear decision owner made the call, after which the group commits to execution. It does not mean hint at a concern, watch it pass without scrutiny and treat further challenge as a failure to commit. You cannot disagree and commit if the disagreement never became visible.

By the time the plan was finally reduced, the organization had paid for the original decision many times over.

## The dissent that did not quite happen

The warning signs were visible in the first meeting. They simply did not look like warnings.

The vote was unanimous. The most senior person spoke early. Questions focused on execution rather than assumptions. Nobody asked for time to think. Nobody could describe what evidence would cause the group to reverse the decision. The meeting ended with relief rather than conviction.

Look for these signals:

1. *Fast unanimity on a consequential decision.* Real tradeoffs usually create real disagreement. Immediate consensus should increase scrutiny, not end it.
2. *The senior person frames the answer before others have formed a view.* Even a casual preference can anchor the room.
3. *Nobody asks to think overnight.* Important decisions sometimes deserve a slower cognitive pace than the meeting calendar allows.
4. *Concerns appear after the meeting, one person at a time.* The corridor conversation is evidence that the meeting process failed.
5. *The group can explain how to execute the plan but not what would invalidate it.* A decision without reversal criteria is a commitment looking for evidence.

Silence is not neutral information. In a decision meeting, silence can mean agreement, uncertainty, resignation, deference or a calculation that speaking is not worth the cost. Treating all five as consent is a process error.

![the dissent that didn't quite happen]({{ site.baseurl }}/images/decision-meeting-dissent.png)

## Build dissent into the process

The answer is not to demand more courage from individuals. Courage helps, but a decision process that depends on someone volunteering to become the difficult person in the room is badly designed.

Toyota's [*andon cord*](https://mag.toyota.co.uk/toyota-manufacturing-25-objects-andon-cord/) offers a useful model. In the Toyota Production System, a worker who sees a problem can signal it and stop the production line so the issue can be addressed before defective work continues downstream. Pulling the cord is not treated as obstructing production. It is part of protecting production. Decision meetings need the same norm: raising a credible concern should summon attention and help, not suspicion about whether the person is a smooth collaborator.

A few practices make dissent easier to surface.

1. *Run an anonymous straw poll before discussion.* Ask everyone to rate confidence in the proposal before senior voices can anchor the group. Show the distribution, not only the average. A room that appears aligned may discover that everyone independently voted three out of ten.
2. *Have the most senior person speak last.* Leaders should ask questions before offering a position. This preserves information that would otherwise be edited to fit their view.
3. *Assign a rotating Devil's Advocate.* Make one person responsible for building the strongest case against the proposal, regardless of their personal view. Rotating the role prevents dissent from becoming one person's identity.
4. *Run a pre-mortem.* Assume the decision failed badly twelve months from now and ask each person to write down why before discussing answers. This gives concerns permission to arrive as analysis rather than disloyalty.
5. *Use a red team for decisions with a large blast radius.* Give a separate group the time, context and mandate to challenge assumptions. A red team without access or authority is theater, so its findings need a formal response.
6. *Write reversal criteria before approval.* Decide in advance what evidence will trigger a pause, reduction or cancellation. It is easier to agree on exit conditions before reputations attach themselves to staying the course.

None of these practices guarantee a good decision. They do something more basic and more valuable: they make the group's actual information visible before the decision hardens.

## What I would change about that meeting

I would not ask the people in the room to be braver. I would change the order in which the meeting asked them to think.

Before discussion, each person would record whether they supported the proposal, their confidence level and the assumption they considered most fragile. The VP would speak last. Someone would be assigned to argue that the customer problem did not justify the investment. The group would write down the conditions under which it would stop.

Most importantly, "I would like to think about this overnight" would count as useful judgment, not a failure to decide.

The plan might still have been approved. Good decision processes do not eliminate risk, and disagreement does not automatically make the minority right. But the decision would have been made with the room's real concerns available, rather than with each person reacting to an agreement they had accidentally created together.

The meeting where everyone agrees is not always the healthy one. Sometimes the healthy meeting is the one where disagreement becomes visible early enough to save the decision.

Take care, Tasos.
