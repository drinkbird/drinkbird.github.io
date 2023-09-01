---
layout: post
title: "Azure Resiliency Patterns: The Key Ingredient"
excerpt: "What do we mean by resiliency, why is it so important for cloud systems, and what is it primarily based upon?"
permalink: /azure-resiliency
comments: true
categories: blog
featured: true
image:
  feature: redundancy-cover.jpg
#  credit: pixabay
redirect_from:
  - /azure-resiliency-part-1
reads:
  - cleanarchitecture
  - domaindrivendesign
  - thecleancoder
  - cleancode
  - agileppp
  - leanstartup
  - userstoriesapplied
---

Designing resilient cloud systems requires a totally different mindset than what we are used to for traditional enterprise applications. The distributed nature and operating scale of the cloud means that failures can and will happen often; so often that they play a significant role to our system's design.

In traditional systems we used to optimize for preventing failures. In the cloud we optimize for recovering fast from them. Our applications can be affected by all sorts of problems, such as faulty hard disk drives, faulty power supplies, a wide range of network-related issues and many more. 

So what can we do to stay resilient in the cloud, and especially in Azure? Before we discuss that, let's first talk about what resiliency is in more detail.

# Resiliency Defined

A resilient application is one that can successfully recover from failures, both big and small, and continue to work in a way that it doesn't cause any data loss or significant downtime. With the term *resiliency* we typically refer to two different values of a cloud system:

## 1. High Availability

![High Availability]({{ site.baseurl }}/images/high-availability.jpg)

*High Availability* is the ability of an application to keep running in a healthy state. By that we mean that users are able to connect to and interact with the application, as it remains responsive at all times.

Essentially it is up to each individual application to define what it means to be in a healthy state.

## 2. Disaster Recovery

![Disaster Recovery]({{ site.baseurl }}/images/disaster-recovery.jpg)

*Disaster Recovery* is the ability of an application to recover from various disasters, both big and small. A small disaster might be a hard disk failure. A big one might be a natural catastrophy that brings an entire data center down.

In the cloud we have several disaster recovery options, depending on the cloud provider. Some operations might require manual intervention, although in many cases we can rely on automation for self-healing.

# Overlap

In practice those two values overlap. For example, if we replicate data in different data centers around the world, that helps our system to be both highly available and able to recover from disasters easier.

And that's because both resiliency areas have a common key ingredient.

# Redundancy

![The key ingredient: redundancy]({{ site.baseurl }}/images/redundancy-cover.jpg)

*Redundancy* is the key ingredient for staying resilient in the cloud. The more resilient we need a system to be, the more redundancy it needs. Which means that redundancy is directly associated with development and operating costs, both in terms of additional resources and additional system complexity.

Part of our role as engineers, therefore, is to establish how much our business is willing to invest on resiliency. In other words:

> The degree of resiliency a system needs is a *business decision*, one that significantly influences the architecture and technical decisions that we make for the system.

It is quite important to ask the proper questions early in the design process, but also keep revisiting those decisions regularly, as business and technical requirements change and evolve over time.

# Redundancy for Azure resources

![Microsoft Azure Logo]({{ site.baseurl }}/images/Azure.png)

Many Azure resources can be set up with redundancy out of the box to be resilient. Here are some examples:

* [Azure Storage](https://azure.microsoft.com/en-us/services/storage/) by default keeps 3 copies of our data within the same data center, so if one copy fails, Azure will automatically create a new replica based on a healthy one. But there are more options for redundancy, each associated with a different cost. For example, we can create a *geo redundant* storage account, where in addition to the 3 standard copies, Azure keeps another 3 replicas in a different data center. That way, if there is a service outage at our primary location, we can keep working from the secondary one.
* [Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database/) lets us replicate data all over the world with ease. In addition to our primary database, we can have up to 4 secondary replicas that we can use for querying. If for some reason the primary database fails, Azure can promote one of the replicas and our application can keep on working. Additionally, we have options for automatic backups and point-in-time restores on demand.
* [Azure Cosmos DB](https://azure.microsoft.com/en-us/services/cosmos-db/) gives us even more resiliency options, as it was built from the very beginning with global distribution and horizontal scale as its core objectives.
* [Azure Virtual Machines](https://azure.microsoft.com/en-us/services/virtual-machines/) can be assigned to *availability sets*. Azure makes sure that VMs in two different availability sets have separate power, cooling and networking, and also are not restarted together in case Microsoft needs to update something at the infrastructure level (eg. the hypervisor). Recently, Azure has introduced a new feature called [*availability zones*](https://blogs.msdn.microsoft.com/igorpag/2017/10/08/why-azure-availability-zones/) which replaces availability sets and provides even better resiliency characteristics.
* [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/), one of the most popular Azure resources, lets us scale an application horizontally by simply flipping a virtual switch. It also puts a load balancer in front of the app in a transparent way, in order to distribute requests across all the running instances. In addition, if any of the replicas fail, Azure will automatically spin up a new instance and replace the faulty one.

Of course, in order to make informed decisions we first need to do some research on all the different resource offerings and their associated resiliency characteristics. Only then we can determine what is best for our specific use cases.

# Conclusion

In this article we discussed about the characteristics of resilient applications in the cloud, and also talked about the key ingredient for resiliency, which is redundancy.

Many Azure resources come with resiliency features out of the box, and offered either transparently or in the form of configuration options. Since there are different costs associated with each choice, and each application has different resiliency requirements, we need to involve the business early during the design process.