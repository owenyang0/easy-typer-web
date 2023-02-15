---
title: Crypto Volume Profiles with QuestDB and Julia
author: Dean Markwick
author_url: https://github.com/dm13450
author_image_url: https://avatars.githubusercontent.com/dm13450
description:
  Build Bitcoin volume curves using Julia and QuestDB to better understand the
  flow of trading throughout the day.
keywords:
  - timeseries
  - julialang
  - trading
  - marketdata
tags: [tutorial, julialang, market data, trading, bitcoin]
image: /img/blog/2022-03-29/graph.png
---

import Banner from "@theme/Banner"

<Banner
  alt="crypto volume profiles with questdb and julia"
  height={467}
  src="/img/blog/2022-03-29/graph.png"
  width={650}
></Banner>

When is the Bitcoin market most active and how does this activity change
throughout the day? This is an important question to answer for any algorithmic
trading strategy as it is more expensive to trade in low volume (illiquid) times
and this could end up costing you money. In this post, I'll use QuestDB and
Julia to calculate the average intraday volume profile which will show us how
the pattern of trading varies throughout the day.

## Environment

I'm using QuestDB version 6.2 and Julia version 1.7. I've installed the
following packages from the Julia general repository.

```julia
using LibPQ
using DataFrames, DataFramesMeta
using PlotThemes
using Plots
using Dates
```

