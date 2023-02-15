---
title: Java (embedded)
description: Java embedded API reference documentation.
---

import CodeBlock from "@theme/CodeBlock"
import InterpolateReleaseData from "../../../src/components/InterpolateReleaseData"

QuestDB is written in Java and can be used as any other Java library. Moreover,
it is a single JAR with no additional dependencies.

To include QuestDB in your project, use the following:

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="maven" values={[
  { label: "Maven", value: "maven" },
  { label: "Gradle", value: "gradle" },
]}>


<TabItem value="maven">


<InterpolateReleaseData
  renderText={(release) => {
    return (
      <CodeBlock className="language-xml" title={"JDK11"}>
        {`
<dependency>
  <groupId>org.questdb</groupId>
  <artifactId>questdb</artifactId>
  <version>${release.name}</version>
</dependency>
      `}
      </CodeBlock>
    )
  }}
/>

<InterpolateReleaseData
  renderText={(release) => {
    return (
      <CodeBlock className="language-xml" title={"JDK8"}>
        {`
<dependency>
  <groupId>org.questdb</groupId>
  <artifactId>questdb</artifactId>
  <version>${release.name}-jdk8</version>
</dependency>
      `}
      </CodeBlock>
    )
  }}
/>

</TabItem>


<TabItem value="gradle">


<InterpolateReleaseData
  renderText={(release) => {
    return (
      <CodeBlock className="language-shell" title={"JDK11"}>
        implementation 'org.questdb:questdb:{release.name}'
      </CodeBlock>
    )
  }}
/>

<InterpolateReleaseData
  renderText={(release) => {
    return (
      <CodeBlock className="language-shell" title={"JDK8"}>
        implementation 'org.questdb:questdb:{release.name}-jdk8'
      </CodeBlock>
    )
  }}
/>

</TabItem>


</Tabs>


## Writing data

This section provides example codes to write data to WAL and non-WAL tables. See
[Write Ahead Log](docs/concept/write-ahead-log) for details about the
differences between WAL and non-WAL tables.

The following writers are available for data ingestion:

- `WalWriter` for WAL tables
- `TableWriter` for non-WAL tables
- `TableWriterAPI` for both WAL and non-WAL tables as it is an interface for
  `WalWriter` and `Table Writer`

### Writing data using `WalWriter`

The `WalWriter` facilitates table writes to WAL tables. To successfully create
an instance of `WalWriter`, the table must already exist.

```java title="Example WalWriter"

try (CairoEngine engine = new CairoEngine(configuration)) {
    final SqlExecutionContext ctx = new SqlExecutionContextImpl(engine, 1);
    try (SqlCompiler compiler = new SqlCompiler(engine)) {
        compiler.compile("create table testTable (" +
                "a int, b byte, c short, d long, e float, g double, h date, " +
                "i symbol, j string, k boolean, l geohash(8c), ts timestamp" +
                ") timestamp(ts) partition by day WAL", ctx);

        // write data into WAL
        try (WalWriter writer = engine.getWalWriter(ctx.getCairoSecurityContext(), "testTable")) {
            for (int i = 0; i < 3; i++) {
                TableWriter.Row row = writer.newRow(Os.currentTimeMicros());
                row.putInt(0, 123);
                row.putByte(1, (byte) 1111);
                row.putShort(2, (short) 222);
                row.putLong(3, 333);
                row.putFloat(4, 4.44f);
                row.putDouble(5, 5.55);
                row.putDate(6, System.currentTimeMillis());
                row.putSym(7, "xyz");
                row.putStr(8, "abc");
                row.putBool(9, true);
                row.putGeoHash(10, GeoHashes.fromString("u33dr01d", 0, 8));
                row.append();
            }
            writer.commit();
        }

        // apply WAL to the table
        try (ApplyWal2TableJob walApplyJob = new ApplyWal2TableJob(engine, 1, 1)) {
            while (walApplyJob.run(0));
        }
    }
}
```

### Writing data using `TableWriter`

Non-WAL tables do not allow concurrent writes via multiple interfaces. To
successfully create an instance, the table must:

- Already exist
- Have no other open writers against it as the `TableWriter` constructor will
  attempt to obtain an exclusive cross-process lock on the table.

