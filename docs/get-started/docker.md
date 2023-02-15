---
title: Get started with QuestDB via Docker
sidebar_label: Docker
description:
  Guide showing how to use QuestDB with Docker. This also covers how to import
  and persist QuestDB data in a docker container.
---

import InterpolateReleaseData from "../../src/components/InterpolateReleaseData"
import CodeBlock from "@theme/CodeBlock"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

QuestDB has images for both Linux/macOS and Windows on
[Docker Hub]({@dockerUrl@}).

## Install Docker

To begin, install Docker. You can find guides for your platform on the
[official documentation](https://docs.docker.com/get-docker/).

## Run QuestDB image

Once Docker is installed, you will need to pull QuestDB's image from
[Docker Hub]({@dockerUrl@}) and create a container.

This can be done with a single command using:

<InterpolateReleaseData
  renderText={(release) => (
    <CodeBlock className="language-shell">
      {`docker run \\
  -p 9000:9000 -p 9009:9009 -p 8812:8812 -p 9003:9003 \\
  -v "$(pwd):/var/lib/questdb" \\
  questdb/questdb:${release.name}`}
    </CodeBlock>
  )}
/>

This command starts a docker container from `questdb/questdb` image. In
addition, it exposes some ports and also mounts a volume, to allow your data to persist.

Below each parameter is described in detail.

### `-p` parameter to expose ports

This parameter will expose a port to the host. You can specify:

- `-p 9000:9000` - [REST API](/docs/reference/api/rest/) and
  [Web Console](/docs/develop/web-console/)
- `-p 9009:9009` - [InfluxDB line protocol](/docs/reference/api/ilp/overview/)
- `-p 8812:8812` - [Postgres wire protocol](/docs/reference/api/postgres/)
- `-p 9003:9003` -
  [Min health server](/docs/reference/configuration#minimal-http-server/)

All ports are optional, you can pick only the ones you need. For example, it is
enough to expose `8812` if you only plan to use
[InfluxDB line protocol](/docs/reference/api/ilp/overview/).

### `-v` parameter to mount storage

This parameter will make a local folder available to QuestDB docker container.
It will have all data ingested to QuestDB, server logs and configuration.

The QuestDB [root_directory](/docs/concept/root-directory-structure) is in the
following location:

<!-- prettier-ignore-start -->

export const volumeTabs = [
  { label: "Linux", value: "linux", code: '/var/lib/questdb' },
  { label: "macOS", value: "macos", code: '/var/lib/questdb' },
  { label: "Windows", value: "windows", code: 'C:\\questdb' },
]

<Tabs defaultValue="linux" values={volumeTabs}>
{ volumeTabs.map(tab => (
  <TabItem key={tab.value} value={tab.value}>
    <CodeBlock>{tab.code}</CodeBlock>
  </TabItem>
))}
</Tabs>

<!-- prettier-ignore-end -->

### Docker image version

By default, `questdb/questdb` points to the latest QuestDB version available on
Docker. However, it is recommended to define the version used.

<InterpolateReleaseData
  renderText={(release) => (
    <CodeBlock className="language-shell">
      {`questdb/questdb:${release.name}`}
    </CodeBlock>
  )}
/>

## Container status

You can check the status of your container with `docker ps`. It also lists the
exposed ports:

```shell
docker ps
```

```shell title="Result"
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
dd363939f261        questdb/questdb     "/app/bin/java -m io…"   3 seconds ago       Up 2 seconds        8812/tcp, 9000/tcp   frosty_gauss
```

## Importing data and sending queries

When QuestDB is running, you can start interacting with it:

- Port `9000` is for REST. More info is available on the
  [REST documentation page](/docs/reference/api/rest/).
- Port `8812` is used for Postgres. Check our
  [Postgres reference page](/docs/reference/api/postgres/).
- Port `9009` is dedicated to ILP. Consult our
  [InfluxDB page](/docs/reference/api/ilp/overview).

## Data persistence

### Mounting a volume

Volumes can be mounted to the QuestDB Docker container so that data may be
persisted or server configuration settings may be passed to an instance. The
following example demonstrated how to mount the current directory to a QuestDB
container using the `-v` flag in a Docker `run` command:

<InterpolateReleaseData
  renderText={(release) => (
    <CodeBlock className="language-shell" title={"Mounting a volume"}>
      {`docker run -p 9000:9000 \\
  -p 9009:9009 \\
  -p 8812:8812 \\
  -p 9003:9003 \\
  -v "$(pwd):/var/lib/questdb" \\
  questdb/questdb:${release.name}`}
    </CodeBlock>
  )}
/>

The current directory will then have data persisted to disk for convenient
migration or backups:

```bash title="Current directory contents"
├── conf
│   └── server.conf
├── db
└── public
```

For details on passing QuestDB server settings to a Docker container, see the
[Docker section](/docs/reference/configuration#docker) of the server
configuration documentation.

### Upgrade QuestDB version

It is possible to upgrade your QuestDB instance on Docker when a volume is
mounted to maintain data persistence.

:::note

- Check the [release notes](https://github.com/questdb/questdb/releases) and
  ensure that necessary [backup](/docs/operations/backup/) is completed.
- Upgrading an instance is possible only when the original instance has a volume
  mounted. Without mounting a volume for the original instance, the following
  steps create a new instance and data in the old instance cannot be retrieved.

:::

1. Run `docker ps` to copy the container name or ID:

```shell title="Container status"

# The existing QuestDB version is 6.5.2:

CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS              PORTS                NAMES
dd363939f261        questdb/questdb:6.5.2     "/app/bin/java -m io…"   3 seconds ago       Up 2 seconds        8812/tcp, 9000/tcp   frosty_gauss
```

2. Stop the instance and then remove the container:

```shell
docker stop dd363939f261
docker rm dd363939f261
```

3. Download the latest QuestDB image:

<InterpolateReleaseData
  renderText={(release) => (
    <CodeBlock className="language-shell">
      {`docker pull questdb/questdb:${release.name}`}
    </CodeBlock>
  )}
/>

4. Start a new container with the new version and the same volume mounted:

<InterpolateReleaseData
  renderText={(release) => (
    <CodeBlock className="language-shell">
      {`docker run -p 8812:8812 -p 9000:9000 -v "$(pwd):/var/lib/questdb" questdb/questdb:${release.name}`}
    </CodeBlock>
  )}
/>

### Writing logs to disk

When mounting a volume to a Docker container, a logging configuration file may
be provided in the container located at `/conf/log.conf`:

```bash title="Current directory contents"
└── conf
    ├── log.conf
    └── server.conf
```

For example, a file with the following contents can be created:

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

```shell title="Mounting the current directory to a QuestDB container"
docker run -p 9000:9000 \
 -p 9009:9009 \
 -p 8812:8812 \
 -p 9003:9003 \
 -v "$(pwd):/root/.questdb/" questdb/questdb
```

The container logs will be written to disk using the logging level and file name
provided in the `conf/log.conf` file, in this case in `./questdb-docker.log`:

```shell title="Current directory tree"
├── conf
│  ├── log.conf
│  └── server.conf
├── db
│  ├── table1
│  └── table2
├── public
│  ├── ui / assets
│  ├── ...
│  └── version.txt
└── questdb-docker.log
```

For more information on logging, see the
[configuration reference documentation](/docs/reference/configuration#logging).

### Restart an existing container

Running the following command will create a new container for the QuestDB image:

```shell
docker run -p 9000:9000 \
  -p 9009:9009 \
  -p 8812:8812 \
  -p 9003:9003 \
  questdb/questdb
```

By giving the container a name with `--name container_name`, we have an easy way
to refer to the container created by run later on:

```shell
docker run -p 9000:9000 \
  -p 9009:9009 \
  -p 8812:8812 \
  -p 9003:9003 \
  --name docker_questdb \
  questdb/questdb
```

If we want to re-use this container and its data after it has been stopped, we
can use the following commands:

```shell
# bring the container up
docker start docker_questdb
# shut the container down
docker stop docker_questdb
```

Alternatively, users can obtain a running container's ID with 'docker ps' and
restart it using the
[UUID short identifier](https://docs.docker.com/engine/reference/run/#name---name):

```shell title="Starting a container by ID"
docker start dd363939f261
```
