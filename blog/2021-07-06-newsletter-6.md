---
title: Newsletter Jun 2021 - High Cardinality Benchmarks
author: QuestDB
author_url: https://github.com/questdb
author_image_url: https://avatars.githubusercontent.com/u/52297642?s=200&v=4
description:
  Here's the latest QuestDB news including performance and stability
  improvements and high-cardinality benchmark results
tags: [newsletter]
image: /img/blog/newsletter-preview.png
slug: newsletter-cardinality-tsbs-benchmark-timescaledb-influxdb-clickhouse
---

![QuestDB newsletter banner](/img/blog/newsletter.png)

The last month has been exciting for the QuestDB team; we've had a lot of kudos
sent our way including a feature as the top release for
[GitHub's May Release Radar](https://github.blog/2021-06-04-release-radar-may-2021/)
. The June monthly review is jam-packed, so let's dig into our roundup of
events, a look at what we're working on, and other news from QuestDB HQ!

## High-cardinality benchmarks

We previously wrote about the maximum throughput of different time series
databases. To follow up, we ran high-cardinality benchmarks, which is a common
pain point for time-series databases. We were happy with the results showing how
QuestDB handles up to 10 million unique devices, and we published an article
with the results and methodologmy:

[![Chart showing trends of ingestion rate](/img/blog/2021-07-06/high-cardinality-benchmakrs.png)](/blog/2021/06/16/high-cardinality-time-series-data-performance/)

The article was trending on the
[#1 spot on Reddit's r/programming](https://www.reddit.com/r/programming/comments/o4top6/how_databases_handle_10_million_devices_in/)
and received over 850 upvotes and 75 comments, and Pointer included it in their
[weekly reading club](https://www.pointer.io/archives/025e73f2a9/). Thanks to
the QuestDB community for sharing the article and giving your feedback on our
content.

## QuestDB on the web

Our previous article about how
[we achieved write speeds of 1.4 million rows/second](/blog/2021/05/10/questdb-release-6-0-tsbs-benchmark/)
made waves, and we're delighted to see follow-ups from the community:

- YC
  [shared the love](https://twitter.com/ycombinator/status/1392894963394953218)
- We enjoyed
  [the HackerNews discussion](https://news.ycombinator.com/item?id=27411307)
  where the post received 182 points
- Programmer weekly included this article in their
  [Weekly Reading List](https://newsletterest.com/message/58109/Programmer-Weekly-Issue-54)
- HighScalability.com appreciated the
  [details of our low-level benchmarks](http://highscalability.com/blog/2021/6/25/stuff-the-internet-says-on-scalability-for-june-25th-2021.html)
- Former SpaceX, Facebook, and AWS engineer Randall Hunt
  [showed his appreciation](https://twitter.com/jrhunt/status/1401753183668490241)
  for the content we are publishing:

[![Screenshot of a tweet from @jrhunt](/img/blog/2021-07-06/tweet.png)](https://twitter.com/jrhunt/status/1401753183668490241)

Last but not least, Tim Borowski explained
[why QuestDB is his database of choice for industrial IoT](https://www.developer-week.de/programm/#/talk/schnell-schneller-questdb)
during the DWX Developer Week, and DBWeekly listed us
[in their most recent newsletter](https://dbweekly.com/issues/360).

## QuestDB on the DigitalOcean Marketplace

We're glad to announce that QuestDB is
[now available on the DigitalOcean Marketplace](https://marketplace.digitalocean.com/apps/questdb).
The marketplace listing allows users to deploy a Droplet with the latest QuestDB
version in one of 8 geographic regions with persistent block storage,
monitoring, backups, credentials management for remote access (SSH), and a
convenient 1-Click deploy.

If you don't have a DigitalOcean account, you can get started with
[our referral program for \$100 DigitalOcean credit](https://www.digitalocean.com/?refcode=50d6b551562b&utm_campaign=Referral_Invite&utm_medium=Referral_Program).

[QuestDB on DigitalOcean](https://cloud.digitalocean.com/droplets/new?image=questdb-20-04)

## Community

As our community continues to grow, we want to give a warm welcome to new
members and thank those who are seasoned QuestDB users. We're happy to see new
faces in Slack and the additions of new ideas, feedback, and activity on GitHub!

- We reached **4k GitHub stars** which is a great milestone for us!
- Our contributors opened in the last month for feature requests and bug reports
  and we have had many more feature requests via Slack and Stack Overflow
- We now have [645 developers on our Slack community]({@slackUrl@})

We are now testing as a way to get the conversation about QuestDB started! We
have **16 posts** so far since we activated this feature last week, and we
expect this to be a fun and easy way to get involved on GitHub. If you're
already a contributor, don't forget to visit our [Community page](/community/)
for QuestDB swag as our way of saying thanks!

## Welcome to the team!

There are two new faces in QuestDB engineering, and we'd like to extend a warm
welcome to Reinis, who joins as a Cloud Engineeer, and Miguel, who joins as a
Backend Engineer. Welcome onboard; we're excited to have you join the Quest!

We will be further growing the team in the coming months, and our
[Careers page](/careers/) has details on current openings.

## Up next!

We're continuing experimental support for the addition of **geospatial data** as
a new dimension for queries which would open up the possibilities for using
QuestDB for a wider variety of use cases such as asset tracking, autonomous
vehicles, robotics, and fleet management. In parallel, we are continuing work on
**replication** , a highly requested feature from our users.

We're glad to see our community growing and giving us valuable feedback on
features and functionality. If you've any questions about this update, reach out
to us and say hi on [Slack]({@slackUrl@}).
