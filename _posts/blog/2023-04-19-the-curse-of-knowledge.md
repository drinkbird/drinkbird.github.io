---
layout: post
title: "Breaking the Curse of Knowledge: Clear communication in a world overflowing with insights"
excerpt: "Unraveling the art of making complexity understandable"
permalink: /the-curse-of-knowledge/
comments: true
categories: blog
featured: false
image:
  feature: tappers-listeners.png
reads:
  - devops
  - thephoenix
  - pragmaticprogrammer
  - themythicalmanmonth
  - peopleware
  - softskills
  - careerguide
  - cleanarchitecture
  - thecleancoder
---

Imagine trying to bake a cake. Now imagine doing that without a recipe, in a foreign language, and you're the only one who can taste it. Sounds like a herculean task, right? That's what software engineering often feels like when we're trying to communicate complex technical concepts. It's not just about navigating through the maze of technical jargon or diving deep into the intricate details of a project. The main culprit behind our struggles to express and understand these complexities is something known as the "Curse of Knowledge."

"Curse of Knowledge" might sound like something straight out of a Hogwarts textbook, but it's no magic trick. It's a cognitive bias that trips us up when we become so deeply entangled in our own expertise that we start assuming everyone else is on the same page. It's like a programmer talking in Python to someone who only understands Assembly or a project manager throwing around terms like 'agile', 'scrum', and 'backlog grooming' to the uninitiated.

But the ‘Curse’ goes beyond causing communication hiccups; it's a hurdle that can significantly dampen our productivity. In this blog, we'll explore what the 'Curse of Knowledge' is, why it poses such a challenge in technical fields like software development, and how we can overcome it. Ready for the ride? Let's start by understanding how the 'Curse' manifests itself in our everyday life, and how we can recognize its traces in our communication.

## Navigating Knowledge Labyrinths

Let me take you back to a few years ago when I was part of a team responsible for revamping a large-scale shipping system. This system was not your everyday e-commerce shipping; it was a complex behemoth that determined the optimal fulfillment center, close to the customer, that possessed sufficient inventory. It had to then select the most economical and fastest shipping carrier and method to ensure the customer's order arrived on time and within budget.

The project's team lead, a veteran software engineer with a wealth of knowledge, began explaining the intricacies of the existing system. He talked about the logic of the algorithms, the critical dependencies, and the intricate layers of the system with impressive command. His eyes sparkled with passion as he painted a picture of a highly-optimized, fine-tuned, algorithmic dance.

Yet, for me and the rest of the team, his explanation felt more like a journey through an intricate labyrinth. We were all experienced software developers with a solid understanding of the technology stack. Yet, the high-context nature of his explanation and the depth of his understanding made comprehension quite challenging. It was clear that he wasn't intentionally making the information dense; he was simply ensnared by the 'Curse of Knowledge.' It took several weeks of asking questions and validating assumptions before we could put the puzzle together and be fully onboarded to the system.

In software development, such high-context communication is unfortunately commonplace. Discussions can often assume familiarity with advanced terminologies, specific project histories, and context that others may lack. As a result, even seasoned developers can find themselves feeling lost when thrust into a new project or technology.

The implications of this communication hurdle are far from trivial. Misunderstandings or miscommunications can cause significant delays in project timelines, increase the error rate, and even result in incorrect solutions being developed. But it's not just the tangible impacts that matter. This 'Curse of Knowledge' can also spawn frustration, instill a sense of incompetence, and cause a breakdown in team morale.

To add to the complexity, internal documentation and wikis often suffer from the same curse. They are typically authored by experts who inadvertently assume a certain level of understanding or context from the reader. The shortcomings of these resources often surface at the most inconvenient times, like when someone else is trying to use the documentation to solve a problem or understand a process.

Understanding this context is crucial before we delve into potential solutions. The labyrinth of knowledge is not insurmountable, but it requires conscious effort, effective strategies, and a willingness to unlearn and relearn. Our quest for clearer, more effective communication in the complex world of software development continues.

![Navigating knowledge labyrinths]({{ site.baseurl }}/images/book-labyrinth.png)

## Cracking the Curse: The Stanford Experiment

The 'Curse of Knowledge' isn't just a concept devised by a bunch of developers struggling to understand their team lead's sophisticated explanations. It's a well-documented cognitive bias, brought to light by a now-famous experiment conducted at Stanford University.

