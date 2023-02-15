---
title: QuestDB 6.0.5 September release, geospatial support
author: Brian Smith
author_title: QuestDB Team
author_url: https://github.com/bsmth
author_image_url: https://avatars.githubusercontent.com/bsmth
description:
  QuestDB 6.0.5 is available now and includes support for geospatial data with
  the introduction of geohash support for fast and efficient geodata queries and
  storage.
keywords:
  - postgres
  - geohash
  - timeseries
  - database
image: /img/blog/2021-09-13/banner.png
tags: [release, geospatial, influxdb]
---

The latest QuestDB release introduces support for geospatial data via the
addition of geohash types. Geohashes encode geographic areas as base-32 strings,
and native support for this type allows for fast and efficient querying and
storage of geodata. Also included are helper functions for rounding timestamps,
performance improvements for existing functions, alongside other fixes and
features. Here's the full roundup of changes that have just landed!

<!--truncate-->

## QuestDB 6.0.5

The addition of geospatial data in QuestDB opens up various possibilities to
include spatial dimensions in data sets in QuestDB. We're excited at the options
for using QuestDB in different new use cases such as asset tracking, computer
vision, machine learning, and other challenging domains. We're excited to see
what our community builds with the newly-supported functionality and eagerly
awaiting your feedback!

### Geospatial support via geohashes

A **geohash** is a convenient way of expressing a location using a short
alphanumeric string, with greater precision obtained with longer strings. The
basic idea is that the Earth is divided into grids of defined size, and each
area is assigned a unique id called its Geohash.

For a given location on Earth, we can convert latitude and longitude as the
approximate center point of a grid represented by a geohash string. This string
is the Geohash and will determine which of the predefined regions the point
belongs to.

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="An illustration showing two maps with different geohash precision levels applied"
  height={598}
  src="/img/blog/2021-09-13/geohashes.png"
  width={850}
/>

To assist with geospatial queries, a new `geohash` type has been added to
QuestDB which allows storing and querying spatial data. The syntax follows the
format `geohash(<precision>)`. The following examples show how to create tables
with geohash types and to make basic queries by geohash:

```questdb-sql title="Geohash overview"
-- Create two geohash columns with different precision
CREATE TABLE geo_data (g5c geohash(5c), g29b geohash(29b));
-- Inserting geohash literals
INSERT INTO geo_data VALUES(#u33d8, ##10101111100101111111101101101)
-- Querying by geohash
SELECT * FROM geo_data WHERE g5c = #u33d8;
```

To help with geospatial queries, a `within` operator has been added which helps
evaluate if a geohash is equal to or is within a larger grid. The following
query will return the most recent entries by device ID if the `g8c` column
contains a geohash within `u33d`:

```questdb-sql title="within operator"
SELECT * FROM geo_data LATEST BY device_id
WHERE g8c within(#u33d);
```

Geohashes can be used in SQL via PostgreSQL and HTTP with geohash literals and
string to geohash conversion and with some special handling over InfluxDB Line
Protocol. For full details of supported features and functionality including
advanced usage, see the [geohash documentation](/docs/concept/geohashes).

### first() and last() functions

The `first()` and `last()` functions have had significant internal performance
improvements with the latest release. Improving the efficiency of these
functions has the benefit that geospatial queries are significantly faster. The
most common types of queries which are likely to benefit from this improvement
are those such as "last-known location" of a device or vessel:

```questdb-sql title="last() example"
SELECT ts, last(g8c) FROM geo_data
WHERE device_id = 'device_3';
```

### Timestamp floor and ceiling functions

To aid with rounding timestamp values, it's now possible to use
`timestamp_floo()` and `timestamp_ceil()` functions to round up or down by a
unit of choice:

```questdb-sql
WITH t AS (SELECT cast('2016-02-10T16:18:22.862145Z' AS timestamp) ts)
SELECT
  ts,
  -- floor
  timestamp_floor('T', ts) f_milli,
  timestamp_floor('s', ts) f_second,
  timestamp_floor('m', ts) f_minute,
  -- ceiling
  timestamp_ceil('h', ts) c_hour,
  timestamp_ceil('d', ts) c_day,
  timestamp_ceil('M', ts) c_month
FROM t
```

For more details on using these functions and reference documentation for the
types of units that can be passed, see the
[date and time functions documentation](/docs/reference/function/date-time#timestamp_ceil).

### Out-of-order parameters via REST API

It's now possible to pass parameters relating to out-of-order ingestion via REST
API. The `/imp` endpoint accepts the `commitLag` and `maxUncommittedRows` query
parameters on partitioned tables. For more information on the meaning and usage
of these parameters, see the
[out-of-order ingestion](/docs/guides/out-of-order-commit-lag) documentation.

```bash title="Out-of-order params via REST API"
curl -F data=@weather.csv \
'http://localhost:9000/imp?timestamp=ts&partitionBy=DAY&commitLag=120000000&maxUncommittedRows=10000'
```

## Run QuestDB 6.0.5

The release notes including a changelog is
[available on GitHub](https://github.com/questdb/questdb/releases/tag/6.0.5) and
this version has been published to
[Docker Hub](https://hub.docker.com/r/questdb/questdb/tags?page=1&ordering=last_updated).
To pull the `6.0.5` tag and start up QuestDB, use `docker run`:

```bash
docker run -p 9000:9000 -p 8812:8812 -p 9009:9009 \
  questdb/questdb:6.0.5
```

## Next up

We have been tracking the most active
[GitHub discussions](https://github.com/questdb/questdb/discussions), and we are
keeping a keen eye on the features and fixes that are most popular to our
community. We are picking up the most upvoted and active topics in our GitHub
Discussions and the feature requests in GitHub issues. If there's a feature
you'd love to see, open a discussion on the topic or share your support if a
thread for it exists already!

We're eagerly awaiting feedback on this release, so feel free to reach out and
tell us how this version is running. Let us know how we're doing or just come by
and say hello [in our Slack Community]({@slackUrl@}) or browse the repository
[on GitHub]({@githubUrl@}).
