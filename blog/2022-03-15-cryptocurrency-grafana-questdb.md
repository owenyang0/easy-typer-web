---
title: Visualizing cryptocurrency data with Python, Grafana and QuestDB
author: Tancrede Collard
author_title: QuestDB Team
author_url: https://github.com/TheTanc
author_image_url: https://avatars.githubusercontent.com/TheTanc
description:
  Learn how to using Python to fetch cryptocurrency data from Coinbase, store it
  in QuestDB, and visualize the data using Grafana.
keywords:
  - questdb
  - python
  - grafana
  - crypto
  - database
tags: [tutorial, crypto, trading, python, grafana]
image: /img/blog/shared/og-bitcoin-grafana.png
---

import Banner from "@theme/Banner"

<Banner
  alt="Grafana logo, QuestDB logo, Bitcoin logo"
  height={467}
  src="/img/blog/2022-03-15/banner.png"
  width={650}
></Banner>

This post comes from Tancrede Collard, who has written an excellent tutorial
that shows how to use Python to fetch cryptocurrency data from Coinbase, store
it in QuestDB, and visualize the data using Grafana. Thanks for the submission,
Tancrede!

## Visualizing time series data

When analyzing streaming data such as cryptocurrency or market metrics, the
foundation of the data processing pipeline is efficient storage and queries. To
use this data for insights and analytics, data visualization is a convenient way
to plot and convey trends, create actionable reports, or even set up alerting.

