---
layout: post
title: "Microservices communications: How to reliably publish messages to a bus"
excerpt: "Learn how to avoid double writes, a common pitfall of microservices and distributed systems design"
permalink: /reliable-microservices-messaging/
comments: true
categories: blog
featured: true
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

Imagine that an interesting change is about to happen in our system; let's say a user has filled out their information and is about to click the `Register` button. Upon processing this request, the `User` service needs to perform two main actions:

1. persist the new user's information to its own database, and
1. publish a `UserRegistered` event to a message broker

Both steps are important for our system to function properly, so they should either both succeed or fail. For example, if the user info gets persisted but the event doesn't get published, then the `Subscription` service won't know about the new user and it won't activate their associated trial subscription.

Therefore, it might sound essential that the two steps above are performed together, but this *double write* can lead to a number of problems. For example:

* __When the message broker is be down or unreachable__: A message broker is an independent system with its own uptime and SLA, which means it could be down when we attempt to talk to it. We also communicate with it over the network, which is unreliable [by definition](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing), which means that the broker could be unreachable when we try to send a message.
* __When the service is killed mid-way__: As soon as the database persistence step completes, the service dies unexpectedly. The message publishing step doesn't happen at all.
* __When requests have to be processed fast__: Talking to a database *and* a message broker means that we talk to two different systems over a network, which adds to the total response time. If our service's response SLA is tight, this might become an issue.
* __When we need to re-publish old events__: Imagine that we have just deployed a new microservice and it needs to catch up with all events that occurred within the last 30 days. The *TTL* (time to live) for messages in the broker is 7 days, so most of the events have disappeared. We need a way to republish these missing events without changing the state of any elements in the database. If those two actions are coupled we have a problem.

## The Solution(s)

There are a few patterns we can leverage to avoid double writes. Which one to choose depends on the situation, as we need to consider some design aspects of our system, most importantly the database technology used by the service in question.

The premise of all the solutions presented here is embracing the [eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency) model, while atomically performing each of the required steps. 

That way we can guarantee that services will get to know about the changes they are interested in, just not at the exact time they happen but rather a few moments later (*eventually*). After all, sacrificing consistency in favor of high availability and partition tolerance is generally a good idea for [cloud applications¹](#anchor1).

In addition, the service's database essentially becomes the source of truth for messages/events emitted to other consumers. This allows us not just to have better visibility into what and when something gets published, but also have greater control of republishing.

Let's have a look at some patterns next.

### The Transactional Outbox Pattern

A service that uses a relational database to manage its state can take advantage of local ACID transactions when performing data changes. During the transaction, and in addition to the standard changes, we can insert messages/events into a special `Outbox` table, initially marking them as unsent.

Having that structure in place allows us to have a separate `Relay` service that polls the Outbox table, detects any unsent messages, sends them in batches and finally marks them as sent, all within a separate local transaction.



### The Full Event Sourcing Pattern

### The Transactional Log Tailing Pattern

### Anti-pattern: 2-Phase Commit

- Transaction log mining
- Change feed
- 2 Phase commit is not an option.

<div class="anchor" id="anchor1"></div>
* ¹ For more information on the subject you can read about [The CAP Theorem](https://en.wikipedia.org/wiki/CAP_theorem). Note that within a microservices based application, not all of the components need to follow the same consistency model. For example, a `Payments` component could favor consistency over availability.
