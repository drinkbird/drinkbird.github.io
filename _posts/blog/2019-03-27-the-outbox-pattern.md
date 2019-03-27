---
layout: post
title: "Using the Transactional Outbox pattern"
excerpt: "Reliably publishing messages and events to a bus"
permalink: /transactional-outbox-pattern/
comments: true
categories: blog
featured: true
image:
  feature: outbox-pattern.png
reads:
  - microservicespatterns
  - agiledev
  - onwritingwell-amazon
  - accelerate
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

In distributed systems, sometimes a service needs to publish events/messages to a bus like Kafka, RabbitMQ or Azure Service Bus, in order to notify other services that something interesting has happened.

Perhaps a user has subscribed to our newsletter and the Email Sender service needs to know so it can send a welcome email, or the Reservation Analytics service needs to keep track of all the reservations and cancellations within our restaurants platform.

## The problem

In such cases the publishing service has to reliably persist the new changes to its own database and in addition publish some messages/events to the bus; we need either both operations to succeed or none of them should.

It might sound essential that these actions are performed together, but that's easier said than done as we might run into the following problems:

- The bus might be down or unreachable.
- The database persistance step succeeds but the service dies before it has a chance to publish to the bus.
- In certain situations we might want to republish messages/events.

## The solution

A service that uses a relational database to manage its state can take advantage of local ACID transactions perform data changes. As part of such a transaction we can additionally insert messages/events into a special `Outbox` table.

These records contain a boolean `IsPublished` flag, set to `false` by default.

Finally, a separate `Relay` service scans the `Outbox` table 

## Working and non-working alternatives

- Transaction log mining
- Change feed
- 2 Phase commit is not an option.
