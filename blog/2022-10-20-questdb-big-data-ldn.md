---
title: "QuestDB at Big Data LDN 2022"
author: Javier Ramirez
author_title: QuestDB Team
author_url: https://github.com/javier
author_image_url: https://avatars.githubusercontent.com/u/3839?v=4
description:
  Big Data LDN (London) is the UK’s leading free to attend data & analytics
  conference and exhibition. This year, Javier Ramirez, Developer Advocate at
  QuestDB, delivered a talk on "Ingesting A Million Time Series Per Second On A
  Single Instance".
keywords: [bigdata, questdb, timeseries, event]
tags: [community, bigdata, questdb, timeseries, event]
image: /img/blog/2022-10-20/big_data.png
---

import Screenshot from "@theme/Screenshot"

Big Data LDN (London) is UK’s leading data and analytics conference and
exhibition. This year, [Javier Ramirez](https://github.com/javier), Developer
Advocate at QuestDB, delivered a talk on "Ingesting A Million Time Series Per
Second On A Single Instance".

<!--truncate-->

Big Data LDN is the largest event focusing on data in the UK, with two days of
talks in parallel tracks, plus dozens of vendors. This was a great opportunity
to learn about the latest trends and engage with data-minded folks. We asked
Javier to tell us more about the experience.

<Screenshot
  alt="Big Data London took place on 21 and 22 September 2022 this year"
  title="Big Data London took place on 21 and 22 September 2022 this year."
  height={360}
  src="/img/blog/2022-10-20/big_data.png"
  width={650}
/>

### What was the crowd like?

A good mix of data engineers, data analysts, decision makers, data vendors, and
some students. There were some well-known developer tools and databases, such
as Confluent (Kafka), OLAP database ClickHouse, InfluxData (the parent company of InfluxDB),
MongoDB, and Fivetran, to name a few.

### Who did you meet?

We actually met a few QuestDB users, which was an absolute pleasure. We also met
a lot of companies with interesting near real time challenges looking for
solutions, and we found some time to talk to other vendors, explore
collaborations, or simply have a friendly talk about QuestDB's data analytics
capacities. Users were from many different backgrounds: companies managing
wireless networks producing thousands of events per millisecond, hedge funds
overseeing a wide variety of assets, and cryptocurrency exchanges. We even
had a great time speaking with a F1 team looking for a time series database. We
hope to see them all soon in our community slack channel!

### What did you talk about?

Mostly about fast and big data, but also quite a bit about the internals of
QuestDB and what makes us stand out from the rest. In particular, our latest
developments on optimizing imports using `io_uring`, or the fact that we use
JAVA with near zero Garbage Collection were popular topics. But we mostly talked
about real use cases and constraints, and how QuestDB could help.

### What are some memorable questions people asked you?

- Is QuestDB built from scratch or on top of some other engine?
- How are you going to monetize an open source database?
- Are you really a team with less than 30 people?

### What about your presentation? Tell us more about it.

The title of my presentation was "Ingesting A Million Time Series Per Second On
A Single Instance". The title was really a click-bait, as the interesting part
was not that we could ingest over a million events per second, but that we could
actually run fast queries while sustaining heavy writes. The talk was first
about how to identify if there was a time series problem, followed by why and
how we built QuestDB to make it the fastest open source time series database out
there.

### Did you receive any interesting questions about your presentation?

We received some questions about horizontal scalability (coming soon), and about
how much work it was to move from thinking in a relational database model to a
time series one, which in QuestDB's case should be an easy switch thanks to our
SQL layer.

### Were you nervous?

Not really. The cool thing when you were presenting about open source, was that
you were not perceived as much as someone trying to sell, but rather as someone
trying to help. We had a live demo, and we were very confident it wouldn't break
as it was basically running some queries using our
[demo site](https://demo.questdb.io).

### If you missed the event, here is a link to catch up!

<iframe
  width="569"
  height="392"
  src="https://www.youtube.com/embed/9feAW2tNNYA"
  title="QuestDB: Ingesting A Million Time Series Per Second On A Single Instance"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
