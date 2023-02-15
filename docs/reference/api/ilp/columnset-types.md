---
title: ILP Columnset Value Types
sidebar_label: Columnset Value Types
description: Describes all support value types in ILP columnset.
---

## Integer

64-bit signed integer values, which correspond to QuestDB type `long`. The
values are required to have `i` suffix. For example:

```shell
temps,device=cpu,location=south value=96i 1638202821000000000\n
```

Sometimes integer values are small and do not warrant 64 bits to store them. To
reduce storage for such values it is possible to create a table upfront with
smaller type, for example:

```questdb-sql
CREATE TABLE temps (device SYMBOL, location SYMBOL, value SHORT);
```

The line above will be accepted and `96i` will be cast to `short`.

:::info

Type casts that cause data loss will cause entire line to be rejected.

:::

### Cast table

The following `cast` operations are supported when existing table column type is
not `long`:

|           | `byte` | `short` | `int` | `long`   | `float` | `double` | `date` | `timestamp` |
| :-------- | :----- | :------ | :---- | :------- | :------ | :------- | :----- | :---------- |
| `integer` | cast   | cast    | cast  | `native` | cast    | cast     | cast   | cast        |

## Long256

Custom type, which correspond to QuestDB type `long256`. The values are hex
encoded 256-bit unsigned integer values with `i` suffix. For example:

```shell
temps,device=cpu,location=south value=0x123a4i 1638202821000000000\n
```

When column does not exist, it will be created with type `long256`. Values
overflowing 256-bit integer will cause the entire line to be rejected.

`long256` cannot be cast to anything else.

## Float

These values correspond to QuestDB type `double`. They actually do not have any
suffix, which might lead to a confusion. For example:

```shell
trade,ticker=BTCUSD price=30 1638202821000000000\n
```

`price` value will be stored as `double` even though it does not look like a
conventional double value would.

### Cast table

The following `cast` operations are supported when existing table column type is
not `double`:

|         | `float` | `double` |
| :------ | :------ | :------- |
| `float` | cast    | `native` |

## Boolean

These value correspond to QuestDB type `boolean`. In InfluxDB Line Protocol
`boolean` values can be represented in any of the following ways:

| Actual value | Single char lowercase | Single char uppercase | Full lowercase | Full camelcase | Full uppercase |
| :----------- | :-------------------- | :-------------------- | :------------- | :------------- | :------------- |
| `true`       | `t`                   | `T`                   | `true`         | `True`         | `TRUE`         |
| `false`      | `f`                   | `F`                   | `false`        | `False`        | `FALSE`        |

Example:

```shell
sensors,location=south warning=false\n
```

### Cast table

The following `cast` operations are supported when existing table column type is
not `boolean`:

|           | `boolean` | `byte` | `short` | `int` | `float` | `long` | `double` |
| :-------- | :-------- | :----- | :------ | :---- | :------ | :----- | :------- |
| `boolean` | `native`  | cast   | cast    | cast  | cast    | cast   | cast     |

When cast to numeric type, boolean `true` is `1` and `false` is `0`

## String

These value correspond to QuestDB type `string`. They must be enclosed in
quotes. The following characters in values must be escaped with a `\`: `"`,
`\n`, `\r` and `\`. For example:

```shell
trade,ticker=BTCUSD description="this is a \"rare\" value",user="John" 1638202821000000000\n
```

The result:

| timestamp           | ticker | description            | user |
| :------------------ | :----- | :--------------------- | :--- |
| 1638202821000000000 | BTCUSD | this is a "rare" value | John |

:::note

String values must be UTF-8 encoded before sending.

:::

### Cast table

The following `cast` operations are supported when existing table column type is
not `string`:

|          | `char` | `string` | `geohash` | `symbol` |
| :------- | :----- | :------- | :-------- | :------- |
| `string` | cast   | `native` | cast      | no       |

### Cast to CHAR

String value can be cast to `char` type if its length is less than 2 characters.
The following example are valid lines:

```shell
trade,ticker=BTCUSD status="A" 1638202821000000000\n
trade,ticker=BTCUSD status="" 1638202821000000001\n
```

The result:

| timestamp           | ticker | status |
| :------------------ | :----- | :----- |
| 1638202821000000000 | BTCUSD | A      |
| 1638202821000000001 | BTCUSD | `null` |

Casting strings with 2 or more characters to `char` will cause entire line to be
rejected.

### Cast to GEOHASH

String value can be cast to `geohash` type when the destination column exists
and is of a `GEOHASH` type already. Do make sure that column is created upfront.
Otherwise, ILP will create `STRING` column regardless of the value.

Example:

Upcasting is an attempt to store higher resolution `geohash` in a lower
resolution column. Let's create table before sending ILP message. Our `geohash`
column has resolution of 4 bits.

```questdb-sql
CREATE TABLE tracking (
    geohash GEOHASH(4b),
    ts TIMESTAMP
) TIMESTAMP(ts) PARTITION BY HOUR;
```

Send message including `16c` `geohash` value:

```shell
tracking,obj=VLCC\ STEPHANIE gh="9v1s8hm7wpkssv1h" 1000000000\n
```

The result. `geohash` value has been truncated to size of the column.

| ts                          | gh   |
| :-------------------------- | :--- |
| 1970-01-01T00:00:01.000000Z | 0100 |

Sending empty string value will insert `null` into `geohash` column of any size:

```shell
tracking,obj=VLCC\ STEPHANIE gh="" 2000000000\n
```

| ts                          | gh     |
| :-------------------------- | :----- |
| 1970-01-01T00:00:01.000000Z | `null` |

:::info Downcast of `geohash` value, which is inserting of lower resolution
values into higher resolution column, will cause the entire line to be rejected.
:::

## Timestamp

These value correspond to QuestDB type `timestamp`. Timestamp values are epoch
`microseconds` suffixed with `t`. In this example we're populating
_non-designated_ timestamp field `ts1`:

```shell
tracking,obj=VLCC\ STEPHANIE gh="9v1s8hm7wpkssv1h",ts1=10000t 1000000000\n
```

It is possible to populate _designated_ timestamp using `columnset`, although
this is not recommended. Let's see how this works in practice. Assuming table:

```questdb-sql
CREATE TABLE (loc SYMBOL, ts TIMESTAMP) TIMESTAMP(ts) PARTITION BY DAY;
```

When we send:

```shell title="Sending mixed desginated timestamp values"
tracking,loc=north ts=2000000000t 1000000000\n
tracking,loc=south ts=3000000000t\n
```

The result in `columnset` value always wins:

| loc   | ts         |
| :---- | :--------- |
| north | 2000000000 |
| south | 3000000000 |
