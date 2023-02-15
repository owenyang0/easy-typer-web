---
title: Meta functions
sidebar_label: Meta
description: Table and database metadata function reference documentation.
---

These functions provide table information including column details and metadata.
These functions are particularly useful for checking if tables contain a
[designated timestamp](/docs/concept/designated-timestamp) column.

## table_columns

`table_columns('tableName')` returns the schema of a table

**Arguments:**

- `tableName` is the name of an existing table as a string

**Return value:**

Returns a `table` with the following columns:

- `column` - name of the available columns in the table
- `type` - type of the column
- `indexed` - if indexing is applied to this column
- `indexBlockCapacity` - how many row IDs to store in a single storage block on
  disk
- `symbolCached` - whether this `symbol` column is cached
- `symbolCapacity` - how many distinct values this column of `symbol` type is
  expected to have
- `designated` - if this is set as the designated timestamp column for this
  table

For more details on the meaning and use of these values, see the
[CREATE TABLE](/docs/reference/sql/create-table/) documentation.

**Examples:**

```questdb-sql title="Get all columns in a table"
table_columns('my_table')
```

| column | type      | indexed | indexBlockCapacity | symbolCached | symbolCapacity | designated |
|--------|-----------|---------|--------------------|--------------|----------------|------------|
| symb   | SYMBOL    | true    | 1048576            | false        | 256            | false      |
| price  | DOUBLE    | false   | 0                  | false        | 0              | false      |
| ts     | TIMESTAMP | false   | 0                  | false        | 0              | true       |
| s      | STRING    | false   | 0                  | false        | 0              | false      |

```questdb-sql title="Get designated timestamp column"
SELECT column, type, designated FROM table_columns('my_table') WHERE designated
```

| column | type      | designated |
|--------|-----------|------------|
| ts     | TIMESTAMP | true       |

```questdb-sql title="Get the count of column types"
SELECT type, count() FROM table_columns('my_table');
```

| type      | count |
|-----------|-------|
| SYMBOL    | 1     |
| DOUBLE    | 1     |
| TIMESTAMP | 1     |
| STRING    | 1     |

## tables

`tables()` returns all tables in the database including table metadata.

**Arguments:**

- `tables()` does not require arguments.

**Return value:**

Returns a `table`.

**Examples:**

```questdb-sql title="List all tables"
tables();
```

| id  | name        | designatedTimestamp | partitionBy | maxUncommittedRows | o3MaxLag   | walEnabled | directoryName    |
|-----|-------------|---------------------|-------------|--------------------|------------|------------|------------------|
| 1   | my_table    | ts                  | DAY         | 500000             | 30000000 0 | false      | my_table         |
| 2   | device_data | null                | NONE        | 10000              | 30000000   | false      | device_data      |
| 3   | short_lived | null                | HOUR        | 10000              | 30000000   | false      | short_lived (->) |

```questdb-sql title="All tables in reverse alphabetical order"
tables() ORDER BY name DESC;
```

| id  | name        | designatedTimestamp | partitionBy | maxUncommittedRows | o3MaxLag  | walEnabled | directoryName    |
|-----|-------------|---------------------|-------------|--------------------|-----------|------------|------------------|
| 2   | device_data | null                | NONE        | 10000              | 30000000  | false      | device_data      |
| 1   | my_table    | ts                  | DAY         | 500000             | 300000000 | false      | my_table         |
| 3   | short_lived | ts                  | HOUR        | 10000              | 30000000  | false      | short_lived (->) |


:::note

`(->)` means the table was created using the [IN VOLUME](/docs/reference/sql/create-table/#table-target-volume) clause.

:::


```questdb-sql title="All tables with a daily partitioning strategy"
tables() WHERE partitionBy = 'DAY'
```

| id  | name     | designatedTimestamp | partitionBy | maxUncommittedRows | walEnabled | directoryName |
|-----|----------|---------------------|-------------|--------------------|------------|---------------|
| 1   | my_table | ts                  | DAY         | 500000             | true       | my_table      |

## wal_tables

`wal_tables()` returns the WAL status for all [WAL tables](/docs/concept/write-ahead-log/) in the database.

**Arguments:**

- `wal_tables()` does not require arguments.

**Return value:**

Returns a `table` including the following information:

- `name` - table name
- `suspended` - suspended status flag
- `writerTxn` - the last committed transaction in TableWriter
- `sequencerTxn` - the last committed transaction in the sequencer

**Examples:**

```questdb-sql title="List all tables"
wal_tables();
```

| name        | suspended | writerTxn | sequencerTxn | 
| ----------- |-----------|-----------|--------------| 
| sensor_wal  | false     | 2         | 4            | 
| weather_wal | false     | 3         | 3            | 
| test_wal    | true      | 7         | 9            | 