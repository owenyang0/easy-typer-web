---
title: Newsletter No. 2 - SQL CREATE TABLE IF NOT EXIST
author: QuestDB
author_url: https://github.com/questdb
author_image_url: https://avatars.githubusercontent.com/u/52297642?s=200&v=4
description:
  2021 has been a great start for us at QuestDB, and we'd like to share our
  highlights so far.
tags: [newsletter]
image: /img/blog/newsletter-preview.png
slug: newsletter-sql-create-table-if-not-exist
---

![QuestDB newsletter banner](/img/blog/newsletter.png)

## January Update

2021 has been a great start for us at QuestDB, and we'd like to share our
highlights so far. We've had some exciting additional functionality added based
on community feedback, and there are quite a few fixes that enhance the
stability of the system.

We hope you enjoy reading about these features and catching up on the latest
content from recent weeks to get the most out of QuestDB.

## Release: 5.0.6

Software
[release version 5.0.6](https://twitter.com/QuestDb/status/1356932224659173380)
contains highlights such as a complete refactoring of PostgreSQL wire support,
including binary support. RFC339Nano timestamp support enables alerting via
Grafana, a new `build()` function which provides version number and commit hash
for troubleshooting, and `CREATE TABLE IF NOT EXISTS` SQL support.

Fixes have landed on PostgreSQL wire using popular Rust, Python, Go libraries,
concurrent CSV imports, preventing data corruption when disk space is full, and
multiple SQL fixes.

This is a brief summary of our highlights, so the full list of changes and the
supplementary documentation for new features can be found in the
[5.0.6 Release Notes page](https://github.com/questdb/questdb/releases/tag/5.0.6)
on GitHub.

## Events

**Webinar:**

We hosted a webinar on Thursday 21st January, with presentations from Toggle,
DATRON, Ably, FORRS, and Chainslayer. They share feedback about their experience
with QuestDB to solve problems in various domains and how it compares to
InfluxDB, and we had a broader discussion about what's on the roadmap for
QuestDB. The webinar is available to
[watch back on YouTube](https://www.youtube.com/watch?v=K4J__f1SGOc&t=75s).

**Jupyter notebook:**

As a bonus from this event, Marc Recht from FORRS shared his Jupyter notebook,
which contains interactive queries and plots based on financial data stored
QuestDB using Python. Marc's notebook is available to
[view on GitHub](https://github.com/mrecht/qdb-talk-20210121) .

## QuestDB on the web

We have the following editorials to share where we're happy to be featured in
the following outlets:

- **Python weekly** featured our
  [application monitoring tutorial](https://twitter.com/PythonWeekly/status/1354081737052192768)
- **VentureBeat** featured QuestDB on
  [the rise of time-series databases](https://venturebeat.com/2021/01/15/database-trends-the-rise-of-the-time-series-database/)
- **StackShare** listed QuestDB in the
  [top 50 new developer tools of 2020](https://stackshare.io/posts/top-developer-tools-2020)
- **Analytics India** adds us to the
  [most prominent time-series databases](https://analyticsindiamag.com/most-prominent-time-series-databases-for-data-scientists/)
- **OSChina** featured QuestDB following
  [the Best Open Source Software 2020](https://www.oschina.net/news/125859/2020-infoworld-bossie-awards)
  award by Infoworld

## Community

We’re building a new Community page on questdb.io, which helps contributors with
suggestions for getting involved and offers some must-have swag for the
fantastic interaction as a way for us to give back. For a quick summary of what
the last month looked like, here's a small overview of **January in numbers** :

- **200+** new stargazers on the QuestDB repository on GitHub
- **80+** new developers joined our community on Slack with;
- **3,700+** messages in our Slack workspace

We had great discussions with the community on the benefits of adding Kafka to
software stacks in front of QuestDB, how to get Postgres wire running using
different languages, and plenty of talk on the latest changes landing on
QuestDB.

## Enterprise

There is a new [enterprise page](https://questdb.io/enterprise) for users ready
to take their production deployments to the next level. If product training,
support, deployment management, authentication, and access control is a must,
we're ready to assist in making sure critical systems stay running.

## Tutorials

Our new Tutorials page contains outstanding community contributions using
several technologies, languages, and software stacks that use QuestDB in various
applications. One of the highlights is our partnership with OSS project
[n8n.io](https://n8n.io/) who provides a low-code workflow automation platform.
We published a tutorial for this integration that demonstrates how to build a
[low-code bitcoin ticker with QuestDB](/blog/2021/01/18/low-code-bitcoin-ticker-workflow-with-time-series-database/).

Some of our top picks and featured tutorials are:

- [Monitoring the uptime of an application using Python, Nuxt.js](/blog/2021/01/13/application-uptime-monitoring-with-python-nuxtjs-questdb/)
- [SQL extensions for time series in QuestDB](https://towardsdatascience.com/sql-extensions-for-time-series-data-in-questdb-f6b53acf3213)
- [Building a monitoring dashboard with Grafana](https://dzone.com/articles/build-a-monitoring-dashboard-with-questdb-and-graf)

[All QuestDB Tutorials](/blog/tags/tutorial)

## How-to

**Data Retention**:

We've added documentation about strategies for data retention using QuestDB.
Tables can be partitioned by date, and stale partitions can be dropped when the
data is no longer needed or to adhere to data retention policies. Details on how
to partition data in this way and drop stale partitions can be found
[on our Data Retention page](/docs/operations/data-retention/).

**Telegraf**:

[Telegraf](https://docs.influxdata.com/telegraf/v1.17/) is a client for
collecting metrics from many inputs and supports sending these metrics to
various outputs. QuestDB's support for ingesting influx line protocol messages
means it's simple to directly receive metrics from many sources to a QuestDB
instance using this agent. Details of sending metrics from Telegraf to QuestDB
over TCP and UDP can be found on the
[Telegraf client](/docs/third-party-tools/telegraf) page.

## Thanks from QuestDB

We're excited to see our users and the community grow, and we want to say thanks
for being a part of the journey! If you’ve any questions about this update,
reach out to us and say hi on [Slack](https://slack.questdb.io) or
[Stack Overflow](https://stackoverflow.com/questions/tagged/questdb).
