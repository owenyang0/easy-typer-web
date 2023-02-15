---
title: ILP TCP Receiver
sidebar_label: TCP Receiver
description: InfluxDB line protocol TCP receiver reference documentation.
---

The TCP receiver is a high-throughput ingestion-only API for QuestDB. Here are
some key facts about the service:

- ingestion only, there is no query capability
- accepts plain text input in a form on InfluxDB Line Protocol
- implicit transactions, batching
- supports automatic table and column creation
- multi-threaded, non-blocking
- supports authentication
- encryption requires an optional external reverse-proxy

## Overview

By default, QuestDB listens over TCP on `0.0.0.0:9009`. The receiver consists of
two thread pools, which is an important design feature to be aware of to
configure the receiver for maximum performance. The `io worker` threads are
responsible for parsing text input. The `writer` threads are responsible for
persisting data in tables. We will talk more about these in
[capacity planning](#capacity-planning) section.

## Authentication

Although the original protocol does not support it, we have added authentication
over TCP. This works by using an
[elliptic curve P-256](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)
JSON Web Token (JWT) to sign a server challenge. Details of authentication over
ILP can be found in the
[authentication documentation](/docs/reference/api/ilp/authenticate/).

## Insert data

Follow this link for
[examples of sending data using ILP over TCP](/docs/develop/insert-data#influxdb-line-protocol).

## Error handling

It is recommended that sending applications reuse TCP connections. If QuestDB
receives an invalid message, it will discard invalid lines, produce an error
message in the logs and forcibly _disconnect_ the sender to prevent further data
loss.

Data may be discarded because of:

- missing new line characters at the end of messages
- an invalid data format such as unescaped special characters
- invalid column / table name characters
- schema mismatch with existing tables
- message size overflows on the input buffer
- system errors such as no space left on the disk

Detecting malformed input can be achieved through QuestDB logs by searching for
`LineTcpMeasurementScheduler` and `LineTcpConnectionContext`, for example:

```bash
2022-02-03T11:01:51.007235Z I i.q.c.l.t.LineTcpMeasurementScheduler could not create table [tableName=trades, ex=`column name contains invalid characters [colName=trade_%]`, errno=0]
```

The following input is tolerated by QuestDB:

- a column is specified twice or more on the same line, QuestDB will pick the
  first occurrence and ignore the rest
- missing columns, their value will be defaulted to `null`/`0.0`/`false`
  depending on the type of the column
- missing designated timestamp, the current server time will be used to generate
  the timestamp
- the timestamp is specified as a column instead of appending it to the end of
  the line
- timestamp appears as a column and is also present at the end of the line, the
  value sent as a field will be used

## Commit strategy

:::note

**Deprecated content**

This section applies to QuestDB 6.5.5 and earlier versions. From
[QuestDB 6.6](https://github.com/questdb/questdb/releases/tag/6.6) onwards, the
database adjusts relevant settings automatically and provides maximum ingestion
speed.

:::

ILP transactions are implicit; the protocol is built to stream data at a high
rate of speed and to support batching. There are three ways data is committed
and becomes visible or partially visible. The commit method is chosen based on
whichever occurs first.

### Row-based commit

Each table has a max uncommitted rows metadata property. The ILP server will
issue a commit when the number of uncommitted rows reaches this value. The table
commit implementation retains data under max uncommitted rows or newer than the
commit lag (whichever is smallest) as uncommitted data. Committed data is
visible to table readers.

This parameter is set using in the following server configuration property:

```shell title="Commit when this number of uncommitted records is reached"
cairo.max.uncommitted.rows=1000
```

### Idle table timeout

When there is no data ingested in the table after a set period, the ingested
uncommitted data is fully committed, and table data becomes fully visible. The
timeout value is server-global and can be set via the following server
configuration property:

```shell title="Minimum amount of idle time (millis) before table writer is released"
line.tcp.min.idle.ms.before.writer.release=500
```

The following server configuration property controls the interval to run idle
table checks:

```shell title="Setting maintenance interval (millis)"
line.tcp.maintenance.job.interval=1000
```

### Interval-based commit

A table's [commit lag](/docs/guides/out-of-order-commit-lag) metadata property
determines how much uncommitted data will need to remain uncommitted for
performance reasons. This lag value is measured in time units from the table's
data. Data older than the lag value will be committed and become visible. ILP
derives the commit interval as a function of the commit lag value for each
table. The difference is that the commit interval is a wall clock.

The commit interval is calculated for each table as a fraction of the commit lag

```
commitInterval = commitLag * fraction
```

This fraction is `0.5` by default so if the table has a commit lag of `1` minute
the commit interval will be `30` seconds. The fraction used to derive the commit
interval can be set by the below configuration parameter.

```shell title="Setting commit interval fraction"
line.tcp.commit.interval.fraction=0.2
```

If the result of commit interval is `0`, the default commit interval of `2`
seconds will be used. This can be changed in the configuration:

```shell title="Setting the default commit interval in milliseconds"
line.tcp.commit.interval.default=5000
```

To ease understanding of how time interval interacts with commit lag, let's look
at how real-time data stream will become visible. The wall clock is roughly
aligned with time in the data stream in real-time data. Let's assume that table
has a commit lag value of 60 seconds and a commit interval of 20 seconds. After
the first 60 seconds of ingestion, ILP will attempt to commit 3 times. After
each attempt, there will be no data visible to the application. This is because
all the data will fall within the lag interval.

On the 4th commit, which would occur, 80 seconds after the data stream begins,
the application will see the first 20 seconds of the data, with the remaining 60
seconds uncommitted. Each subsequent commit will reveal more data in 20-second
increments. It should be noted that both commit lag and commit interval should
be carefully chosen with both data visibility and ingestion performance in mind.

## Capacity planning

TCP receiver makes use of 3 logical thread pools:

- I/O worker pool - `line.tcp.io.worker.count`, threads responsible for handling
  incoming TCP connections and parsing received ILP messages
- writer pool - `line.tcp.writer.worker.count`, threads responsible for table
  writes
- shared pool - `shared.worker.count`, threads responsible for handling O3 data

Depending on the number of concurrent TCP connections `io worker pool` size
might need to be adjusted. The ideal ratio is `1:1` - a thread per connection.
In less busy environments it is possible for single `io worker` thread to handle
multiple connections simultaneously. We recommend starting with conservative
ration, measure and increase ration up to `1:1`. More threads than connections
will be wasting server CPU.

Another consideration is the number of tables updates concurrently.
`writer pool` should be tuned to increase concurrency. `writer` threads can also
handle multiple tables concurrently. `1:1` ratio is the maximum required ratio
between `writer` threads and tables. If `1:1` ratio is not an option, avoid
writing to all tables from each connection. Instead, group connections and
tables. For example, if there are 10 tables, 8 TCP connections and `writer pool`
size is set to 2, 4 TCP connections may be used to write into tables 1-5, while
4 connections may write into tables 6-10.

:::note

Sending updates for multiple tables from a single TCP connection might be
inefficient. Consider using multiple connections to improve performance. If a
single connection is unavoidable, keep `writer pool` size set to 1 for optimal
CPU resource utilization.

:::

When ingesting data out of order (O3) `shared pool` accelerates O3 tasks. It is
also responsible for SQL execution. `shared pool` size should be set to use the
remaining available CPU cores.

## Configuration reference

The TCP receiver configuration can be completely customized using
[configuration keys](/docs/reference/configuration#influxdb-line-protocol). You
can use this to configure the thread pools, buffer and queue sizes, receiver IP
address and port, load balancing, etc.
