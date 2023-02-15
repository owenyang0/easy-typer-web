---
title: Configuration
description: Server configuration keys reference documentation.
---

This page describes methods for configuring QuestDB server settings.
Configuration can be set either:

- In the `server.conf` configuration file available in the
  [root directory](/docs/concept/root-directory-structure)
- Using environment variables

When a key is absent from both the configuration file and the environment
variables, the default value is used. Configuration of logging is handled
separately and details of configuring this behavior can be found at the
[logging section](#logging) below.

## Environment variables

All settings in the configuration file can be set or overridden using
environment variables. If a key is set in both the `server.conf` file and via an
environment variable, the environment variable will take precedence and the
value in the server configuration file will be ignored.

To make these configuration settings available to QuestDB via environment
variables, they must be in the following format:

```shell
QDB_<KEY_OF_THE_PROPERTY>
```

Where `<KEY_OF_THE_PROPERTY>` is equal to the configuration key name. To
properly format a `server.conf` key as an environment variable it must have:

1. `QDB_` prefix
2. uppercase characters
3. all `.` period characters replaced with `_` underscore

For example, the server configuration key for shared workers must be passed as
described below:

| `server.conf` key     | env var                   |
| --------------------- | ------------------------- |
| `shared.worker.count` | `QDB_SHARED_WORKER_COUNT` |

:::note

QuestDB applies these configuration changes on startup and a running instance
must be restarted in order for configuration changes to take effect

:::

### Examples

The following configuration property customizes the number of worker threads
shared across the application:

```shell title="conf/server.conf"
shared.worker.count=5
```

```shell title="Customizing the worker count via environment variable"
export QDB_SHARED_WORKER_COUNT=5
```

## Docker

This section describes how to configure QuestDB server settings when running
QuestDB in a Docker container. A command to run QuestDB via Docker with default
interfaces is as follows:

```shell title="Example of running docker container with built-in storage"
docker run -p 9000:9000 \
 -p 9009:9009 \
 -p 8812:8812 \
 -p 9003:9003 \
 questdb/questdb
```

This publishes the following ports:

- `-p 9000:9000` - [REST API](/docs/reference/api/rest) and
  [Web Console](/docs/develop/web-console)
- `-p 9009:9009` - [InfluxDB line protocol](/docs/reference/api/ilp/overview)
- `-p 8812:8812` - [Postgres wire protocol](/docs/reference/api/postgres)
- `-p 9003:9003` -
  [Min health server and Prometheus metrics](#minimal-http-server)

The examples in this section change the default HTTP and REST API port from
`9000` to `4000` for illustrative purposes, and demonstrate how to publish this
port with a non-default property.

### Environment variables

Server configuration can be passed to QuestDB running in Docker by using the
`-e` flag to pass an environment variable to a container:

```bash
docker run -p 4000:4000 -e QDB_HTTP_BIND_TO=0.0.0.0:4000 questdb/questdb
```

### Mounting a volume

A server configuration file can be provided by mounting a local directory in a
QuestDB container. Given the following configuration file which overrides the
default HTTP bind property:

```shell title="./server.conf"
http.bind.to=0.0.0.0:4000
```

Running the container with the `-v` flag allows for mounting the current
directory to QuestDB's `conf` directory in the container. With the server
configuration above, HTTP ports for the web console and REST API will be
available on `localhost:4000`:

```bash
docker run -v "$(pwd):/var/lib/questdb/conf" -p 4000:4000 questdb/questdb
```

To mount the full root directory of QuestDB when running in a Docker container,
provide a the configuration in a `conf` directory:

```shell title="./conf/server.conf"
http.bind.to=0.0.0.0:4000
```

Mount the current directory using the `-v` flag:

```bash
docker run -v "$(pwd):/var/lib/questdb/" -p 4000:4000 questdb/questdb
```

The current directory will then have data persisted to disk:

```bash title="Current directory contents"
├── conf
│  └── server.conf
├── db
└── public
```

## Keys and default values

This section lists the configuration keys available to QuestDB by topic or
subsystem. Parameters for specifying buffer and memory page sizes are provided
in the format `n<unit>`, where `<unit>` can be one of the following:

- `m` for **MB**
- `k` for **kB**

For example:

```ini title="Setting maximum send buffer size to 2MB per TCP socket"
http.net.connection.sndbuf=2m
```

### Shared worker

Shared worker threads service SQL execution subsystems and (in the default
configuration) every other subsystem.

| Property                  | Default | Description                                                                                                                                                  |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| shared.worker.count       |         | Number of worker threads shared across the application. Increasing this number will increase parallelism in the application at the expense of CPU resources. |
| shared.worker.affinity    |         | Comma-delimited list of CPU ids, one per thread specified in `shared.worker.count`. By default, threads have no CPU affinity.                                |
| shared.worker.haltOnError | false   | Toggle whether worker should stop on error.                                                                                                                  |

### Minimal HTTP server

This server runs embedded in a QuestDB instance by default and enables health
checks of an instance via HTTP. It responds to all requests with a HTTP status
code of `200` unless the QuestDB process dies.

:::info

Port `9003` also provides a `/metrics` endpoint with Prometheus metrics exposed.
Examples of how to use the min server and Prometheus endpoint can be found on
the [health monitoring page](/docs/operations/health-monitoring).

:::

| Property                        | Default      | Description                                                                                                                                                                                                                          |
| ------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| http.min.enabled                | true         | Enable or disable Minimal HTTP server.                                                                                                                                                                                               |
| http.min.bind.to                | 0.0.0.0:9003 | IPv4 address and port of the server. `0` means it will bind to all network interfaces, otherwise the IP address must be one of the existing network adapters.                                                                        |
| http.min.net.connection.limit   | 4            | Active connection limit.                                                                                                                                                                                                             |
| http.min.net.connection.timeout | 300000       | Idle connection timeout is milliseconds.                                                                                                                                                                                             |
| http.min.net.connection.hint    | false        | Windows specific flag to overcome OS limitations on TCP backlog size.                                                                                                                                                                |
| http.min.worker.count           |              | By default, minimal HTTP server uses shared thread pool for CPU core count 16 and below. It will use dedicated thread for core count above 16. When `0`, the server will use the shared pool. Do not set pool size to more than `1`. |
| http.min.worker.affinity        |              | Core number to pin thread to.                                                                                                                                                                                                        |

### HTTP server

This section describes configuration settings for the Web Console available by
default on port `9000`. For details on the use of this component, refer to the
[web console documentation](/docs/develop/web-console) page.

| Property                                     | Default      | Description                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| http.enabled                                 | true         | Enable or disable HTTP server.                                                                                                                                                                                                                                                                                                                                                                                                         |
| http.bind.to                                 | 0.0.0.0:9000 | IP address and port of HTTP server. A value of `0` means that the HTTP server will bind to all network interfaces. You can specify IP address of any individual network interface on your system.                                                                                                                                                                                                                                      |
| http.net.connection.limit                    | 64           | The maximum number permitted for simultaneous TCP connection to the HTTP server. The rationale of the value is to control server memory consumption.                                                                                                                                                                                                                                                                                   |
| http.net.connection.timeout                  | 300000       | TCP connection idle timeout in milliseconds. Connection is closed by HTTP server when this timeout lapses.                                                                                                                                                                                                                                                                                                                             |
| http.net.connection.sndbuf                   | 2M           | Maximum send buffer size on each TCP socket. If this value is `-1`, the socket send buffer size remains unchanged from the OS defaults.                                                                                                                                                                                                                                                                                                |
| http.net.connection.rcvbuf                   | 2M           | Maximum receive buffer size on each TCP socket. If this value is `-1`, the socket receive buffer size remains unchanged from the OS defaults.                                                                                                                                                                                                                                                                                          |
| http.net.connection.hint                     | false        | Windows specific flag to overcome OS limitations on TCP backlog size                                                                                                                                                                                                                                                                                                                                                                   |
| http.connection.pool.initial.capacity        | 4            | Initial size of pool of reusable objects that hold connection state. The pool should be configured to maximum realistic load so that it does not resize at runtime.                                                                                                                                                                                                                                                                    |
| http.connection.string.pool.capacity         | 128          | Initial size of the string pool shared by the HTTP header and multipart content parsers.                                                                                                                                                                                                                                                                                                                                               |
| http.multipart.header.buffer.size            | 512          | Buffer size in bytes used by the HTTP multipart content parser.                                                                                                                                                                                                                                                                                                                                                                        |
| http.multipart.idle.spin.count               | 10000        | How long the code accumulates incoming data chunks for column and delimiter analysis.                                                                                                                                                                                                                                                                                                                                                  |
| http.receive.buffer.size                     | 1M           | Size of receive buffer.                                                                                                                                                                                                                                                                                                                                                                                                                |
| http.request.header.buffer.size              | 64K          | Size of internal buffer allocated for HTTP request headers. The value is rounded up to the nearest power of 2. When HTTP requests contain headers that exceed the buffer size server will disconnect the client with HTTP error in server log.                                                                                                                                                                                         |
| http.response.header.buffer.size             | 32K          | Size of the internal response buffer. The value will be rounded up to the nearest power of 2. The buffer size should be large enough to accommodate max size of server response headers.                                                                                                                                                                                                                                               |
| http.worker.count                            | 0            | Number of threads in private worker pool. When `0`, HTTP server will be using shared worker pool of the server. Values above `0` switch on private pool.                                                                                                                                                                                                                                                                               |
| http.worker.affinity                         |              | Comma separated list of CPU core indexes. The number of items in this list must be equal to the worker count.                                                                                                                                                                                                                                                                                                                          |
| http.worker.haltOnError                      | false        | **Changing the default value is strongly discouraged**. Flag that indicates if worker thread must shutdown on unhandled error.                                                                                                                                                                                                                                                                                                         |
| http.send.buffer.size                        | 2M           | Size of the internal send buffer. Larger buffer sizes result in fewer I/O interruptions the server is making at the expense of memory usage per connection. There is a limit of send buffer size after which increasing it stops being useful in terms of performance. 2MB seems to be optimal value.                                                                                                                                  |
| http.static.index.file.name                  | index.html   | Name of index file for the Web Console.                                                                                                                                                                                                                                                                                                                                                                                                |
| http.frozen.clock                            | false        | Sets the clock to always return zero. This configuration parameter is used for internal testing.                                                                                                                                                                                                                                                                                                                                       |
| http.allow.deflate.before.send               | false        | Flag that indicates if Gzip compression of outgoing data is allowed.                                                                                                                                                                                                                                                                                                                                                                   |
| http.keep-alive.timeout                      | 5            | Used together with `http.keep-alive.max` to set the value of HTTP `Keep-Alive` response header. This instructs browser to keep TCP connection open. Has to be `0` when `http.version` is set to `HTTP/1.0`.                                                                                                                                                                                                                            |
| http.keep-alive.max                          | 10000        | See `http.keep-alive.timeout`. Has to be `0` when `http.version` is set to `HTTP/1.0`.                                                                                                                                                                                                                                                                                                                                                 |
| http.static.public.directory                 | public       | The name of directory for public web site.                                                                                                                                                                                                                                                                                                                                                                                             |
| http.text.date.adapter.pool.capacity         | 16           | Size of date adapter pool. This should be set to the anticipated maximum number of `DATE` fields a text input can have. The pool is assigned to connection state and is reused alongside of connection state object.                                                                                                                                                                                                                   |
| http.text.json.cache.limit                   | 16384        | JSON parser cache limit. Cache is used to compose JSON elements that have been broken up by TCP protocol. This value limits the maximum length of individual tag or tag value.                                                                                                                                                                                                                                                         |
| http.text.json.cache.size                    | 8192         | Initial size of JSON parser cache. The value must not exceed `http.text.json.cache.limit` and should be set to avoid cache resizes at runtime.                                                                                                                                                                                                                                                                                         |
| http.text.max.required.delimiter.stddev      | 0.1222d      | The maximum standard deviation value for the algorithm that calculates text file delimiter. Usually when text parser cannot recognise the delimiter it will log the calculated and maximum standard deviation for the delimiter candidate.                                                                                                                                                                                             |
| http.text.max.required.line.length.stddev    | 0.8          | Maximum standard deviation value for the algorithm that classifies input as text or binary. For the values above configured stddev input will be considered binary.                                                                                                                                                                                                                                                                    |
| http.text.metadata.string.pool.capacity      | 128          | The initial size of pool for objects that wrap individual elements of metadata JSON, such as column names, date pattern strings and locale values.                                                                                                                                                                                                                                                                                     |
| http.text.roll.buffer.limit                  | 4M           | The limit of text roll buffer. See `http.text.roll.buffer.size` for description.                                                                                                                                                                                                                                                                                                                                                       |
| http.text.roll.buffer.size                   | 1024         | Roll buffer is a structure in the text parser that holds a copy of a line that has been broken up by TCP. The size should be set to the maximum length of text line in text input.                                                                                                                                                                                                                                                     |
| http.text.analysis.max.lines                 | 1000         | Number of lines to read on CSV import for heuristics which determine column names & types. Lower line numbers may detect CSV schemas quicker, but possibly with less accuracy. 1000 lines is the maximum for this value.                                                                                                                                                                                                               |
| http.text.lexer.string.pool.capacity         | 64           | The initial capacity of string fool, which wraps `STRING` column types in text input. The value should correspond to the maximum anticipated number of STRING columns in text input.                                                                                                                                                                                                                                                   |
| http.text.timestamp.adapter.pool.capacity    | 64           | Size of timestamp adapter pool. This should be set to the anticipated maximum number of `TIMESTAMP` fields a text input can have. The pool is assigned to connection state and is reused alongside of connection state object.                                                                                                                                                                                                         |
| http.text.utf8.sink.size                     | 4096         | Initial size of UTF-8 adapter sink. The value should correspond the maximum individual field value length in text input.                                                                                                                                                                                                                                                                                                               |
| http.json.query.connection.check.frequency   | 1000000      | **Changing the default value is strongly discouraged**. The value to throttle check if client socket has been disconnected.                                                                                                                                                                                                                                                                                                            |
| http.json.query.float.scale                  | 4            | The scale value of string representation of `FLOAT` values.                                                                                                                                                                                                                                                                                                                                                                            |
| http.json.query.double.scale                 | 12           | The scale value of string representation of `DOUBLE` values.                                                                                                                                                                                                                                                                                                                                                                           |
| http.query.cache.enabled                     | true         | Enable or disable the query cache. Cache capacity is `number_of_blocks * number_of_rows`.                                                                                                                                                                                                                                                                                                                                              |
| http.query.cache.block.count                 | 4            | Number of blocks for the query cache.                                                                                                                                                                                                                                                                                                                                                                                                  |
| http.query.cache.row.count                   | 16           | Number of rows for the query cache.                                                                                                                                                                                                                                                                                                                                                                                                    |
| http.security.readonly                       | false        | Forces HTTP read only mode when `true`, disabling commands which modify the data or data structure, e.g. INSERT, UPDATE, or CREATE TABLE.                                                                                                                                                                                                                                                                                              |
| http.security.max.response.rows              | 2^63-1       | Limit the number of response rows over HTTP.                                                                                                                                                                                                                                                                                                                                                                                           |
| http.security.interrupt.on.closed.connection | true         | Switch to enable termination of SQL processing if the HTTP connection is closed. The mechanism affects performance so the connection is only checked after `circuit.breaker.throttle` calls are made to the check method. The mechanism also reads from the input stream and discards it since some HTTP clients send this as a keep alive in between requests, `circuit.breaker.buffer.size` denotes the size of the buffer for this. |
| circuit.breaker.throttle                     | 2000000      | Number of internal iterations such as loops over data before checking if the HTTP connection is still open                                                                                                                                                                                                                                                                                                                             |
| circuit.breaker.buffer.size                  | 32           | Size of buffer to read from HTTP connection. If this buffer returns zero and the HTTP client is no longer sending data, SQL processing will be terminated.                                                                                                                                                                                                                                                                             |
| http.server.keep.alive                       | true         | If set to `false`, the server will disconnect the client after completion of each request.                                                                                                                                                                                                                                                                                                                                             |
| http.version                                 | HTTP/1.1     | Protocol version, other supported value is `HTTP/1.0`.                                                                                                                                                                                                                                                                                                                                                                                 |

### Cairo engine

This section describes configuration settings for the Cairo SQL engine in
QuestDB.

| Property                                       | Default           | Description                                                                                                                                                                                                              |
| ---------------------------------------------- | ----------------- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| query.timeout.sec                              | 60                | A global timeout (in seconds) for long-running queries.                                                                                                                                                                  |
| cairo.max.uncommitted.rows                     | 500000            | Maximum number of uncommitted rows per table, when the number of pending rows reaches this parameter on a table, a commit will be issued.                                                                                |
| cairo.commit.lag (QuestDB 6.5.5 and earlier)   | 5 minutes         | Expected maximum time lag for out-of-order rows in milliseconds.                                                                                                                                                         |
| cairo.o3.max.lag (QuestDB 6.6 and later)       | 10 minutes        | The maximum size of in-memory buffer in milliseconds. The buffer is allocated dynamically through analysing the shape of the incoming data, and `o3MaxLag` is the upper limit.                                           |
| cairo.o3.min.lag (QuestDB 6.6 and later)       | 1 second          | The minimum size of in-memory buffer in milliseconds. The buffer is allocated dynamically through analysing the shape of the incoming data, and `o3MinLag` is the lower limit.                                           |
| cairo.sql.backup.root                          | null              | Output root directory for backups.                                                                                                                                                                                       |
| cairo.sql.backup.dir.datetime.format           | null              | Date format for backup directory.                                                                                                                                                                                        |
| cairo.sql.backup.dir.tmp.name                  | tmp               | Name of tmp directory used during backup.                                                                                                                                                                                |
| cairo.sql.backup.mkdir.mode                    | 509               | Permission used when creating backup directories.                                                                                                                                                                        |
| cairo.snapshot.instance.id                     | empty string      | Instance id to be included into disk snapshots.                                                                                                                                                                          |
| cairo.snapshot.recovery.enabled                | true              | When `false`, disables snapshot recovery on database start.                                                                                                                                                              |
| cairo.root                                     | db                | Directory for storing db tables and metadata. This directory is inside the server root directory provided at startup.                                                                                                    |
| cairo.commit.mode                              | nosync            | How changes to table are flushed to disk upon commit. Choices: `nosync`, `async` (flush call schedules update, returns immediately), `sync` (waits for flush on the appended column files to complete).                  |
| cairo.create.as.select.retry.count             | 5                 | Number of types table creation or insertion will be attempted.                                                                                                                                                           |
| cairo.default.map.type                         | fast              | Type of map used. Options: `fast` (speed at the expense of storage), `compact`.                                                                                                                                          |
| cairo.default.symbol.cache.flag                | true              | When `true`, symbol values will be cached on Java heap instead of being looked up in the database files.                                                                                                                 |
| cairo.default.symbol.capacity                  | 256               | Specifies approximate capacity for `SYMBOL` columns. It should be equal to number of unique symbol values stored in the table and getting this value badly wrong will cause performance degradation. Must be power of 2. |
| cairo.file.operation.retry.count               | 30                | Number of attempts to open files.                                                                                                                                                                                        |
| cairo.idle.check.interval                      | 300000            | Frequency of writer maintenance job in milliseconds.                                                                                                                                                                     |
| cairo.inactive.reader.ttl                      | -120000           | Frequency of reader pool checks for inactive readers in milliseconds.                                                                                                                                                    |
| cairo.inactive.writer.ttl                      | -600000           | Frequency of writer pool checks for inactive writers in milliseconds.                                                                                                                                                    |
| cairo.index.value.block.size                   | 256               | Approximation of number of rows for a single index key, must be power of 2.                                                                                                                                              |
| cairo.max.swap.file.count                      | 30                | Number of attempts to open swap files.                                                                                                                                                                                   |
| cairo.mkdir.mode                               | 509               | File permission mode for new directories.                                                                                                                                                                                |
| cairo.parallel.index.threshold                 | 100000            | Minimum number of rows before allowing use of parallel indexation.                                                                                                                                                       |
| cairo.reader.pool.max.segments                 | 5                 | Number of attempts to get TableReader.                                                                                                                                                                                   |
| cairo.spin.lock.timeout                        | 1000              | Timeout when attempting to get BitmapIndexReaders in millisecond.                                                                                                                                                        |
| cairo.character.store.capacity                 | 1024              | Size of the CharacterStore.                                                                                                                                                                                              |
| cairo.character.store.sequence.pool.capacity   | 64                | Size of the CharacterSequence pool.                                                                                                                                                                                      |
| cairo.column.pool.capacity                     | 4096              | Size of the Column pool in the SqlCompiler.                                                                                                                                                                              |
| cairo.compact.map.load.factor                  | 0.7               | Load factor for CompactMaps.                                                                                                                                                                                             |
| cairo.expression.pool.capacity                 | 8192              | Size of the ExpressionNode pool in SqlCompiler.                                                                                                                                                                          |
| cairo.fast.map.load.factor                     | 0.5               | Load factor for all FastMaps.                                                                                                                                                                                            |
| cairo.sql.join.context.pool.capacity           | 64                | Size of the JoinContext pool in SqlCompiler.                                                                                                                                                                             |
| cairo.lexer.pool.capacity                      | 2048              | Size of FloatingSequence pool in GenericLexer.                                                                                                                                                                           |
| cairo.sql.map.key.capacity                     | 2M                | Key capacity in FastMap and CompactMap.                                                                                                                                                                                  |
| cairo.sql.map.max.resizes                      | 2^31              | Number of map resizes in FastMap and CompactMap before a resource limit exception is thrown, each resize doubles the previous size.                                                                                      |
| cairo.sql.map.page.size                        | 4m                | Memory page size for FastMap and CompactMap.                                                                                                                                                                             |
| cairo.sql.map.max.pages                        | 2^31              | Memory max pages for CompactMap.                                                                                                                                                                                         |
| cairo.model.pool.capacity                      | 1024              | Size of the QueryModel pool in the SqlCompiler.                                                                                                                                                                          |
| cairo.sql.sort.key.page.size                   | 4M                | Memory page size for storing keys in LongTreeChain.                                                                                                                                                                      |
| cairo.sql.sort.key.max.pages                   | 2^31              | Max number of pages for storing keys in LongTreeChain before a resource limit exception is thrown.                                                                                                                       |
| cairo.sql.sort.light.value.page.size           | 1048576           | Memory page size for storing values in LongTreeChain.                                                                                                                                                                    |
| cairo.sql.sort.light.value.max.pages           | 2^31              | Max pages for storing values in LongTreeChain.                                                                                                                                                                           |
| cairo.sql.hash.join.value.page.size            | 16777216          | Memory page size of the slave chain in full hash joins.                                                                                                                                                                  |
| cairo.sql.hash.join.value.max.pages            | 2^31              | Max pages of the slave chain in full hash joins.                                                                                                                                                                         |
| cairo.sql.latest.by.row.count                  | 1000              | Number of rows for LATEST BY.                                                                                                                                                                                            |
| cairo.sql.hash.join.light.value.page.size      | 1048576           | Memory page size of the slave chain in light hash joins.                                                                                                                                                                 |
| cairo.sql.hash.join.light.value.max.pages      | 2^31              | Max pages of the slave chain in light hash joins.                                                                                                                                                                        |
| cairo.sql.sort.value.page.size                 | 16777216          | Memory page size of file storing values in SortedRecordCursorFactory.                                                                                                                                                    |
| cairo.sql.sort.value.max.pages                 | 2^31              | Max pages of file storing values in SortedRecordCursorFactory.                                                                                                                                                           |
| cairo.work.steal.timeout.nanos                 | 10000             | Latch await timeout in nanos for stealing indexing work from other threads.                                                                                                                                              |
| cairo.parallel.indexing.enabled                | true              | Allows parallel indexation. Works in conjunction with cairo.parallel.index.threshold.                                                                                                                                    |
| cairo.sql.join.metadata.page.size              | 16384             | Memory page size for JoinMetadata file.                                                                                                                                                                                  |
| cairo.sql.join.metadata.max.resizes            | 2^31              | Number of map resizes in JoinMetadata before a resource limit exception is thrown, each resize doubles the previous size.                                                                                                |
| cairo.sql.analytic.column.pool.capacity        | 64                | Size of AnalyticColumn pool in SqlParser.                                                                                                                                                                                |
| cairo.sql.create.table.model.pool.capacity     | 16                | Size of CreateTableModel pool in SqlParser.                                                                                                                                                                              |
| cairo.sql.column.cast.model.pool.capacity      | 16                | Size of CreateTableModel pool in SqlParser.                                                                                                                                                                              |
| cairo.sql.rename.table.model.pool.capacity     | 16                | Size of RenameTableModel pool in SqlParser.                                                                                                                                                                              |
| cairo.sql.with.clause.model.pool.capacity      | 128               | Size of WithClauseModel pool in SqlParser.                                                                                                                                                                               |
| cairo.sql.insert.model.pool.capacity           | 64                | Size of InsertModel pool in SqlParser.                                                                                                                                                                                   |
| cairo.sql.copy.model.pool.capacity             | 32                | Size of CopyModel pool in SqlParser.                                                                                                                                                                                     |
| cairo.sql.copy.buffer.size                     | 2M                | Size of buffer used when copying tables.                                                                                                                                                                                 |
| cairo.sql.double.cast.scale                    | 12                | Maximum number of decimal places that types cast as doubles have.                                                                                                                                                        |
| cairo.sql.float.cast.scale                     | 4                 | Maximum number of decimal places that types cast as floats have.                                                                                                                                                         |
| cairo.sql.copy.formats.file                    | /text_loader.json | Name of file with user's set of date and timestamp formats.                                                                                                                                                              |
| cairo.sql.jit.mode                             | on                | JIT compilation for SQL queries. May be disabled by setting this value to `off`.                                                                                                                                         |
| cairo.date.locale                              | en                | The locale to handle date types.                                                                                                                                                                                         |
| cairo.timestamp.locale                         | en                | The locale to handle timestamp types.                                                                                                                                                                                    |
| cairo.o3.column.memory.size                    | 8M                | Memory page size per column for O3 operations. Please be aware O3 will use 2x of the set value per column (therefore a default of 2x8M).                                                                                 |
| cairo.writer.data.append.page.size             | 16M               | mmap sliding page size that table writer uses to append data for each column.                                                                                                                                            |
| cairo.writer.data.index.key.append.page.size   | 512K              | mmap page size for appending index key data.                                                                                                                                                                             |
| cairo.writer.data.index.value.append.page.size | 16M               | mmap page size for appending value data.                                                                                                                                                                                 |
| cairo.writer.misc.append.page.size             | 4K                | mmap page size for mapping small files, default value is OS page size (4k Linux, 64K windows, 16k OSX M1). Overriding this rounds to the nearest (greater) multiple of the OS page size.                                 |
| cairo.writer.data.index.key.append.page.size   | 512K              | mmap page size for appending index key data; key data is number of distinct symbol values times 4 bytes.                                                                                                                 |
| cairo.sql.column.purge.queue.capacity          | 128               | Purge column version job queue. Increase the size if column version not automatically cleanup after execution of UPDATE SQL statement. Reduce to decrease initial memory footprint.                                      |
| cairo.sql.column.purge.task.pool.capacity      | 256               | Column version task object pool capacity. Increase to reduce GC, reduce to decrease memory footprint.                                                                                                                    |
| cairo.sql.column.purge.retry.delay             | 10000             | Initial delay (μs) before re-trying purge of stale column files.                                                                                                                                                         |
| cairo.sql.column.purge.retry.delay.multiplier  | 10.0              | Multiplier used to increases retry delay with each iteration.                                                                                                                                                            |
| cairo.sql.column.purge.retry.delay.limit       | 60000000          | Delay limit (μs), upon reaching which, the re-try delay remains constant.                                                                                                                                                |
| cairo.sql.column.purge.retry.limit.days        | 31                | Number of days purge system will continue to re-try deleting stale column files before giving up.                                                                                                                        |
| cairo.system.table.prefix                      | sys.              | Prefix of the tables used for QuestDB internal data storage. These tables are hidden from QuestDB webconsole.                                                                                                            |
| cairo.create.allowed.volume.definitions        | -                 | A comma separated list of _alias -> root-path_ pairs defining allowed volumes to be used in [CREATE TABLE IN VOLUME](/docs/reference/sql/create-table/#table-target-volume) statements.                                  |
| cairo.system.table.prefix                      | sys.              | Prefix of the tables used for QuestDB internal data storage. These tables are hidden from QuestDB web console.                                                                                                           |
| cairo.wal.enabled.default                      | false             | Setting defining whether WAL table is the default when using `CREATE TABLE`.                                                                                                                                             |

### WAL table configurations

The following WAL tables settings on parallel threads are configurable for applying WAL data to the table storage:

| Property                 | Default                        | Description                                                                                                                                                                                          |
| ------------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wal.apply.worker.count   | equal to the CPU core count    | Number of dedicated worker threads assigned to handle WAL tabel data. |
| wal.apply.worker.affinity | equal to the CPU core count    | Comma separated list of CPU core indexes.                                            |
| wal.apply.worker.haltOnError     | false                | Flag that indicates if worker thread must shutdown on unhandled error   |
| cairo.wal.purge.interval | 30000                       | Period in ms of how often WAL-applied files are cleaned up from the disk |
| cairo.wal.segment.rollover.row.count | 200000           | The number of rows written to the same WAL segment before starting a new segment |
| cairo.wal.commit.squash.row.limit | 500000                  | Maximum row count that can be squashed together from multiple transactions before applying to the table. A very low value can delay data visibility. |

### CSV import

This section describes configuration settings for using `COPY` to import large
CSV files.

Mandatory settings to enable `COPY`:

| Property                 | Default | Description                                                                                                                                                                                          |
| ------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cairo.sql.copy.root      | null    | Input root directory for CSV imports via `COPY` SQL. This path should not overlap with other directory (e.g. db, conf) of running instance, otherwise import may delete or overwrite existing files. |
| cairo.sql.copy.work.root | null    | Temporary import file directory. Defaults to `root_directory/tmp` if not set explicitly.                                                                                                             |

Optional settings for `COPY`:

| Property                            | Default | Description                                                                                                                                                                           |
| ----------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cairo.iouring.enabled               | true    | Enable or disable io_uring implementation. Applicable to newer Linux kernels only. Can be used to switch io_uring interface usage off if there's a kernel bug affecting it.           |
| cairo.sql.copy.buffer.size          | 2 MiB   | Size of read buffers used in import.                                                                                                                                                  |
| cairo.sql.copy.log.retention.days   | 3       | Number of days to keep import messages in `sys.text_import_log`.                                                                                                                      |
| cairo.sql.copy.max.index.chunk.size | 100M    | Maximum size of index chunk file used to limit total memory requirements of import. Indexing phase should use roughly `thread_count * cairo.sql.copy.max.index.chunk.size` of memory. |
| cairo.sql.copy.queue.capacity       | 32      | Size of copy task queue. Should be increased if there's more than 32 import workers.                                                                                                  |

#### CSV import configuration for Docker

For QuestDB instances using Docker:

- `cairo.sql.copy.root` must be defined using one of the following settings:
  - The environment variable `QDB_CAIRO_SQL_COPY_ROOT`.
  - The `cairo.sql.copy.root` in `server.conf`.
- The path for the source CSV file is mounted.
- The source CSV file path and the path defined by `QDB_CAIRO_SQL_COPY_ROOT` are
  identical.
- It is optional to define `QDB_CAIRO_SQL_COPY_WORK_ROOT`.

The following is an example command to start a QuestDB instance on Docker, in
order to import a CSV file:

```shell
docker run -p 9000:9000 \
-v "/tmp/questdb:/var/lib/questdb" \
-v "/tmp/questdb/my_input_root:/var/lib/questdb/questdb_import" \
-e QDB_CAIRO_SQL_COPY_ROOT=/var/lib/questdb/questdb_import \
questdb/questdb
```

Where:

- `-v "/tmp/questdb/my_input_root:/var/lib/questdb/questdb_import"`: Defining a
  source CSV file location to be `/tmp/questdb/my_input_root` on local machine
  and mounting it to `/var/lib/questdb/questdb_import` in the container.
- `-e QDB_CAIRO_SQL_COPY_ROOT=/var/lib/questdb/questdb_import`: Defining the
  copy root directory to be `/var/lib/questdb/questdb_import`.

It is important that the two path are identical
(`/var/lib/questdb/questdb_import` in the example).

### Parallel SQL execution

This section describes settings that can affect parallelism level of SQL
execution and therefore performance.

| Property                                   | Default | Description                                                                                                                                                                |
| ------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cairo.sql.parallel.filter.enabled          | true    | Enable or disable parallel SQL filter execution. JIT compilation takes place only when this setting is enabled.                                                            |
| cairo.sql.parallel.filter.pretouch.enabled | true    | Enable column pre-touch as part of the parallel SQL filter execution, to improve query performance for large tables.                                                       |
| cairo.page.frame.shard.count               | 4       | Number of shards for both dispatch and reduce queues. Shards reduce queue contention between SQL statements that are executed concurrently.                                |
| cairo.page.frame.reduce.queue.capacity     | 64      | Reduce queue is used for data processing and should be large enough to supply tasks for worker threads (shared worked pool).                                               |
| cairo.page.frame.rowid.list.capacity       | 256     | Row ID list initial capacity for each slot of the reduce queue. Larger values reduce memory allocation rate, but increase minimal RSS size.                                |
| cairo.page.frame.column.list.capacity      | 16      | Column list capacity for each slot of the reduce queue. Used by JIT-compiled filter functions. Larger values reduce memory allocation rate, but increase minimal RSS size. |
| cairo.page.frame.task.pool.capacity        | 4       | Initial object pool capacity for local reduce tasks. These tasks are used to avoid blocking query execution when the reduce queue is full.                                 |

### Postgres wire protocol

This section describes configuration settings for client connections using
PostgresSQL wire protocol.

| Property                         | Default      | Description                                                                                                                                                                                       |
| -------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pg.enabled                       | true         | Configuration for enabling or disabling the Postres interface.                                                                                                                                    |
| pg.net.bind.to                   | 0.0.0.0:8812 | IP address and port of Postgres wire protocol server. 0 means that the server will bind to all network interfaces. You can specify IP address of any individual network interface on your system. |
| pg.net.connection.limit          | 64           | The maximum number permitted for simultaneous Postgres connections to the server. This value is intended to control server memory consumption.                                                    |
| pg.net.connection.timeout        | 300000       | Connection idle timeout in milliseconds. Connections are closed by the server when this timeout lapses.                                                                                           |
| pg.net.connection.rcvbuf         | -1           | Maximum send buffer size on each TCP socket. If value is -1 socket send buffer remains unchanged from OS default.                                                                                 |
| pg.net.connection.sndbuf         | -1           | Maximum receive buffer size on each TCP socket. If value is -1, the socket receive buffer remains unchanged from OS default.                                                                      |
| pg.net.connection.hint           | false        | Windows specific flag to overcome OS limitations on TCP backlog size                                                                                                                              |
| pg.security.readonly             | false        | Forces PGWire read only mode when `true`, disabling commands which modify the data or data structure, e.g. INSERT, UPDATE, or CREATE TABLE.                                                       |
| pg.character.store.capacity      | 4096         | Size of the CharacterStore.                                                                                                                                                                       |
| pg.character.store.pool.capacity | 64           | Size of the CharacterStore pool capacity .                                                                                                                                                        |
| pg.connection.pool.capacity      | 64           | The maximum amount of pooled connections this interface may have.                                                                                                                                 |
| pg.password                      | quest        | Postgres database password.                                                                                                                                                                       |
| pg.user                          | admin        | Postgres database username.                                                                                                                                                                       |
| pg.readonly.user.enabled         | false        | Enable or disable Postgres database read-only user account. When enabled, this additional user can be used to open read-only connections to the database.                                         |
| pg.readonly.password             | quest        | Postgres database read-only user password.                                                                                                                                                        |
| pg.readonly.user                 | user         | Postgres database read-only user username.                                                                                                                                                        |
| pg.select.cache.enabled          | true         | Enable or disable the SELECT query cache. Cache capacity is `number_of_blocks * number_of_rows`.                                                                                                  |
| pg.select.cache.block.count      | 16           | Number of blocks to cache SELECT query execution plan against text to speed up execution.                                                                                                         |
| pg.select.cache.row.count        | 16           | Number of rows to cache for SELECT query execution plan against text to speed up execution.                                                                                                       |
| pg.insert.cache.enabled          | true         | Enable or disable the INSERT query cache. Cache capacity is `number_of_blocks * number_of_rows`.                                                                                                  |
| pg.insert.cache.block.count      | 8            | Number of blocks to cache INSERT query execution plan against text to speed up execution.                                                                                                         |
| pg.insert.cache.row.count        | 8            | Number of rows to cache for INSERT query execution plan against text to speed up execution.                                                                                                       |
| pg.update.cache.enabled          | true         | Enable or disable the UPDATE query cache. Cache capacity is `number_of_blocks * number_of_rows`.                                                                                                  |
| pg.update.cache.block.count      | 8            | Number of blocks to cache UPDATE query execution plan against text to speed up execution.                                                                                                         |
| pg.update.cache.row.count        | 8            | Number of rows to cache for UPDATE query execution plan against text to speed up execution.                                                                                                       |
| pg.max.blob.size.on.query        | 512k         | For binary values, clients will receive an error when requesting blob sizes above this value.                                                                                                     |
| pg.recv.buffer.size              | 1M           | Size of the buffer for receiving data.                                                                                                                                                            |
| pg.send.buffer.size              | 1M           | Size of the buffer for sending data.                                                                                                                                                              |
| pg.date.locale                   | en           | The locale to handle date types.                                                                                                                                                                  |
| pg.timestamp.locale              | en           | The locale to handle timestamp types.                                                                                                                                                             |
| pg.worker.count                  | 0            | Number of dedicated worker threads assigned to handle PGWire queries. When `0`, the jobs will use the shared pool.                                                                                |
| pg.worker.affinity               |              | Comma-separated list of thread numbers which should be pinned for Postgres ingestion. Example `pg.worker.affinity=1,2,3`.                                                                         |
| pg.halt.on.error                 | false        | Whether ingestion should stop upon internal error.                                                                                                                                                |

### InfluxDB line protocol

This section describes ingestion settings for incoming messages using InfluxDB
line protocol.

| Property                  | Default | Description                                                                                             |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| line.default.partition.by | DAY     | The default partitioning strategy applied to new tables dynamically created by sending records via ILP. |

#### TCP specific settings

| Property                                   | Default      | Description                                                                                                                                                                                                                                           |
| ------------------------------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| line.tcp.enabled                           | true         | Enable or disable line protocol over TCP.                                                                                                                                                                                                             |
| line.tcp.net.bind.to                       | 0.0.0.0:9009 | IP address of the network interface to bind listener to and port. By default, TCP receiver listens on all network interfaces.                                                                                                                         |
| line.tcp.net.connection.limit              | 256          | The maximum number permitted for simultaneous connections to the server. This value is intended to control server memory consumption.                                                                                                                 |
| line.tcp.net.connection.timeout            | 300000       | Connection idle timeout in milliseconds. Connections are closed by the server when this timeout lapses.                                                                                                                                               |
| line.tcp.net.connection.hint               | false        | Windows specific flag to overcome OS limitations on TCP backlog size                                                                                                                                                                                  |
| line.tcp.net.connection.rcvbuf             | -1           | Maximum buffer receive size on each TCP socket. If value is -1, the socket receive buffer remains unchanged from OS default.                                                                                                                          |
| line.tcp.auth.db.path                      |              | Path which points to the authentication db file.                                                                                                                                                                                                      |
| line.tcp.connection.pool.capacity          | 64           | The maximum amount of pooled connections this interface may have.                                                                                                                                                                                     |
| line.tcp.timestamp                         | n            | Input timestamp resolution. Possible values are `n`, `u`, `ms`, `s` and `h`.                                                                                                                                                                          |
| line.tcp.msg.buffer.size                   | 32768        | Size of the buffer read from queue. Maximum size of write request, regardless of the number of measurements.                                                                                                                                          |
| line.tcp.maintenance.job.interval          | 1000         | Maximum amount of time (in milliseconds) between maintenance jobs committing any uncommitted data on inactive tables.                                                                                                                                 |
| line.tcp.min.idle.ms.before.writer.release | 500          | Minimum amount of idle time (in milliseconds) before a table writer is released.                                                                                                                                                                      |
| line.tcp.commit.interval.fraction          | 0.5          | Commit lag fraction. Used to calculate commit interval for the table according to the following formula: `commit_interval = commit_lag ∗ fraction`. The calculated commit interval defines how long uncommitted data will need to remain uncommitted. |
| line.tcp.commit.interval.default           | 1000         | Default commit interval in milliseconds.                                                                                                                                                                                                              |
| line.tcp.max.measurement.size              | 32768        | Maximum size of any measurement.                                                                                                                                                                                                                      |
| line.tcp.writer.queue.size                 | 128          | Size of the queue between network I/O and writer jobs. Each queue entry represents a measurement.                                                                                                                                                     |
| line.tcp.writer.worker.count               |              | Number of dedicated I/O worker threads assigned to write data to tables. When `0`, the writer jobs will use the shared pool.                                                                                                                          |
| line.tcp.writer.worker.affinity            |              | Comma-separated list of thread numbers which should be pinned for line protocol ingestion over TCP. CPU core indexes are 0-based.                                                                                                                     |
| line.tcp.io.worker.count                   |              | Number of dedicated I/O worker threads assigned to parse TCP input. When `0`, the writer jobs will use the shared pool.                                                                                                                               |
| line.tcp.io.worker.affinity                |              | Comma-separated list of thread numbers which should be pinned for line protocol ingestion over TCP. CPU core indexes are 0-based.                                                                                                                     |
| line.tcp.default.partition.by              | DAY          | Table partition strategy to be used with tables that are created automatically by ILP. Possible values are: `HOUR`, `DAY`, `MONTH` and `YEAR`                                                                                                         |
| line.tcp.disconnect.on.error               | true         | Disconnect TCP socket that sends malformed messages.                                                                                                                                                                                                  |

#### UDP specific settings

:::note

The UDP receiver is deprecated since QuestDB version 6.5.2. We recommend the
[TCP receiver](/docs/reference/api/ilp/tcp-receiver/) instead.

:::

| Property                     | Default      | Description                                                                                                                                                                                                                      |
| ---------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| line.udp.join                | 232.1.2.3    | Multicast address receiver joins. This values is ignored when receiver is in "unicast" mode.                                                                                                                                     |
| line.udp.bind.to             | 0.0.0.0:9009 | IP address of the network interface to bind listener to and port. By default UDP receiver listens on all network interfaces.                                                                                                     |
| line.udp.commit.rate         | 1000000      | For packet bursts the number of continuously received messages after which receiver will force commit. Receiver will commit irrespective of this parameter when there are no messages.                                           |
| line.udp.msg.buffer.size     | 2048         | Buffer used to receive single message. This value should be roughly equal to your MTU size.                                                                                                                                      |
| line.udp.msg.count           | 10000        | Only for Linux. On Linux, QuestDB will use the `recvmmsg()` system call. This is the max number of messages to receive at once.                                                                                                  |
| line.udp.receive.buffer.size | 8388608      | UDP socket buffer size. Larger size of the buffer will help reduce message loss during bursts.                                                                                                                                   |
| line.udp.enabled             | true         | Enable or disable UDP receiver.                                                                                                                                                                                                  |
| line.udp.own.thread          | false        | When `true`, UDP receiver will use its own thread and busy spin that for performance reasons. "false" makes receiver use worker threads that do everything else in QuestDB.                                                      |
| line.udp.own.thread.affinity | -1           | -1 does not set thread affinity. OS will schedule thread and it will be liable to run on random cores and jump between the. 0 or higher pins thread to give core. This property is only valid when UDP receiver uses own thread. |
| line.udp.unicast             | false        | When `true`, UDP will use unicast. Otherwise multicast.                                                                                                                                                                          |
| line.udp.timestamp           | n            | Input timestamp resolution. Possible values are `n`, `u`, `ms`, `s` and `h`.                                                                                                                                                     |
| line.udp.commit.mode         | nosync       | Commit durability. Available values are `nosync`, `sync` and `async`.                                                                                                                                                            |

### Config Validation

The database startup phase checks for configuration issues, such as invalid or
deprecated settings. Issues may be classified as advisories or errors. Advisory
issues are [logged](/docs/concept/root-directory-structure#log-directory)
without causing the database to stop its startup sequence: These are usually
setting deprecation warnings. Configuration errors can optionally cause the
database to fail its startup.

| Property                 | Default | Description                                                    |
| ------------------------ | ------- | -------------------------------------------------------------- |
| config.validation.strict | false   | When enabled, startup fails if there are configuration errors. |

_We recommended enabling strict validation._

### Telemetry

QuestDB sends anonymous telemetry data with information about usage which helps
us improve the product over time. We do not collect any personally-identifying
information, and we do not share any of this data with third parties.

| Property          | Default | Description                                           |
| ----------------- | ------- | ----------------------------------------------------- |
| telemetry.enabled | true    | Enable or disable anonymous usage metrics collection. |

## Logging

The logging behavior of QuestDB may be set in dedicated configuration files or
by environment variables. This section describes how to configure logging using
these methods.

### Configuration file

Logs may be configured via a dedicated configuration file `log.conf`.

```shell title="log.conf"
# list of configured writers
writers=file,stdout

# file writer
#w.file.class=io.questdb.log.LogFileWriter
#w.file.location=questdb-debug.log
#w.file.level=INFO,ERROR

# rolling file writer
#w.file.class=io.questdb.log.LogRollingFileWriter
#w.file.location=${log.dir}/questdb-rolling.log.${date:yyyyMMdd}
#w.file.level=INFO,ERROR
#rollEvery accepts: day, hour, minute, month
#w.file.rollEvery=day
#rollSize specifies size at which to roll a new log file: a number followed by k, m, g (KB, MB, GB respectively)
#w.file.rollSize=128m
#lifeDuration accepts: a number followed by s, m, h, d, w, M, y for seconds, minutes, hours, etc.
#w.file.lifeDuration=1d
#sizeLimit is the max fileSize of the log directory. Follows same format as rollSize
#w.file.sizeLimit=1g

# stdout
w.stdout.class=io.questdb.log.LogConsoleWriter
w.stdout.level=INFO,ERROR
```

QuestDB will look for `/log.conf` first in `conf/` directory and then on the
classpath unless this name is overridden via a command line property:
`-Dout=/something_else.conf`. QuestDB will create `conf/log.conf` using default
values If `-Dout` is not set and file doesn't exist .

On Windows log messages go to depending on run mode :

- interactive session - console and `$dataDir\log\stdout-%Y-%m-%dT%H-%M-%S.txt`
  (default is `.\log\stdout-%Y-%m-%dT%H-%M-%S.txt` )
- service - `$dataDir\log\service-%Y-%m-%dT%H-%M-%S.txt` (default is
  `C:\Windows\System32\qdbroot\log\service-%Y-%m-%dT%H-%M-%S.txt` )

### Environment variables

Values in the log configuration file can be overridden with environment
variables. All configuration keys must be formatted as described in the
[environment variables](#environment-variables) section above.

For example, to set logging on `ERROR` level only:

```shell title="Setting log level to ERROR in log-stdout.conf"
w.stdout.level=ERROR
```

This can be passed as an environment variable as follows:

```shell title="Setting log level to ERROR via environment variable"
export QDB_LOG_W_STDOUT_LEVEL=ERROR
```

### Configuring Docker logging

When mounting a volume to a Docker container, a logging configuration file may
be provided in the container located at `./conf/log.conf`. For example, a file
with the following contents can be created:

```shell title="./conf/log.conf"
# list of configured writers
writers=file,stdout,http.min

# file writer
w.file.class=io.questdb.log.LogFileWriter
w.file.location=questdb-docker.log
w.file.level=INFO,ERROR,DEBUG

# stdout
w.stdout.class=io.questdb.log.LogConsoleWriter
w.stdout.level=INFO

# min http server, used monitoring
w.http.min.class=io.questdb.log.LogConsoleWriter
w.http.min.level=ERROR
w.http.min.scope=http-min-server
```

The current directory can be mounted:

```shell title="Mount the current directory to a QuestDB container"
docker run -p 9000:9000 -v "$(pwd):/var/lib/questdb/" questdb/questdb
```

The container logs will be written to disk using the logging level and file name
provided in the `./conf/log.conf` file, in this case in `./questdb-docker.log`.

### Prometheus Alertmanager

QuestDB includes a log writer that sends any message logged at critical level
(logger.critical("may-day")) to Prometheus Alertmanager over a TCP/IP socket.
Details for configuring this can be found in the
[Prometheus documentation](/docs/third-party-tools/prometheus). To configure
this writer, add it to the `writers` config alongside other log writers.

```ini title="log.conf"
# Which writers to enable
writers=stdout,alert

# stdout
w.stdout.class=io.questdb.log.LogConsoleWriter
w.stdout.level=INFO

# Prometheus Alerting
w.alert.class=io.questdb.log.LogAlertSocketWriter
w.alert.level=CRITICAL
w.alert.location=/alert-manager-tpt.json
w.alert.alertTargets=localhost:9093,localhost:9096,otherhost:9093
w.alert.defaultAlertHost=localhost
w.alert.defaultAlertPort=9093

# The `inBufferSize` and `outBufferSize` properties are the size in bytes for the
# socket write buffers.
w.alert.inBufferSize=2m
w.alert.outBufferSize=4m
# Delay in milliseconds between two consecutive attempts to alert when
# there is only one target configured
w.alert.reconnectDelay=250
```

Of all properties, only `w.alert.class` and `w.alert.level` are required, the
rest assume default values as stated above (except for `w.alert.alertTargets`
which is empty by default).

Alert targets are specified using `w.alert.alertTargets` as a comma-separated
list of up to 12 `host:port` TCP/IP addresses. Specifying a port is optional and
defaults to the value of `defaultAlertHost`. One of these alert managers is
picked at random when QuestDB starts, and a connection is created.

All alerts will be sent to the chosen server unless it becomes unavailable. If
it is unavailable, the next server is chosen. If there is only one server
configured and a fail-over cannot occur, a delay of 250 milliseconds is added
between send attempts.

The `w.alert.location` property refers to the path (absolute, otherwise relative
to `-d database-root`) of a template file. By default, it is a resource file
which contains:

```json title="/alert-manager-tpt.json"
[
  {
    "Status": "firing",
    "Labels": {
      "alertname": "QuestDbInstanceLogs",
      "service": "QuestDB",
      "category": "application-logs",
      "severity": "critical",
      "version": "${QDB_VERSION}",
      "cluster": "${CLUSTER_NAME}",
      "orgid": "${ORGID}",
      "namespace": "${NAMESPACE}",
      "instance": "${INSTANCE_NAME}",
      "alertTimestamp": "${date: yyyy/MM/ddTHH:mm:ss.SSS}"
    },
    "Annotations": {
      "description": "ERROR/cl:${CLUSTER_NAME}/org:${ORGID}/ns:${NAMESPACE}/db:${INSTANCE_NAME}",
      "message": "${ALERT_MESSAGE}"
    }
  }
]
```

Four environment variables can be defined, and referred to with the
`${VAR_NAME}` syntax:

- _ORGID_
- _NAMESPACE_
- _CLUSTER_NAME_
- _INSTANCE_NAME_

Their default value is `GLOBAL`, they mean nothing outside a cloud environment.

In addition, `ALERT_MESSAGE` is a placeholder for the actual `critical` message
being sent, and `QDB_VERSION` is the runtime version of the QuestDB instance
sending the alert. The `${date: <format>}` syntax can be used to produce a
timestamp at the time of sending the alert.

### Debug

QuestDB logging can be quickly forced globally to `DEBUG` via either providing
the java option `-Debug` or setting the environment variable `QDB_DEBUG=true`.
