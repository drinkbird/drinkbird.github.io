---
layout: post
title: "Azure Resiliency Patterns - Part 1: The Key Ingredient"
excerpt: "What do we mean by resiliency, why is it so important for cloud systems, and what is primarily based upon?"
permalink: /azure-resiliency-part-1
comments: true
categories: blog
featured: true
image:
  feature: redundancy-cover.jpg
#  credit: pixabay
reads:
  - cleanarchitecture
  - domaindrivendesign
  - thecleancoder
  - cleancode
  - agileppp
  - leanstartup
  - userstoriesapplied
---

Designing resilient cloud systems requires a totally different mindset than what we are used to for traditional enterprise applications. The distributed nature and operating scale of the cloud means that failures can and will happen often, so often that they play a significant role to our system's design.

In traditional systems we used to optimize for preventing failures. On the cloud we optimize for recovering fast from them. Our applications can be affected by all sorts of problems, such as faulty hard disk drives, faulty power supplies, a wide range of network-related issues and much more. 

What can we do to stay resilient on the cloud, especially on *Microsoft Azure*? Before we discuss that, let's see what resiliency is about in more detail. 

# Resiliency Defined

A resilient application is one that can successfully recover from failures, both big and small, and continue to work in a way that it doesn't cause any data loss or significant downtime. With the term *resiliency* we typically refer to two different values of a system:

## 1. High Availability

![High Availability]({{ site.baseurl }}/images/high-availability.jpg)

*High Availability* is the ability of an application to keep running in a healthy state. By that we mean that users are able to connect to and interact with the application, as it remains responsive at all times and has no significant downtimes.

It's up to each individual application to define what it means to be in a healthy state.

## 2. Disaster Recovery

![Disaster Recovery]({{ site.baseurl }}/images/disaster-recovery.jpg)

*Disaster Recovery* is the ability of an application to recover from various disasters, both big and small. A small disaster might be a hard disk failure. A big one could be a natural catastrophy that brings an entire region down.

Some disaster recovery operations might require manual intervention, although there are several cases where we can rely on automation.

# Overlap

In practice those two values overlap. For example, if we replicate data across different regions around the world, that helps our system to be highly available and be able to recover from disasters easier.

That's because both resiliency values have a common key ingredient.

# Redundancy

![The key ingredient: redundancy]({{ site.baseurl }}/images/redundancy-cover.jpg)

*Redundancy* is the key ingredient for staying resilient in the cloud. The more resilient we need a system to be, the more resources and redundancy it needs, and the more expensive it gets.

Part of our role as engineers is to establish how much our business is willing to invest for resiliency. And that brings us to a very important point:

> The degree of resiliency a system needs is a *business decision*, one that significantly influences the architecture and technical decisions that we make for the system.

Therefore, it's quite important to ask the proper questions early in the design process, and also keep revisiting these decisions regularly, as both business and technical requirements change and evolve over time.

# Redundancy for Azure resources

![Microsoft Azure Logo]({{ site.baseurl }}/images/Azure.png)

Many Azure resources can be set up with redundancy out of the box to be resilient. Here are some examples:

* [Azure Storage](https://azure.microsoft.com/en-us/services/storage/) by default keeps 3 copies of our data within the same region, so if one copy fails, Azure will automatically use one of the healthy copies to create a new one. We have more options for redundancy, each associated with a different cost. For example, we can create a *geo redundant* storage account, where in addition to the 3 copies within the same region, Azure keeps another 3 replicas at a different, predetermined region. That way, if our entire primary region goes down or the service is simply unreachable, we can keep working from the secondary location.
* [Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database/) lets us replicate data all around the world. In addition to our primary database, we can have up to 4 secondary replicas we can use for reads. If for some reason the primary database fails, Azure can promote one of the replicas and our application can keep working. Additionally, we can have automatic backups and perform point-in-time restores on demand.
* [Azure Cosmos DB](https://azure.microsoft.com/en-us/services/cosmos-db/) gives us even more resiliency options, as it was built from the very beginning with global distribution and horizontal scale at its center.
* [Azure Virtual Machines](https://azure.microsoft.com/en-us/services/virtual-machines/) can be put into *availability sets*. Azure makes sure that VMs in two different availability sets have separate power, cooling and networking, and also are not restarted together in case Microsoft needs to update the infrastructure (eg. the hypervisor). Recently, Azure introduced a new feature called [*availability zones*](https://blogs.msdn.microsoft.com/igorpag/2017/10/08/why-azure-availability-zones/) which replaces availability sets and provides even better resiliency characteristics.
* [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/), one of the most popular Azure resources, lets us scale an application horizontally by simply flipping a virtual switch. It also puts a load balancer in front of the app in a transparent way, in order to distribute requests across all the running instances. In addition, if any of the replicas fail, Azure will automatically spin up a new one and replace the faulty one.

Of course in order to make informed decisions we first need to research the available resources and their resiliency options, and determine what is best for our specific use cases.

# Conclusion

In the first part of the Azure Resiliency Patterns article series we discussed about the characteristics of resilient applications in the cloud, and also talked about the key ingredient for resiliency, which is redundancy.

Many Azure resources come with resiliency features out of the box, and offered either transparently or in the form of configuration options. Since there is a different cost associated with each choice, and each application has different resiliency requirements, we need to involve the business early during the design process.

In the next part of the series we'll address a very common concern of cloud systems design: *connection resiliency*.

As always, you can get free e-mail updates when new stories are published by entering your e-mail address below.
