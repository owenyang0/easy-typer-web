---
title: CASE keyword
sidebar_label: CASE
description: CASE SQL keyword reference documentation.
---

## Syntax

![Flow chart showing the syntax of CASE](/img/docs/diagrams/case.svg)

## Description

`CASE` goes through a set of conditions and returns a value corresponding to the
first condition met. Each new condition follows the `WHEN condition THEN value`
syntax. The user can define a return value when no condition is met using
`ELSE`. If `ELSE` is not defined and no conditions are met, then case returns
`null`.

## Examples

Assume the following data

| name  | age |
| ----- | --- |
| Tom   | 4   |
| Jerry | 19  |
| Anna  | 25  |
| Jack  | 8   |

```questdb-sql title="CASE with ELSE"
SELECT
name,
CASE
    WHEN age > 18 THEN 'major'
    ELSE 'minor'
END
FROM my_table
```

Result

| name  | case  |
| ----- | ----- |
| Tom   | minor |
| Jerry | major |
| Anna  | major |
| Jack  | minor |

```questdb-sql title="CASE without ELSE"
SELECT
name,
CASE
    WHEN age > 18 THEN 'major'
END
FROM my_table
```

Result

| name  | case  |
| ----- | ----- |
| Tom   | null  |
| Jerry | major |
| Anna  | major |
| Jack  | null  |