```java title="Example TableWriter"

final CairoConfiguration configuration = new DefaultCairoConfiguration("dbRoot");
try (CairoEngine engine = new CairoEngine(configuration)) {
    final SqlExecutionContext ctx = new SqlExecutionContextImpl(engine, 1);
    try (SqlCompiler compiler = new SqlCompiler(engine)) {
        compiler.compile("create table testTable (" +
                "a int, b byte, c short, d long, e float, g double, h date, " +
                "i symbol, j string, k boolean, l geohash(8c), ts timestamp" +
                ") timestamp(ts) partition by day", ctx);

        // write data directly into the table
        try (TableWriter writer = engine.getWriter(ctx.getCairoSecurityContext(), "testTable", "test")) {
            for (int i = 0; i < 11; i++) {
                TableWriter.Row row = writer.newRow(Os.currentTimeMicros());
                row.putInt(0, 123);
                row.putByte(1, (byte) 1111);
                row.putShort(2, (short) 222);
                row.putLong(3, 333);
                row.putFloat(4, 4.44f);
                row.putDouble(5, 5.55);
                row.putDate(6, System.currentTimeMillis());
                row.putSym(7, "xyz");
                row.putStr(8, "abc");
                row.putBool(9, true);
                row.putGeoHash(10, GeoHashes.fromString("u33dr01d", 0, 8));
                row.append();
            }
            writer.commit();
        }
    }
}

```

### Writing data using `TableWriterAPI`

`TableWriterAPI` allows writing to both WAL and non-WAL tables by returning the
suitable `Writer` based on the table configurations. The table must already
exist:

```java title="Example TableWriterAPI"

try (CairoEngine engine = new CairoEngine(configuration)) {
    final SqlExecutionContext ctx = new SqlExecutionContextImpl(engine, 1);
    try (SqlCompiler compiler = new SqlCompiler(engine)) {
        compiler.compile("create table testTable (" +
                "a int, b byte, c short, d long, e float, g double, h date, " +
                "i symbol, j string, k boolean, l geohash(8c), ts timestamp" +
                ") timestamp(ts) partition by day WAL", ctx);

        // write data into the table
        try (TableWriterAPI writer = engine.getTableWriterAPI(ctx.getCairoSecurityContext(), "testTable", "test")) {
            for (int i = 0; i < 3; i++) {
                TableWriter.Row row = writer.newRow(Os.currentTimeMicros());
                row.putInt(0, 123);
                row.putByte(1, (byte) 1111);
                row.putShort(2, (short) 222);
                row.putLong(3, 333);
                row.putFloat(4, 4.44f);
                row.putDouble(5, 5.55);
                row.putDate(6, System.currentTimeMillis());
                row.putSym(7, "xyz");
                row.putStr(8, "abc");
                row.putBool(9, true);
                row.putGeoHash(10, GeoHashes.fromString("u33dr01d", 0, 8));
                row.append();
            }
            writer.commit();
        }

        // apply WAL to the table
        try (ApplyWal2TableJob walApplyJob = new ApplyWal2TableJob(engine, 1, 1)) {
            while (walApplyJob.run(0));
        }
    }
}
```

### Detailed steps

#### Configure Cairo engine

CairoEngine is a resource manager for the embedded QuestDB. Its main function is
to facilitate concurrent access to pools of `TableReader` and suitable writer
instances.

```java title="New CairoEngine instance"
final CairoConfiguration configuration = new DefaultCairoConfiguration("data_dir");
try (CairoEngine engine = new CairoEngine(configuration)) {
```

A typical application will need only one instance of `CairoEngine`. This
instance will start when the application starts and shuts down when the
application closes. You will need to close `CairoEngine` gracefully when the
application stops.

QuestDB provides a default configuration which only requires the
`data directory` to be specified. For a more advanced usage, the whole
`CairoConfiguration` interface can be overridden.

#### Create an instance of SqlExecutionContext

Execution context is a conduit for passing SQL execution artifacts to the
execution site. This instance is not thread-safe and it must not be shared
between threads.

```java title="Example of execution context"
final SqlExecutionContextImpl ctx = new SqlExecutionContextImpl(engine, 1);
```

