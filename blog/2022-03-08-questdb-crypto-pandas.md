---
title: Exploring Crypto Prices with QuestDB and Pandas
author: Yitaek Hwang
author_title: Guest
author_url: https://github.com/Yitaek
author_image_url: https://avatars.githubusercontent.com/Yitaek
description:
  Visualizing historical prices of cryptocurrencies by ingesting data into
  QuestDB and analyzing trends with pandas, matplotlib, and seaborn.
  records on the fly.
keywords:
  - timeseries
  - crypto
  - pandas
  - matplotlib
  - seaborn
  - marketdata
tags: [tutorial, crypto, python, pandas, market data, matplotlib]
image: /img/blog/shared/og-pandas.png
---

import Banner from "@theme/Banner"

<Banner
  alt="A photograph of a laptop displaying candle charts of stock market data"
  height={500}
  src="/img/blog/2022-03-08/banner.jpeg"
  width={692}
>
  Photo by <a href="https://unsplash.com/@peiobty">Pierre Borthiry</a> via{" "}
  <a href="https://unsplash.com">Unsplash</a>
</Banner>

_This submission comes from one of our community contributors
[Yitaek Hwang](https://yitaek.medium.com/)_.

In [Part I of this series](/blog/2022/02/10/questdb-google-data-studio), we
used Google Data Studio to quickly import multiple data sources and compare the
price action of various cryptocurrencies over time. Even though Google Data
Studio provides an easy user-interface and some nice graphing features, it was
limited in what it could do in terms of analyzing the dataset. In this post, we
will use the popular Python libraries (pandas, matplotlib, and seaborn) to
explore the dataset further.

## Prerequisites

- [Crypto dataset](https://www.kaggle.com/sudalairajkumar/cryptocurrencypricehistory)
- [Jupyter Notebook](https://jupyter.org/)
- [QuestDB](https://questdb.io/)

## Importing Data

_NOTE: If you still have QuestDB running from Part I on Google Cloud, you can
skip to the next step._

For simplicity, we will run QuestDB locally via Docker and import the datasets
via the console UI. Download and run the latest version of QuestDB:

```
$ docker run -p 9000:9000 \
   -p 9009:9009 \
   -p 8812:8812 \
   -p 9003:9003 \
   questdb/questdb
```

Navigate to localhost:9000, click on the “Upload” icon on the left-hand panel
and import the
[csv files of interest](https://www.kaggle.com/sudalairajkumar/cryptocurrencypricehistory).
This example will use the Solana dataset, but any of the coins from the dataset
will also work.

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Import CSV section of QuestDB Web Console"
  height={281}
  src="/img/blog/2022-03-08/import.png"
  width={692}
/>

## Setting up Jupyter Notebook

Install Jupyter Notebook via [pip](https://jupyter.org/install) or with your
favorite Python environment management tool such as
[conda](https://docs.conda.io/), [mamba](https://mamba.readthedocs.io/), and
[pipenv](https://pipenv.pypa.io/). Alternatively, you can also download
[Anaconda Navigator](https://www.anaconda.com/products/individual) for your OS.

```
$ pip install notebook
```

Now install the packages we will use to explore the dataset:

```
$ pip install numpy pandas matplotlib seaborn psycogp2
```

If you used Anaconda Navigator, go under Environments > Search Packages to
install:

<Screenshot
  alt="A screenshot of Anaconda Navigator"
  height={446}
  src="/img/blog/2022-03-08/anaconda_navigator.png"
  width={692}
/>

Now we’re ready to launch the notebook and start exploring the data:

```
$ jupyter notebook
```

## Connecting to QuestDB

First, we need to use the `psycopg2` library to connect to QuestDB and import
the data.

```python
import pandas as pd
import numpy as np
import psycopg2 as pg

engine = pg.connect("dbname='qdb' user='admin' host='127.0.0.1' port='8812' password='quest'")
df = pd.read_sql('select * from coin_Solana.csv', con=engine)
```

(_NOTE: if you are re-using QuestDB from Part I, change the host to the IP
address of the load balancer._)

Now we can run some quick queries to make sure our import was successful. The
`head` and `tail` functions are useful in this case for a quick sanity check:

```python
df.head()

df.tails()
```

<Screenshot
  alt="A screenshot showing head and tail functions in Jupyter Notebook"
  height={305}
  src="/img/blog/2022-03-08/head_and_tail.png"
  width={692}
/>

Alternatively, we can use the `info` and `describe` commands to get a sense of
the data types and distribution:

```python
df.info()
```

<Screenshot
  alt="A screenshot showing an info function in Jupyter Notebook"
  height={231}
  src="/img/blog/2022-03-08/info.png"
  width={692}
/>

```python
df.describe()
```

<Screenshot
  alt="A screenshot showing head a describe function in Jupyter Notebook"
  height={206}
  src="/img/blog/2022-03-08/describe.png"
  width={692}
/>

For good measure, we can also check for `null` or `na` values to make sure we’re
working with a clean dataset.

```python
df.isnull().any()

df.isna().any()
```

These queries should return with `False` for all the columns. If you have
missing values in your dataset, you can use the `dropna` function to remove that
row or column.

## Exploring the Data

Now that we have our dataset in Jupyter, we can run answer some simple
questions. For example, we can find the five lowest price of Solana by running
the `nsmallest` function on the column we’re interested in (e.g. High, Low,
Open, Close). Similarly, we can use the `nlargest` function for the opposite:

```python
df.nsmallest(5, 'High')
# df.nlargest(10, 'Low')
```

<Screenshot
  alt="A screenshot showing nlargest function in Jupyter Notebook"
  height={165}
  src="/img/blog/2022-03-08/nlargest.png"
  width={692}
/>

We can also find days when the open price was lower than the closing price by
using the `query` function:

```python
df.query('Open < Close').head()
```

<Screenshot
  alt="A screenshot showing query function in Jupyter Notebook"
  height={151}
  src="/img/blog/2022-03-08/query.png"
  width={692}
/>

To get a better sense of the trends, we can resample the dataset. For example,
we can get the mean prices by week by using the `resample` function on the
`Date` column:

```python
df_weekly = df.resample("W", on="Date").mean()

df_weekly.head()
```

<Screenshot
  alt="A screenshot showing resample function on date in Jupyter Notebook"
  height={196}
  src="/img/blog/2022-03-08/resample_on_date.png"
  width={692}
/>

Now our data is aggregated by weeks. Similarly, we can get a rolling average
over a set window via the `rolling` function:

```python
df_rolling_mean = df.rolling(?).mean()

df_rolling_mean.tail()
```

<Screenshot
  alt="A screenshot showing rolling function in Jupyter Notebook"
  height={177}
  src="/img/blog/2022-03-08/rolling.png"
  width={692}
/>

## Visualizing the Data

To visualize our crypto dataset, we’ll use the
[seaborn](https://seaborn.pydata.org/) library built on top of
[matplotlib](https://matplotlib.org/). First import both libraries, and let’s
plot a simple graph of Solana’s opening price over time:

```python
import matplotlib.pyplot as plt
import seaborn as sns
```

```python
sns.set(rc={'figure.figsize':(11, 4)})

df = df.set_index('Date')
df['Open'].plot(linewidth=0.5);
```

<Screenshot
  alt="A screenshot showing price over time plot"
  height={281}
  src="/img/blog/2022-03-08/price_over_time.png"
  width={692}
/>

Note that seaborn chose some sane defaults for the x-axis. We can also specify
our own labels as well as legends like the plot below comparing the High, Low,
and Opening prices of Solana over time:

```python
cols_plot = ['High', 'Low', 'Open']
axes = df[cols_plot].plot(marker='.', alpha=0.5, linestyle='None', figsize=(11, 9), subplots=True)
for ax in axes:
    ax.set_ylabel('Price ($)')
```

<Screenshot
  alt="A screenshot showing high, low and open price plots"
  height={423}
  src="/img/blog/2022-03-08/high_low_open.png"
  width={692}
/>

From a quick glance, it is hard to tell the trends of any of these price
actions. Let’s dive into a time period when the Solana price starts to become
more volatile (i.e. after Jan 2021). We can specify a subset of the dataset
using the `loc` function and apply it to our full dataset, weekly mean resample,
and seven day rolling mean.

After giving each of the dataset a different marker, we can plot all of them on
the same graph to see when the opening price was above or below the weekly or
moving window average:

```python
fig, ax = plt.subplots()
ax.plot(df.loc['2021-01-01 23:59:59': 'Open'], marker='.', linestyle='-', linewidth=0.5, label='Daily')
ax.plot(df_weekly.loc['2021-01-01': 'Open'], marker='o', markersize=8, linestyle='-', label='Weekly Mean Resample')
ax.plot(df_rolling_mean.loc['2021-01-01 23:59:59': 'Open'], marker='.', linestyle='-', label='7-d Rolling Mean')
ax.set_ylabel('Price ($)')
ax.legend();
```

<Screenshot
  alt="A screenshot showing moving window average plot"
  height={259}
  src="/img/blog/2022-03-08/moving_window_average.png"
  width={692}
/>

We can zoom in further in the May to July timeframe to capture the volatility.
Alternatively, we can also apply the popular 200-day moving average metric to
analyze price trends. Finally, we can also use the `ewm` function in pandas to
calculate an exponentially weighed moving average to gather different momentum
indicators. While past performance is not indicative of future performance,
these momentum indicators can be used to backtest and formulate new trading or
price analysis strategies.

## Conclusion

With QuestDB and pandas, it’s easy to visualize and calculate various price and
momentum indicators. By polling data from
[CoinGecko](https://www.coingecko.com/) or
[CoinMarketCap](https://coinmarketcap.com/), anyone can start analyzing crypto
trends. If you are interested in more crypto analysis, make sure to check out:

- [Realtime Crypto Tracker with Kafka and QuestDB](https://medium.com/swlh/realtime-crypto-tracker-with-kafka-and-questdb-b33b19048fc2)
- [Streaming Ethereum On-Chain Data to QuestDB](https://medium.com/geekculture/streaming-ethereum-on-chain-data-to-questdb-ea6b51d990ab)
