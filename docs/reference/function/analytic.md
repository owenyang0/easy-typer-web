---
title: Analytic functions
sidebar_label: Analytic
description: Analytic functions reference documentation.
---

This page describes the available analytic functions. QuestDB is working on
adding more analytic functions.

An analytic function performs a calculation across a set of table rows that are
somehow related to the current row.

## Syntax

![Flow chart showing the syntax of an analytic function](/img/docs/diagrams/analyticFunction.svg)

Analytic functions are used with an `OVER` clause to define the way data is
grouped and processed. The `OVER` clause is used with `PARTITION BY` and
`ORDER BY` to set unique parameters and organize the rows.

## row_number

`row_number()` - assigns a row number to each row in a result set. For each
partition, the row number starts with one and increments by one.

**Arguments:**

- `row_number` does not require arguments.

**Return value:**

Return value type is `long`.

**Description**

`row_number()` returns values dynamically and there is no guarantee that the
rows returned will be ordered exactly the same with each execution of the query.
Hence, an `ORDER BY` outside of the `OVER()` clause can be used to ensure the
output order.

**Examples:**

Given a table `trades`, the queries below use `row_number()` with a `WHERE`
clause to filter trading records added within one day.

The following query assigns row numbers and orders output based on them:

```questdb-sql
SELECT
symbol,
side,
price,
amount,
row_number() OVER () AS row_num
FROM trades
WHERE timestamp > dateadd('d', -1, now())
ORDER BY row_num ASC;
-- The ORDER BY clause arranges the output based on the assigned row_num.
```

| symbol  | side | price    | amount     | row_num |
| :------ | :--- | :------- | :--------- | :------ |
| BTC-USD | sell | 20633.47 | 0.17569298 | 1       |
| ETH-USD | sell | 1560.04  | 1.3289     | 2       |
| ETH-USD | sell | 1560.04  | 0.3        | 3       |
| ETH-USD | sell | 1560     | 1.40426786 | 4       |
| BTC-USD | buy  | 20633.48 | 0.00179092 | 5       |

The following query groups the table based on `symbol` and assigns row numbers
to each group based on `price`:

```questdb-sql
SELECT
symbol,
side,
price,
amount,
row_number() OVER (PARTITION BY symbol ORDER BY price) AS row_num
FROM trades
WHERE timestamp > dateadd('d', -1, now())
ORDER BY row_num ASC;
-- The ORDER BY clause arranges the output based on the assigned row_num.
```

| symbol  | side | price   | amount     | row_num |
| :------ | :--- | :------ | :--------- | :------ |
| BTC-USD | Sell | 1479.41 | 0.10904633 | 1       |
| ETH-USD | Sell | 20000   | 0.1        | 1       |
| BTC-USD | Sell | 1479.45 | 0.02       | 2       |
| ETH-USD | Sell | 20000   | 0.000249   | 2       |
