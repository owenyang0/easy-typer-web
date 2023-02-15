---
title: Newsletter Jul 2021 - QuestDB 6.0.4 and Prometheus integration
author: QuestDB
author_url: https://github.com/questdb
author_image_url: https://avatars.githubusercontent.com/u/52297642?s=200&v=4
description:
  Here's QuestDB's July news including release 6.0.4, Prometheus support,
  continuous queries, and the latest resources and tutorials
tags: [newsletter]
image: /img/blog/newsletter-preview.png
slug: newsletter-prometheus-integration
---

![QuestDB newsletter banner](/img/blog/newsletter.png)

It's been an exciting month at QuestDB HQ; we released software version 6.0.4
with basic Prometheus support, and we had continued community growth with new
code contributions, issues, and tutorials. We also had the opportunity to join
GitHub’s Director of Developer Advocacy Brian Douglas live on his stream to
discuss time series data and QuestDB.

We were included in the top 20 fastest growing open source startups of Q2, and
featured in multiple curated shortlists of open source projects to watch
in 2021. Let’s take a look at these events and the rest of our monthly
highlights!

## 6.0.4 Release

Release version 6.0.4 focuses on community-driven topics raised by our users,
including are performance improvements, increased parallelization of existing
code, and calendar alignment for `SAMPLE BY` queries. We're also excited by the
introduction of a framework for exposing **Prometheus** metrics by our community
member Piotr Rżysko:

[![Screenshot of Prometheus dashboard showing data from QuestDB](/img/blog/2021-08-17/prometheus.png)](/blog/2021/07/16/release-6-0-4-prometheus-metrics/)

The initial implementation adds a simple counter for the number of executed SQL
queries. For more details on this release, including the full release notes, see
the
[announcement blog post for 6.0.4](/blog/2021/07/16/release-6-0-4-prometheus-metrics/).

## QuestDB on the web

Here's our highlights of places that we were featured on the web over the last
few weeks:

- We are featured in
  [the fastest growing open-source startups](https://runacap.com/ross-index/) in
  Q2 2021
- ZDNet mentioned us in
  [hot open source startups to watch](https://www.zdnet.com/article/open-source-growth-and-venture-capital-investment-data-databases-challenges-and-opportunities/)
  in 2021
- Console.dev
  [interviewed Vlad about the origins and future of QuestDB](https://console.dev/interviews/questdb-vlad-ilyushchenko/)
- Brian joined
  [GitHub's BDougie to discuss time series data live on Twitch](https://www.youtube.com/watch?v=gi0k2tTWmLM)
- Developer Nation featured
  [our article on high-cardinality benchmarks](https://dev.to/developernation/announcements-from-shopify-microsoft-aws-php-challenging-the-myth-that-programming-careers-end-at-40-l3a)
- The LibHunt platform lists us in
  [top time series projects for open source](https://www.libhunt.com/t/time-series)
- Listed Blockchain outfit
  [Tymlez built an AWS Glue / Pyspark QuestDB writer](https://github.com/Tymlez/awsglue-questdb-writer)

## Tutorials

Here are some of our latest tutorials from our community contributors which show
how to use QuestDB with a variety of tools and technologies:

- Dean Markwick wrote a tutorial for
  [building crypto trade database in Julia](https://dm13450.github.io/2021/08/05/questdb-part-1.html)
- Shan Desai shared his
  <a href="https://github.com/questdb/questdb/discussions/1180" target="_blank">
    software stack for IoT built with QuestDB
  </a>
- Gábor Boros wrote about
  [using Telegraf and QuestDB on DigitalOcean](/blog/2021/07/09/telegraf-and-questdb-for-storing-metrics-in-a-timeseries-database/)
- Yitaek Hwang compared
  [InfluxDB, TimescaleDB, and QuestDB](https://towardsdatascience.com/comparing-influxdb-timescaledb-and-questdb-timeseries-databases-c1692b9327a5)

## Community

We want to give a warm welcome to new members, we're happy to see you all in
Slack and have you share your ideas, feedback, and activity on GitHub!

- We reached **4.4k GitHub stars** !
- Our contributors opened
- We now have
  [over 700 developers on our Slack community]({@slackUrl@})

We are happy with which is a fun and easy way to get involved on GitHub. Don't
forget to our [Community page](/community/) for QuestDB swag if you're already a
contributor!

## We're hiring!

We are on the lookout for new team members to join us as we continue improving
the database internals and build out new features and functionality.

For more details alongside other open positions, see our
[Careers page](/careers/).

## Up next!

To keep our roadmap informed by what our users need most, we want to have your
feedback on support for **streaming mechanisms** or **continuous queries**
instead of polling QuestDB for changes. A GitHub discussion that overlaps with
this is. If we should focus on this, upvote and comment on the topic, or let us
know if continuous queries or streaming should have different functionality.

As we take a look at other topics and issues, is one of the most-requested
features by our community. Before we set out to support updates and deletes,
development efforts are focused on replication alongside support for geospatial
data.

If you've any questions about this update, reach out and say hi on
[Slack]({@slackUrl@}).
