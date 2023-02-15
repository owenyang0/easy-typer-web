---
title: Date and time functions
sidebar_label: Date and time
description: Date and time functions reference documentation.
---

This page describes the available functions to assist with performing time-based
calculations.

:::info

Checking if tables contain a designated timestamp column can be done via the
`tables()` and `table_columns()` functions which are described in the
[meta functions](/docs/reference/function/meta) documentation page.

:::

## systimestamp

`systimestamp()` - offset from UTC Epoch in microseconds. Calculates
`UTC timestamp` using system's real time clock. The value is affected by
discontinuous jumps in the system time (e.g., if the system administrator
manually changes the system time).

:::warning

`systimestamp()` value can change within the query execution timeframe and 
should not be used in WHERE clause to filter designated timestamp column.
Please use `now()` instead .  

:::

**Arguments:**

- `systimestamp()` does not accept arguments.

**Return value:**

Return value type is `timestamp`.

**Examples:**

```questdb-sql title="Insert current system timestamp"
INSERT INTO readings
VALUES(systimestamp(), 123.5);
```

| ts                          | reading |
| :-------------------------- | :------ |
| 2020-01-02T19:28:48.727516Z | 123.5   |

## sysdate

`sysdate()` - returns the timestamp of the host system as a `date` with
`millisecond` precision.

Calculates `UTC date` with millisecond precision using system's real time clock.
The value is affected by discontinuous jumps in the system time (e.g., if the
system administrator manually changes the system time).

:::warning

`sysdate()` value can change within the query execution timeframe and
should not be used in WHERE clause to filter designated timestamp column.
Please use `now()` instead .

:::

**Arguments:**

- `sysdate()` does not accept arguments.

**Return value:**

Return value type is `date`.

**Examples:**

```questdb-sql title="Insert current system date along with a value"
INSERT INTO readings
VALUES(sysdate(), 123.5);
```

| sysdate                     | reading |
| :-------------------------- | :------ |
| 2020-01-02T19:28:48.727516Z | 123.5   |

```questdb-sql title="Query based on last minute"
SELECT * FROM readings
WHERE date_time > sysdate() - 60000000L;
```

## now

`now()` - offset from UTC Epoch in microseconds.

Calculates `UTC timestamp` using system's real time clock. Unlike
`systimestamp()`, it does not change within the query execution timeframe and
should be used in WHERE clause to filter designated timestamp column relative to
current time, i.e.:

- `SELECT now() FROM long_sequence(200)` will return the same timestamp for all
  rows
- `SELECT systimestamp() FROM long_sequence(200)` will have new timestamp values
  for each row

**Arguments:**

- `now()` does not accept arguments.

**Return value:**

Return value type is `timestamp`.

**Examples:**

```questdb-sql title="Filter records to created within last day"
SELECT created, origin FROM telemetry
WHERE created > dateadd('d', -1, now());
```

| created                     | origin |
| :-------------------------- | :----- |
| 2021-02-01T21:51:34.443726Z | 1      |

```questdb-sql title="Query returns same timestamp in every row"
SELECT now() FROM long_sequence(3)
```

| now                         |
| :-------------------------- |
| 2021-02-01T21:51:34.443726Z |
| 2021-02-01T21:51:34.443726Z |
| 2021-02-01T21:51:34.443726Z |

```questdb-sql title="Query based on last minute"
SELECT * FROM readings
WHERE date_time > now() - 60000000L;
```

## timestamp_ceil

`timestamp_ceil(unit, timestamp)` - performs a ceiling calculation on a
timestamp by given unit.

A unit must be provided to specify which granularity to perform rounding.

**Arguments:**

`timestamp_ceil(unit, timestamp)` has the following arguments:

`unit` - may be one of the following:

- `T` milliseconds
- `s` seconds
- `m` minutes
- `h` hours
- `d` days
- `M` months
- `y` year

`timestamp` - any timestamp value

**Return value:**

