---
title: Newsletter May 2021 - QuestDB 6.0.3 release
author: QuestDB
author_url: https://github.com/questdb
author_image_url: https://avatars.githubusercontent.com/u/52297642?s=200&v=4
description:
  6.0.3 is available now. Here's the latest QuestDB news including for
  out-of-order performance and stability improvements and TSBS benchmark results
tags: [newsletter]
image: /img/blog/newsletter-preview.png
slug: newsletter-bind-variables
---

![QuestDB newsletter banner](/img/blog/newsletter.png)

The response to our 6.0 launch from new and existing users and the developer
community has been amazing. We're excited to see our community grow and join us
on the quest! Here's our roundup of events surrounding the launch, a sneak peek
at what we're building next, and other news from QuestDB HQ!

## 6.0 Feedback

QuestDB 6.0 includes a new system that can handle out-of-order time series data
and re-orders it on the fly before writing to disk. The response was
overwhelmingly positive with our blog post trending at the
[number 1 position on Reddit's r/programming](https://www.reddit.com/r/programming/comments/nao3ts/how_we_achieved_write_speeds_of_14_million_rows/)
for over 24 hours with interesting discussions from implementation details to
practical use cases for QuestDB.

We're continuing our focus on updates with our latest release **version 6.0.3**
which is focused on stability of **out-of-order** data ingestion. We’ve also
added to/from timezone functions, improvements to bind variables and UI
improvements. We've added a settings panel to the web console where users may
specify how long notifications should remain visible for, or they can be
disabled completely. For the full list of changes, please see the release notes.

## Community

We have an uptick in new members joining our community and we want to welcome
all of you. We're happy to see our Slack workspace growing and more users
engaging with the project through GitHub issues and all other forms of feedback!

- We reached **3.4k GitHub stars** !
- Our contributors opened in the last month for feature requests and bug reports
  and we have had many more feature requests via Slack and Stack Overflow
- We're about to reach
  [600 developers on our community Slack]({@slackUrl@})
- Increased activity on our community Slack with a total of **5330 messages**
  last month and an average of **40 daily active users**
- We hosted a
  [Roadmap Planning webinar](https://www.youtube.com/watch?v=6luK1wzN-pQ) with
  our members to get feedback on the most important functionality we should
  prioritize

We have a new [Community page](/community/) which offers QuestDB swag as a way
of saying thanks to our stellar contributors. It's easy to reach out to us to
get a hold of swag, so check out the community page, get in touch, and we'll
ship out some gifts as a token of our appreciation. As a bonus, here's
[Michael Friedrich](https://twitter.com/dnsmichi/status/1331940833621372929)
from GitLab showing love for his swag in this amazing selfie:

![Screenshot of a tweet from @dnsmichi](/img/blog/2021-06-03/tweet.png)

## QuestDB on the web

Here's the latest editorials where we're happy to be featured:

- The June 2021
  [db-engines ranking](https://db-engines.com/en/ranking/time+series+dbms)
  showed QuestDB gaining its highest monthly increase in popularity to date
- The recording of the 2021 Postgres Conference is
  [now available to watch](https://postgresconf.org/conferences/2021_Postgres_Conference_Webinars/program/proposals/sql-for-time-series-using-questdb)
- Nic spoke about the future of QuestDB at
  [The Craft of Open Source](https://flagsmith.com/podcast/) podcast
- Console.dev featured us [in their newsletter](https://console.dev/) and Vlad
  is invited for [an upcoming interview](https://console.dev/interviews/)
- We were featured in
  [issue 54 of Programmer Weekly](https://twitter.com/ProgrammerWkly/status/1393023348293226500)
- [Tracking multiple crypto exchanges using a TSDB](https://levelup.gitconnected.com/tracking-multiple-cryptocurrency-exchanges-using-a-timeseries-database-6b13cc7e8490)
  by Yitaek Hwang

## Hiring

We're on the lookout for new members to join QuestDB. The roles we're hiring for
at the moment include:

- Front-end Engineer
- Developer Relations Engineer
- Back-end Engineer

For more details, the openings we have are
[listed on our careers page](/careers/).

## Up next!

The next major functionality we're resuming is the initiative to enable
replication on QuestDB which has been a highly-requested feature. We are also
exploring the possibility to enable ML and data science applications close to
the database layer and approaches for adding support for other dimensions such
as geospatial data. Following our TSBS benchmark results, we are running
performance tests for high-cardinality data sets which is often a cause of
issues in time series data ingestion.

We're glad to see our community growing and giving us valuable feedback on the
features and functionality we can focus on. If you’ve any questions about this
update, reach out to us and say hi on [Slack]({@slackUrl@}).
