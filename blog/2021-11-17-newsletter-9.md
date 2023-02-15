---
title: Newsletter Nov 2021 - Yahoo case study and Series A
author: QuestDB
author_url: https://github.com/questdb
author_image_url: https://avatars.githubusercontent.com/u/52297642?s=200&v=4
description:
  Here's QuestDB's latest updates including release 6.1.1, our Series A, a Yahoo
  case study, and new milestones achieved with our community
tags: [newsletter]
image: /img/blog/newsletter-preview.png
slug: newsletter-yahoo-case-study-series-a
---

![QuestDB newsletter banner](/img/blog/newsletter.png)

We're happy to bring you our roundup of updates from QuestDB HQ, including the
latest releases with new SQL features, our community meetup with guest speakers
from Yahoo and BIBA, our Series A announcement, and recent milestones such as
hitting 7,000+ stargazers on Github. Let's take a look at our highlights!

## 6.1.1 Release

We shipped software version **6.1.1** this month, and it focuses on stability
and bug fixes through further testing and error prevention. All known stability
issues relating to the ILP ingestion protocol are resolved, with several new SQL
functions to improve usability:

- `left()` and `right()` SQL string functions
- `ceil()` and `floor()` functions
- `strpos()` function
- constant expression support in `SAMPLE BY` periods

[Release notes](/blog/2021/09/13/release-6-0-5-geospatial-data/)

## Yahoo case study

Together with Jon Bratseth, VP Architect at Yahoo, we published a
[case study](/case-study/yahoo/) that describes how QuestDB is used for
real-time recommendation and personalization engines that serve close to a
billion users at a rate of 500k queries per second.

Alongside the case study, we were pleased to have Jon present at our community
meetup as a guest speaker, where he talked us through the architecture and
deployments of this system. For those who missed it, a
[recording is available on YouTube](https://youtu.be/QL9Z2CeEk1k) to watch back
on-demand.

## Series A

We're thrilled to announce that QuestDB has successfully raised a \$12M Series
A from leaders and executives in the open-source space! This will enable us to
continue powering high-performance applications and grow the team in the coming
months. Our funding round was covered by multiple outlets which reported on this
story, including
[TechCrunch](https://techcrunch.com/2020/07/02/questdb-nabs-2-3m-seed-to-build-open-source-time-series-database/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAJVYxxAKPpEE8U0PewQhHGFIM1F3zxRttKy66-uNoakV50FCP9yZ73es_CZrieO4OJyruJMUWx1JTHNbRaoZZ9ABfzuSzurF4mu84WUqA1zeFyyeuS5ey58n1KbCsd7LWUoLIOz0iz3yyH5a2xq5BDfaYrNHWqkdCKqQq5b0_1MT),
[Venture Beat](https://venturebeat.com/2021/11/03/questdb-launches-database-as-a-service-with-12m-investment/),
[Business Insider](https://www.businessinsider.com/quest-db-y-combinator-startup-series-a-pitch-deck-2021-11),
[SiliconANGLE](https://siliconangle.com/2021/11/03/questdb-gets-12m-series-funding-amid-growing-interest-time-series-databases/),
[TechTarget](https://searchdatamanagement.techtarget.com/news/252508994/QuestDB-grows-time-series-database-with-12M-fund-raise),
and
[Yahoo! Finance](https://finance.yahoo.com/news/questdb-raises-12m-series-adoption-131000873.html).

![Picture of QuestDB team](/img/pages/about-us/team.jpg)

We'd like to extend a huge **thank you** to our fantastic users, our community,
and our teammates whose support has delivered us this far!

## Community

We want to give a warm welcome to new members, we're happy to see you all in
Slack and have you share your ideas, feedback, and activity on GitHub! Here are
our community highlights from recent weeks:

- We reached **7,000+ GitHub stars** !
- QuestDB held the #2 spot in daily, weekly, and monthly **GitHub trending**
  lists
- We're at **#13** on the
  [DB-Engines ranking](https://db-engines.com/en/ranking/time+series+dbms) after
  our largest ever monthly growth
- We now have over **950 developers** in
  [our Slack community]({@slackUrl@})
- Gábor wrote a tutorial for
  [real-time stock dashboards with Python and Plotly](/blog/2021/11/01/plotly-finnhub-realtime-dashboard/)
- GitHub Director of Dev Advocacy **@bdougie** highlighted
  [QuestDB on Youtube](https://www.youtube.com/watch?v=MSdOMws8Ehg)

As usual, we also want have a shout-out to our community members who have
supported us. Thank you
[@Shudh](https://twitter.com/Shudh/status/1452527662354763779) for showing your
love!

## QuestDB Team

This month, we're excited to welcome Andrey to our team as Core Database
Engineer. QuestDB is growing rapidly and we're seeking talented individuals as
we grow.

Our team member Miguel published a
[blog post sharing why he joined QuestDB](/blog/2021/11/09/miguel-arregui-working-at-questdb).
If you feel inspired reading this post, be sure to check out our careers page
below.

[Careers at QuestDB](/careers/)

## Upcoming

Our engineering team is now adding `UPDATE` and `DELETE` support to QuestDB,
which will unlock multiple use cases across various domains.

We are also staying informed on what our users need by gathering feedback to
help us prioritize the product roadmap. If you'd like to provide your input,
please add your thoughts on or reach out to our team in **#users-public** in our
[Slack]({@slackUrl@}).
