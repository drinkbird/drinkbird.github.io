---
layout: post
title: "[Book Review] Learning Microsoft Azure by Geoff Webber-Cross"
excerpt: "Geoff provides an excellent starting point for creating sound and maintainable cloud architectures."
date: 2015-02-04 00:00:00
permalink: /learning-microsoft-azure-review/
comments: true
categories: blog
image:
  feature: learning-azure.png
featured: true
---

Cloud computing has already consolidated its presence in the tech industry, and it is quickly becoming a standard choice for hosting enterprise applications. The greatest advantage of the cloud is that resources are provisioned rapidly and on demand, without human intervention on the provider's part. Moreover, every provider offers a wide range of services that can significantly extend the capabilities of hosted applications.

In order to harvest the true power of the cloud, one needs thorough knowledge of distributed systems theory, awareness of which services are offered by the targeted cloud platform, plus a solid strategy for identifying and properly separating the concerns of a system. The ultimate goal for every cloud software architect is to design a reliable, highly-available system which can dynamically scale on demand to meet business needs.

<a href="http://azure.microsoft.com/" target="_blank">Azure</a> is Microsoft's cloud platform. I have been designing and developing cloud applications on Azure for the last few years, starting as an early adopter and watching it grow rapidly ever since. Unfortunately, Azure's documentation focuses on each of the services offered  separately, providing little to no advice on how to design a complete cloud solution. I ended up spending months researching, experimenting and brainstorming in order to come up with an acceptable architecture for a specific enterprise solution.

Recently I came across a book called "Learning Microsoft Azure", written by Geoff Webber-Cross. Its purpose is to teach software engineers the main aspects of the Azure platform, and to do so in the context of the best architectural approach possible. It is a promising effort of great significance, and Geoff has done it wonderfully. The book is not just for Azure beginners; I was able to gain a lot from it, even after working on Azure for about three years on a daily basis.

In Learning Microsoft Azure, Geoff helps you build pieces of an enterprise cloud application called "Azure Bakery". By the time you have worked through all the chapters, Geoff has introduced you to the three principal types of cloud service models (Infrastructure as a Service, Platform as a Service, Software as a Service) as well as to all major services that Azure provides (Websites, Cloud Services, Active Directory, Mobile Services, Virtual Machines, SQL, Storage, Service Bus, Diagnostics, Visual Studio Online and more). He also offers fully-functioning code samples leveraging the Azure SDK, plus demonstrating the capabilities of various other development frameworks, like ASP.NET MVC, WEB API and SignalR. Finally, Geoff offers a comprehensive guide on deploying applications to Azure, a process which requires great attention, especially when it is performed on live systems.

I found that Chapter 8, regarding worker roles, is one of the most important chapters in the book. Worker roles are used to perform CPU- or network-intensive tasks in an asynchronous manner. Experience shows that almost every cloud application uses at least one worker role. Apart from the theoretical background offered on worker roles, Geoff demonstrates the internal life cycle of a cloud service, along with some solid code practices to follow when developing one.

Geoff provides an excellent starting point for creating sound and maintainable cloud architectures. Those architectures involve proper separation of concerns and allow various parts of a solution to scale independently. The book is targeted towards intermediate software engineers who are already proficient in OOP and C#. Keep in mind that many of the design decisions described within the book are transferable, meaning that they can also be used while developing solutions for other cloud platforms.

I enjoyed the book and I found it valuable. I consider it to be the missing manual for Microsoft Azure. I believe you will enjoy it too!

<a href="http://geni.us/learnazure" target="_blank" class="btn btn-warning">Get Learning Microsoft Azure</a>

p.s.: My warmest greetings to the guys at <a href="http://packtpub.com/" target="_blank">Packt Publishing</a>. Thank you for requesting me to review this book. I really had a good time reading it.