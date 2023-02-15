---
title: Capacity planning
description:
  How to plan and configure system resources, database configuration, and client
  application code available to QuestDB to ensure that server operation
  continues uninterrupted.
---

Capacity planning should be considered as part of the requirements of deploying
QuestDB to forecast CPU, memory, network capacity, and a combination of these
elements, depending on the expected demands of the system. This page describes
configuring these system resources with example scenarios that align with both
edge cases and common setup configurations.

Most of the configuration settings referred to below except for OS settings are
configured in QuestDB by either a `server.conf` configuration file or as
environment variables. For more details on applying configuration settings in
QuestDB, refer to the [configuration](/docs/reference/configuration) page.

To monitor various metrics of the QuestDB instances, refer to the
[Prometheus monitoring page](/docs/third-party-tools/prometheus/) or the
[Health monitoring page](/docs/operations/health-monitoring/).

## Storage and filesystem

The following sections describe aspects to consider regarding the storage of
data and file systems.

### Supported filesystem

QuestDB officially supports the following filesystems:

- EXT4
- APFS
- NTFS
- OVERLAYFS (used by Docker)

Other file systems supporting
[mmap](https://man7.org/linux/man-pages/man2/mmap.2.html) feature may work with
QuestDB but they should not be used in production, as QuestDB does not run tests
on them.

When an unsupported file system is used, QuestDB logs show the following
warning:

```
-> UNSUPPORTED (SYSTEM COULD BE UNSTABLE)"
```

:::caution

Users **can't use NFS or similar distributed filesystems** directly with a
QuestDB database.

:::

### Write amplification

When ingesting out-of-order data, high disk write rate combined with high write
amplification may slow down the performance.

For data ingestion over PGWire, or as a further step for ILP ingestion, smaller
table [partitions](/docs/concept/partitions/) maybe reduce the write
amplification. This applies to tables with partition directories exceeding a few
hundred MBs on disk. For example, partition by day can be reduced to by hour,
partition by month to by day, and so on.

:::note

- In QuestDB the write amplification is calculated by the
  [metrics](/docs/third-party-tools/prometheus#scraping-prometheus-metrics-from-questdb):
  `questdb_physically_written_rows_total` / `questdb_committed_rows_total`.
- Partitions are defined when a table is created. Refer to
  [CREATE TABLE](/docs/reference/sql/create-table/) for more information.

:::

## CPU and RAM configuration

This section describes configuration strategies based on the forecast behavior
of the database.

### RAM size

We recommend having at least 8GB of RAM for basic workloads and 32GB for more
advanced ones.

For relatively small datasets, typically a few to a few dozen GB, if the need
for reads is high, performance can benefit from maximizing the use of the OS
page cache. Users may consider increasing available RAM to improve the speed of
read operations.

### Memory page size configuration

For frequent out-of-order (O3) writes over high number of columns/tables, the
performance may be impacted by the size of the memory page being too big as this
increases the demand for RAM. The memory page, `cairo.o3.column.memory.size`, is
set to 8M by default. This means that the table writer uses 16MB (2x8MB) RAM per
each column when it receives O3 writes. Decreasing the value in the interval of
[128K, 8M] based on the number of columns used may improve O3 write performance.

### CPU cores

By default, QuestDB attempts to use all available CPU cores.
[The guide on shared worker configuration](#shared-workers) details how to
change the default setting. Assuming that the disk does not have bottleneck for
operations, the throughput of read-only queries scales proportionally with the
number of available cores. As a result, a machine with more cores will provide
better query performance.

### Shared workers

In QuestDB, there are worker pools which can help separate CPU-load between
sub-systems.

:::caution

In case if you are configuring thread pool sizes manually, the total number of
threads to be used by QuestDB should not exceed the number of available CPU
cores.

:::

The number of worker threads shared across the application can be configured as
well as affinity to pin processes to specific CPUs by ID. Shared worker threads
service SQL execution subsystems and, in the default configuration, every other
subsystem. More information on these settings can be found on the
[shared worker](/docs/reference/configuration#shared-worker) configuration page.

QuestDB will allocate CPU resources differently depending on how many CPU cores
are available. This default can be overridden via configuration. We recommend at
least 4 cores for basic workloads and 16 for advanced ones.

#### 8 CPU cores or less

QuestDB will configure a shared worker pool to handle everything except the
InfluxDB line protocol (ILP) writer which gets a dedicated CPU core. The worker
count is calculated as follows:

$(cpuAvailable) - (line.tcp.writer.worker.count)$

Minimal size of the shared worker pool is 2, even on a single-core machine.

#### 16 CPU cores or less

ILP I/O Worker pool is configured to use 2 CPU cores to speed up ingestion and
the ILP Writer is using 1 core. The shared worker pool is handling everything
else and is configured using this formula:

$(cpuAvailable) - 1 - (line.tcp.writer.worker.count) - (line.tcp.io.worker.count)$

For example, with 16 cores, the shared pool will have 12 threads:

$16-1-2-1$

#### 17 CPU cores and more

The ILP I/O Worker pool is configured to use 6 CPU cores to speed up ingestion
and the ILP Writer is using 1 core. The shared worker pool is handling
everything else and is configured using this formula:

$(cpuAvailable) - 2 - (line.tcp.writer.worker.count) - (line.tcp.io.worker.count)$

For example, with 32 cores, the shared pool will have 23 threads:

$32-2-6-1$

### Writer page size

The default page size for writers is 16MB. In cases where there are a large
number of small tables, using 16MB to write a maximum of 1MB of data, for
example, is a waste of OS resources. To changes the default value, set the
`cairo.writer.data.append.page.size` value in `server.conf`:

```ini title="server.conf"
cairo.writer.data.append.page.size=1M
```

### InfluxDB over TCP

We have
[a documentation page](/docs/reference/api/ilp/tcp-receiver#capacity-planning)
dedicated to capacity planning for ILP ingestion.

### InfluxDB over UDP

:::note

The UDP receiver is deprecated since QuestDB version 6.5.2. We recommend the
[TCP receiver](/docs/reference/api/ilp/tcp-receiver/) instead.

:::

Given a single client sending data to QuestDB via InfluxDB line protocol over
UDP, the following configuration can be applied which dedicates a thread for a
UDP writer and specifies a CPU core by ID:

```ini title="server.conf"
line.udp.own.thread=true
line.udp.own.thread.affinity=1
```

### Postgres

Given clients sending data to QuestDB via Postgres interface, the following
configuration can be applied which sets a dedicated worker and pins it with
`affinity` to a CPU by core ID:

```ini title="server.conf"
pg.worker.count=4
pg.worker.affinity=1,2,3,4
```

## Network Configuration

For InfluxDB line, PGWire and HTTP protocols, there are a set of configuration
settings relating to the number of clients that may connect, the internal I/O
capacity and connection timeout settings. These settings are configured in the
`server.conf` file in the format:

```ini
<protocol>.net.connection.<config>
```

Where `<protocol>` is one of:

- `http` - HTTP connections
- `pg` - PGWire protocol
- `line.tcp` - InfluxDB line protocol over TCP

And `<config>` is one of the following settings:

| key       | description                                                                                                                                                                                                                |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`   | The number of simultaneous connections to the server. This value is intended to control server memory consumption.                                                                                                         |
| `timeout` | Connection idle timeout in milliseconds. Connections are closed by the server when this timeout lapses.                                                                                                                    |
| `hint`    | Applicable only for Windows, where TCP backlog limit is hit. For example Windows 10 allows max of 200 connection. Even if limit is set higher, without hint=true it won't be possible to connect more than 200 connection. |
| `sndbuf`  | Maximum send buffer size on each TCP socket. If value is -1 socket send buffer remains unchanged from OS default.                                                                                                          |
| `rcvbuf`  | Maximum receive buffer size on each TCP socket. If value is -1, the socket receive buffer remains unchanged from OS default.                                                                                               |

For example, this is configuration for Linux with relatively low number of
concurrent connections:

```ini title="server.conf InfluxDB line protocol network example configuration for moderate number of concurrent connections"
# bind to all IP addresses on port 9009
line.tcp.net.bind.to=0.0.0.0:9009
# maximum of 30 concurrent connection allowed
line.tcp.net.connection.limit=30
# nothing to do here, connection limit is quite low
line.tcp.net.connection.hint=false
# connections will time out after 60s of no activity
line.tcp.net.connection.timeout=60000
# receive buffer is 4Mb to accomodate large messages
line.tcp.net.rcvbuf=4m
```

Let's assume you would like to configure InfluxDB line protocol for large number
of concurrent connection on Windows:

```ini title="server.conf InfluxDB line protocol network example configuration for large number of concurrent connections on Windows"
# bind to specific NIC on port 9009, NIC is identified by IP address
line.tcp.net.bind.to=10.75.26.3:9009
# large number of concurrent connections
line.tcp.net.connection.limit=400
# Windows will not allow 400 client to connect unless we use the "hint"
line.tcp.net.connection.hint=true
# connections will time out after 30s of no activity
line.tcp.net.connection.timeout=30000
# receive buffer is 1Mb because messages are small, smaller buffer will
# reduce memory usage, 400 connection times 1MB = 400MB RAM is required to handle input
line.tcp.net.rcvbuf=1m
```

For reference on the defaults of the `http` and `pg` protocols, refer to the
[server configuration page](/docs/reference/configuration).

### Pooled connection

Connection pooling should be used for any production-ready use of PGWire or ILP
over TCP.

The maximum number of pooled connections is configurable,
(`pg.connection.pool.capacity` for PGWire and
(`line.tcp.connection.pool.capacity` for ILP over TCP. The default number of
connections for both interfaces is 64. Users should avoid using too many
connections.

## OS configuration

This section describes approaches for changing system settings on the host
QuestDB is running on when system limits are reached due to maximum open files
or virtual memory areas. QuestDB passes operating system errors to its logs
unchanged and as such, changing the following system settings should only be
done in response to such OS errors.

### Maximum open files

The storage model of QuestDB has the benefit that most data structures relate
closely to the file system, with columnar data being stored in its own `.d` file
per partition. In edge cases with extremely large tables, frequent out-of-order
ingestion, or high number of table partitions, the number of open files may hit
a user or system-wide maximum limit and can cause unpredictable behavior.

The following commands allow for checking current user and system limits for
maximum number of open files:

```bash title="checking ulimit"
# Soft limit
ulimit -Sn
# Hard limit
ulimit -Hn
```

**Setting system-wide open file limit:**

To increase this setting and have the configuration persistent, the limit on the
number of concurrently open files can be changed in `/etc/sysctl.conf`:

```ini title="/etc/sysctl.conf"
fs.file-max=262144
```

To confirm that this value has been correctly configured, reload `sysctl` and
check the current value:

```bash
# reload configuration
sysctl -p
# query current settings
sysctl fs.file-max
```

### Max virtual memory areas limit

If the host machine has insufficient limits of map areas, this may result in out
of memory exceptions. To increase this value and have the configuration
persistent, mapped memory area limits can be changed in `/etc/sysctl.conf`:

```ini title="/etc/sysctl.conf"
vm.max_map_count=262144
```

Each mapped area needs kernel memory, and it's recommended to have around 128
bytes available per 1 map count.

```bash
# reload configuration
sysctl -p
# query current settings
cat /proc/sys/vm/max_map_count
```
