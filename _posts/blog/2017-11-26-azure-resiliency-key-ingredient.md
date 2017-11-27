---
layout: post
title: "Azure Resiliency Patterns: The Key Ingredient"
excerpt: "What do we mean by resiliency, why is it so important for cloud systems, and what is its key ingredient?"
permalink: /azure-resiliency-key-ingredient
comments: true
categories: blog
featured: true
image:
  feature: resiliency.jpg
#  credit: pixabay
reads:
  - cleanarchitecture
  - thecleancoder
  - cleancode
  - xunit
  - agileppp
  - refactoring
  - legacycode
  - leanstartup
  - domaindrivendesign
  - cleanarchitecture
  - softskills
  - themythicalmanmonth
  - effectiveusecases
  - userstoriesapplied
---

Designing resilient cloud systems requires a totally different mindset than what we are used to for traditional enterprise applications. The distributed nature and operating scale of the cloud means that failures can and will happen often, so often that they play a significant role to our system's design.

In traditional systems we used to optimize for preventing failures. On the cloud we optimize for recovering fast from them. Our applications can be affected by all sorts of problems, such as faulty hard disk drives, faulty power supplies, a wide range of network-related issues and much more. 

What can we do to stay resilient on the cloud, especially on *Microsoft Azure*? Before we discuss that, let's see what resiliency is about in more detail. 

# Resiliency Defined

A resilient application is one that can successfully recover from failures, both big and small, and continue to work in a way that it doesn't cause any data loss or significant downtime. With the term *resiliency* we typically refer to two different values of a system:

## 1. High Availability

![High Availability]({{ site.baseurl }}/images/high-availability.jpg)



## 2. Disaster Recovery

![Disaster Recovery]({{ site.baseurl }}/images/disaster-recovery.jpg)

# They Key Ingredient: Redundancy

![The key ingredient: redundancy]({{ site.baseurl }}/images/redundancy.jpg)


