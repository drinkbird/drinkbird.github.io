---
layout: page
title: "Dice Radio on Android"
excerpt: "An Android native application for serving live audio streaming and user-targeted content from Dice Radio, an online radio station"
permalink: /projects/dice-android/
category: project
image:
  feature: diceandroid.png
featured: false
---

About a year after sucessfully launching [Dice Radio Web Portal](http://blog.drinkbird.com/projects/dice-web/), I was asked to develop an Android application for Dice Radio.

*Dice Radio on Android* is an extremely fast and lightweight (1.3 Mb) application which allows Android users to enjoy their favorite radio station on the go, as well as read latest news, producer biographies and the station's weekly timetable. The audio player keeps on streaming even when users switch tasks, allowing them to enjoy a seamless listening experience.

Dice Radio Web Portal was extended using Microsoft Web API to expose a RESTful API for the Android application to consume. The audio stream is directly consumed from a dedicated ShoutCAST service. The application also leverages a number of official compatibility libraries in order to work with Android v2.3.3 and up. Finally, errors are remotely captured and logged using [Splunk MINT](http://www.splunk.com/en_us/products/splunk-mint.html).

<ul class="list-inline gallery">
	<li>
		<a href="{{ site.baseurl }}/images/dice_android_1_full.png" class="image-popup mfp-with-zoom" title="Dice Radio Android - Newsfeed">
			<img src="{{ site.baseurl }}/images/dice_android_1_150.png" />
		</a>
	</li>
	<li>
		<a href="{{ site.baseurl }}/images/dice_android_2_full.png" class="image-popup mfp-with-zoom" title="Dice Radio Android - Navigation">
			<img src="{{ site.baseurl }}/images/dice_android_2_150.png" />
		</a>
	</li>
	<li>
		<a href="{{ site.baseurl }}/images/dice_android_3_full.png" class="image-popup mfp-with-zoom" title="Dice Radio Android - Producers List">
			<img src="{{ site.baseurl }}/images/dice_android_3_150.png" />
		</a>
	</li>
	<li>
		<a href="{{ site.baseurl }}/images/dice_android_4_full.png" class="image-popup mfp-with-zoom" title="Dice Radio Android - Producer Bio Part 1/2">
			<img src="{{ site.baseurl }}/images/dice_android_4_150.png" />
		</a>
	</li>
	<li>
		<a href="{{ site.baseurl }}/images/dice_android_5_full.png" class="image-popup mfp-with-zoom" title="Dice Radio Android - Producer Bio Part 2/2">
			<img src="{{ site.baseurl }}/images/dice_android_5_150.png" />
		</a>
	</li>
</ul>

[Project link (Google Play Store)](https://play.google.com/store/apps/details?id=com.drinkbird.diceradio)