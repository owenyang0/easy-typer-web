---
title: Newsletter Mar 2021 - Out-of-order Inserts
author: QuestDB
author_url: https://github.com/questdb
author_image_url: https://avatars.githubusercontent.com/u/52297642?s=200&v=4
description:
  We're happy to share the latest updates about QuestDB on the web while we work
  on bringing version 6.0.0 to fruition, and we hope you enjoy the latest
  content from recent weeks.
tags: [newsletter]
image: /img/blog/newsletter-preview.png
slug: newsletter-release-out-of-order-ingestion-capacity-planning
---

import Screenshot from "@theme/Screenshot"

![QuestDB newsletter banner](/img/blog/newsletter.png)

We're happy to share the latest updates about QuestDB on the web while we work
on bringing version 6.0.0 to fruition, and we hope you enjoy the latest content
from recent weeks.

<!--truncate-->

## Version 6.0.0 incoming

Over the last few weeks, we've been working hard to bring **QuestDB version
6.0.0** to our users, including massive performance improvements on ingestion
and long-awaited feature requests.

One highly-anticipated addition coming in 6.0.0 is of **out-of-order inserts** ,
meaning timestamped data does not have to arrive in chronological order at
QuestDB. This functionality will allow us to re-order data on-the-fly while
keeping time-based arrays as our storage model.

Stay tuned for our official announcement of version 6.0.0 and an upcoming
webinar that we will host, which will detail the release highlights and describe
the performance enhancements it contains.

## Release: 5.0.6.1

Our latest minor release with incremental improvements required by some of our
production users. Along with new additions, fixes landed relating to table
metadata, vector frame calculations, and
[Piotr Rżysko](https://github.com/piotrrzysko) submitted changes which allows
enhanced support for operators comparing and matching timestamps. Thanks Piotr
for your additions!

## QuestDB on the web

We have the following editorials to share where we're happy to be featured:

- [Tech Republic](https://www.techrepublic.com/article/questdb-has-built-a-lightning-fast-time-series-database-can-it-build-a-business-to-match/)
  published a feature piece by AWS Principal Matt Asay which outlines QuestDB's
  OSS model and business strategy
- [Konstantin Vinogradov](https://medium.com/runacapital/open-source-analysis-and-os-databases-1eb1fe840719)
  wrote a piece about open source databases featuring QuestDB and the importance
  of community contributions
- [Frontline](https://medium.com/at-the-front-line/developers-d%C3%A9veloppeurs-desarrolladors-35c2839df960)
  featured QuestDB in their article about trends sweeping the software world
- [The Startup](https://medium.com/swlh/realtime-crypto-tracker-with-kafka-and-questdb-b33b19048fc2)
  featured our tutorial on a realtime crypto tracker with Kafka and QuestDB
- [Kovid Rathee](https://towardsdatascience.com/the-case-for-using-timeseries-databases-c060a8afe727)
  wrote a great article about the right scenario to use a time series database

## Early adopters

We've been making strides in recent months in the DB-Engines ranking, which is
often an early indicator of databases' adoption by organizations and users. We
have jumped [to position 16](https://db-engines.com/en/ranking/time+series+dbms)
this month in the popularity index of time series databases. This puts us
directly behind Alibaba Cloud TSDB and Amazon Timestream:

<Screenshot
  alt="A screenshot of QuestDB ranking on db-engines"
  src="/img/blog/2021-03-02/db-engines-ranking.png"
  title={
    <a
      href="https://db-engines.com/en/ranking/time+series+dbms"
      target="_blank"
      rel="noopener noreferrer"
    >
      DB-Engines Ranking of Time Series DBMS
    </a>
  }
  width={620}
  height={228}
/>

## Community

For a quick summary of what the last month looked like, here's a small overview
of **February in numbers**:

- **250+** new stargazers on the QuestDB repository on GitHub
- **70+** new developers joined our community on Slack with;
- **3,000+** messages in our Slack workspace

We had great discussions with the community on our
[public slack channel](https://questdb.slack.com) about migrating to QuestDB,
what projects are currently being worked on by our users, and technical details
on how math operations are implemented in QuestDB.

We've had users such as [Tamás Demeter-Haludka](https://github.com/tamasd) raise
issues about the supported libraries to use for Postgres wire protocol in Go,
and we had two first-time contributors
[Siddhesh Laktar](https://github.com/siddheshlatkar) and
[Piotr Rżysko](https://github.com/piotrrzysko) submit contributions which have
been merged to QuestDB!

Big thanks to our community members for the discussions, feedback, and
additions!

## Tutorials

Our new [Tutorials](/blog/tags/tutorial/) page is growing with more fresh
community contributions that show how to use QuestDB in various exciting use
cases. Since our last email update, we have had two excellent tutorials from
Yitaek Hwang, who has built example applications that simplify complex stacks
with docker compose to accompany the step-by-step guides.

The latest additions from Yitaek are:

- [Building a realtime crypto tracker with Kafka and QuestDB](/blog/2021/02/18/realtime-crypto-tracker-with-kafka-and-questdb/)
- [Stream heart rate data into QuestDB via Google IoT Core](/blog/2021/02/05/streaming-heart-rate-data-with-iot-core-and-questdb/)

[All QuestDB Tutorials](/blog/tags/tutorial/)

## How-to

**Capacity planning** is considered part of deployment requirements to forecast
CPU, memory, and network capacity depending on your environment's expected
demands. The
[capacity planning documentation](/docs/operations/capacity-planning/) describes
how to configure these system resources with example scenarios for edge cases
and standard configuration to ensure a QuestDB deployment is robust and
efficient.

## QuestDB gains another member

We're happy to introduce Francesco Menzani as a new QuestDB member who joins us
from March 1st as a full-time engineer. Hiring Francesco at QuestDB came about
due to his outstanding contributions to the project, and we're happy to have him
on board. Welcome to the team, Francesco!

We're excited to see our team, the users, and our community grow, and we want to
say thanks for being a part of the journey! If you’ve any questions about this
update, reach out to us and say hi on [Slack]({@slackUrl@}).
