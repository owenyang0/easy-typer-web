---
title: QuestDB 6.2 January release, SQL JIT compiler
author: Andrey Pechkurov
author_title: QuestDB Engineering
author_url: https://github.com/puzpuzpuz
author_image_url: https://avatars.githubusercontent.com/puzpuzpuz
description:
  We've released version 6.2 and here are the highlights including SQL JIT
  compiler, JDK 17 support, SQL and ILP improvements and autocomplete in the Web
  Console.
keywords:
  - sql
  - jit
  - performance
  - timeseries
  - database
image: /img/blog/2022-01-27/banner.png
tags: [release, sql]
---

import Banner from "@theme/Banner"

<Banner
  alt="Latest features in QuestDB version 6.2 including SQL JIT compiler"
  height={360}
  src="/img/blog/2022-01-27/banner.png"
  width={650}
/>

We've just published 6.2 and it includes a lot of changes, such as SQL JIT
compiler, JDK 17 support, SQL and ILP improvements, settings to improve the
memory footprint when used with Grafana, autocomplete in the Web Console,
improved ILP stability, and more. Here's a roundup of changes that have just
landed in the latest and greatest version!

<!--truncate-->

## JDK 17 support

QuestDB is now compatible with JDK 17, the latest long-term support (LTS) Java
release. We also updated the binary distributions and the Docker image to use
OpenJDK 17.

## Just-in-Time compiler for SQL engine

Release 6.2 brings a brand new JIT (Just-in-Time) compiler as a part of the SQL
engine. The compiler aims to significantly improve execution times for queries
with simple arithmetic expressions used to filter the data.

To give you an impression on the performance improvements, let's consider the
following query on the `trips` table that we use in our
[live demo](https://demo.questdb.io/):

```sql
SELECT count(), max(total_amount), avg(total_amount)
FROM trips
WHERE total_amount > 150 AND passenger_count = 1;
```

The below image shows the execution time for this query with and without enabled
JIT compiler:

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="A diagram comparing query execution times with JIT enabled and disabled"
  title="Query execution times with JIT enabled and disabled"
  height={598}
  src="/img/blog/2022-01-12/cold-v-hot-run-two.png"
  width={650}
/>

The SQL JIT compiler is a beta feature and is disabled by default. To enable it,
you should change the `cairo.sql.jit.mode` setting in your `server.conf` file.

```ini title="path/to/server.conf"
cairo.sql.jit.mode=on
```

When QuestDB starts with the enabled JIT compiler, the server logs contain
messages relating to `SQL JIT compiler` like the following:

```log
2021-12-16T09:25:34.472450Z A server-main SQL JIT compiler mode: on
2021-12-16T09:25:34.472475Z A server-main Note: JIT compiler mode is a beta feature.
```

JIT compilation won't take place for any query you run. To learn when the
compilation took place for a query, you should check the server logs to contain
something similar to this message:

```log
2021-12-16T09:35:01.742777Z I i.q.g.SqlCodeGenerator JIT enabled for (sub)query [tableName=trips, fd=62]
```

For more information on the JIT compiler, refer to this
[blog post](https://questdb.io/blog/2022/01/12/jit-sql-compiler).

## New LATEST BY syntax and improvements

The database now supports a new syntax for LATEST BY clause:

```sql
SELECT * FROM tab WHERE x > 0
LATEST ON timestamp PARTITION BY y;
```

This syntax makes the LATEST BY clause consistent with the query execution order
since LATEST BY now must follow the WHERE clause. Release 6.2 also includes a
number of fixes to make sure that the WHERE always gets applied before the
LATEST BY. For more details on the new syntax, see the
[LATEST BY documentation](/docs/reference/sql/latest-on).

## Optimize LIMIT SQL queries

Release 6.2 includes a number of optimizations for queries with the LIMIT
clause. The first group of optimizations takes place for queries with ORDER BY
and LIMIT clause combination. As an example, prior to this release, the below
query on the `trips` table took around 18 seconds. With version 6.2, it takes
around 0.2 seconds.

```sql
SELECT trip_distance FROM trips
ORDER BY trip_distance DESC LIMIT 20;
```

The second group of optimizations applies to queries that fetch the last N rows
ordered by the designated timestamp. The following query over a table with 100M
rows took around 105 seconds. With this release, it takes around 1 millisecond.

```sql
SELECT * FROM my_table
ORDER BY ts DESC LIMIT -100;
```

## Reduced ILP commit timeout

Prior to 6.2, the data ingested through ILP protocol could be committed and thus
available to SQL queries after 30 seconds, if the volume of data is small. This
was an inconvenient default in a local development environment. From now on, the
default timeout for ILP commit is set to 1 second. For more information on
setting this parameter, see the
[server configuration documentation](/docs/reference/configuration).

```ini title="/path/to/server.conf"
# Default is 1 sec
line.tcp.commit.timeout=1000
```

## Lower memory footprint

QuestDB 6.2 includes a number of improvements in query cache handling. The
database now makes sure to shrink the internal cached data structures upon query
execution. This should help with the problem of the overall memory consumption
going up with time due to query caching.

Another problem reported by our users is that Grafana does not use prepared
statements when sending the queries and the built-in QuestDB's query cache
becomes much less efficient. To avoid unnecessary memory usage, we added new
settings that allow disabling the SELECT and INSERT query caches.

```ini title="/path/to/server.conf"
# Default is true
pg.select.cache.enabled=false
# Default is true
pg.insert.cache.enabled=false
```

When the database is used in combination with Grafana, it is recommended to
disable SELECT query cache by setting the property
`pg.select.cache.enabled=false`.

## Table autocomplete in Web Console

Web Console's autocomplete feature now suggests the names of the existing
tables.

<Screenshot
  alt="Query execution time benchmark"
  title="Query execution time benchmark"
  height={191}
  src="/img/blog/2022-01-27/table-autocomplete.png"
  width={650}
/>

## ILP stability improvements

We've applied [fuzz testing](https://en.wikipedia.org/wiki/Fuzzing) to our
Influx Line Protocol implementation. As a result, a number of critical issues
around various edge cases were found and fixed.

For instance, one of the edge cases could be seen in a scenario when the ILP
rows keep adding new columns to the table. When this was happening, table
readers could read a mix of metadata values belonging to two subsequent
transactions. Our team did a great job to include a fix that makes sure that
table readers read the metadata atomically.

## Simplified network configuration

We cleaned up all of the
[network configuration](/docs/operations/capacity-planning#network-configuration)
settings and made them more intuitive and consistent. For the sake of backward
compatibility, all old setting names are also supported. Still, we recommend our
users update the configurations to improve the overall developer experience.

## Next up

The team will be adding `UPDATE` support in the next release, meanwhile, we're
working on replication, further JIT-compiled filter performance improvements,
and more.

We hope you enjoyed the features and functionality in version 6.2. See the
[release notes on GitHub](https://github.com/questdb/questdb/releases/tag/6.2)
for the complete list of additions and fixes. We’re eagerly awaiting your
feedback, so feel free to reach out and let us know how it's running. You can
let us know how we're doing or just come by and say hello
[in our Slack Community]({@slackUrl@}) or browse the repository
[on GitHub]({@githubUrl@}).
