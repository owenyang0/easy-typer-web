---
title: Newsletter Dec 2020 - Kafka JDBC Connector
author: QuestDB
author_url: https://github.com/questdb
author_image_url: https://avatars.githubusercontent.com/u/52297642?s=200&v=4
description:
  We've been working hard making QuestDB more reliable and extending the
  functionality in response to what our community expects from a
  high-performance time series database.
tags: [newsletter]
image: /img/blog/newsletter-preview.png
slug: newsletter-kafka-jdbc-connector
---

![QuestDB newsletter banner](/img/blog/newsletter.png)

2020 is quickly drawing to an end and we'd like to wrap up the month on a high
note with you. We've been working hard making QuestDB more reliable and
extending the functionality in response to what our community expects from a
high-performance time series database.

We have more exciting features, functionality, and content in recent weeks and
we hope you enjoy reading about it.

<!--truncate-->

## Release: 5.0.5

Software release version 5.0.5 contains highlights such as support for the Kafka
JDBC connector, JDBC metadata queries, and SquirrelSQL support.

QuestDB now embeds a `min` HTTP server specifically for monitoring the server's
health. Multiple additions extend SQL functionality, such as concatenation
operators, dropping partitions based on boolean expressions, and support for
`record` column types. The Cairo engine has also been enhanced with improvements
to the block writer implementation and handling table metadata.

Fixes have landed relating to HTTP response codes and request queueing, logging
and testing using Influx Line Protocol, and multiple SQL fixes.

As we've skimmed over some of the details, the full list of changes and the
supplementary documentation for new features can be found in the
[5.0.5 Release Notes](https://github.com/questdb/questdb/releases/tag/5.0.5)
page on GitHub.

## Events

**AMA:**

We held our first webinar where we invited members of the community to join an
AMA session with Vlad. The discussion focuses on technical topics and the future
of QuestDB and can be viewed on
[YouTube](https://www.youtube.com/watch?v=RmFV3r8oNcI) . Thanks to everyone who
joined, we will definitely host another session in the new year!

**Open Core Summit:**

Our CEO Nic will be speaking later today at the
[Open Core Summit](https://hopin.com/events/ocs2020digital#schedule) about user
adoption and starting an open source business with the help of the YC community.

**Scaleway Podcast:**

Nic spoke with Pascal Condamine at Scaleway in their podcast called Startup
Stories about time series data and use cases with QuestDB. Listen to the podcast
on Spotify via the
[Scaleway Blog](https://blog.scaleway.com/startup-stories-17-questdb).

**Wayra Open World** :

Nic took part in the Wayra Open World conference on how some of Europe’s leading
investors think about & evaluate OSS startups. Details of watching this back
will be shared in our next newsletter.

## Blog: “Non-blocking IO without garbage collection”

We recently published a writeup on our blog that describes the internals of our
new network stack and why we built it. For those who are interested in how we
avoided garbage collection, we went into the details of developing an IO
notification system for delegating tasks to worker threads and queueing events
and socket connections.

[Read the article](/blog/2020/12/10/garbage-free-stack-for-kafka-streams)

## Feature: Replication

A well-anticipated feature that’s been on our backlog this year is replication
support and development to facilitate this is progressing well. This is top of
our list at the moment in terms of extending the functionality of QuestDB and
we’re working super hard to get it shipped!

## Deployments

Adoption of QuestDB in production instances is increasing steadily with listed
companies who operate in domains such as IoT, financial trading, industrial
monitoring and machine learning.

One case study that we are [proud to highlight](/case-study/toggle/) is the
experience from **Toggle** who massively cut costs of training machine learning
models and benefited from performance improvements after their migration from
InfluxDB. You can read about some of the new additions on our customer spotlight
page linked below.

[Read what our users say](/customers)

## Tutorials

We’re working with several people in the community to bring interesting new
content that describes how to use QuestDB features and how to get the most from
integrations with other platforms and tools. Our latest tutorial has been
written by Kovid Rathee and describes
[how to ingest schemaless data with Python using Influx line protocol](https://towardsdatascience.com/schemaless-ingestion-in-questdb-using-influxdb-line-protocol-18850e69b453)
.

## Welcome to new members

Lastly, welcome all new members who joined our Slack and contributed on GitHub
recently. We appreciate continuing the discussion over technical topics, opening
GitHub issues and pull requests and helping to improve our implementations with
the features you expect.

## The QuestDB Team Grows

Another great outcome of community contributions is that we have the opportunity
to hire great talent when the chance arises. Specifically, we'd like to
introduce [**Alex Pelagenko**](https://github.com/ideoma) as one of our new
QuestDB members who will be joining us in January 2021. Hiring Alex as a
full-time engineer at QuestDB came about as a result of his great contributions
to the project which he has also
[written about on our blog](/blog/2020/11/16/http-server-contribution)

Welcome to the team, Alex!

We're excited to see the community expanding, and we want to say thanks for
being a part of it! If you’ve any questions about this update, feel free to
reach out to us in our [Slack Community]({@slackUrl@}).