Most cryptocurrency trading projects will focus on price charts and standard
indicators like [RSI](https://www.investopedia.com/terms/r/rsi.asp) or moving
averages. Derivatives are often overlooked in many cryptocurrency analytics and
visualization projects, and there's plenty to explore, such as the underlying
pricing metrics such as volatility and funding rates.

A lot of common off-the-shelf tools can plot prices over time, but few are
available for derivative features. Having control of the underlying database,
creating custom metrics, and building dashboards based on these metrics allows
us to build our own solutions with custom pricing inputs and models for
derivatives.

In this tutorial, you'll learn how to fetch data from the Coinbase API using a
Python script, load the data into QuestDB and run SQL queries via QuestDB for
derivatives insights. We'll be visualizing data using Grafana so that we can
build dashboards for reporting or alerts based on metrics you care about.

## Prerequisites

To follow with this tutorial, you'll need the following:

- [Coinbase](https://www.coinbase.com/signup) account with an
  [API key](https://developers.coinbase.com/api/v2)
- [Homebrew](https://brew.sh/) for macOS users

## Installing QuestDB using homebrew

Before we can start storing data, we'll need to get QuestDB up and running.
Aside from running QuestDB from
[binaries and via Docker](https://questdb.io/get-questdb/), macOS users can get
started using homebrew:

```bash
brew install questdb
```

Additional settings can be changes in the
[server configuration](https://questdb.io/docs/reference/configuration/) file
located at `/opt/homebrew/var/questdb/conf/server.conf` for the homebrew install.
The interface we'll be using for inserting data is ILP
([InfluxDB line protocol](https://questdb.io/docs/reference/api/ilp/overview/))
over TCP which runs on port 9009 by default. The server configuration for these
keys looks as follows:

```ini
######################### LINE TCP settings ###############################
line.tcp.enabled=true
line.tcp.net.active.connection.limit=10
line.tcp.net.bind.to=0.0.0.0:9009
```

To avoid unnecessary memory usage when using Grafana, it's recommended to
disable QuestDB's `SELECT` query cache with the following PostgreSQL property in
QuestDB's server config:

```ini
pg.select.cache.enabled=false
```

When we've set these server configuration properties, we can start up the
database service with
[QuestDB's CLI](https://questdb.io/docs/reference/command-line-options/):

```bash
questdb start
```

## Fetching data from Coinbase using Python

Cryptocurrency data is readily available from a variety of public APIs. Coinbase
offers a simple API endpoint to get an indicative bid and offer price which is
all we need for our use case.

```http
https://api.coinbase.com/v2/prices/
```

It requires an authorization token which you should obtain from your Coinbase
account. For this tutorial, we'll use a simple Python script to periodically
poll the endpoint for a given currency pair. The loop does 3 things:

1. fetch SELL (bid) and BUY (ask) prices
1. send the current bid & ask prices to QuestDB via ILP
1. sleep 2 seconds before looping to step 1

The script uses `requests` for the HTTP requests to the Coinbase API and
`socket` for the direct TCP communication to QuestDB. Replace `your_token` by
the API key from your Coinbase account:

```python
import requests
import socket
from time import sleep

# QuestDB settings
HOST = 'localhost'
PORT = 9009

# Auth
token='your_token'

# Request settings
pair='BTC-USD'
sellURL="https://api.coinbase.com/v2/prices/"+pair+"/sell"
buyURL="https://api.coinbase.com/v2/prices/"+pair+"/buy"
PARAMS={'Authorization': 'Bearer '+token}

if __name__ == '__main__':
    try:
        while 1==1:
            # Get data from the API
            sellData = requests.get(url=sellURL, params=PARAMS).json()
            buyData = requests.get(url=buyURL, params=PARAMS).json()
            sp = sellData['data']['amount']
            bp = buyData['data']['amount']

            # Send data to QuestDB
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.connect((HOST, PORT))
            sock.sendall(('crypto,fromCCY=BTC,toCCY=USD,exch=CB bid='+sp+',ask='+bp+'\n').encode())
            sleep(2)

    except Exception as e:
        print(e)
```

When you start the script, prices should appear in the web console for QuestDB.
Running `crypto` (this is shorthand for `SELECT * FROM crypto`) in the SQL
editor shows the prices flowing in QuestDB:

![QuestDB web console](/img/blog/2022-03-15/console.png)

One important thing to note is that we didn't create a table before sending
data. QuestDB automatically creates tables using the appropriate columns
detected from the message. The currency identifiers are inserted as
[symbol types](https://questdb.io/docs/concept/symbol/), and the values are
inserted as doubles. It's also noteworthy that the record timestamp is set as
the server time when the row was inserted and tables created from ILP ingestion
have a default `day` partitioning. The schema looks like this:

```text
fromCCY: symbol
toCCY:   symbol
exch:    symbol
bid:     double
ask:     double
```

## Building a Grafana dashboard

Grafana is an excellent tool for data visualization, and it comes in extremely
handy If you're doing any algorithmic trading. The variety of integrations with
other services enables you to quickly set up monitoring and alerts for
conditions like irregular prices or flow and risk limits.

This tutorial is tailored for macOS users, so we'll use Homebrew, but there are
other options covered in the
[QuestDB Grafana guide](https://questdb.io/docs/third-party-tools/grafana):

```bash
brew install grafana
brew services start grafana
```

To configure Grafana, open the UI available `http://localhost:3000` and
configure QuestDB:

- Go to the `Configuration` section and click on `Data sources`
- Click `Add data source`
- Choose the `PostgreSQL` plugin and configure it with the following settings:

```questdb-sql
host: localhost:8812
database: qdb
user: admin
password: quest
SSL mode: disable
```

## Calculating indicative bid offers

Let's craft a query in Grafana that will allow us to plot the metrics we're
interested in. Start off by creating a new dashboard and click on `new panel`.
The pencil icon allows you to provide a query to run against QuestDB for Grafana
to plot:

![The edit icon in Grafana panel](/img/blog/2022-03-15/grafana-pencil.png)

Paste the following query to create a time series of the bid-offer and mid
price:

```questdb-sql
select
  timestamp as time,
  avg(ask) as ask,
  avg(ask+bid)/2 as mid,
  avg(bid) as bid
from crypto
where $__timeFilter(timestamp)
and fromCCY='BTC' and toCCY='USD' and exch='CB'
sample by $__interval
```

To simplify queries which have dynamic elements such as date ranges, the query
contains
[global variables](https://grafana.com/docs/grafana/latest/variables/variable-types/global-variables/#global-variables).
We're using two:

- `$__timeFilter(timestamp)` - allows filtering results by sending a start-time
  and end-time to QuestDB; generates a `BETWEEN` clause.
- `$__interval` - calculates a dynamic interval based on the time range applied
  to the dashboard. By using this function, the sampling interval changes
  automatically as the user zooms in and out of the panel.

At this point, we have a dashboard with ticking prices. We can start
experimenting with other parameters such as the colors or the sample frequency
for each of the series. The Grafana UI can be used to change the chart range and
resolution:

![Low-resolution Cryptocurrency trade data in Grafana](/img/blog/2022-03-15/grafana-low-res.png)

![High-resolution Cryptocurrency trade data in Grafana](/img/blog/2022-03-15/grafana-high-res.png)

Although our data is very simplistic right now (indicative bid an offer from one
platform on one pair), the nice thing about building this from scratch is that
we can calculate derived metrics such as the spread over time:

```sql
select
  timestamp as time,
  avg(ask-bid)/(avg(bid+ask)/2)*100
from crypto
where $__timeFilter(timestamp)
and fromCCY='BTC' and toCCY='USD' and exch='CB'
sample by $__interval
```

![Spread prices visualized in Grafana](/img/blog/2022-03-15/grafana-spread.png)

## Next steps

There are many other things to do, such as pulling prices from various venues or
fetching order book data rather than indicative top-of-book. The next steps we
can take with this project that would be interesting to explore would be:

- Deriving forward curve and implied funding on cryptocurrency using futures
  prices
- Plotting crypto volatility smiles

If you like this content, we'd love to know your thoughts! Feel free to share
your feedback or just come and say hello in the
[QuestDB Community Slack]({@slackUrl@}).
