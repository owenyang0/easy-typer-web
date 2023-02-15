# Insert data

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import { RemoteRepoExample } from "@theme/RemoteRepoExample"

This page shows how to insert data into QuestDB using different programming
languages and tools.

[InfluxDB Line Protocol](#influxdb-line-protocol) is the recommended primary
ingestion method in QuestDB and is recommended for high-performance
applications.

For transactional data inserts, use the
[PostgreSQL wire protocol](#postgresql-wire-protocol).

For operational (ad-hoc) data ingestion, the [Web Console](#web-console) makes
it easy to upload CSV files and insert via SQL statements. You can also perform
these same actions via the [HTTP REST API](#http-rest-api). For
[large CSV import](/docs/guides/importing-data) (database migrations), use SQL
`COPY`.

In summary, these are the different options:

- [InfluxDB Line Protocol](#influxdb-line-protocol)
  - High performance.
  - Optional automatic timestamps.
  - Optional integrated authentication.
  - [Client libraries](/docs/reference/clients/overview) in various programming
    languages.
- [PostgreSQL wire protocol](#postgresql-wire-protocol)
  - SQL `INSERT` statements, including parameterized queries.
  - Use `psql` on the command line.
  - Interoperability with third-party tools and libraries.
- [Web Console](#web-console)
  - CSV upload.
  - SQL `INSERT` statements.
  - SQL `COPY` for [large CSV import](/docs/guides/importing-data/).
- [HTTP REST API](#http-rest-api)
  - CSV upload.
  - SQL `INSERT` statements.
  - Use `curl` on the command line.

## InfluxDB Line Protocol

The InfluxDB Line Protocol (ILP) is a text protocol over TCP on port 9009.

It is a one-way protocol to insert data, focusing on simplicity and performance.

Here is a summary table showing how it compares with other ways to insert data
that we support:

| Protocol                 | Record Insertion Reporting       | Data Insertion Performance          |
| :----------------------- | :------------------------------- | :---------------------------------- |
| InfluxDB Line Protocol   | Server logs; Disconnect on error | **Best**                            |
| CSV upload via HTTP REST | Configurable                     | Very Good                           |
| SQL `INSERT` statements  | Transaction-level                | Good                                |
| SQL `COPY` statements    | Transaction-level                | Suitable for one-off data migration |

This interface is the preferred ingestion method as it provides the following
benefits:

- High-throughput ingestion
- Robust ingestion from multiple sources into tables with dedicated systems for
  reducing congestion
- Configurable commit-lag for out-of-order data via
  [server configuration](/docs/reference/configuration#influxdb-line-protocol-tcp)
  settings

With sufficient client-side validation, the lack of errors to the client and
confirmation isn't necessarily a concern: QuestDB will log out any issues and
disconnect on error. The database will process any valid lines up to that point
and insert rows.

On the [InfluxDB line protocol](/docs/reference/api/ilp/overview) page, you may
find additional details on the message format, ports and authentication.

The [Telegraf guide](/docs/third-party-tools/telegraf) helps you configure a
Telegraf agent to collect and send metrics to QuestDB via ILP.

:::tip

The [ILP client libraries](/docs/reference/clients/overview) provide more
user-friendly ILP clients for a growing number of languages.

:::

### Examples

These examples send a few rows of input. These use client libraries as well as
raw TCP socket connections, when a client library is not available.

<Tabs defaultValue="python" values={[
  { label: "Python", value: "python" },
  { label: "Go", value: "go" },
  { label: "Java", value: "java" },
  { label: "NodeJS", value: "nodejs" },
  { label: "C#", value: "csharp" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "Rust", value: "rust" },
  { label: "Ruby", value: "ruby" },
  { label: "PHP", value: "php" },
]}>


<TabItem value="python">
  <RemoteRepoExample name="ilp" lang="python" />
</TabItem>

<TabItem value="go">
  <RemoteRepoExample name="ilp" lang="go" />
</TabItem>

<TabItem value="java">
  <RemoteRepoExample name="ilp" lang="java" />
</TabItem>

<TabItem value="nodejs">
  <RemoteRepoExample name="ilp" lang="javascript" />
</TabItem>

<TabItem value="csharp">
  <RemoteRepoExample name="ilp" lang="csharp" />
</TabItem>

<TabItem value="c">
  <RemoteRepoExample name="ilp" lang="c" />
</TabItem>

<TabItem value="cpp">
  <RemoteRepoExample name="ilp" lang="cpp" />
</TabItem>

<TabItem value="rust">
  <RemoteRepoExample name="ilp" lang="rust" />
</TabItem>

<TabItem value="ruby">


```ruby
require 'socket'
HOST = 'localhost'
PORT = 9009
# Returns the current time in nanoseconds
def time_in_nsec
    now = Time.now
    return now.to_i * (10 ** 9) + now.nsec
end
begin
    s = TCPSocket.new HOST, PORT
    # Single record insert
    s.puts "trades,name=client_timestamp value=12.4 #{time_in_nsec}\n"
    # Omitting the timestamp allows the server to assign one
    s.puts "trades,name=client_timestamp value=12.4\n"
    # Streams of readings must be newline-delimited
    s.puts "trades,name=client_timestamp value=12.4\n" +
            "trades,name=client_timestamp value=11.4\n"
rescue SocketError => ex
    puts ex.inspect
ensure
    s.close() if s
end
```

</TabItem>


<TabItem value="php">


```php
<?php
error_reporting(E_ALL);

/* Allow the script to hang around waiting for connections. */
set_time_limit(0);

/* Turn on implicit output flushing so we see what we're getting
 * as it comes in. */
ob_implicit_flush();

$address = 'localhost';
$port = 9009;

/* Create a TCP/IP socket. */
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false) {
    echo "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
} else {
    echo "OK.\n";
}

echo "Attempting to connect to '$address' on port '$port'...";
$result = socket_connect($socket, $address, $port);
if ($result === false) {
    echo "socket_connect() failed.\nReason: ($result) " . socket_strerror(socket_last_error($socket)) . "\n";
} else {
    echo "OK.\n";
}

$row=utf8_encode("test_readings,city=London,make=Omron temperature=23.5,humidity=0.343 1465839830100400000\n");
echo "$row";
socket_write($socket, $row);
echo "\n";
socket_close($socket);

?>
```

</TabItem>


</Tabs>


### Timestamps

Providing a timestamp is optional. If one isn't provided, the server will
automatically assign the server's system time as the row's timestamp value.

Timestamps are interpreted as the number of nanoseconds from 1st Jan 1970 UTC,
unless otherwise configured. See `cairo.timestamp.locale` and
`line.tcp.timestamp` [configuration options](/docs/reference/configuration).

### ILP Datatypes and Casts

#### Strings vs Symbols

Strings may be recorded as either the `STRING` type or the `SYMBOL` type.

Inspecting a sample ILP we can see how a space `' '` separator splits `SYMBOL`
columns to the left from the rest of the columns.

```text
table_name,col1=symbol_val1,col2=symbol_val2 col3="string val",col4=10.5
                                            ┬
                                            ╰───────── separator
```

In this example, columns `col1` and `col2` are strings written to the database
as `SYMBOL`s, whilst `col3` is written out as a `STRING`.

`SYMBOL`s are strings with which are automatically
[interned](https://en.wikipedia.org/wiki/String_interning) by the database on a
per-column basis. You should use this type if you expect the string to be
re-used over and over, such as is common with identifiers.

For one-off strings use `STRING` columns which aren't interned.

#### Casts

QuestDB types are a superset of those supported by ILP. This means that when
sending data you should be aware of the performed conversions.

See:

- [QuestDB Types in SQL](/docs/reference/sql/datatypes)
- [ILP types and cast conversion tables](/docs/reference/api/ilp/columnset-types)

### Constructing well-formed messages

Different library implementations will perform different degrees content
validation upfront before sending messages out. To avoid encountering issues,
follow these guidelines:

- **All strings must be UTF-8 encoded.**

- **Columns should only appear once per row.**

- **Symbol columns must be written out before other columns.**

- **Table and column names can't have invalid characters.** These should not
  contain `?`, `.`,`,`, `'`, `"`, `\`, `/`, `:`, `(`, `)`, `+`, `-`, `*`, `%`,
  `~`,`' '` (space), `\0` (nul terminator),
  [ZERO WIDTH NO-BREAK SPACE](https://unicode-explorer.com/c/FEFF).

- **Write timestamp column via designated API**, or at the end of the message if
  you are using raw sockets. If you have multiple timestamp columns write
  additional ones as column values.

- **Don't change column type between rows.**

- **Supply timestamps in order.** These need to be at least equal to previous
  ones in the same table, unless using the out of order feature. This is not
  necessary if you use the [out-of-order](/docs/guides/out-of-order-commit-lag)
  feature.

### Errors in Server Logs

QuestDB will always log any ILP errors in its
[server logs](/docs/concept/root-directory-structure#log-directory).

Here is an example error from the server logs caused when a line attempted to
insert a `STRING` into a `SYMBOL` column.

```text
2022-04-13T13:35:19.784654Z E i.q.c.l.t.LineTcpConnectionContext [3968] could not process line data [table=bad_ilp_example, msg=cast error for line protocol string [columnWriterIndex=0, columnType=SYMBOL], errno=0]
2022-04-13T13:35:19.784670Z I tcp-line-server scheduling disconnect [fd=3968, reason=0]
```

### Inserting NULL values

To insert a NULL value, skip the column (or symbol) for that row.

For example:

```text
table1 a=10.5 1647357688714369403
table1 b=1.25 1647357698714369403
```

Will insert as:

| a      | b      | timestamp                   |
| :----- | :----- | --------------------------- |
| 10.5   | _NULL_ | 2022-03-15T15:21:28.714369Z |
| _NULL_ | 1.25   | 2022-03-15T15:21:38.714369Z |

### If you don't immediately see data

If you don't see your inserted data, this is usually down to one of two things:

- You prepared the messages, but forgot to call `.flush()` or similar in your
  client library, so no data was sent.

- The internal timers and buffers within QuestDB did not commit the data yet.
  For development (and development only), you may want to tweak configuration
  settings to commit data more frequently.
  ```ini title=server.conf
  cairo.max.uncommitted.rows=1
  ```
  Refer to
  [ILP's commit strategy](/docs/reference/api/ilp/tcp-receiver/#commit-strategy)
  documentation for more on these configuration settings.

### Authentication

ILP can additionally provide authentication. This is an optional feature which
is documented [here](/docs/reference/api/ilp/authenticate).

### Third-party Library Compatibility

Use our own [client libraries](/docs/reference/clients/overview) and/or protocol
documentation: Clients intended to work with InfluxDB will not work with
QuestDB.

## PostgreSQL wire protocol

QuestDB also supports the same wire protocol as PostgreSQL, allowing you to
connect and query the database with various third-party pre-existing client
libraries and tools.

You can connect to TCP port `8812` and use both `INSERT` and `SELECT` SQL
queries.

PostgreSQL wire protocol is better suited for applications inserting via SQL
programmatically as it provides parameterized queries, which avoid SQL injection
issues.

:::tip

[InfluxDB Line Protocol](#influxdb-line-protocol) is the recommended primary
ingestion method in QuestDB. SQL `INSERT` statements over the PostgreSQL offer
feedback and error reporting, but have worse overall performance.

:::

Here are a few examples demonstrating SQL `INSERT` queries:

<Tabs defaultValue="psql" values={[
  { label: "psql", value: "psql" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
]}>


<TabItem value="psql">


Create the table:

```shell
psql -h localhost -p 8812 -U admin -d qdb \
    -c "CREATE TABLE IF NOT EXISTS t1 (name STRING, value INT);"
```

Insert row:

```shell
psql -h localhost -p 8812 -U admin -d qdb -c "INSERT INTO t1 VALUES('a', 42)"
```

Query back:

```shell
psql -h localhost -p 8812 -U admin -d qdb -c "SELECT * FROM t1"
```

Note that you can also run `psql` from Docker without installing the client
locally:

```
docker run -it --rm --network=host -e PGPASSWORD=quest \
    postgres psql ....
```

</TabItem>


<TabItem value="python">


This example uses the
[psychopg3](https://www.psycopg.org/psycopg3/docs/) adapter.

To [install](https://www.psycopg.org/psycopg3/docs/basic/install.html) the client library, use `pip`:

```shell
python3 -m pip install "psycopg[binary]"
```


```python
import psycopg as pg
import time

# Connect to an existing QuestDB instance

conn_str = 'user=admin password=quest host=127.0.0.1 port=8812 dbname=qdb'
with pg.connect(conn_str, autocommit=True) as connection:
    
    # Open a cursor to perform database operations

    with connection.cursor() as cur:

        # Execute a command: this creates a new table

        cur.execute('''
          CREATE TABLE IF NOT EXISTS test_pg (
              ts TIMESTAMP,
              name STRING,
              value INT
          ) timestamp(ts);
          ''')
        
        print('Table created.')

        # Insert data into the table.

        for x in range(10):

            # Converting datetime into millisecond for QuestDB

            timestamp = time.time_ns() // 1000

            cur.execute('''
                INSERT INTO test_pg
                    VALUES (%s, %s, %s);
                ''',
                (timestamp, 'python example', x))

        print('Rows inserted.')

        #Query the database and obtain data as Python objects.

        cur.execute('SELECT * FROM trades_pg;')
        records = cur.fetchall()
        for row in records:
            print(row)

# the connection is now closed

```

</TabItem>


<TabItem value="java">


```java
package com.myco;

import java.sql.*;
import java.util.Properties;

class App {
  public static void main(String[] args) throws SQLException {
    Properties properties = new Properties();
    properties.setProperty("user", "admin");
    properties.setProperty("password", "quest");
    properties.setProperty("sslmode", "disable");

    final Connection connection = DriverManager.getConnection(
      "jdbc:postgresql://localhost:8812/qdb", properties);
    connection.setAutoCommit(false);

    final PreparedStatement statement = connection.prepareStatement(
      "CREATE TABLE IF NOT EXISTS trades (" +
      "    ts TIMESTAMP, date DATE, name STRING, value INT" +
      ") timestamp(ts);");
    statement.execute();

    try (PreparedStatement preparedStatement = connection.prepareStatement(
        "INSERT INTO TRADES  VALUES (?, ?, ?, ?)")) {
      preparedStatement.setTimestamp(
        1,
        new Timestamp(io.questdb.std.Os.currentTimeMicros()));
      preparedStatement.setDate(2, new Date(System.currentTimeMillis()));
      preparedStatement.setString(3, "abc");
      preparedStatement.setInt(4, 123);
      preparedStatement.execute();
    }
    System.out.println("Done");
    connection.close();
  }
}
```

</TabItem>


<TabItem value="nodejs">


This example uses the [`pg` package](https://www.npmjs.com/package/pg) which
allows for quickly building queries using Postgres wire protocol. Details on the
use of this package can be found on the
[node-postgres documentation](https://node-postgres.com/).

This example uses naive `Date.now() * 1000` inserts for Timestamp types in
microsecond resolution. For accurate microsecond timestamps, the
[process.hrtime.bigint()](https://nodejs.org/api/process.html#processhrtimebigint)
call can be used.

```javascript
"use strict"

const { Client } = require("pg")

const start = async () => {
  const client = new Client({
    database: "qdb",
    host: "127.0.0.1",
    password: "quest",
    port: 8812,
    user: "admin",
  })
  await client.connect()

  const createTable = await client.query(
    "CREATE TABLE IF NOT EXISTS trades (" +
      "    ts TIMESTAMP, date DATE, name STRING, value INT" +
      ") timestamp(ts);",
  )
  console.log(createTable)

  let now = new Date().toISOString()
  const insertData = await client.query(
    "INSERT INTO trades VALUES($1, $2, $3, $4);",
    [now, now, "node pg example", 123],
  )
  await client.query("COMMIT")

  console.log(insertData)

  for (let rows = 0; rows < 10; rows++) {
    // Providing a 'name' field allows for prepared statements / bind variables
    now = new Date().toISOString()
    const query = {
      name: "insert-values",
      text: "INSERT INTO trades VALUES($1, $2, $3, $4);",
      values: [now, now, "node pg prep statement", rows],
    }
    await client.query(query)
  }
  await client.query("COMMIT")

  const readAll = await client.query("SELECT * FROM trades")
  console.log(readAll.rows)

  await client.end()
}

start()
  .then(() => console.log("Done"))
  .catch(console.error)
```

</TabItem>


<TabItem value="go">


This example uses the [pgx](https://github.com/jackc/pgx) driver and toolkit for
PostgreSQL in Go. More details on the use of this toolkit can be found on the
[GitHub repository for pgx](https://github.com/jackc/pgx/wiki/Getting-started-with-pgx).

```go
package main

import (
  "context"
  "fmt"
  "log"
  "time"

  "github.com/jackc/pgx/v4"
)

var conn *pgx.Conn
var err error

func main() {
  ctx := context.Background()
  conn, _ = pgx.Connect(ctx, "postgresql://admin:quest@localhost:8812/qdb")
  defer conn.Close(ctx)

  // text-based query
  _, err := conn.Exec(ctx,
    ("CREATE TABLE IF NOT EXISTS trades (" +
     "    ts TIMESTAMP, date DATE, name STRING, value INT" +
     ") timestamp(ts);"))
  if err != nil {
    log.Fatalln(err)
  }

  // Prepared statement given the name 'ps1'
  _, err = conn.Prepare(ctx, "ps1", "INSERT INTO trades VALUES($1,$2,$3,$4)")
  if err != nil {
    log.Fatalln(err)
  }

  // Insert all rows in a single commit
  tx, err := conn.Begin(ctx)
  if err != nil {
    log.Fatalln(err)
  }

  for i := 0; i < 10; i++ {
    // Execute 'ps1' statement with a string and the loop iterator value
    _, err = conn.Exec(
      ctx,
      "ps1",
      time.Now(),
      time.Now().Round(time.Millisecond),
      "go prepared statement",
      i + 1)
    if err != nil {
      log.Fatalln(err)
    }
  }

  // Commit the transaction
  err = tx.Commit(ctx)
  if err != nil {
    log.Fatalln(err)
  }

  // Read all rows from table
  rows, err := conn.Query(ctx, "SELECT * FROM trades")
  fmt.Println("Reading from trades table:")
  for rows.Next() {
    var name string
    var value int64
    var ts time.Time
    var date time.Time
    err = rows.Scan(&ts, &date, &name, &value)
    fmt.Println(ts, date, name, value)
  }

  err = conn.Close(ctx)
}
```

</TabItem>


<TabItem value="rust">


The following example shows how to use parameterized queries and prepared
statements using the [rust-postgres](https://docs.rs/postgres/0.19.0/postgres/)
client.

```rust
use postgres::{Client, NoTls, Error};
use chrono::{Utc};
use std::time::SystemTime;

fn main() -> Result<(), Error> {
    let mut client = Client::connect("postgresql://admin:quest@localhost:8812/qdb", NoTls)?;

    // Basic query
    client.batch_execute(
      "CREATE TABLE IF NOT EXISTS trades ( \
          ts TIMESTAMP, date DATE, name STRING, value INT \
      ) timestamp(ts);")?;

    // Parameterized query
    let name: &str = "rust example";
    let val: i32 = 123;
    let utc = Utc::now();
    let sys_time = SystemTime::now();
    client.execute(
        "INSERT INTO trades VALUES($1,$2,$3,$4)",
        &[&utc.naive_local(), &sys_time, &name, &val],
    )?;

    // Prepared statement
    let mut txn = client.transaction()?;
    let statement = txn.prepare("INSERT INTO trades VALUES ($1,$2,$3,$4)")?;
    for value in 0..10 {
        let utc = Utc::now();
        let sys_time = SystemTime::now();
        txn.execute(&statement, &[&utc.naive_local(), &sys_time, &name, &value])?;
    }
    txn.commit()?;

    println!("import finished");
    Ok(())
}
```

</TabItem>


</Tabs>


## Web Console

QuestDB ships with an embedded [Web Console](/docs/develop/web-console) running
by default on port `9000`.

```questdb-sql title='Creating a table and inserting some data'

CREATE TABLE takeaway_order (ts TIMESTAMP, id SYMBOL, status SYMBOL)
  TIMESTAMP(ts);

INSERT INTO takeaway_order VALUES (now(), 'order1', 'placed');
INSERT INTO takeaway_order VALUES (now(), 'order2', 'placed');
```

SQL statements can be written in the code editor and executed by clicking the
**Run** button. Note that the web console runs a single statement at a time.

For inserting bulk data or migrating data from other databases, see
[large CSV import](/docs/guides/importing-data).

## HTTP REST API

QuestDB exposes a REST API for compatibility with a wide range of libraries and
tools. The REST API is accessible on port `9000` and has the following
insert-capable entrypoints:

| Entrypoint                                 | HTTP Method | Description                             | API Docs                                                     |
| :----------------------------------------- | :---------- | :-------------------------------------- | :----------------------------------------------------------- |
| [`/imp`](#imp-uploading-tabular-data)      | POST        | Import CSV data                         | [Reference](/docs/reference/api/rest#imp---import-data)      |
| [`/exec?query=..`](#exec-sql-insert-query) | GET         | Run SQL Query returning JSON result set | [Reference](/docs/reference/api/rest#exec---execute-queries) |

For details such as content type, query parameters and more, refer to the
[REST API](/docs/reference/api/rest) docs.

### `/imp`: Uploading Tabular Data

:::tip

[InfluxDB Line Protocol](#influxdb-line-protocol) is the recommended primary
ingestion method in QuestDB. CSV uploading offers insertion feedback and error
reporting, but has worse overall performance.

See `/imp`'s [`atomicity`](/docs/reference/api/rest#url-parameters) query
parameter to customize behavior on error.

:::

Let's assume you want to upload the following data via the `/imp` entrypoint:

<Tabs defaultValue="csv" values={[
  { label: "CSV", value: "csv" },
  { label: "Table", value: "table" },
]}>


<TabItem value="csv">


```csv title=data.csv
col1,col2,col3
a,10.5,True
b,100,False
c,,True
```

</TabItem>


<TabItem value="table">


| col1 | col2   | col3    |
| :--- | :----- | :------ |
| a    | 10.5   | _true_  |
| b    | 100    | _false_ |
| c    | _NULL_ | _true_  |

</TabItem>


</Tabs>


You can do so via the command line using `cURL` or programmatically via HTTP
APIs in your scripts and applications.

By default, the response is designed to be human-readable. Use the `fmt=json`
query argument to obtain a response in JSON. You can also specify the schema
explicitly. See the second example in Python for these features.

<Tabs defaultValue="curl" values={[
  { label: "cURL", value: "curl" },
  { label: "Python", value: "python" },
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>


<TabItem value="curl">


This example imports a CSV file with automatic schema detection.

```shell title="Basic import with table name"
curl -F data=@data.csv http://localhost:9000/imp?name=table_name
```

This example overwrites an existing table and specifies a timestamp format and a
designated timestamp column. For more information on the optional parameters to
specify timestamp formats, partitioning and renaming tables, see the
[REST API documentation](/docs/reference/api/rest#examples).

```bash title="Providing a user-defined schema"
curl \
-F schema='[{"name":"ts", "type": "TIMESTAMP", "pattern": "yyyy-MM-dd - HH:mm:ss"}]' \
-F data=@weather.csv 'http://localhost:9000/imp?overwrite=true&timestamp=ts'
```

</TabItem>


<TabItem value="python">


This first example shows uploading the `data.csv` file with automatic schema
detection.

```python
import sys
import requests

csv = {'data': ('my_table', open('./data.csv', 'r'))}
host = 'http://localhost:9000'

try:
    response = requests.post(host + '/imp', files=csv)
    print(response.text)
except requests.exceptions.RequestException as e:
    print(f'Error: {e}', file=sys.stderr)
```

The second example creates a CSV buffer from Python objects and uploads them
with a custom schema. Note UTF-8 encoding.

The `fmt=json` parameter allows us to obtain a parsable response, rather than a
tabular response designed for human consumption.

```python
import io
import csv
import requests
import pprint
import json


def to_csv_str(table):
    output = io.StringIO()
    csv.writer(output, dialect='excel').writerows(table)
    return output.getvalue().encode('utf-8')


def main():
    table_name = 'example_table2'
    table = [
        ['col1', 'col2', 'col3'],
        ['a',    10.5,   True],
        ['b',    100,    False],
        ['c',    None,   True]]

    table_csv = to_csv_str(table)
    print(table_csv)
    schema = json.dumps([
        {'name': 'col1', 'type': 'SYMBOL'},
        {'name': 'col2', 'type': 'DOUBLE'},
        {'name': 'col3', 'type': 'BOOLEAN'}])
    response = requests.post(
        'http://localhost:9000/imp',
        params={'fmt': 'json'},
        files={
            'schema': schema,
            'data': (table_name, table_csv)}).json()

    # You can parse the `status` field and `error` fields
    # of individual columns. See Reference/API/REST docs for details.
    pprint.pprint(response)


if __name__ == '__main__':
    main()
```

</TabItem>


<TabItem value="nodejs">


```javascript
const fetch = require("node-fetch")
const FormData = require("form-data")
const fs = require("fs")

const HOST = "http://localhost:9000"

async function run() {
  const form = new FormData()

  form.append("data", fs.readFileSync(__dirname + "/data.csv"), {
    filename: fileMetadata.name,
    contentType: "application/octet-stream",
  })

  try {
    const r = await fetch(`${HOST}/imp`, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    })

    console.log(r)
  } catch (e) {
    console.error(e)
  }
}

run()
```

</TabItem>


<TabItem value="go">


```go
package main

import (
  "bytes"
  "fmt"
  "io"
  "io/ioutil"
  "log"
  "mime/multipart"
  "net/http"
  "net/url"
  "os"
)

func main() {
  u, err := url.Parse("http://localhost:9000")
  checkErr(err)
  u.Path += "imp"
  url := fmt.Sprintf("%v", u)
  fileName := "/path/to/data.csv"
  file, err := os.Open(fileName)
  checkErr(err)

  defer file.Close()

  buf := new(bytes.Buffer)
  writer := multipart.NewWriter(buf)
  uploadFile, _ := writer.CreateFormFile("data", "data.csv")
  _, err = io.Copy(uploadFile, file)
  checkErr(err)
  writer.Close()

  req, err := http.NewRequest(http.MethodPut, url, buf)
  checkErr(err)
  req.Header.Add("Content-Type", writer.FormDataContentType())

  client := &http.Client{}
  res, err := client.Do(req)
  checkErr(err)

  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  checkErr(err)

  log.Println(string(body))
}

func checkErr(err error) {
  if err != nil {
    panic(err)
  }
}
```

</TabItem>


</Tabs>


### `/exec`: SQL `INSERT` Query

The `/exec` entrypoint takes a SQL query and returns results as JSON.

We can use this for quick SQL inserts too, but note that there's no support for
parameterized queries that are necessary to avoid SQL injection issues.

:::tip

Prefer the [PostgreSQL interface](#postgresql-wire-protocol) if you are
generating sql programmatically.

Prefer [ILP](#influxdb-line-protocol) if you need high-performance inserts.

:::

<Tabs defaultValue="curl" values={[
  { label: "cURL", value: "curl" },
  { label: "Python", value: "python" },
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>


<TabItem value="curl">


```shell
# Create Table
curl -G \
  --data-urlencode "query=CREATE TABLE IF NOT EXISTS trades(name STRING, value INT)" \
  http://localhost:9000/exec

# Insert a row
curl -G \
  --data-urlencode "query=INSERT INTO trades VALUES('abc', 123456)" \
  http://localhost:9000/exec
```

</TabItem>


<TabItem value="python">


```python
import sys
import requests
import json

host = 'http://localhost:9000'

def run_query(sql_query):
    query_params = {'query': sql_query, 'fmt' : 'json'}
    try:
        response = requests.get(host + '/exec', params=query_params)
        json_response = json.loads(response.text)
        print(json_response)
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}', file=sys.stderr)

# create table
run_query("CREATE TABLE IF NOT EXISTS trades (name STRING, value INT)")
# insert row
run_query("INSERT INTO trades VALUES('abc', 123456)")
```

</TabItem>


<TabItem value="nodejs">


The `node-fetch` package can be installed using `npm i node-fetch`.

```javascript
const fetch = require("node-fetch")

const HOST = "http://localhost:9000"

async function createTable() {
  try {
    const query = "CREATE TABLE IF NOT EXISTS trades (name STRING, value INT)"

    const response = await fetch(
      `${HOST}/exec?query=${encodeURIComponent(query)}`,
    )
    const json = await response.json()

    console.log(json)
  } catch (error) {
    console.log(error)
  }
}

async function insertData() {
  try {
    const query = "INSERT INTO trades VALUES('abc', 123456)"

    const response = await fetch(
      `${HOST}/exec?query=${encodeURIComponent(query)}`,
    )
    const json = await response.json()

    console.log(json)
  } catch (error) {
    console.log(error)
  }
}

createTable().then(insertData)
```

</TabItem>


<TabItem value="go">


```go
package main

import (
  "fmt"
  "io/ioutil"
  "log"
  "net/http"
  "net/url"
)

func main() {
  u, err := url.Parse("http://localhost:9000")
  checkErr(err)

  u.Path += "exec"
  params := url.Values{}
  params.Add("query", `
    CREATE TABLE IF NOT EXISTS
      trades (name STRING, value INT);
    INSERT INTO
      trades
    VALUES(
      "abc",
      123456
    );
  `)
  u.RawQuery = params.Encode()
  url := fmt.Sprintf("%v", u)

  res, err := http.Get(url)
  checkErr(err)

  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  checkErr(err)

  log.Println(string(body))
}

func checkErr(err error) {
  if err != nil {
    panic(err)
  }
}
```

</TabItem>


</Tabs>

