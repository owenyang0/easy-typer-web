---
title: UNION EXCEPT INTERSECT keywords
sidebar_label: UNION EXCEPT INTERSECT
description: UNION, EXCEPT, and INTERSECT  SQL keyword reference documentation.
---

## Overview

`UNION`, `EXCEPT`, and `INTERSECT` perform set operations.

`UNION` is used to combine the results of two or more queries.

`EXCEPT` and `INTERSECT` return distinct rows by comparing the results of two queries.

To work properly, all of the following must be true:

- Each query statement should return the same number of column.
- Each column to be combined should have data types that are either the same, or supported by `implicit cast`. See [CAST](/docs/reference/sql/cast) for more information.
- Columns in each query statement should be in the same order.

## Syntax

### UNION

![Flow chart showing the syntax of the UNION, EXCEPT & INTERSECT keyword](/img/docs/diagrams/union-except-intersect.svg)

- `UNION` returns distinct results.
- `UNION ALL` returns all results including duplicates.
- `EXCEPT` returns distinct rows from the left input query that are not returned by
  the right input query.
- `INTERSECT` returns rows that are returned by both input queries.

## Examples

The examples for the set operations use the following tables:

sensor_1:

| ID  | make              | city          |
| --- | ----------------- | ------------- |
| 1   | Honeywell         | New York      |
| 2   | United Automation | Miami         |
| 3   | Omron             | Miami         |
| 4   | Honeywell         | San Francisco |
| 5   | Omron             | Boston        |
| 6   | RS Pro            | Boston        |
| 1   | Honeywell         | New York      |

sensor_2:

| ID  | make              | city          |
| --- | ----------------- | ------------- |
| 1   | Honeywell         | San Francisco |
| 2   | United Automation | Boston        |
| 3   | Eberle            | New York      |
| 4   | Honeywell         | Boston        |
| 5   | Omron             | Boston        |
| 6   | RS Pro            | Boston        |

### UNION

```questdb-sql
sensor_1 UNION sensor_2
```

returns

| ID  | make              | city          |
| --- | ----------------- | ------------- |
| 1   | Honeywell         | New York      |
| 2   | United Automation | Miami         |
| 3   | Omron             | Miami         |
| 4   | Honeywell         | San Francisco |
| 5   | Omron             | Boston        |
| 6   | RS Pro            | Boston        |
| 1   | Honeywell         | San Francisco |
| 2   | United Automation | Boston        |
| 3   | Eberle            | New York      |
| 4   | Honeywell         | Boston        |


`UNION` eliminates duplication even when one of the queries returns nothing.

For instance:

```questdb-sql
sensor_1
UNION
sensor_2 WHERE ID>10;
```

returns:

| ID  | make              | city          |
| --- | ----------------- | ------------- |
| 1   | Honeywell         | New York      |
| 2   | United Automation | Miami         |
| 3   | Omron             | Miami         |
| 4   | Honeywell         | San Francisco |
| 5   | Omron             | Boston        |
| 6   | RS Pro            | Boston        |

The duplicate row in `sensor_1` is not returned as a result.



```questdb-sql
sensor_1 UNION ALL sensor_2
```

returns

| ID  | make              | city          |
| --- | ----------------- | ------------- |
| 1   | Honeywell         | New York      |
| 2   | United Automation | Miami         |
| 3   | Omron             | Miami         |
| 4   | Honeywell         | San Francisco |
| 5   | Omron             | Boston        |
| 6   | RS Pro            | Boston        |
| 1   | Honeywell         | San Francisco |
| 2   | United Automation | Boston        |
| 3   | Eberle            | New York      |
| 4   | Honeywell         | Boston        |
| 5   | Omron             | Boston        |
| 6   | RS Pro            | Boston        |

### EXCEPT

```questdb-sql
sensor_1 EXCEPT sensor_2
```

returns

| ID  | make              | city          |
| --- | ----------------- | ------------- |
| 1   | Honeywell         | New York      |
| 2   | United Automation | Miami         |
| 3   | Omron             | Miami         |
| 4   | Honeywell         | San Francisco |

### INTERSECT

```questdb-sql
sensor_1 INTERSECT sensor_2
```

returns

| ID  | make   | city   |
| --- | ------ | ------ |
| 5   | Omron  | Boston |
| 6   | RS Pro | Boston |

## Keyword execution priority

The QuestDB's engine processes the keywords from left to right, unless the priority is defined by parenthesis.

For example:

```questdb-sql

query_1 UNION query_2 EXCEPT query_3

```

is executed as:

```questdb-sql
(query_1 UNION query_2) EXCEPT query_3

```

Similarly, the following syntax:

```questdb-sql

query_1 UNION query_2 INTERSECT query_3

```

is executed as:

```questdb-sql
(query_1 UNION query_2) INTERSECT query_3

```



## Clauses

The set operations can be used with clauses such as `LIMIT`, `ORDER BY`, and `WHERE`. However, when the clause keywords are added after the set operations, the execution order for different clauses varies.

For `LIMIT` and `ORDER BY`, the clauses are applied after the set operations.

For example:

```questdb-sql
query_1 UNION query_2
LIMIT 3;

```
is executed as:

```questdb-sql
(query_1 UNION query_2)
LIMIT 3;

```

For `WHERE`, the clause is applied first to the query immediate prior to it.

```questdb-sql
query_1 UNION query_2
WHERE value = 1;

```

is executed as:

```questdb-sql
query_1 UNION (query_2
WHERE value = 1);

```

:::note

* QuestDB applies `GROUP BY` implicitly. See [GROUP BY reference](/docs/reference/sql/group-by) for more information.
* Quest does not support the clause `HAVING` yet.

:::

## Alias

When different aliases are used with set operations, the execution follows a left-right order and the output uses the first alias.

For example:

```questdb-sql
SELECT alias_1 FROM table_1
UNION
SELECT alias_2 FROM table_2;

```
The output shows `alias_1`.