For more information about getting setup with QuestDB read their
[get started with QuestDB](https://questdb.io/docs/get-started/docker/) guide.

## Contents

- [Importing CSV's into QuestDB](#importing-csvs-into-questdb-via-julia)
- [Bitcoin daily volume trends](#bitcoin-daily-volume-trends)
- [Bitcoin intraday volume profiles](#bitcoin-intraday-volume-profiles)
- [Smoothing the volume profiles with LOESS](#smoothing-the-volume-profiles-with-loess)

## Importing CSVs into QuestDB via Julia

I've written before about connecting a data source to QuestDB in real-time and
[building you own crypto trade database](https://dm13450.github.io/2021/08/05/questdb-part-1.html).
Now I will take a different approach and show you how to use QuestDB with csv
files. This involves connecting to QuestDB using the REST API and passing the
file with a corresponding database schema.

As most of us have our data in CSVs, (despite the flaws) this will hopefully
help you build Bitcoin volume curves using Julia and QuestDB to better
understand the flow of trading throughout the day. ove to a more practical
database solution. I spent most of my Ph.D. wrestling with flat files and could
have saved some time by moving to a database sooner.

In my case, I have a folder of CSV files of BTCUSD trades downloaded from Alpaca
Markets (using [AlpacaMarkets.jl](https://github.com/dm13450/AlpacaMarkets.jl))
and iterate through them to upload to QuestDB.

For the schema, we tell QuestDB what the column the time stamp is (`t` in our
case) and the format of the time string. Alpaca provides microseconds so that is
translated into `yyyy-MM-ddTHH:mm:ss.SSSUUUZ`. We then define what columns are
symbols.

What's a symbol? Well in our case it is a type of string that is constant in a
column. Some people call them enums, you might also call them factors. Symbol
values can only be set few values. So for our data, the exchanges (column `x`)
are one of three values, therefore suited as a symbol.

For each file, we simply open and post to our localhost at port 9000 where
QuestDB is running.

```julia
using HTTP, JSON

const host = "http://localhost:9000"

function run()
  SCHEMA = [Dict("name"=>"t", "type"=>"TIMESTAMP", "pattern" => "yyyy-MM-ddTHH:mm:ss.SSSUUUZ"),
            Dict("name" => "symbol", "type" => "SYMBOL"),
            Dict("name" => "x", "type" => "SYMBOL"),
            Dict("name" => "tks", "type" => "SYMBOL")]

  SCHEMA_JSON = JSON.json(SCHEMA)

  for (root, dirs, files) in walkdir("../data/trades/ETHUSD")

    for file in files
      fl = joinpath(root, file)
      println(fl)
      csvfile = open(fl)

      body = HTTP.Form(["schema" => SCHEMA_JSON, "data" => csvfile])

      HTTP.post(host * "/imp?name=alpaca_crypto_trades&overwrite=false&timestamp=t&partitionBy=DAY", [], body; verbose = 2)

      close(csvfile)
    end
  end

end

```

Let's take a look at the `post` command in detail:

```
HTTP.post(host * "/imp?name=alpaca_crypto_trades&
                                      overwrite=false&
                                      timestamp=t&
                                      partitionBy=DAY",
                                      [], body; verbose = 2)
```

We split this out into the different parameters:

- `name=alpaca_crypto_trades`: the name of the table where we are writing the
  data.
- `overwrite=false`: With each data file _don't_ overwrite the existing table,
  append the data to the table.
- `timestamp=t`: This is the designated timestamp. This is the key column in the
  data as our operations all depends on this timestamp. In our case, it is the
  time at which the trade occurred, so if we want to aggregate the data to say
  hourly or even days this is the column QuestDB needs to work with.
- `partitionBy=DAY`: We have lots of data and want QuestDB to operate as
  efficiently as possible. By partitioning the data we store each day as a
  separate file which means faster read times and better performance. In our
  case, partitioning by each day is a sensible choice as our questions are
  likely to be around daily statistics, (average daily volume, average daily
  distribution). For a different application, say sensor data, you might find a
  different partitioning interval works better.

We iterate through all the different files and receive a message telling us
whether the file was successfully uploaded. We can go to the web GUI and check
to make sure everything worked by counting the number of rows.

![QuestDB GUI screenshot](/img/blog/2022-03-29/questdb_gui.png "QuestDB GUI screenshot")

Now let's connect to the database in Julia and see if we get the same result.

```julia
conn() = LibPQ.Connection("""
             dbname=qdb
             host=127.0.0.1
             password=quest
             port=8812
             user=admin""")

execute(conn(), "SELECT count(*) FROM alpaca_crypto_trades") |> DataFrame
```

|  count   |
| :------: |
| 54508191 |

The same as the above screenshot. Our import method runs without a hitch so now
let's do some finance.

## Bitcoin daily volume trends

Bitcoin has been having a tough time recently. Everyone is back to school or
their jobs and doesn't have time to day-trade cryptocurrencies anymore. Central
banks are raising rates, economies are about to start their 'post' COVID period
and so many other macro factors are leading us into a new asset regime. How has
this changed the number of daily trades and also the total amount of traded
dollar volume each day in Bitcoin?

This type of query is where QuestDB shines and we can answer with some simple
code. We have partitioned our table by day and thus it can iterate through each
day, summing the amount of volume and the total number of trades to come up with
our daily summaries.

```julia
dailyVolume = execute(conn(),
"SELECT t, symbol, sum(s), count(*) FROM alpaca_crypto_trades
  SAMPLE by 1d
  GROUP BY symbol, t"
) |> DataFrame

dropmissing!(dailyVolume);

first(dailyVolume, 4)
```

<div class="data-frame">
  <table class="data-frame">
    <thead>
      <tr>
        <th></th>
        <th>t</th>
        <th>symbol</th>
        <th>sum</th>
        <th>count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1</th>
        <td>2021-10-23T00:00:00.098</td>
        <td>BTCUSD</td>
        <td>6721.99</td>
        <td>293601</td>
      </tr>
      <tr>
        <th>2</th>
        <td>2021-10-24T00:00:00.098</td>
        <td>BTCUSD</td>
        <td>8420.77</td>
        <td>369846</td>
      </tr>
      <tr>
        <th>3</th>
        <td>2021-10-25T00:00:00.098</td>
        <td>BTCUSD</td>
        <td>10167.0</td>
        <td>383259</td>
      </tr>
      <tr>
        <th>4</th>
        <td>2021-10-26T00:00:00.098</td>
        <td>BTCUSD</td>
        <td>10122.0</td>
        <td>397424</td>
      </tr>
    </tbody>
  </table>
</div>

Which we then plot as both the total volume per day and the total number of
trades per day.

```julia
ticks = minimum(dailyVolume.t):Day(60):maximum(dailyVolume.t)
tick_labels = Dates.format.(ticks, "dd-mm-yyyy")

vPlot = plot(dailyVolume.t, dailyVolume.sum, label = "Notional Volume", xticks = (ticks, tick_labels))
nPlot = plot(dailyVolume.t, dailyVolume.count, label = "Total Trades", xticks = (ticks, tick_labels))
plot(vPlot, nPlot)
```

![Daily Bitcoin trends](/img/blog/2022-03-29/output_10_0.svg "Daily Bitcoin trends")

Both the total notional traded and the total number of daily trades dropped off
around Christmas time, which is to be expected. We are all too busy feasting on
turkey to be trading Bitcoin! But so far in 2022, the daily notional has
remained subdued whereas the number of daily trades has picked up which
indicates there are more people trading but only smaller amounts. Now given the
absolute rout in Bitcoin's price so far in 2022 (-20% so far) this is could
indicate it is mainly small participants selling the smaller holdings.

```julia
plot(dailyVolume.t, dailyVolume.sum ./ dailyVolume.count, label = "Average Trade Size")
```

![Bitcoin average trade size](/img/blog/2022-03-29/output_12_0.svg "Bitcoin average trade size")

Dividing the average daily notional by the total number of daily trades shows
this steady reduction in the average trade size.

We have an idea of how much is traded every day, but how is this distributed
throughout the day? Anyone trading frequently or trading with lots of volumes
will want to be trading when everyone else is to make sure they are getting the
best prices and not just pushing the price around.

How do we calculate these volume profiles and more importantly, how do we
calculate these profiles efficiently? QuestDB to the rescue!

## Bitcoin intraday volume profiles

For each hour and minute of the day, we want to calculate the total amount
traded. We then want to divide this by the total amount traded over the full
sample to arrive at a percentage. This will then give us the fraction of the
total volume traded aka the volume profile of a given day.

To make our life easier we create a `volume_minute` table that aggregates the
raw market data into minute frequencies.

```julia
execute(conn(),
"
CREATE TABLE volume_minute
AS(
    SELECT t, avg(p) as avg_price, avg(s) as avg_size, sum(s) as total_size
    FROM alpaca_crypto_trades
    WHERE t >'2021-11-08'
    SAMPLE BY 1m)
")
```

This is exploiting the full power of QuestDB. Using the `SAMPLE BY` function we
can reduce our raw data into 1-minute subsamples that each has the total amount
traded in that one minute. This function will create a new table called
`volume_minute` which we can use for the rest of our analysis.

We can now aggregate this over the hour and minute of the day to arrive at our
profile of volumes over a given day. We want to know the total amount trade in
our data set for each minute.

```julia
intraVolume = execute(conn(), "SELECT hour(t), minute(t), sum(total_size)
	                                              FROM volume_minute
                                                  GROUP BY hour(t), minute(t)" ) |>
DataFrame |> dropmissing;

totalVolume = execute(conn(),
    "SELECT sum(total_size) from volume_minute"
) |> DataFrame |> dropmissing;
```

Once those have been calculated in QuestDB we pull them into Julia and calculate
the fraction of the volume traded at each hour and minute.

```julia
intraVolume = @transform(intraVolume,
    :ts = DateTime(today()) + Hour.(:hour) + Minute.(:minute),
    :frac = :sum ./ totalVolume.sum);
```

Like everything in life, a graph is better than a table.

```julia
ticks = minimum(intraVolume.ts):Hour(2):maximum(intraVolume.ts)
tick_labels = Dates.format.(ticks, "HH:MM")

plot(intraVolume.ts, intraVolume.frac,
     xticks = (ticks, tick_labels), seriestype = :scatter, label=:none, ylabel="Fraction of Volume Traded")
```

![Intraday Bitcoin profile](/img/blog/2022-03-29/output_20_0.svg "Intraday Bitcoin profile")

This looks great, we see trading is at the lowest at 10:00 but peaks at 16:00.
It is very noisy though.

We can also think in terms of how much is left to trade at a given time of day.
So as the clock turns midnight we have 100% of the day's volume to trade. This
is equivalent to calculating the cumulative proportion.

```julia
plot(intraVolume.ts, 1 .- cumsum(intraVolume.frac),  xticks = (ticks, tick_labels),
     label = "How much is left to trade in the day?",
     ylabel = "Fraction of Total Volume Remaining")
```

![Bitcoin fraction left to trade over the day](/img/blog/2022-03-29/output_22_0.svg "Bitcoin fraction left to trade over the day")

So we can see that by 06:00 there is roughly still 75% of the day's volume to
trade. By 18:00 just over 25% left. So from our earlier analysis of how much
daily volume is roughly traded, we can start predicting how much volume is left
to trade over a day when we log into our broker.

As Bitcoin crypto markets are unique as they trade over the weekends. So we
should split these volume curves up into the day of the week and see how they
look.

## Bitcoin volume profiles for each weekday

This is as simple as adding an extra clause to the `GROUP BY` statement to add
the day of the week. Again, we repeat the same process as before.

```julia
dowLabel = DataFrame(day_of_week = 1:7,
                     day_of_week_label = ["Mon", "Tue", "Wed",
                                          "Thur", "Fri", "Sat", "Sun"]);

intraVolume_day_req = async_execute(conn(),
"SELECT day_of_week(t), hour(t), minute(t), sum(total_size) FROM volume_minute GROUP BY day_of_week(t), hour(t), minute(t)"
)

intraVolume_day = fetch(intraVolume_day_req) |> DataFrame |> dropmissing;

totalVolume_day = execute(conn(),
    "SELECT day_of_week(t), sum(total_size) from volume_minute GROUP BY day_of_week(t)"
) |> DataFrame |> dropmissing

rename!(totalVolume_day, ["day_of_week", "total_daily_volume"])
totalVolume_day = leftjoin(totalVolume_day, dowLabel, on = "day_of_week")

intraVolume_day = leftjoin(intraVolume_day, totalVolume_day, on="day_of_week");
```

This gives us the total volume at each minute and hour per weekday, plus the
total amount traded for that weekday in the period too.

```julia
intraVolume_day = @transform(intraVolume_day,
    :ts = DateTime(today()) + Hour.(:hour) + Minute.(:minute),
    :Volume_Frac = :sum ./ :total_daily_volume);

sort!(intraVolume_day, :day_of_week)
first(intraVolume_day, 4)
```

<div class="data-frame">
  <table class="data-frame">
    <thead>
      <tr>
        <th>hour</th>
        <th>minute</th>
        <th>sum</th>
        <th>total_daily_volume</th>
        <th>day_of_week_label</th>
        <th>ts</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>0</td>
        <td>0</td>
        <td>369.729</td>
        <td>3.11011e5</td>
        <td>Mon</td>
        <td>2022-03-09T00:00:00</td>
      </tr>
      <tr>
        <td>0</td>
        <td>1</td>
        <td>249.165</td>
        <td>3.11011e5</td>
        <td>Mon</td>
        <td>2022-03-09T00:01:00</td>
      </tr>
      <tr>
        <td>0</td>
        <td>2</td>
        <td>589.069</td>
        <td>3.11011e5</td>
        <td>Mon</td>
        <td>2022-03-09T00:02:00</td>
      </tr>
      <tr>
        <td>0</td>
        <td>3</td>
        <td>265.611</td>
        <td>3.11011e5</td>
        <td>Mon</td>
        <td>2022-03-09T00:03:00</td>
      </tr>
    </tbody>
  </table>
</div>

Plotting this gives us the intraday volume profile for each day of the week.

```julia
plot(intraVolume_day.ts,
     intraVolume_day.Volume_Frac,
     group=intraVolume_day.day_of_week_label,
     xticks = (ticks, tick_labels),
     ylabel="Fraction of Volume Traded")
```

![Weekday volume curves](/img/blog/2022-03-29/output_27_0.svg "Weekday volume curves")

Very noisy! We can sort of see the general increase of volume at 16:00 similar
to the single curve above. Comparing the weekdays becomes a bit easier when we
look at how left is left to trade at each time.

```julia
gdata = groupby(intraVolume_day, :day_of_week)
intraVolume_day = @transform(gdata, :CumVolume = cumsum(:Volume_Frac));

plot(intraVolume_day.ts,
     1 .- intraVolume_day.CumVolume,
     group=intraVolume_day.day_of_week_label,
     legend = :topright, xticks = (ticks, tick_labels),
     ylabel = "Fraction of Total Volume Remaining")
```

![Weekday fraction left to trade](/img/blog/2022-03-29/output_28_0.svg "Weekday fraction left to trade")

Saturday is the day that strays away from all the others. This shows that the
profile of trading BTCUSD over Saturday is structurally different to the other
weekdays. So if you are running an algorithmic trading strategy 24 hours 7 days
a week then you will need to consider how Saturday might need some special
rules.

## Smoothing the volume profiles with LOESS

The next step is to smooth these curves out. We want to remove the noise so we
can better understand the underlying shape of the volume traded. Plus if this
type of data was feeding into an algorithmic trading strategy we wouldn't want
the jitter of the data to influence the trading data.

We are going to use [LOESS](https://en.wikipedia.org/wiki/Local_regression)
(locally estimated scatterplot smoothing) which takes the points and looks at
the nearest neighbours to come up with a value that is a rough average. It then
moves along to the next point and repeats the process. There is a free parameter
that controls how far ahead and behind it looks to calculate the average which
we will set to 0.15.

This is all implemented in the
[Loess.jl](https://github.com/JuliaStats/Loess.jl) package, so you don't need to
worry about what is happening, we can just use the function.

```julia
using Loess

model = loess(1:nrow(intraVolume), intraVolume.frac, span=0.15)

vs = Loess.predict(model, Float64.(1:nrow(intraVolume)))

smoothPlot = plot(intraVolume.ts, intraVolume.frac, xticks = (ticks, tick_labels), label = "Raw")
plot!(smoothPlot, intraVolume.ts, vs, label = "LOESS - 0.15", linewidth=3)
```

![svg](/img/blog/2022-03-29/output_31_0.svg)

This smoothed curve produces a sensible-looking approximation to the raw data
and removes much of the noise. The curve is a more sensible input into an
algorithmic trading model instead of the raw data. If we look around 14:00 we
can see that there is a large spike in the raw volume, whereas the LOESS curve
smoothes this out. If our trading model was using the raw data it might expect a
surge in volume at 14:00 all the time and start trading accordingly, whereas in
reality, we are confident that is just noise and our smoothed profile is more
reliable.

However, there is a major point to consider when using LOESS as a smoothing
method. As it looks at a local neighbourhood of points, it is looking into the
future to smooth a value in the past. If we were using these values to predict
something, this would be a big no-no as we are using the information in the
future to predict the past. But for this application, it is ok. We are only
trying to understand the shape of the curves and not predict future values,
therefore so long as we bear what LOESS is doing in mind, we can safely use it
to smooth out our volume numbers. So we wouldn't be able to use LOESS in
real-time to smooth the market volumes as it requires points from the future.

With all that considered now let's apply it to the rest of our weekdays.

Let's write a function that does the smoothing and apply it to each different
day of the week.

```julia
function loess_smooth(x; smooth=0.5)
    model = loess(eachindex(x), x, span=smooth)
    Loess.predict(model, Float64.(eachindex(x)))
end
```

Applying this to each weekday using the `groupby` functions on the data frame.

```julia
gdata = groupby(intraVolume_day, :day_of_week)
intraVolume_day = @transform(gdata, :SmoothVolume = loess_smooth(:Volume_Frac));
sort!(intraVolume_day, :day_of_week)
dropmissing!(intraVolume_day);

weekdays = @subset(intraVolume_day, :day_of_week .<= 5)
weekends = @subset(intraVolume_day, :day_of_week .> 5);
```

I've added an indicator if it is a weekday or weekend for easy separation.

```julia
ticks = minimum(intraVolume.ts):Hour(6):maximum(intraVolume.ts)
tick_labels = Dates.format.(ticks, "HH:MM")

weekdayPlot = plot(weekdays.ts,
     weekdays.SmoothVolume,
     group=weekdays.day_of_week_label,
     xticks = (ticks, tick_labels),
     legend = :bottomright)
weekendPlot = plot(weekends.ts,
     weekends.SmoothVolume,
     group=weekends.day_of_week_label,
     xticks = (ticks, tick_labels),
     legend = :bottomright)

plot(weekdayPlot, weekendPlot)
```

![svg](/img/blog/2022-03-29/output_35_0.svg)

Much more interpretable! The smoothed curves make it easier to see some
interesting features:

- Wednesday and Thursday have a second peak of trading at about 19:00.
- Mondays and Fridays have the highest peaks at 16:00.
- The weekend is flatter in activity, the peaks are smaller.
- Sunday trading starts increasing earlier and then carries on as it moves into
  Monday morning.
- Saturday follows the more typical pattern with an interesting increase at
  06:00.

## Conclusion

The power of QuestDB shows how easy and quick it is to gain intuition around
where the most active periods of Bitcoin trading happen throughout the day.
We've shown how average daily volumes and number of trades has fallen in recent
months which has also led to a smaller average trade size in the same period.

Once we looked at the average profile over the day we found that the peak
volumes are in the afternoon from about 15:00 onwards, coinciding with America
waking up and trading.

Finally, we then found that weekends have a less extreme profile than weekdays
and more interestingly that Sundays trading continues in the late hours as the
working week begins.

For an algorithmic trading system, you will use this information to adjust the
strategy at different times of the day. A signal telling you to buy at 2 am in
this illiquid period could end up costing you money if you trade too
aggressively.

_This post comes from [Dean Markwick](https://twitter.com/DeanMarkwick). If you
like this content, we'd love to hear your thoughts! Feel free to try out QuestDB
on [GitHub](https://github.com/questdb/questdb#try-questdb) or just come and say
hello in [our community on Slack]({@slackUrl@})._
