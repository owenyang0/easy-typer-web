---
title: Clients overview
description: Introducing questdb ilp client libraries for different languages
---

import { ILPClientsTable } from '@theme/ILPClientsTable'

ILP clients allow fast data ingestion while abstracting you away from the details of the wire protocol. 
It's the recommended way to ingest data into QuestDB. Clients also support authentication and TLS encryption.

<ILPClientsTable />

For other languages, we have examples and a
  [protocol reference](/docs/reference/api/ilp/overview). Please [let us know](https://github.com/questdb/questdb/issues/new/) if you cannot find a client for your
favourite language! 

:::note
ILP clients are for data ingestion only. You cannot use an ILP client to query database. If you are looking for ways to query
QuestDB then see [this page](/docs/develop/query-data). 
:::
