---
title: DROP TABLE keyword
sidebar_label: DROP TABLE
description: DROP TABLE SQL keyword reference documentation.
---

`DROP TABLE` is used to permanently delete a table and its contents.

:::caution

This command irremediably deletes the data in the target table. Unless the 
table was created in a different volume than the standard, see 
[CREATE TABLE IN VOLUME](/docs/reference/sql/create-table/#table-target-volume), in
which case the table is only logically removed and data remains intact in 
its volume. In doubt, make sure you have created 
[backups](/docs/reference/sql/backup/) of your data.

:::

## Syntax

![Flow chart showing the syntax of the DROP TABLE keyword](/img/docs/diagrams/dropTable.svg)

### IF EXISTS

An optional `IF EXISTS` clause may be added directly after the `DROP TABLE`
keywords to indicate that the selected table should be dropped if it exists.

## Example

```questdb-sql
DROP TABLE ratings;
```

:::tip

To delete the data inside a table but keep the table and its structure, use
[TRUNCATE](/docs/reference/sql/truncate/).

:::