The second argument is the number of threads that will be helping to execute SQL
statements. Unless you are building another QuestDB server, this value should
always be 1.

#### New SqlCompiler instance and blank table

Before we start writing data using a writer, the target table has to exist.
There are several ways to create a new table and we recommend using
`SqlCompiler`:

```java title="Creating new table"

// Create a non-WAL table:

try (SqlCompiler compiler = new SqlCompiler(engine)) {
    compiler.compile("create table abc (a int, b byte, c short, d long, e float, g double, h date, i symbol, j string, k boolean, l geohash(8c), ts timestamp) timestamp(ts) bypass wal", ctx);

// Create a WAL table:

try (SqlCompiler compiler = new SqlCompiler(engine)) {
    compiler.compile("create table abc (a int, b byte, c short, d long, e float, g double, h date, i symbol, j string, k boolean, l geohash(8c), ts timestamp) timestamp(ts) wal", ctx);
```

As you will be able to see below, the table field types and indexes must match
the code that is populating the table.

#### A new writer instance

We use `engine` to create an instance of the writer. This will enable reusing
this writer instance later, when we use the same method of creating table writer
again.

```java title="New table writer instance for a non-WAL table"

try (TableWriter writer = engine.getWriter(ctx.getCairoSecurityContext(), "abc", "testing")) {
```

```java title="New table writer instance for a WAL table"

try (WalWriter writer = engine.getWriter(ctx.getCairoSecurityContext(), "abc")) {
```

```java title="New table writer instance for either a WAL or non-WAL table"

try (TableWriterAPI writer = engine.getTableWriterAPI(ctx.getCairoSecurityContext(), "abc", "testing")) {

```

`TableWriter` - A non-WAL table uses `TableWriter`, which will hold an exclusive
lock on table `abc` until it is closed and `testing` will be used as the lock
reason. This lock is both intra- and inter-process. If you have two Java
applications accessing the same table only one will succeed at one time.

`WalWriter` - A WAL table uses `WalWriter` to enable concurrent data ingestion,
data modification, and schema changes, as the table is not locked.

`TableWriterAPI` - Both WAL and Non-WAL tables can use `TableWriterAPI`. It is
an interface implemented by both writers.

#### Create a new row

```java title="Creating new table row with timestamp"
TableWriter.Row row = writer.newRow(Os.currentTimeMicros());
```

Although this operation semantically looks like a new object creation, the row
instance is actually being re-used under the hood. A Timestamp is necessary to
determine a partition for the new row. Its value has to be either increment or
stay the same as the last row. When the table is not partitioned and does not
have a designated timestamp column, the timestamp value can be omitted.

```java title="Creating new table row without timestamp"
TableWriter.Row row = writer.newRow();
```

#### Populate columns

There are put\* methods for every supported data type. Columns are updated by an
index as opposed to by name.

```java title="Populating table column"
row.putLong(3, 333);
```

Column update order is not important and updates can be sparse. All unset
columns will default to NULL values.

#### Append a row

Following method call:

```java title="Appending a new row"
row.append();
```

Appended rows are not visible to readers until they are committed. An unneeded
row can also be canceled if required.

```java title="Cancelling half-populated row"
row.cancel();
```

A pending row is automatically cancelled when `writer.newRow()` is called.
Consider the following scenario:

```java
TableWriter.Row row = writer.newRow(Os.currentTimeMicros());
row.putInt(0, 123);
row.putByte(1, (byte) 1111);
row.putShort(2, (short) 222);
row.putLong(3, 333);
row = writer.newRow(Os.currentTimeMicros());
...
```

Second `newRow()` call would cancel all the updates to the row since the last
`append()`.

#### Commit changes

To make changes visible to readers, writer has to commit. `writer.commit` does
this job. Unlike traditional SQL databases, the size of the transaction does not
matter. You can commit anything between 1 and 1 trillion rows. We also spent
considerable effort to ensure `commit()` is lightweight. You can drip one row at
a time in applications that require such behaviour.

## Writing columns in blocks