In 1990, a group of Stanford University psychologists introduced a simple game. They split the participants into two roles: 'tappers' and 'listeners.' The 'tappers' would select a well-known song and tap out its rhythm. The 'listeners' then had to guess the song purely from the tapping rhythm.

For the 'tappers,' the song was playing loud and clear in their heads. They could hear the melody, the lyrics, the beat — everything. So, they expected the 'listeners' to guess the songs easily. However, the reality was far from this expectation. Only about 2.5% of the songs were correctly identified by the 'listeners.'

This stark contrast between expectation and reality is a powerful illustration of the 'Curse of Knowledge.' The 'tappers' couldn't understand why the 'listeners' found it so hard to guess what were, in their minds, such easy and well-known melodies. Similarly, our project lead had trouble imagining what it was like to not understand the shipping system's intricacies.

When we know something so well, it becomes second nature, and we struggle to understand the perspective of someone who lacks that knowledge. This disconnect is particularly relevant in software development. When you're deeply entrenched in a project, it's easy to overestimate how well others can pick up on the context, nuances, and underlying assumptions that we inherently understand.

## Clearing the Fog: Strategies for Embracing Clarity

The first step towards breaking free from the 'Curse of Knowledge' involves organizational changes that facilitate clear, low-context communication. Let's see some strategies that can help us achieve this:

1. Foster a Safe Space for Queries and Clarifications

Fostering a culture where asking questions, seeking clarifications, and admitting to gaps in understanding is encouraged, can make a substantial difference. It's essential to assure team members that no question is 'stupid' and that speaking up about uncertainties is welcomed and appreciated. Such a safe space for inquiries not only promotes active learning but also helps uncover any 'knowledge gaps' that could be hampering the team. This proactive approach ensures that no team member gets left behind due to a lack of context or understanding.

2. Embrace Plain Language

Sometimes, it's tempting to flex our technical vocabulary. But when the goal is clarity, simplicity wins. Plain language, defined by clear, concise words and short sentences, can make complex ideas more accessible to a broader audience.

3. Encourage Diverse Perspectives

Teams are diverse, and so are the ways in which people understand and interpret information. Encourage team members to share their perspectives, understandings and assumptions. This practice can expose any gaps or ambiguities in the communication, helping the team align on a shared understanding.

4. Create Robust and Clear Documentation

Documentation serves as a reference point that team members can revert to whenever needed. Ensure that it's written in low-context language that's accessible to all, regardless of their familiarity with the topic. Avoid jargon and acronyms wherever possible, and provide clear explanations for all elements involved. Test-drive the content with a colleague who hasn't worked on your project - how does it read?

## Amplifying the Signal: Fine-tuning Our Communication

Personal communication strategies also play a significant role in navigating the 'Curse of Knowledge.' Here are a few tactics to consider:

1. Mind the Gap and Validate Understanding

Acknowledge that a knowledge gap may exist between you and the person you're communicating with. Once you're aware of this, you can consciously adjust your language and explanations to cater to their level of understanding.

Also never assume the listener has fully understood your explanation. Regularly ask for feedback or get them to explain the concept back to you. This way, you can identify and address misunderstandings promptly.

2. Leverage Analogies and Metaphors

Analogies and metaphors can serve as bridges, connecting the unfamiliar to the familiar. By relating complex concepts to something the listener already understands, you can make your explanations more digestible. For example, you might explain a 'cache' as a secret stash of snacks that's quicker to access than the kitchen.

3. Break It Down: Chunking

Chunking is the process of breaking down complex information into smaller, manageable parts or 'chunks.' Instead of explaining an entire system at once, start with one module. Once that's understood, move on to the next one and show how they interact. This approach reduces cognitive overload and makes it easier to comprehend and remember the information. In other words, chunking allows us to digest complex systems one bite at a time, just like you would tackle an extra-large pizza. You wouldn't try to swallow it whole, right? Please say no...

Revisiting our shipping system scenario, our first step was to delve into the intricacies of carriers. We explored their operations, clarified terms such as "cutoff time", and differentiated between "ground" and "air" shipping, noting the unique restrictions each method posed. Only once we had this foundational knowledge did we begin to comprehend the complexities of our shipping system. We investigated how delivery date estimates were presented on a product's description page and how these translated into a delivery date promise on the order page, among other things. This piecemeal approach helped us methodically understand and improve the system.

