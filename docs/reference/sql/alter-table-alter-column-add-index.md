---
title: ALTER TABLE COLUMN ADD INDEX
sidebar_label: ADD INDEX
description: ADD INDEX SQL keyword reference documentation.
---

Indexes an existing [`symbol`](/docs/concept/symbol) column.

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of the ALTER TABLE with ADD INDEX keyword](/img/docs/diagrams/alterTableAddIndex.svg)

Adding an index is an atomic, non-blocking and non-waiting operation. Once
complete, the SQL optimizer will start using the new index for SQL executions.

:::info

For more information about indexes please refer to the
[INDEX documentation](/docs/concept/indexes)

:::

## Example

```questdb-sql title="Adding an index"
ALTER TABLE trades ALTER COLUMN instrument ADD INDEX;
```
