---
title: JOIN keyword
sidebar_label: JOIN
description: JOIN SQL keyword reference documentation.
---

QuestDB supports the following types of joins: `INNER`, `LEFT (OUTER)`, `CROSS`,
`ASOF`, and `SPLICE`. `FULL` joins are not yet implemented and are on our
roadmap. All supported join types can be combined in a single SQL statement;
QuestDB SQL's optimizer determines the best execution order and algorithms.

There are no known limitations on the size of tables or sub-queries used in
joins and there are no limitations on the number of joins, either.

## Syntax

High-level overview:

![Flow chart showing the syntax of the high-level syntax of the JOIN keyword](/img/docs/diagrams/joinOverview.svg)

- `selectClause` - see [SELECT](/docs/reference/sql/select/) for more
  information.
- `whereClause` - see [WHERE](/docs/reference/sql/where/) for more information.
- The specific syntax for `joinClause` depends on the type of `JOIN`:

  - `INNER` and `LEFT` `JOIN` allow arbitrary `JOIN` predicates, `operator`, in
    the mandatory `ON` clause:

  ![Flow chart showing the syntax of the INNER, LEFT JOIN keyword](/img/docs/diagrams/InnerLeftJoin.svg)

  - `ASOF`, `LT`, and `SPLICE` `JOIN` only allow `=` as the `JOIN` predicate in
    the optional `ON` clause:

  ![Flow chart showing the syntax of the ASOF, LT, and SPLICE JOIN keyword](/img/docs/diagrams/AsofLtSpliceJoin.svg)

  - `CROSS JOIN` does not allow the `ON` clause:

  ![Flow chart showing the syntax of the CROSS JOIN keyword](/img/docs/diagrams/crossJoin.svg)

Columns from joined tables are combined in a single row. Columns with the same
name originating from different tables will be automatically aliased to create a
unique column namespace of the resulting set.

Though it is usually preferable to explicitly specify join conditions, QuestDB
will analyze `WHERE` clauses for implicit join conditions and will derive
transient join conditions where necessary.

:::tip

When tables are joined on a column that has the same name in both tables you can
use the `ON (column)` shorthand.

:::

## Execution order

Join operations are performed in order of their appearance in a SQL query. The
following query performs a join on a table with one million rows based on a
column from a smaller table with one hundred rows:

```questdb-sql
SELECT * FROM 1_million_rows
INNER JOIN 1_hundred_rows
ON 1_million_rows.customer_id = 1_hundred_rows.referral_id;
```

The performance of this query can be improved by rewriting the query as follows:

```questdb-sql
SELECT * FROM 1_hundred_rows
INNER JOIN 1_million_rows
ON 1_million_rows.referral_id = 1_hundred_rows.customer_id;
```

## Implicit joins

It is possible to join two tables using the following syntax:

```questdb-sql
SELECT *
FROM a, b
WHERE a.id = b.id;
```

The type of join as well as the column will be inferred from the `WHERE` clause,
and may be either an `INNER` or `CROSS` join. For the example above, the
equivalent explicit statement would be:

```questdb-sql
SELECT *
FROM a
JOIN b ON (id);
```

## (INNER) JOIN

`(INNER) JOIN` is used to return rows from 2 tables where the records on the
compared column have matching values in both tables. `JOIN` is interpreted as
`INNER JOIN` by default, making the `INNER` keyword implicit.

The following query will return the `movieId` and the average rating from table
`ratings`. It will also add a column for the `title` from the table `movies`.
The corresponding title will be identified based on the `movieId` in the
`ratings` table matching an `id` in the `movies` table.

```questdb-sql title="INNER JOIN ON"
SELECT movieId a, title, avg(rating)
FROM ratings
INNER JOIN (SELECT movieId id, title FROM movies)
ON ratings.movieId = id;

-- Omitting 'INNER' makes the query equivalent:
SELECT movieId a, title, avg(rating)
FROM ratings
JOIN (SELECT movieId id, title FROM movies)
ON ratings.movieId = id;
```

## LEFT (OUTER) JOIN

`LEFT OUTER JOIN` or simply `LEFT JOIN` will return **all** records from the
left table, and if matched, the records of the right table. When there is no
match for the right table, it will return `NULL` values in right table fields.

The general syntax is as follows:

```questdb-sql title="LEFT JOIN ON"
SELECT tab1.colA, tab2.colB
FROM table1 tab1
LEFT OUTER JOIN table2 tab2
ON tab1.colA = tab2.colB;

-- Omitting 'OUTER' makes the query equivalent:
SELECT tab1.colA, tab2.colB
FROM table1 tab1
LEFT JOIN table2 tab2
ON tab1.colA = tab2.colB;
```

A `LEFT OUTER JOIN` query can also be used to select all rows in the left table
that do not exist in the right table.

```questdb-sql
SELECT tab1.colA, tab2.colB
FROM table1 tab1
LEFT OUTER JOIN table2 tab2
ON tab1.colA = tab2.colB
WHERE tab2.colB = NULL;
```

## CROSS JOIN

`CROSS JOIN` will return the Cartesian product of the two tables being joined
and can be used to create a table with all possible combinations of columns. The
following query will return all possible combinations of `starters` and
`deserts`:

```questdb-sql
SELECT *
FROM starters
CROSS JOIN deserts;
```

:::note

`CROSS JOIN` does not have an `ON` clause.

:::

## ASOF JOIN

`ASOF` joins are used on time series data to join two tables based on timestamps
that do not exactly match. For a given record at a given timestamp, it will
return the corresponding record in the other table at the closest timestamp
**prior to** the timestamp in the first table.

