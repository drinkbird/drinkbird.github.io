---
layout: post
title: "Microservices communications: Publishing messages to a bus in a reliable way"
excerpt: "Learn how to avoid double writes, a common pitfall of microservices design"
permalink: /reliable-microservices-messaging/
comments: true
categories: blog
featured: true
mermaid: true
image:
  feature: microservices-messaging.jpg
reads:
  - microservicespatterns
  - agiledev
  - onwritingwell-amazon
  - accelerate-amazon
  - peopleware
  - careerguide
  - themythicalmanmonth
  - showyourwork
  - softskills
  - thecleancoder
  - madetostick-amazon
  - codecomplete
  - thephoenix
  - dataintensive
  - functionalreactive
  - buildingmicroservices
  - cleanarchitecture

---

## The context

In microservices design we often need a service to publish messages or events to a message bus in order to notify other services that something interesting has happened.

Perhaps a user has subscribed to our newsletter and the Email Sender service needs to know so it can send a welcome email, or the Reservation Analytics service needs to be aware of all the reservations and cancellations within our restaurants platform to keep the business informed.

No matter which messaging solution we choose, eg. Kafka, RabbitMQ, Azure Service Bus, there is a common design problem that we need to be aware of and avoid.

## The problem

Imagine that an interesting change is about to happen in our system; let's say a user has filled out their information and is about to click the `Register` button. Upon processing this request, the `User` service needs to perform two actions:

1. persist the new user's information to its database, and
1. publish a `UserRegistered` event to a message broker

Both steps are important for our system to function properly, so they should either both succeed or fail. For example, if the user info gets persisted but the event doesn't get published, then the `Subscription` service won't know about the new user and it won't activate their associated trial subscription.

<div class="mermaid">
graph TD;
    req(Request)-->svc[Service];
    svc[Service]-- Write 1 - OK -->db[Database];
    svc[Service]-. Write 2 - Fail .->bus[Message Bus];
</div>

Therefore, it might sound essential that the two steps above are performed together, but this *double write* can lead to a number of problems. For example:

* __When the message broker is be down or unreachable__: A message broker is an independent system with its own uptime and SLA, which means it could be down when we attempt to talk to it. We also communicate with it over the network, which is unreliable [by definition](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing), which means that the broker could be unreachable when we try to send a message.
* __When the service is killed mid-way__: As soon as the database persistence step completes, the service dies unexpectedly. The message publishing step doesn't happen at all.
* __When requests have to be processed fast__: Talking to a database *and* a message broker means that we talk to two different systems over a network, which adds to the total response time. If our service's response SLA is tight, this might become an issue.
* __When we need to re-publish old events__: Imagine that we have just deployed a new microservice and it needs to catch up with all events that occurred within the last 30 days. The *TTL* (time to live) for messages in the broker is 7 days, so most of the events have disappeared. We need a way to republish these missing events without changing the state of any elements in the database. If those two actions are coupled we have a problem.

## Solutions

There are a few patterns we can leverage to avoid double writes. Which one to choose depends on the situation, as we need to consider some design aspects of our system, most importantly the database technology used by the service in question.

The premise of all the solutions presented here is embracing the [eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency) model, while atomically performing each of the required steps. 