Return value type is `timestamp`.

**Examples:**

```questdb-sql
WITH t AS (SELECT cast('2016-02-10T16:18:22.862145Z' AS timestamp) ts)
SELECT
  ts,
  timestamp_ceil('T', ts) c_milli,
  timestamp_ceil('s', ts) c_second,
  timestamp_ceil('m', ts) c_minute,
  timestamp_ceil('h', ts) c_hour,
  timestamp_ceil('d', ts) c_day,
  timestamp_ceil('M', ts) c_month,
  timestamp_ceil('y', ts) c_year
  FROM t
```

| ts                          | c_milli                     | c_second                    | c_minute                    | c_hour                      | c_day                       | c_month                     | c_year                       |
| :-------------------------- | :-------------------------- | :-------------------------- | :-------------------------- | :-------------------------- | :-------------------------- | :-------------------------- | :--------------------------- |
| 2016-02-10T16:18:22.862145Z | 2016-02-10T16:18:22.863000Z | 2016-02-10T16:18:23.000000Z | 2016-02-10T16:19:00.000000Z | 2016-02-10T17:00:00.000000Z | 2016-02-11T00:00:00.000000Z | 2016-03-01T00:00:00.000000Z | 2017-01-01T00:00:00.000000Z" |

## timestamp_floor

`timestamp_floor(unit, timestamp)` - performs a floor calculation on a timestamp
by given unit.

A unit must be provided to specify which granularity to perform rounding.

**Arguments:**

`timestamp_floor(unit, timestamp)` has the following arguments:

`unit` - may be one of the following:

- `T` milliseconds
- `s` seconds
- `m` minutes
- `h` hours
- `d` days
- `M` months
- `y` year

`timestamp` - any timestamp value

**Return value:**

Return value type is `timestamp`.

**Examples:**

```questdb-sql
WITH t AS (SELECT cast('2016-02-10T16:18:22.862145Z' AS timestamp) ts)
SELECT
  ts,
  timestamp_floor('T', ts) f_milli,
  timestamp_floor('s', ts) f_second,
  timestamp_floor('m', ts) f_minute,
  timestamp_floor('h', ts) f_hour,
  timestamp_floor('d', ts) f_day,
  timestamp_floor('M', ts) f_month,
  timestamp_floor('y', ts) f_year
  FROM t
```

| ts                          | f_milli                     | f_second                    | f_minute                    | f_hour                      | f_day                       | f_month                     | f_year                      |
| :-------------------------- | :-------------------------- | :-------------------------- | :-------------------------- | :-------------------------- | :-------------------------- | :-------------------------- | :-------------------------- |
| 2016-02-10T16:18:22.862145Z | 2016-02-10T16:18:22.862000Z | 2016-02-10T16:18:22.000000Z | 2016-02-10T16:18:00.000000Z | 2016-02-10T16:00:00.000000Z | 2016-02-10T00:00:00.000000Z | 2016-02-01T00:00:00.000000Z | 2016-01-01T00:00:00.000000Z |

## to_timestamp

`to_timestamp(string, format)` - converts `string` to `timestamp` by using the
supplied `format` to extract the value with microsecond precision.

When the `format` definition does not match the `string` input, the result will
be `null`.