:::note

To be able to leverage `ASOF JOIN`, both joined tables must have a
[designated timestamp](/docs/concept/designated-timestamp/) column.

:::

`ASOF` join is performed on tables or result sets that are ordered by time. When
a table is created as ordered by time, the order of records is enforced and the
timestamp column name is in the table metadata. `ASOF` join will use this
timestamp column from metadata.

Given the following tables:

Table `asks`:

| ts                          | ask |
| --------------------------- | --- |
| 2019-10-17T00:00:00.000000Z | 100 |
| 2019-10-17T00:00:00.200000Z | 101 |
| 2019-10-17T00:00:00.400000Z | 102 |

Table `bids`:

| ts                          | bid |
| --------------------------- | --- |
| 2019-10-17T00:00:00.100000Z | 101 |
| 2019-10-17T00:00:00.300000Z | 102 |
| 2019-10-17T00:00:00.500000Z | 103 |

An `ASOF JOIN` query can look like the following:

```questdb-sql
SELECT bids.ts timebid, bid, ask
FROM bids
ASOF JOIN asks;
```

The above query returns these results:

| timebid                     | bid | ask |
| --------------------------- | --- | --- |
| 2019-10-17T00:00:00.100000Z | 101 | 100 |
| 2019-10-17T00:00:00.300000Z | 102 | 101 |
| 2019-10-17T00:00:00.500000Z | 103 | 102 |

Note that there are no records from the `asks` table at timestamp
`2019-10-17T00:00:00.100000Z`. The `ASOF JOIN` will look for the value in the
`bids` table that has the closest timestamp prior to or equal to the target
timestamp.

In case tables do not have a designated timestamp column, but data is in
chronological order, timestamp columns can be specified at runtime:

```questdb-sql
SELECT bids.ts timebid, bid, ask
FROM (bids timestamp(ts))
ASOF JOIN (asks timestamp (ts));
```

The query above assumes that there is only one instrument in `bids` and `asks`
tables and therefore does not use the optional `ON` clause. If both tables store
data for multiple instruments `ON` clause will allow you to find bids for asks
with matching instrument value:

```questdb-sql
SELECT *
FROM asks
ASOF JOIN bids ON (instrument);
```

:::caution

`ASOF` join does not check timestamp order, if data is not in chronological
order, the join result is non-deterministic.

:::

## LT JOIN

`LT` join is very similar to `ASOF`, except that it searches for the last row
from the right table strictly before the row from the left table. There will be
one or no rows joined from the right table per each row from the left table.

Consider the following tables:

Table `asks`:

| ts                          | ask |
| --------------------------- | --- |
| 2019-10-17T00:00:00.000000Z | 100 |
| 2019-10-17T00:00:00.300000Z | 101 |
| 2019-10-17T00:00:00.400000Z | 102 |

Table `bids`:

| ts                          | bid |
| --------------------------- | --- |
| 2019-10-17T00:00:00.000000Z | 101 |
| 2019-10-17T00:00:00.300000Z | 102 |
| 2019-10-17T00:00:00.500000Z | 103 |

An `LT JOIN` can be built using the following query:

```questdb-sql
SELECT bids.ts timebid, asks.ts timeask, bid, ask
FROM bids
LT JOIN asks;
```

The query above returns the following results:

| timebid                     | timeask                     | bid | ask  |
| --------------------------- | --------------------------- | --- | ---- |
| 2019-10-17T00:00:00.000000Z | NULL                        | 101 | NULL |
| 2019-10-17T00:00:00.300000Z | 2019-10-17T00:00:00.000000Z | 102 | 100  |
| 2019-10-17T00:00:00.500000Z | 2019-10-17T00:00:00.400000Z | 103 | 102  |

:::note

`LT` join is often useful to join a table to itself in order to get preceding
values for every row.

:::

## SPLICE JOIN

`SPLICE JOIN` is a full `ASOF JOIN`. It will return all the records from both
tables. For each record from left table splice join will find prevailing record
from right table and for each record from right table - prevailing record from
left table.

Considering the following tables:

Table `asks`:

| ts                          | ask |
| --------------------------- | --- |
| 2019-10-17T00:00:00.000000Z | 100 |
| 2019-10-17T00:00:00.200000Z | 101 |
| 2019-10-17T00:00:00.400000Z | 102 |

Table `bids`:

| ts                          | bid |
| --------------------------- | --- |
| 2019-10-17T00:00:00.100000Z | 101 |
| 2019-10-17T00:00:00.300000Z | 102 |
| 2019-10-17T00:00:00.500000Z | 103 |

A `SPLICE JOIN` can be built as follows:

```questdb-sql
SELECT bids.ts timebid, bid, ask
FROM bids
SPLICE JOIN asks;
```

This query returns the following results:

| timebid                     | bid  | ask |
| --------------------------- | ---- | --- |
| null                        | null | 100 |
| 2019-10-17T00:00:00.100000Z | 101  | 100 |
| 2019-10-17T00:00:00.100000Z | 101  | 101 |
| 2019-10-17T00:00:00.300000Z | 102  | 101 |
| 2019-10-17T00:00:00.300000Z | 102  | 102 |
| 2019-10-17T00:00:00.500000Z | 103  | 102 |

Note that the above query does not use the optional `ON` clause. In case you
need additional filtering on the two tables, the `ON` clause can be used as
follows:

```questdb-sql
SELECT ts timebid, instrument bidInstrument, bid, ask
FROM bids
SPLICE JOIN
    (
    SELECT ts timesask, instrument askInstrument, ask ask
    FROM asks
    )
    ON bidInstrument=askInstrument;
```
