---
title: ALTER TABLE SET PARAM
sidebar_label: SET PARAM
description: SET PARAM SQL keyword reference documentation.
---

`ALTER TABLE SET PARAM` sets table parameters via SQL.

:::note

- Checking table metadata can be done via the `tables()` and `table_columns()`
  functions, as described in the [meta functions](/docs/reference/function/meta)
  documentation page.

:::

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of the ALTER TABLE SET PARA keywords](/img/docs/diagrams/alterTableSetParam.svg)

`maxUncommittedRows` - defines the maximum number of uncommitted rows per-table
to keep in memory before triggering a commit for a specific table.

The purpose of specifying maximum uncommitted rows per table is to reduce the
occurrences of resource-intensive commits when ingesting out-of-order data.

The global setting for the same parameter is `cairo.max.uncommitted.rows`.

## Example

The values for `maximum uncommitted rows` can be changed per each table with the
following SQL:

```questdb-sql title="Altering out-of-order parameters via SQL"
ALTER TABLE my_table SET PARAM maxUncommittedRows = 10000
```

Checking the values per-table may be done using the `tables()` function:

```questdb-sql title="List table metadata"
SELECT id, name, maxUncommittedRows FROM tables();
```

| id  | name     | maxUncommittedRows |
| --- | -------- | ------------------ |
| 1   | my_table | 10000              |

For more details on retrieving table and column information, see the
[meta functions documentation](/docs/reference/function/meta).

## Parameters for QuestDB 6.5.5 and earlier versions

:::note

**Deprecated content**

- For QuestDB 6.5.5 and earlier versions, the following keywords are useful for
  configuring out-of-order ILP data ingestion on a per-table basis. For more
  information on more details and when to apply them, see the documentation for
  [out-of-order data commits](/docs/guides/out-of-order-commit-lag) and
  [ILP commit strategy](/docs/reference/api/ilp/tcp-receiver#commit-strategy).

- From QuestDB 6.6 onwards, the database adjusts relevant settings automatically
  and provides maximum ingestion speed.

:::

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of the ALTER TABLE SET PARA with commit lag keywords](/img/docs/diagrams/alterTableSetParamCommitLag.svg)

For context on commit lag, see the guide for
[configuring commit lag of out-of-order data](/docs/guides/out-of-order-commit-lag)
and [ILP commit strategy](/docs/reference/api/ilp/tcp-receiver#commit-strategy).

`commitLag` allows for specifying the expected maximum _lag_ of late-arriving
records when ingesting out-of-order data. The purpose of specifying a commit lag
per table is to reduce the occurrences of resource-intensive commits when
ingesting out-of-order data. Incoming records will be kept in memory until for
the duration specified in _lag_, then all records up to the boundary will be
ordered and committed.

`commitLag` expects a value with a modifier to specify the unit of time for the
value:

| unit | description  |
| ---- | ------------ |
| us   | microseconds |
| s    | seconds      |
| m    | minutes      |
| h    | hours        |
| d    | days         |

To specify `commitLag` value to 20 seconds:

```questdb-sql
ALTER TABLE my_table SET PARAM commitLag = 20s
```
