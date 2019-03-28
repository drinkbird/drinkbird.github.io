---
layout: post
title: "Microservices communications: How to reliably publish to a message broker"
excerpt: "Learn how to avoid the double write, a common pitfall of microservices design"
permalink: /reliable-microservices-messaging/
comments: true
categories: blog
featured: true
image:
  feature: outbox-pattern.png
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

In microservices design (and distributed systems in general) we sometimes need a service to publish events/messages to a message broker/bus in order to notify other services that something interesting has happened.

Perhaps a user has subscribed to our newsletter and the Email Sender service needs to know so it can send a welcome email, or the Reservation Analytics service needs to be aware of all the reservations and cancellations within our restaurants platform to keep the business informed.

No matter which messaging solution we choose, eg. Kafka, RabbitMQ, Azure Service Bus, there is a common design problem that we need to be aware of, and avoid.

## The problem

Imagine that an interesting change is about to happen in our system; let's say a user has filled out their information and is about to click the `Register` button. Upon processing this request, the `User` service needs to perform two main actions:

1. persist the new user's information to its own database, and
1. publish a `UserRegistered` event to a message broker

Both steps are important for our system to function properly, so they should either both succeed or fail. For example, if the user info gets persisted but the event doesn't get published, then the `Subscription` service won't know about the new user, so it won't activate her trial subscription.

It might sound essential that these actions are performed together, but doing it that way we might run into a number of problems. For example:

1. __The message broker might be down or unreachable__: A message broker is an independent system with its own uptime and SLA, which means it could be down when we attempt to talk to it. We also communicate with it over the network, which is unreliable [by definition](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing), which means that the broker could be unreachable when we try to send a message.
1. __The service process gets killed mid-way__: As soon as the database persistence step completes, the service dies unexpectedly. The message publishing step doesn't happen at all.
1. __The request has to be processed fast__: Talking to a database *and* a message broker means that we talk to two different systems over a network, which adds to the total response time. If our service's response SLA is tight, this might become an issue.
1. __Edge case: We need to republish old events__: Imagine that we have just deployed a new microservice and it needs to catch up with all events that occurred within the last 30 days. The *TTL* (time to live) for messages in the broker is 7 days, so most of the events have disappeared. We need a way to republish these missing events without changing the state of any elements in the database. If those two actions are coupled we have a problem.

## The Solution

Depending on the database technology we use, and considering some design aspects of our system, there are a few different patterns we can leverage to avoid the *double write* pitfall. Here are the most common ones.

### The Transactional Outbox Pattern

A service that uses a relational database to manage its state can take advantage of local ACID transactions perform data changes. As part of such a transaction we can additionally insert messages/events into a special `Outbox` table.

These records contain a boolean `IsPublished` flag, set to `false` by default.

Finally, a separate `Relay` service scans the `Outbox` table 

### The Full Event Sourcing Pattern

### The Transactional Log Tailing Pattern

### Anti-pattern: 2-Phase Commit

- Transaction log mining
- Change feed
- 2 Phase commit is not an option.