For more information about recognized timestamp formats, see the
[date and timestamp format section](#date-and-timestamp-format).

**Arguments:**

- `string` is any string that represents a date and/or time.
- `format` is a string that describes the timestamp format in which `string` is
  expressed.

**Return value:**

Return value type is `timestamp`. QuestDB provides `timestamp` with microsecond
resolution. Input strings with nanosecond precision will be parsed but lose the
precision.

**Examples:**

```questdb-sql title="Pattern matching with microsecond precision"
SELECT to_timestamp('2020-03-01:15:43:21.127329', 'yyyy-MM-dd:HH:mm:ss.SSSUUU')
FROM long_sequence(1);
```

| to_timestamp                |
| :-------------------------- |
| 2020-03-01T15:43:21.127329Z |

```questdb-sql title="Precision loss when pattern matching with nanosecond precision"
SELECT to_timestamp('2020-03-01:15:43:00.000000001Z', 'yyyy-MM-dd:HH:mm:ss.SSSUUUNNNZ')
FROM long_sequence(1);
```

| to_timestamp                |
| :-------------------------- |
| 2020-03-01T15:43:00.000000Z |

```questdb-sql title="String does not match format"
SELECT to_timestamp('2020-03-01:15:43:21', 'yyyy')
FROM long_sequence(1);
```

| to_timestamp |
| :----------- |
| null         |

```questdb-sql title="Using with INSERT"
INSERT INTO measurements
values(to_timestamp('2019-12-12T12:15', 'yyyy-MM-ddTHH:mm'), 123.5);
```

| timestamp                   | value |
| :-------------------------- | :---- |
| 2019-12-12T12:15:00.000000Z | 123.5 |

Note that conversion of ISO timestamp format is optional. QuestDB automatically
converts `string` to `timestamp` if it is a partial or full form of
`yyyy-MM-ddTHH:mm:ss.SSSUUU` or `yyyy-MM-dd HH:mm:ss.SSSUUU` with a valid time
offset, `+01:00` or `Z`. See more examples in
[Native timestamp](/docs/reference/sql/where#native-timestamp-format)
format](/docs/reference/sql/where#native-timestamp-format).

## to_date

`to_date(string, format)` - converts string to `date` by using the supplied
`format` to extract the value.

Will convert a `string` to `date` using the format definition passed as an
argument. When the `format` definition does not match the `string` input, the
result will be `null`.

For more information about recognized timestamp formats, see the
[date and timestamp format section](#date-and-timestamp-format).

**Arguments:**

- `string` is any string that represents a date and/or time.
- `format` is a string that describes the `date format` in which `string` is
  expressed.

**Return value:**

Return value type is `date`

**Examples:**

```questdb-sql title="string matches format"
SELECT to_date('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss')
FROM long_sequence(1);
```

| to_date                  |
| :----------------------- |
| 2020-03-01T15:43:21.000Z |

```questdb-sql title="string does not match format"
SELECT to_date('2020-03-01:15:43:21', 'yyyy')
FROM long_sequence(1);
```

| to_date |
| :------ |
| null    |

```questdb-sql title="Using with INSERT"
INSERT INTO measurements
values(to_date('2019-12-12T12:15', 'yyyy-MM-ddTHH:mm'), 123.5);
```

| date                     | value |
| :----------------------- | :---- |
| 2019-12-12T12:15:00.000Z | 123.5 |

## to_str

`to_str(value, format)` - converts date or timestamp value to a string in the
specified format

Will convert a date or timestamp value to a string using the format definition
passed as an argument. When elements in the `format` definition are
unrecognized, they will be passed-through as string.

For more information about recognized timestamp formats, see the
[date and timestamp format section](#date-and-timestamp-format).

**Arguments:**

- `value` is any `date` or `timestamp`
- `format` is a timestamp format.

**Return value:**

Return value type is `string`

**Examples:**

- Basic example

```questdb-sql
SELECT to_str(systimestamp(), 'yyyy-MM-dd') FROM long_sequence(1);
```

| to_str     |
| :--------- |
| 2020-03-04 |

- With unrecognized timestamp definition

```questdb-sql
SELECT to_str(systimestamp(), 'yyyy-MM-dd gooD DAY 123') FROM long_sequence(1);
```

| to_str                  |
| :---------------------- |
| 2020-03-04 gooD DAY 123 |

## to_timezone

`to_timezone(timestamp, timezone)` - converts a timestamp value to a specified
timezone. For more information on the time zone database used for this function,
see the
[QuestDB time zone database documentation](/docs/guides/working-with-timestamps-timezones).

**Arguments:**

- `timestamp` is any `timestamp` as Unix timestamp or string equivalent
- `timezone` may be `Country/City` tz database name, time zone abbreviation such
  as `PST` or in UTC offset in string format.

**Return value:**

Return value type is `timestamp`

**Examples:**

- Unix UTC timestamp in microseconds to `Europe/Berlin`

```questdb-sql
SELECT to_timezone(1623167145000000, 'Europe/Berlin')
```

| to_timezone                 |
| :-------------------------- |
| 2021-06-08T17:45:45.000000Z |

- Unix UTC timestamp in microseconds to PST by UTC offset

```questdb-sql
SELECT to_timezone(1623167145000000, '-08:00')
```

| to_timezone                 |
| :-------------------------- |
| 2021-06-08T07:45:45.000000Z |

- Timestamp as string to `PST`

```questdb-sql
SELECT to_timezone('2021-06-08T13:45:45.000000Z', 'PST')
```

| to_timezone                 |
| :-------------------------- |
| 2021-06-08T06:45:45.000000Z |

## to_utc

`to_utc(timestamp, timezone)` - converts a timestamp by specified timezone to
UTC. May be provided a timezone in string format or a UTC offset in hours and
minutes. For more information on the time zone database used for this function,
see the
[QuestDB time zone database documentation](/docs/guides/working-with-timestamps-timezones).

**Arguments:**

- `timestamp` is any `timestamp` as Unix timestamp or string equivalent
- `timezone` may be `Country/City` tz database name, time zone abbreviation such
  as `PST` or in UTC offset in string format.

**Return value:**

Return value type is `timestamp`

**Examples:**

- Convert a Unix timestamp in microseconds from the `Europe/Berlin` timezone to
  UTC

```questdb-sql
SELECT to_utc(1623167145000000, 'Europe/Berlin')
```

| to_utc                      |
| :-------------------------- |
| 2021-06-08T13:45:45.000000Z |

- Unix timestamp in microseconds from PST to UTC by UTC offset

```questdb-sql
SELECT to_utc(1623167145000000, '-08:00')
```

| to_utc                      |
| :-------------------------- |
| 2021-06-08T23:45:45.000000Z |

- Timestamp as string in `PST` to UTC

```questdb-sql
SELECT to_utc('2021-06-08T13:45:45.000000Z', 'PST')
```

| to_utc                      |
| :-------------------------- |
| 2021-06-08T20:45:45.000000Z |

## dateadd

`dateadd(period, n, startDate)` - adds `n` `period` to `startDate`.

**Arguments:**

- `period` is a char. Period to be added. Available periods are `s`, `m`, `h`,
  `d`, `M`, `y`.
- `n` is an int. Number of periods to add.
- `startDate` is a timestamp or date. Timestamp to add the periods to.

**Return value:**

Return value type is `timestamp`

**Examples:**

```questdb-sql title="Adding hours"
SELECT systimestamp(), dateadd('h', 2, systimestamp())
FROM long_sequence(1);
```

| systimestamp                | dateadd                     |
| :-------------------------- | :-------------------------- |
| 2020-04-17T00:30:51.380499Z | 2020-04-17T02:30:51.380499Z |

```questdb-sql title="Adding days"
SELECT systimestamp(), dateadd('d', 2, systimestamp())
FROM long_sequence(1);
```

| systimestamp                | dateadd                     |
| :-------------------------- | :-------------------------- |
| 2020-04-17T00:30:51.380499Z | 2020-04-19T00:30:51.380499Z |

```questdb-sql title="Adding months"
SELECT systimestamp(), dateadd('M', 2, systimestamp())
FROM long_sequence(1);
```

| systimestamp                | dateadd                     |
| :-------------------------- | :-------------------------- |
| 2020-04-17T00:30:51.380499Z | 2020-06-17T00:30:51.380499Z |

## datediff

`datediff(period, date1, date2)` - returns the absolute number of `period`
between `date1` and `date2`.

**Arguments:**

- `period` is a char. Period to be added. Available periods are `s`, `m`, `h`,
  `d`, `M`, `y`.
- `date1` and `date2` are date or timestamp. Dates to compare

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Difference in days"
SELECT datediff(
    'd',
    to_timestamp('2020-01-23','yyyy-MM-dd'),
    to_timestamp('2020-01-27','yyyy-MM-dd'))
FROM long_sequence(1);
```

| datediff |
| :------- |
| 4        |

```questdb-sql title="Difference in months"
SELECT datediff(
    'M',
    to_timestamp('2020-01-23','yyyy-MM-dd'),
    to_timestamp('2020-02-24','yyyy-MM-dd'))
FROM long_sequence(1);
```

| datediff |
| :------- |
| 1        |

## millis

`millis(value)` - returns the `millis` of the second for a given date or
timestamp from `0` to `999`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Millis of the second"
SELECT millis(
    to_timestamp('2020-03-01:15:43:21.123456', 'yyyy-MM-dd:HH:mm:ss.SSSUUU'))
FROM long_sequence(1);
```

| millis |
| :----- |
| 123    |

```questdb-sql title="Parsing 3 digits when no unit is added after S"
SELECT millis(to_timestamp('2020-03-01:15:43:21.123', 'yyyy-MM-dd:HH:mm:ss.S'))
FROM long_sequence(1);
```

| millis |
| :----- |
| 123    |

```questdb-sql title="Using in an aggregation"
SELECT millis(ts), count() FROM transactions;
```

| second | count |
| :----- | :---- |
| 0      | 2323  |
| 1      | 6548  |
| ...    | ...   |
| 998    | 9876  |
| 999    | 2567  |

## micros

`micros(value)` - returns the `micros` of the millisecond for a given date or
timestamp from `0` to `999`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Micros of the second"
SELECT micros(to_timestamp('2020-03-01:15:43:21.123456', 'yyyy-MM-dd:HH:mm:ss.SSSUUU'))
FROM long_sequence(1);
```

| millis |
| :----- |
| 456    |

```questdb-sql title="Parsing 3 digits when no unit is added after U"
SELECT micros(to_timestamp('2020-03-01:15:43:21.123456', 'yyyy-MM-dd:HH:mm:ss.SSSU'))
FROM long_sequence(1);
```

| millis |
| :----- |
| 456    |

```questdb-sql title="Using in an aggregation"
SELECT micros(ts), count() FROM transactions;
```

| second | count |
| :----- | :---- |
| 0      | 2323  |
| 1      | 6548  |
| ...    | ...   |
| 998    | 9876  |
| 999    | 2567  |

## second

`second(value)` - returns the `second` of the minute for a given date or
timestamp from `0` to `59`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Second of the minute"
SELECT second(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'))
FROM long_sequence(1);
```

| second |
| :----- |
| 43     |

```questdb-sql title="Using in an aggregation"
SELECT second(ts), count() FROM transactions;
```

| second | count |
| :----- | :---- |
| 0      | 2323  |
| 1      | 6548  |
| ...    | ...   |
| 58     | 9876  |
| 59     | 2567  |

## minute

`minute(value)` - returns the `minute` of the hour for a given date or timestamp
from `0` to `59`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Minute of the hour"
SELECT minute(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'))
FROM long_sequence(1);
```

| minute |
| :----- |
| 43     |

```questdb-sql title="Using in an aggregation"
SELECT minute(ts), count() FROM transactions;
```

| minute | count |
| :----- | :---- |
| 0      | 2323  |
| 1      | 6548  |
| ...    | ...   |
| 58     | 9876  |
| 59     | 2567  |

## hour

`hour(value)` - returns the `hour` of day for a given date or timestamp from `0`
to `23`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Hour of the day"
SELECT hour(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'))
FROM long_sequence(1);
```

| hour |
| :--- |
| 12   |

```questdb-sql title="Using in an aggregation"
SELECT hour(ts), count() FROM transactions;
```

| hour | count |
| :--- | :---- |
| 0    | 2323  |
| 1    | 6548  |
| ...  | ...   |
| 22   | 9876  |
| 23   | 2567  |

## day

`day(value)` - returns the `day` of month for a given date or timestamp from `1`
to `31`.

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Day of the month"
SELECT day(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'))
FROM long_sequence(1);
```

| day |
| :-- |
| 01  |

```questdb-sql title="Using in an aggregation"
SELECT day(ts), count() FROM transactions;
```

| day | count |
| :-- | :---- |
| 1   | 2323  |
| 2   | 6548  |
| ... | ...   |
| 30  | 9876  |
| 31  | 2567  |

## month

`month(value)` - returns the `month` of year for a given date or timestamp from
`1` to `12`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Month of the year"
SELECT month(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'))
FROM long_sequence(1);
```

| month |
| :---- |
| 03    |

```questdb-sql title="Using in an aggregation"
SELECT month(ts), count() FROM transactions;
```

| month | count |
| :---- | :---- |
| 1     | 2323  |
| 2     | 6548  |
| ...   | ...   |
| 11    | 9876  |
| 12    | 2567  |

## year

`year(value)` - returns the `year` for a given date or timestamp

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Year"
SELECT year(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'))
FROM long_sequence(1);
```

| year |
| :--- |
| 2020 |

```questdb-sql title="Using in an aggregation"
SELECT month(ts), count() FROM transactions;
```

| year | count |
| :--- | :---- |
| 2015 | 2323  |
| 2016 | 9876  |
| 2017 | 2567  |

## is_leap_year

`is_leap_year(value)` - returns `true` if the `year` of `value` is a leap year,
`false` otherwise.

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `boolean`

**Examples:**

```questdb-sql
SELECT year(ts), is_leap_year(ts) FROM myTable;
```

| year | is_leap_year |
| :--- | :----------- |
| 2020 | true         |
| 2021 | false        |
| 2022 | false        |
| 2023 | false        |
| 2024 | true         |
| 2025 | false        |

## days_in_month

`days_in_month(value)` - returns the number of days in a month from a provided
timestamp or date.

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql
SELECT month(ts), days_in_month(ts) FROM myTable;
```

| month | days_in_month |
| :---- | :------------ |
| 4     | 30            |
| 5     | 31            |
| 6     | 30            |
| 7     | 31            |
| 8     | 31            |

## day_of_week

`day_of_week(value)` - returns the day number in a week from `1` (Monday) to `7`
(Sunday)

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql
SELECT to_str(ts,'EE'),day_of_week(ts) FROM myTable;
```

| day       | day_of_week |
| :-------- | :---------- |
| Monday    | 1           |
| Tuesday   | 2           |
| Wednesday | 3           |
| Thursday  | 4           |
| Friday    | 5           |
| Saturday  | 6           |
| Sunday    | 7           |

## day_of_week_sunday_first

`day_of_week_sunday_first(value)` - returns the day number in a week from `1`
(Sunday) to `7` (Saturday)

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql
SELECT to_str(ts,'EE'),day_of_week_sunday_first(ts) FROM myTable;
```

| day       | day_of_week_sunday_first |
| :-------- | :----------------------- |
| Monday    | 2                        |
| Tuesday   | 3                        |
| Wednesday | 4                        |
| Thursday  | 5                        |
| Friday    | 6                        |
| Saturday  | 7                        |
| Sunday    | 1                        |

## Date and timestamp format

The date and timestamp format is formed by units and arbitrary text. A unit is a
combination of letters representing a date or time component, as defined by the
table below. The letters used to form a unit are case-sensitive.

See
[Timestamps in QuestDB](/docs/guides/working-with-timestamps-timezones/#timestamps-in-questdb)
for more examples of how the units are used to parse inputs.

| Unit   | Date or Time Component                                                                                         | Presentation       | Examples                              |
| ------ | -------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------- |
| `G`    | Era designator                                                                                                 | Text               | AD                                    |
| `y`    | `y` single digit or greedy year, depending on the input digit number                                           | Year               | 1996; 96; 999; 3                      |
| `yy`   | Two digit year of the current century                                                                          | Year               | 96 (interpreted as 2096)              |
| `yyy`  | Three-digit year                                                                                               | Year               | 999                                   |
| `yyyy` | Four-digit year                                                                                                | Year               | 1996                                  |
| `M`    | Month in year                                                                                                  | Month              | July; Jul; 07                         |
| `w`    | Week in year                                                                                                   | Number             | 27                                    |
| `ww`   | ISO week of year                                                                                               | Number             | 2                                     |
| `D`    | Day in year                                                                                                    | Number             | 189                                   |
| `d`    | Day in month                                                                                                   | Number             | 10                                    |
| `F`    | Day of week in month                                                                                           | Number             | 2                                     |
| `E`    | Day name in week                                                                                               | Text               | Tuesday; Tue                          |
| `u`    | Day number of week (1 = Monday, ..., 7 = Sunday)                                                               | Number             | 1                                     |
| `a`    | Am/pm marker                                                                                                   | Text               | PM                                    |
| `H`    | Hour in day (0-23)                                                                                             | Number             | 0                                     |
| `k`    | Hour in day (1-24)                                                                                             | Number             | 24                                    |
| `K`    | Hour in am/pm (0-11)                                                                                           | Number             | 0                                     |
| `h`    | Hour in am/pm (1-12)                                                                                           | Number             | 12                                    |
| `m`    | Minute in hour                                                                                                 | Number             | 30                                    |
| `s`    | Second in minute                                                                                               | Number             | 55                                    |
| `SSS`  | 3-digit millisecond                                                                                            | Number             | 978                                   |
| `S`    | Millisecond up to 3 digits: `S` parses 1 digit when followed by another `unit`. Otherwise, it parses 3 digits. | Number             | 900                                   |
| `z`    | Time zone                                                                                                      | General time zone  | Pacific Standard Time; PST; GMT-08:00 |
| `Z`    | Time zone                                                                                                      | RFC 822 time zone  | -0800                                 |
| `X`    | Time zone                                                                                                      | ISO 8601 time zone | -08; -0800; -08:00                    |
| `UUU`  | 3-digit microsecond                                                                                            | Number             | 698                                   |
| `U`    | Microsecond up to 3 digits: `U` parses 1 digit when followed by another `unit`. Otherwise, it parses 3 digits. | Number             | 600                                   |
| `U+`   | 6-digit microsecond                                                                                            | Number             | 600                                   |
| `N`    | Nanosecond. QuestDB provides microsecond resolution so the parsed nanosecond will be truncated.                | Number             | N/A (truncated)                       |
| `N+`   | 9-digit nanosecond. QuestDB provides microsecond resolution so the parsed nanosecond will be truncated.        | Number             | N/A (truncated)                       |

### Examples for greedy year format `y`

The interpretation of `y` depends on the input digit number:

- If the input year is a two-digit number, the output timestamp assumes the
  current century.
- Otherwise, the number is interpreted as it is.

| Input year | Timestamp value interpreted by `y-M` | Notes                                                |
| ---------- | ------------------------------------ | ---------------------------------------------------- |
| `5-03`     | `0005-03-01T00:00:00.000000Z`        | Greedily parsing the number as it is                 |
| `05-03`    | `2005-03-01T00:00:00.000000Z`        | Greedily parsing the number assuming current century |
| `005-03`   | `0005-03-01T00:00:00.000000Z`        | Greedily parsing the number as it is                 |
| `0005-03`  | `0005-03-01T00:00:00.000000Z`        | Greedily parsing the number as it is                 |