QuestDB supports writing blocks of columnar data at once via the use of the
`TableBlockWriter`. The `TableBlockWriter` instance is obtained from a
`TableWriter` and can then be used to write in memory frames of columnar data. A
frame of columnar data is just a piece of contiguous memory with each column
value stored in it one after another. The `TableBlockWriter` will allow any
number of such frames of columnar data to be written with an invocation of the
`appendPageFrameColumn` method, before the block is either committed or
cancelled (rolled back). Use of the `TableBlockWriter` requires that all columns
have the same number of rows written to them and within each column the frames
need to be added in append order.

A `PageFrame` instance can optionally be used as a convenient interface to hold
the columnar frames and a `PageFrameCursor` instance can be used as an interface
to provide a sequence of frames to be committed. Many of QuestDB's
`RecordCursorFactory` implementations provide a `PageFrameCursor`.

```java title="Example table block writer"
final CairoConfiguration configuration = new DefaultCairoConfiguration("data_dir");
try (CairoEngine engine = new CairoEngine(configuration)) {
    final SqlExecutionContextImpl ctx = new SqlExecutionContextImpl(engine, 1);
    try (SqlCompiler compiler = new SqlCompiler(engine)) {

        PageFrameCursor cursor = ...; // Setup PageFrameCursor instance
        compiler.compile("create table abc (a int, b byte, c short, d long, e float, g double, h date, i symbol, j string, k boolean, l geohash(8c), ts timestamp) timestamp(ts)", ctx);

        try (TableWriter writer = engine.getWriter(ctx.getCairoSecurityContext(), "abc", "testing")) {
            int columnCount = writer.getMetadata().getColumnCount();
            TableBlockWriter blockWriter = writer.newBlock();

            PageFrame frame;
            while ((frame = cursor.next()) != null) {
                for (int columnIndex = 0; columnIndex < columnCount; columnIndex++) {
                    blockWriter.appendPageFrameColumn(
                            columnIndex,
                            frame.getPageSize(columnIndex),
                            frame.getPageAddress(columnIndex));
                }
            }
            blockWriter.commit();
        }
    }
}
```

## Executing queries

We provide a single API for executing all kinds of SQL queries. The example
below focuses on `SELECT` and how to fetch data from a cursor.

```java title="Compiling SQL"
final CairoConfiguration configuration = new DefaultCairoConfiguration(temp.getRoot().getAbsolutePath());
try (CairoEngine engine = new CairoEngine(configuration)) {
    final SqlExecutionContextImpl ctx = new SqlExecutionContextImpl(engine, 1);
    try (SqlCompiler compiler = new SqlCompiler(engine)) {
        try (RecordCursorFactory factory = compiler.compile("abc", ctx).getRecordCursorFactory()) {
            try (RecordCursor cursor = factory.getCursor(ctx)) {
                final Record record = cursor.getRecord();
                while (cursor.hasNext()) {
                    // access 'record' instance for field values
                }
            }
        }
    }
}
```

### Detailed steps

The steps to setup CairoEngine, execution context and SqlCompiler are the same
as those we explained in [writing data](#writing-data) section. We will skip
them here and focus on fetching data.

#### RecordCursorFactory

You can think of `RecordCursorFactory` as PreparedStatement. This is the entity
that holds SQL execution plan with all of the execution artefacts. Factories are
designed to be reused and we strongly encourage caching them. You also need to
make sure that you close factories explicitly when you no longer need them.
Failing to do so can cause memory and/or other resources leak.

#### RecordCursor

This instance allows iterating over the dataset produced by SQL. Cursors are
relatively short-lived and do not imply fetching all the data. Note that you
have to close a cursor as soon as enough data is fetched ; the closing process
can happen at any time.

Cursors are not thread safe and cannot be shared between threads.

#### Record

This is cursor's data access API. Record instance is obtained from the cursor
outside of the fetch loop.

```java title="Example of fetching data from cursor"
final Record record = cursor.getRecord();
while (cursor.hasNext()) {
    // access 'record' instance for field values
}
```

Record does not hold the data. Instead, it is an API to pull data when data is
needed. Record instance remains the same while cursor goes over the data, making
caching of records pointless.

## InfluxDB sender library

We have a [Java ILP client library](/docs/reference/clients/java_ilp/) to allow
fast data ingestion.
