---
title: Our two-year journey to raise $15m in venture capital
author: Nicolas Hourcard
author_title: Co-founder & CEO, QuestDB
author_url: https://github.com/tris0laris
author_image_url: https://avatars.githubusercontent.com/tris0laris
description:
  We've raised over $15 million in venture capital to fund development of the
  fastest open source time series database. This post describes our two-year
  journey to raising our $12.5m Series A, what we learned along the way, and the
  pitch deck we used.
keywords:
  - timeseries
  - database
  - funding
  - venture capital
  - startup
  - team
image: /img/blog/2022-01-03/banner.jpg
tags: [company, entrepreneurship, funding, story]
---

import Banner from "@theme/Banner"

<Banner
  alt="A graphic announcing twelve million dollars in Series A funding raised by QuestDB"
  height={360}
  src="/img/blog/2022-01-03/banner.jpg"
  width={650}
/>

Since founding QuestDB, we've raised over \$15 million in venture capital to
fund the development of the fastest open source time series database. This blog
post describes the two-year journey to raise our Series A, what we learned along
the way and the pitch deck we used for the raise.

<!--truncate-->

## Founding an open-source company

I met my co-founder Vlad at a fintech startup and he told me about a project of
his that was 5 years in the making. "I have built a database from scratch and I
want to make it open source to empower developers to store large amounts of data
efficiently. It's a fast database that doesn't use code dependencies and you can
access the data with SQL". We discussed the ins and outs of why people need a
system like this and I was all-in on the idea of starting a company around it.

We started our journey in London, which hadn't typically been the birthplace of
successful open source databases. Pitching a database made from scratch with an
optimized codebase in zero-GC Java/C++ to squeeze every bit of performance from
modern hardware wasn't an easy affair. Most of the venture capital funds we
initially met were struggling to understand the value proposition, especially
for an open-source product that wasn't generating revenue at the time.

## Preparing for a seed round

In the spring of 2020 we were asking for \$2m to hire a few talented engineers
and work on the product. We eventually met a few VCs who saw the potential from
a technological standpoint but wanted to see revenue even though we incorporated
the company a few weeks before. We then met a believer, Paul at the VC firm
Episode 1, who had lived in the bay area for decades. He understood the
potential of open source and community building to fuel developer adoption. We
eventually convinced several other European funds with a growing interest in
open source startups such as Seedcamp to invest as well. In March 2020, we
raised \$2m overall, which kicked things off.

We launched an open source version of QuestDB and we wanted to let developers
know about it to gather feedback. We had just implemented SIMD instructions to
run fast SQL queries and released a live demo including a dataset of 1.6 billion
rows with SQL queries that could be executed in milliseconds<sup>[1]</sup>.

## Joining Y Combinator

The reaction of developer communities such as Reddit or HackerNews were
positive<sup>[2]</sup>, which gave us confidence that we were building something
meaningful. We then applied to Y Combinator and convinced our three partners
Jared Friedman, Michael Seibel and Harj Taggar to accept us into the Summer 2020
batch, the first remote batch in YC's history.

At Y Combinator we focused on product, our community and early users. As we
launched on HackerNews<sup>[3]</sup>, our popularity on GitHub grew further and
we had more than 300 investors reaching out directly after YC Demo Day. We had
already raised our seed round before joining YC, so we decided to dismiss the
hype to avoid diluting our stake in the company further.

## Key startup advice from Y Combinator

YC urged us to find product market fit (in our case, community market fit) and
start hiring afterwards. Many companies are incentivized by venture capitalists
to deploy large amounts of capital and hire large teams before even finding
their product market fit. Hiring lots of people gives you a sense of false
security, giving the illusion that you are growing and making meaningful
progress. However, without product market fit, the company's prospects are no
better, and the higher cost base makes it all the more difficult.

We decided to build QuestDB with a handful of engineers and spoke to more than
50 early users to collect meaningful feedback and make sure we were going in the
right direction. We did our best to delight our early users, building the
product for them, and tried to be as responsive as possible in the process.

**"Do things that don't scale"** is one of the top pieces of advice from Y
Combinator. Building bespoke features for our first users was not something we
could scale over time. But it was the most important phase for us to make
progress, initially.

## Successfully raising a Series A round

Our community continued to grow and the project crossed 5k GitHub stars as we
shipped our biggest release to date<sup>[4]</sup>. We had more than 50 code
contributors on GitHub and more than 800 developers joined our Slack community,
while our unique instances deployed grew by 500% year to date.

We decided to embark on another fundraise to double down on improving the
database in Summer 2021. This would help us build a fully-hosted managed service
on the cloud, which would be our primary path to revenue that can scale over
time.

YC's advice was to speak to founders who had built open source enterprise
companies before and try to get them on board to benefit from their experience
and hindsight. Venture Capital funds can be helpful beyond money, but we found
that angels can truly be transformative because they have been through a similar
journey.

We followed this advice and brought 15 open source founders and executives from
GitHub, Docker, Reddit, NGINX, Instana, D2iQ, Coinbase, Cisco, Microsoft,
Airbnb, PostHog, Supabase, and FingerprintJS. The same applies to the lead
investor as our board member Florian Leibert is the co-founder of Mesosphere
which is built around the open source project Mesos. We also welcomed Salil
Deshpande at Uncorrelated Ventures who has a track record in open source
companies investments such as Redis, Datastax, Netdata, Hazelcast, Armory, dYdX,
SpringSource, Gradle etc.

Another piece of advice was to be thoughtful about the amount raised and overall
round dilution; hence we decided to raise \$12.5m at a valuation which grew by
10x versus the seed round a year prior to that.

## Our pitch deck for Series A

We spoke to a lot of investors around the world and this is the deck that we
used. The slides tell a story and cover important facets of our business: our
team, product, market, traction, customers, competitors, and product roadmap.
Perhaps unlike most closed-source companies at this stage, the emphasis was less
on revenue growth but more on open source traction, developer adoption and
customer love. The open source aspect of QuestDB allowed us to hone in longer on
the product while delaying the focus on sales; this is why the choice of
investors aligned with our bottom-up, developer-first go-to-market was so
crucial for us.

This new injection of capital allows us to hire the best talent worldwide and
continue our journey as a true remote-first company, with our employees working
from more than 15 different locations spanning North America, Europe and Asia.
Find more about us<sup>[5]</sup> and our open roles<sup>[6]</sup>.

<iframe
  src="https://www.slideshare.net/slideshow/embed_code/key/9f7UUWoVD7xiva"
  width="100%"
  height="475"
  frameBorder="0"
  marginWidth="0"
  marginHeight="0"
  scrolling="no"
  allowFullScreen
>
  {" "}
</iframe>

[1]: https://demo.questdb.io/
[2]: https://news.ycombinator.com/item?id=23616878
[3]: https://news.ycombinator.com/item?id=23975807
[4]:
  https://www.reddit.com/r/programming/comments/nao3ts/how_we_achieved_write_speeds_of_14_million_rows/
[5]: https://questdb.io/about-us/
[6]: https://questdb.io/careers/