That way we can guarantee that services will get to know about the changes they are interested in, just not at the exact time they happen but rather a few moments later (*eventually*). After all, sacrificing consistency in favor of high availability and partition tolerance is generally a good idea for [cloud applications¹](#anchor1).

In addition, the service's database becomes the source of truth for messages/events emitted to other consumers. This allows us not just to have better visibility into what and when something gets published, but also be able to republish items if necessary. Let's look into more details.

---

<div class="anchor" id="anchor1"></div>
¹ For more information on the subject you can read about [The CAP Theorem](https://en.wikipedia.org/wiki/CAP_theorem). Note that within a microservices based application, not all of the components need to follow the same consistency model. For example, a `Payments` component could favor consistency over availability.

### 1. The Transactional Outbox Pattern

For applications that use a relational database to manage their state, we can use a special `Outbox` table as a staging area for messages to be published.

We use local ACID transactions to make changes to the application's state, and as part of such a transaction we also insert a message/event record into the Outbox table.

Then we can have a separate `Relay` process that reads messages from the Outbox table and publishes them to a message bus within a separate local ACID transaction.

<div class="mermaid">
graph TD;
    req(Request) --> bm[Business Microservice];
    bm[Business Microservice] -- Database Transaction --> Database;
    Relay -- Poll --> Database
    Relay -- Publish --> mb[Message Bus]

    subgraph Database Transaction
        s[Business Microservice] -- Edit Customer record --> ct[Customer Table]
        s[Business Microservice] -- Add CustomerEdited event --> ob[Outbox Events]
    end
</div>

It's a highly convenient pattern, especially when we need from an existing application to start publishing events. Most importantly, this patterns allows us to work directly with high-level events, in contrast with some other patterns as we'll see next.

On the other hand, there is additional programming work to be done when writing/reading outbox messages, so there's always the chance that a developer forgets to update this part when making changes to the main application logic and data.

### 2. The Transactional Log Tailing Pattern

For applications that use a database supporting log tailing, we can have a `Relay` process that taps into the transaction logs, transforms detected changes into messages/events and publishes them to a message bus. Although this approach is similar to the Transactional Outbox, it comes with different pros and cons.

On the one hand there is less development work involved, as we don't need to make any additional inserts when persisting state. On the other hand, the transaction logs are usually in a raw, lower-level format and there is some work involved to transform them to high-level events.

<div class="mermaid">
graph TD;
    req(Request) --> bm[Business Microservice];
    bm[Business Microservice] -- Database Transaction --> Database;
    Relay -- Observe Log --> Database
    Relay -- Transform and Publish --> mb[Message Bus]
</div>

This approach works for both relational and NoSQL databases, as long as they support the log tailing feature. A good example of a NoSQL implementation of this pattern is [Microsoft Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction) with the [Change Feed](https://docs.microsoft.com/en-us/azure/cosmos-db/change-feed) feature.

When working with Cosmos DB, the `Relay` service taps into the Change Feed API and receives notifications for data changes, which can then publish to a message bus. The Change Feed feature also works great with the full Event Sourcing pattern, as we'll see next.

### 3. The Full Event Sourcing Pattern

With [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html) we persist the state of a business entity, such as a `Reservation` or a `User`, as a stream of state-changing events. To make a change to a business entity we append a new event to the stream, and to recreate an entity's state we replay all events in the stream.

Since with Event Sourcing we don't edit records but rather only insert new ones, we only change state in an inherently atomic way. The challenge lies in publishing events to a bus in an atomic way as well.

When working with Event Sourcing, we refer to the database as the `Event Store`. Although there are products specialized in storing events, such as [Greg Young's Event Store](https://eventstore.org/), we can essentially use most SQL or NoSQL database products and adjust the implementation to account for each database's strengths and weaknesses.

The way we publish events reliably depends on the Event Store. For example, with a SQL implementation we can have an `Events` table to store domain events, and a flag that indicates whether a record has been published. It's similar to the Outbox pattern, but we don't need additional entries.

<div class="mermaid">
graph TD;
    req(Request) --> bm[Business Microservice];
    bm[Business Microservice] -- Database Transaction --> Database;
    Relay -- Observe Log / Poll Events Table --> Database
    Relay -- Transform and Publish --> mb[Message Bus]
</div>

Transactional Log Tailing is also a good option since with Event Sourcing it's much easier to know exactly what to listen for and act upon. Finally, when using Cosmos DB as an Event Store, the Change Feed feature fits naturally into the design.

I have successfully used both relational (Azure SQL) and NoSQL/document-oriented (Azure Cosmos DB) databases as an event store. The jury is still out regarding which approach is better, as there are cost, scalability and other factors to consider, depending on the system in question. You need to remember that with software engineering there are no silver bullets.

## More reasons why reliable messaging is so important

`Distributed Transactions` using the `Two-Phase Commit Protocol` (2PC) is not an option for microservice-based applications. Not only it restricts our options for Databases, Message Buses, etc. as they need to explicitly support the protocol, but can also significantly reduce the availability of our system as for a distributed commit to succeed it needs all participating components to be online and reachable.

Some business transactions may still need to span across many microservices. Since each microservice has its own private database and Distributed Transactions have to be avoided by design, there has to be another way of keeping data consistent.

That is where the [Saga](https://dzone.com/articles/microservices-and-the-saga-pattern-part-1) pattern comes into play. Although the patern's details are outside the scope of this post, the important thing to note is that Sagas heavily rely on messaging. That is one more reason why messaging is so important for microservice-based applications, so we need to take extra care that is done in a reliable fashion.

## Conclusion

Messaging is in the heart of microservice-based application design, so we need to make sure that is done in a reliable and predictable way.

To that end there are several solutions we can leverage, depending on the database technology we use and its features, plus a number of design aspects of our system.

Finally, when we need to keep data consistent across microservices we should avoid 2PC and use Sagas instead, which heavily relies on messaging.

![Eventual Consistency]({{ site.baseurl }}/images/eventual-consistency.jpg)
<p class="text-center">Eventual Consistency - <a href="https://twitter.com/mykola/status/1101337299525267457?lang=en">Image Source</a></p>

Want to build expertise in microservices? Check out my [complete Collection of Microservices Books]({{ site.baseurl }}/microservices-books-complete-collection/) and don't hesitate to drop me a line and ask your questions or leave your comments.

Until next time! Cheers, Tasos. 