4. Visualize It

A picture, as they say, is worth a thousand words. Visual aids such as diagrams, charts, and illustrations can help convey complex concepts in a more digestible manner. They can also serve as a reference for the team throughout the project. Tools such as whiteboards, digital sketching tools, and diagramming software can be helpful in this regard.

The power of whiteboarding is often underestimated. Countless times, I've been part of circular, verbal discussions about system flows that only became productive after a sketch was introduced. With our shipping system, for instance, our real breakthrough came when we started to visually map out various components and interactions. For example, we diagrammed how an order connects to the shipping system, then to the carrier selection process, the addressing system for identifying missing zip codes, and finally to the Zebra labeling service for actual shipping label printing. This visual representation became a crucial step towards our understanding and enhancement of the system.

5. Repeat, Review, Recap

Repetition is the key to retention. It's useful to reiterate critical points, summarize information at the end of meetings or discussions, and review important details at different stages of a project. This ensures everyone is clear on their tasks and the overall project direction.

These strategies are not exhaustive, but they provide a great starting point for individuals and teams seeking to minimize the impact of the 'Curse of Knowledge' on their communication. It takes practice and patience, but the results are well worth the effort.

![Whiteboarding]({{ site.baseurl }}/images/whiteboarding.jpg)

## Spreading the Antidote: Cultivating a Culture of Inclusive Knowledge

The 'Curse of Knowledge' isn't just an individual problem; it permeates the organization. Hence, it’s not just about adopting the right strategies; it's about cultivating a culture that inherently encourages inclusive knowledge sharing. Here are a few cultural aspects that can help in this regard:

1. Psychological Safety: Encourage a culture where team members feel safe expressing their thoughts, asking questions, and admitting mistakes. Psychological safety fosters open communication, allowing teams to collectively address the 'Curse of Knowledge.'

2. Empathy and Respect: A culture of empathy and respect can also be a powerful antidote. When team members respect each other's perspectives and empathize with their challenges, it can encourage clearer, more inclusive communication.

3. Growth Mindset: Cultivate a growth mindset within the team. This mindset values learning and sees challenges as opportunities to grow. With a growth mindset, team members will be more willing to step out of their comfort zones, seek help when needed, and share their knowledge with others.

4. Team Learning: Make collective learning a norm. Regular knowledge sharing sessions, team training, or collaborative problem-solving can foster a culture that values and encourages knowledge sharing.

5. Reward Transparency and Collaboration: Recognize and reward team members who exemplify clear communication, collaboration, and transparency. This can motivate others to do the same.

Remember, transforming culture isn’t an overnight process. It takes time, consistency, and patience. But by fostering a culture that inherently combats the 'Curse of Knowledge,' you can build a team that communicates effectively and inclusively, irrespective of the complexities they're tackling.

## Conclusion: Breaking the Curse, Together

Overcoming the 'Curse of Knowledge' is not an individual journey; it's a collective endeavor. It's about how we, as a community of knowledge workers, can better convey complex insights in ways that are accessible, inclusive, and actionable.

From recognizing the curse and understanding its implications, to implementing strategies that aid in clarity, we've taken a holistic look at this communication conundrum. We've navigated the labyrinth, cracked the code, and cleared the fog.

But the journey doesn't end here. Our strategies to mitigate the 'Curse of Knowledge' will need to evolve, just as the landscapes of technology and communication continue to evolve. The adoption of plain language, the art of active listening, and the importance of creating robust and clear documentation are just a few pieces of this complex puzzle.

More importantly, the antidote to the 'Curse of Knowledge' lies in cultivating a culture that inherently supports inclusive knowledge sharing. Psychological safety, empathy, a growth mindset, and rewarding transparency and collaboration are all crucial to this cultural transformation.

In the end, it's about empowering everyone, from veterans to newbies, to participate in the exchange of ideas and knowledge. By doing so, we create a platform for innovation, drive effective collaboration, and ultimately build better products.

So let's take the leap, break the curse, and move towards a future where the exchange of complex ideas isn't a daunting task but a gratifying journey of learning and growth, together.

![Breaking the curse of knowledge together]({{ site.baseurl }}/images/sharing-knowledge.jpg)

Do you have any other techniques or tips to understand complex systems? I'm always looking for ways to improve. Please drop your thoughts in the comments below or reach out via email.

Until next time!
-- Tasos
