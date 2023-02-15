---
title: Newsletter Sep 2021 - Geohashes and Airbus Partnership
author: QuestDB
author_url: https://github.com/questdb
author_image_url: https://avatars.githubusercontent.com/u/52297642?s=200&v=4
description:
  Here's QuestDB's September news including release 6.0.5, Geospatial support,
  performance improvements, and the latest resources and tutorials
tags: [newsletter]
image: /img/blog/newsletter-preview.png
slug: newsletter-geospatial-data-and-airbus-partnership
---

![QuestDB newsletter banner](/img/blog/newsletter.png)

Here's the latest roundup from QuestDB HQ with our most recent updates; we have
exciting new releases, including support for geospatial data, an official
listing on the AWS marketplace, and our community growth shows more code
contributions and participation on [Slack]({@slackUrl@}) and
[GitHub](https://github.com/questdb)!

Let's take a look at these highlights and the rest of our monthly news!

## 6.0.7.1 Release

**Release 6.0.5** introduced `floor` and `ceil` timestamp functions,
out-of-order parameter support via REST API, and support for geospatial data.
Since then, we have made multiple minor stability and bug fix releases and the
latest version to download is.

Supporting geodata is achieved by the addition of a new geohash type which
represents grid areas as a base32 alphanumeric string:

[![Geohash examples with increasing precision](/img/blog/2021-09-29/geohashes.png)](/docs/concept/geohashes/)

[Release announcement](/blog/2021/09/13/release-6-0-5-geospatial-data/)

## Airbus partnership

We're excited to announce that Airbus is using QuestDB to power real-time asset
tracking applications used in aerospace and nautical scenarios.

![Quote of Oliver Pfeiffer](/img/blog/2021-09-29/airbus-partnership.png)

Airbus is already making heavy use of geohash types, which power real-time
dashboards for views involving hundreds of millions of data points per day.
We're thrilled to be partnering with a pioneer in aerospace and looking forward
to the journey ahead.

## AWS marketplace listing

We're excited to announce that QuestDB is now available on the AWS marketplace
which is a catalog with software listings from independent vendors. It's now
possible to launch QuestDB on the AWS Marketplace with an official listing
supported by the QuestDB team.

[![QuestDB in AWS marketplace](/img/blog/2021-09-29/aws-marketplace.png)](https://aws.amazon.com/marketplace/pp/prodview-cddeafdirexw6)

To help with getting started using the AMI,
[we published a user guide](/docs/deployment/aws-official-ami/) which shows how
to launch an instance and set up basics such as authentication, securing
interfaces, and tips for accessing the REST API and web console.

[AWS marketplace guide](/blog/2021/09/13/release-6-0-5-geospatial-data/)

## Community

We want to give a warm welcome to new members, we're happy to see you all in
Slack and have you share your ideas, feedback, and activity on GitHub! Here's
our community highlights in recent weeks:

- We reached **4.7k GitHub stars** !
- Our contributors opened since our last update
- We now have
  [over 760 developers in our Slack community]({@slackUrl@})
- Our community was asked to participate in research about
  [security and privacy in OSS](https://research.teamusec.de/2021-interviews-oss/)
- Tech Ninja wrote about QuestDB in their
  [Data and Intelligence Digest](https://medium.com/technexthere/data-and-intelligence-digest-7th-sept-2021-702dbf4c3b4c)
- We published a guest post by Dean Markwick about
  [high-frequency finance using Julia](/blog/2021/09/17/high-frequency-finance-julia-lang/)
- Code with MD published a
  [YouTube tutorial on crypto data using QuestDB](https://www.youtube.com/watch?v=JLHxT8I4Thw)
- Kovid Rathee mentions QuestDB as a
  [disruptor in the database category on AWS](https://aws.plainenglish.io/specialty-databases-in-aws-qldb-timestream-neptune-and-keyspaces-757ef79e0966)

As always, we want to show some appreciation for our community, and this means
showing the love with some QuestDB swag whenever we can. We're happy to have
members like Gábor be a part of the QuestDB journey and celebrate what we're
building together:

![Gábor with his QuestDB swag](/img/blog/2021-09-29/gabor-swag.png)

## Welcome onboard

We're excited to announce that we have two new members joining QuestDB this
month and we'd like to extend a warm welcome to Pei-Shan and Maciej who have
started this week. We will be further growing the team in the near future, and
the QuestDB [careers page](/careers/) has details on all of our current
openings.

## Up next!

After adding support for geospatial data, we are continuing development efforts
on **replication** which will initially use a single-leader, multiple-replica
pattern for high-availability. We are also investigating different avenues for
providing native support for **window functions** which are useful for
calculating moving averages or time-weighted averages.

We are keeping informed by what our users need by community feedback, and it's
vital for helping us prioritize the product roadmap. Aside from window
functions, a discussion that received a lot of interest on GitHub is the ability
to support **updates and deletes** for correcting or updating data in bulk. To
help us build our roadmap, join in the conversation and see what else our
community are talking about on.

If you've any questions about this update, reach out and say hi on
[Slack]({@slackUrl@}).
