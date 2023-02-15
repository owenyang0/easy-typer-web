---
title: QuestDB Kafka connector
description:
  QuestDB ships a QuestDB Kafka connector for ingesting messages from Kafka via
  the ILP protocol.
---

QuestDB ships a
[QuestDB Kafka connector](https://github.com/questdb/kafka-questdb-connector)
for fast ingestion from Kafka into QuestDB.

This page has the following main sections:

- A QuestDB Kafka connector integration guide
- A [configuration manual](#configuration-manual) for the connector
- [FAQ](#faq)

## Integration guide

This guide shows the steps to use the QuestDB Kafka connector to read JSON data
from Kafka topics and write them as rows into a QuestDB table.

### Prerequisites

You will need the following:

- Kafka
- A running QuestDB instance

### Configure Kafka

Before starting Kafka, the following steps must be completed:

1. Download the connector file.

The Apache Kafka distribution contains the Kafka Connect framework, but the
QuestDB-specific components need to be downloaded from
[the QuestDB Kafka connector GH page](https://github.com/questdb/kafka-questdb-connector/releases/latest),
under the zip archive named `kafka-questdb-connector-<version>-bin.zip`.

2. Copy the file to the Kafka `libs` directory.

Once downloaded, unzip the contents of the archive and copy the required `.jar`
files to the Kafka `libs` directory:

```shell
unzip kafka-questdb-connector-*-bin.zip
cd kafka-questdb-connector
cp ./*.jar /path/to/kafka_2.13-2.6.0/libs
```

:::tip

You can automate downloading the latest connector package by running this
command:

```shell
curl -s https://api.github.com/repos/questdb/kafka-questdb-connector/releases/latest |
jq -r '.assets[]|select(.content_type == "application/zip")|.browser_download_url'|
wget -qi -
```

:::

3. Set the configuration file.

A configuration file `/path/to/kafka/config/questdb-connector.properties` must
be created for Kafka Connect in the standalone mode. The host and port of the
running QuestDB server must be defined. A topic can be specified under the
`topics={mytopic}` key.

The example below creates a configuration file. It assumes a running QuestDB
server on the ILP default port, `9009`, creates a reader from a Kafka topic,
`example-topic`, and writes into a QuestDB table, `example_table`:

```shell title="Create a configuration file"
name=questdb-sink
connector.class=io.questdb.kafka.QuestDBSinkConnector
host=localhost:9009
topics=example-topic
table=example_table
include.key=false
value.converter=org.apache.kafka.connect.json.JsonConverter
value.converter.schemas.enable=false
key.converter=org.apache.kafka.connect.storage.StringConverter
```

### Start Kafka

The commands listed in this section must be run from the Kafka home directory
and in the order shown below.

1. Start the Kafka Zookeeper used to coordinate the server:

```shell
bin/zookeeper-server-start.sh  config/zookeeper.properties
```

2. Start a Kafka server:

```shell
bin/kafka-server-start.sh  config/server.properties
```

3. Start the QuestDB Kafka connector:

```shell
bin/connect-standalone.sh config/connect-standalone.properties config/questdb-connector.properties
```

### Publish messages

Messages can be published via the console producer script:

```shell
bin/kafka-console-producer.sh --topic example-topic --bootstrap-server localhost:9092
```

A greater-than symbol, `>`, indicates that a message can be published to the
example topic from the interactive session. Paste the following minified JSON as
a single line to publish the message and create the table `example-topic` in the
QuestDB instance:

<!-- prettier-ignore-start -->

```json
{"firstname": "Arthur", "lastname": "Dent", "age": 42}
```

<!-- prettier-ignore-end -->

### Verify the integration

To verify that the data has been ingested into the `example-topic` table, the
following request to QuestDB's `/exp` REST API endpoint can be made to export
the table contents via the curl command:

```shell
curl -G \
  --data-urlencode "query=select * from 'example_table'" \
  http://localhost:9000/exp
```

The expected response based on the example JSON message published above will be
similar to the following:

```csv
"firstname","age","lastname","timestamp"
"Arthur",42,"Dent","2022-11-01T13:11:55.558108Z"
```

If you can see the expected result then congratulations, you have successfully
created and executed your first Kafka to QuestDB pipeline! 🎉

### Additional sample projects

You can find additional sample projects on the
[QuestDB Kafka connector](https://github.com/questdb/kafka-questdb-connector/tree/main/kafka-questdb-connector-samples)
Github project page. It includes a
[sample integration](https://github.com/questdb/kafka-questdb-connector/tree/main/kafka-questdb-connector-samples/stocks)
with [Debezium](https://debezium.io/) for
[Change Data Capture](https://en.wikipedia.org/wiki/Change_data_capture) from
PostgreSQL.

## Configuration manual

This section lists configuration options as well as further information about
the Kafka Connect connector.

### Configuration Options

The connector supports the following configuration options:

| Name                              | Type      | Example                                                     | Default            | Meaning                                                    |
| --------------------------------- | --------- | ----------------------------------------------------------- | ------------------ | ---------------------------------------------------------- |
| topics                            | `string`  | orders                                                      | N/A                | Topics to read from                                        |
| key.converter                     | `string`  | <sub>org.apache.kafka.connect.storage.StringConverter</sub> | N/A                | Converter for keys stored in Kafka                         |
| value.converter                   | `string`  | <sub>org.apache.kafka.connect.json.JsonConverter</sub>      | N/A                | Converter for values stored in Kafka                       |
| host                              | `string`  | localhost:9009                                              | N/A                | Host and port where QuestDB server is running              |
| table                             | `string`  | my_table                                                    | Same as Topic name | Target table in QuestDB                                    |
| key.prefix                        | `string`  | from_key                                                    | key                | Prefix for key fields                                      |
| value.prefix                      | `string`  | from_value                                                  | N/A                | Prefix for value fields                                    |
| <sub>skip.unsupported.types</sub> | `boolean` | false                                                       | false              | Skip unsupported types                                     |
| <sub>timestamp.field.name</sub>   | `string`  | pickup_time                                                 | N/A                | Designated timestamp field name                            |
| timestamp.units                   | `string`  | micros                                                      | auto               | Designated timestamp field units                           |
| include.key                       | `boolean` | false                                                       | true               | Include message key in target table                        |
| symbols                           | `string`  | instrument,stock                                            | N/A                | Comma separated list of columns that should be symbol type |
| doubles                           | `string`  | volume,price                                                | N/A                | Comma separated list of columns that should be double type |
| username                          | `string`  | user1                                                       | admin              | User name for QuestDB. Used only when token is non-empty   |
| token                             | `string`  | <sub>QgHCOyq35D5HocCMrUGJinEsjEscJlC</sub>                  | N/A                | Token for QuestDB authentication                           |
| tls                               | `boolean` | true                                                        | false              | Use TLS for QuestDB connection                             |

### How does the connector work?

The connector reads data from Kafka topics and writes it to QuestDB tables via
ILP. The connector converts each field in the Kafka message to a column in the
QuestDB table. Structures and maps are flatted into columns.

Example: Consider the following Kafka message:

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "age": 30,
  "address": {
    "street": "Main Street",
    "city": "New York"
  }
}
```

The connector will create a table with the following columns:

| firstname <sub>string</sub> | lastname <sub>string</sub> | age <sub>long</sub> | address_street <sub>string</sub> | address_city <sub>string</sub> |
| --------------------------- | -------------------------- | ------------------- | -------------------------------- | ------------------------------ |
| John                        | Doe                        | 30                  | Main Street                      | New York                       |

### Supported serialization formats

The connector does not deserialize data independently. It relies on Kafka
Connect converters. The connector has been tested predominantly with JSON, but
it should work with any converter, including Avro. Converters can be configured
using `key.converter` and `value.converter` options, both are included in the
[Configuration options](#configuration-options) table above.

### Designated timestamps

The connector supports
[designated timestamps](https://questdb.io/docs/concept/designated-timestamp/).
If the message contains a timestamp field, the connector can use it as a
timestamp for the row. The field name must be configured using the
`timestamp.field.name` option. The field must either be an integer or a
timestamp. When the field is set to an integer, the connector will autodetect
its units. This works for timestamps after 04/26/1970, 5:46:40 PM. The units can
also be configured explicitly using the `timestamp.units` configuration, which
supports the following values:

- `nanos`
- `micros`
- `millis`
- `auto` (default)

### Symbol

QuestDB supports a special type called
[symbol](https://questdb.io/docs/concept/symbol/). Use the `symbols`
configuration option to specify which columns should be created as the `symbol`
type.

### Numeric type inference for floating point type

When a configured Kafka Connect deserializer provides a schema, the connector
uses it to determine column types. If a schema is unavailable, the connector
infers the type from the value. This might produce unexpected results for
floating point numbers, which may be interpreted as `long` initially and
generates an error.

Consider this example:

```json
{
  "instrument": "BTC-USD",
  "volume": 42
}
```

Kafka Connect JSON converter deserializes the `volume` field as a `long` value.
The connector sends it to the QuestDB server as a `long` value. If the target
table does not have a column `volume`, the database creates a `long` column. If
the next message contains a floating point value for the `volume` field, the
connector sends it to QuestDB as a `double` value. This causes an error because
the existing column `volume` is of type `long`.

To avoid this problem, the connector can be configured to send selected numeric
columns as `double` regardless of the actual initial input value. Use the
`doubles` configuration option to specify which columns should the connector
always send as the `double` type.

### Target table considerations

When a target table does not exist in QuestDB, it will be created automatically.
This is the recommended approach for development and testing.

In production, it's recommended to use the SQL
[CREATE TABLE](https://questdb.io/docs/reference/sql/create-table/) keyword,
because it gives you more control over the table schema, allowing per-table
partitioning, creating indexes, etc.

## FAQ

<details>
  <summary>Does this connector work with Schema Registry? </summary>
<p>


The Connector works independently of the serialization strategy used. It relies
on Kafka Connect converters to deserialize data. Converters can be configured
using `key.converter` and `value.converter` options, see the configuration
section above.

</p>
</details>


<details>
  <summary>I'm getting this error:
"org.apache.kafka.connect.errors.DataException: JsonConverter with schemas.enable requires 'schema' and 'payload' fields and may not contain additional fields. If you are trying to deserialize plain JSON data, set schemas.enable=false in your converter configuration."</summary>
<p>


This error means that the connector is trying to deserialize data using a
converter that expects a schema. The connector does not require schemas, so you
need to configure the converter to not expect a schema. For example, if you are
using a JSON converter, you need to set `value.converter.schemas.enable=false`
or `key.converter.schemas.enable=false` in the connector configuration.

</p>
</details>


<details>
  <summary>Does this connector work with Debezium?</summary>
<p>


Yes, it's been tested with Debezium as a source and a
[sample project](https://github.com/questdb/kafka-questdb-connector/tree/main/kafka-questdb-connector-samples/stocks)
is available. Bear in mind that QuestDB is meant to be used as an append-only
database; hence, updates should be translated as new inserts. The connector
supports Debezium's `ExtractNewRecordState` transformation to extract the new
state of the record. The transformation by default drops DELETE events, so there
is no need to handle them explicitly.

</p>
</details>


<details>
  <summary>QuestDB is a time series database, how does it fit into Change Data
Capture via Debezium?</summary>
<p>


QuestDB works with Debezium just great! This is the recommended pattern:
Transactional applications use a relational database to store the current state
of the data. QuestDB is used to store the history of changes. Example: Imagine
you have a PostgreSQL table with the most recent stock prices. Whenever a stock
price changes, an application updates the PostgreSQL table. Debezium captures
each UPDATE/INSERT and pushes it as an event to Kafka. Kafka Connect QuestDB
connector reads the events and inserts them into QuestDB. In this way,
PostgreSQL will have the most recent stock prices and QuestDB will have the
history of changes. You can use QuestDB to build a dashboard with the most
recent stock prices and a chart with the history of changes.

</p>
</details>


<details>
  <summary>How I can select which fields to include in the target table?</summary>
<p>


Use the ReplaceField transformation to remove unwanted fields. For example, if
you want to remove the `address` field, you can use the following configuration:

```json
{
  "name": "questdb-sink",
  "config": {
    "connector.class": "io.questdb.kafka.QuestDBSinkConnector",
    "host": "localhost:9009",
    "topics": "Orders",
    "table": "orders_table",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "transforms": "removeAddress",
    "transforms.removeAddress.type": "org.apache.kafka.connect.transforms.ReplaceField$Value",
    "transforms.removeAddress.blacklist": "address"
  }
}
```

See
[ReplaceField documentation](https://docs.confluent.io/platform/current/connect/transforms/replacefield.html#replacefield)
for more details.

</p>
</details>


<details>
  <summary>I need to run Kafka Connect on Java 8, but the connector says it requires
Java 11. What should I do? </summary>
<p>


The Kafka Connect-specific part of the connectors works with Java 8. The
requirement for Java 11 is coming from QuestDB client itself. The zip archive
contains 2 JARs: `questdb-kafka-connector-VERSION.jar` and
`questdb-VERSION.jar`. You can replace the latter with
`questdb-VERSION-jdk8.jar` from the
[Maven central](https://mvnrepository.com/artifact/org.questdb/questdb/6.5.4-jdk8).
Please note that this setup is not officially supported, and you may encounter
issues. If you do, please report them to us.

</p>
</details>

## See also

- [Change Data Capture with QuestDB and Debezium](/blog/2023/01/03/change-data-capture-with-questdb-and-debezium)
- [Realtime crypto tracker with QuestDB Kafka Connector](/blog/realtime-crypto-tracker-with-questdb-kafka-connector)