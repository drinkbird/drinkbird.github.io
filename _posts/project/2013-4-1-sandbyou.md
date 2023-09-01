---
layout: page
title: "You@S&B"
excerpt: "A web application tailored to assist S&amp;B with their recruitment process"
permalink: /projects/sandbyou/
category: project
image:
  feature: sandbyou.png
featured: true
---

*You@S&B* is a web application tailored to assist [S&amp;B](http://www.sandb.com/) with their recruitment process.

As a first phase, the prospective employees are guided through a process that lets them fill their details, answer a few questions, and finally upload their CV. The HR team is then able to process that information and filter those candidates out, allowing a number of them to proceed to the next phase. Usually there are 5 different phases to this process, and those who make it to the last phase receive a job offer.

The application utilizes ASP.NET MVC, SQL Azure, Azure Websites & Sharepoint. The user data, questionnaire answers and CV files are stored in an SQL Azure database. An administration panel allows the HR team to process that data, filter out the candidates, and automatically dispatch an e-mail message to each of them to inform them about their progress. On top of that, the company's Sharepoint server retrieves all the data asynchronously in order to archive it for future reference but also allow various stakeholders to overview the process and provide valuable feedback.

My role as a software developer included:

* Creating the front-end implementation of the application, based on PSD mockups, using Twitter Bootstrap.
* Consulting on the project design (Back-end architecture, UX/UI).
* Implementing some parts of the ASP.NET MVC application's infrastructure (e.g. Repositories / Units of work, Dependency injection) plus some core business logic.
* Configure the deployment procedure and the autoscale settings in Azure Websites.

This application becomes available only when S&amp;B announces a new recruitment round, and just for a few days each time. Whenever it is up, it receives a very high volume of traffic.

<ul class="list-inline gallery">
	<li>
		<a href="{{ site.baseurl }}/images/sandbyou_full.png" class="image-popup mfp-with-zoom" title="You@S&amp;B Landing Page (In Greek)">
			<img src="{{ site.baseurl }}/images/sandbyou-250x150.png" />
		</a>
	</li>
</ul>
