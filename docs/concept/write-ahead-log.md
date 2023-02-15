---
title: Write-Ahead Log (WAL)
sidebar_label: Write-Ahead Log
description:
  Documentation for properties of a WAL table and comparison with its non-WAL
  counterpart.
---

import Screenshot from "@theme/Screenshot"

From QuestDB 7.0, we add a new approach to ingest data using a write-ahead log
(WAL). This page introduces the properties of a WAL-enabled table (WAL table)
and compares it with a non-WAL table. It also contains a summary of key
components and relevant functions as well as SQL keywords.

## Properties

A WAL table permits the following concurrent transactions:

- Data ingestion through different interfaces
- Data modifications
- Table schema changes

The following configurations and keywords enable and create WAL tables:

- WAL table creation is enabled by the following methods:

  - Table-wide configuration via
    [`CREATE TABLE`](/docs/reference/sql/create-table/):

    - `WAL` generates a WAL table.
    - `BYPASS WAL` generates a non-WAL table.

  - Server-wide configuration `cairo.wal.enabled.default`: When
    `cairo.wal.enabled.default` is set to `true`,
    [`CREATE TABLE`](/docs/reference/sql/create-table/) SQL keyword generates WAL
    tables without `WAL` and `BYPASS WAL`.

- Parallel threads to apply WAL data to the table storage can be configured, see
  [WAL table configuration](/docs/reference/configuration/#wal-table-configurations)
  for more details.

### Comparison

The following table highlights the main difference between a WAL and a non-WAL
table:

| WAL table                                                                                  | Non-WAL table                                                                                                             |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Concurrent data ingestion via multiple interfaces                                          | ILP data locks the table for ingestion, concurrent data ingestion via other interfaces is not allowed - `Table Busy`error |
| Unconstrained concurrent DDLs and DMLs                                                     | Concurrent DDLs and DMLs for ILP interface only                                                                           |
| Asynchronous operations - in rare situations there may be slight delays in data visibility | Synchronous operations - no-wait commits                                                                                  |
| Improved data freshness for `DROP` and `RENAME` of the table with a system-wide lock       | No change                                                                                                                 |
| Some [impacts](#limitations) on existing operations                                        | No change                                                                                                                 |

### Limitations

:::note

We are working to reduce the limitations.

:::

For a WAL table, the following existing operations may have different behaviors
to a non-WAL table:

- [`UPDATE`](/docs/reference/sql/update/):

  - No row count returned
  - No support for `JOIN`

- `ALTER TABLE`:

  - [`ADD COLUMN`](/docs/reference/sql/alter-table-add-column/) can only add 1 column per statement
  - Non-structural operations may fail silently. These are partition-level and
    configuration operations:

    - [`ATTACH PARTITION`](/docs/reference/sql/alter-table-attach-partition/)
    - [`DETACH PARTITION`](/docs/reference/sql/alter-table-detach-partition/)
    - [`DROP PARTITION`](/docs/reference/sql/alter-table-drop-partition/)
    - [`SET PARAM`](/docs/reference/sql/alter-table-set-param/)

## Key components

A WAL table uses the following components to manage concurrent commit requests:

- `WAL`: dedicated APIs for each ingestion interface. When data is ingested via
  multiple interfaces, dedicated `WALs` ensure that the table is not locked for
  one interface only.

- Sequencer: centrally manages transactions, providing a single source of truth.
  The sequencer generates unique `txn` numbers as identifications to
  transactions and keeps a log tracking the allocation. This log is called
  `TransactionLog` and is stored in a meta file called `_txnlog`. See
  [root directory](/docs/concept/root-directory-structure/#db-directory) for more
  information.

- WAL apply job: collects the commit requests based on the unique `txn` numbers
  and sends them to the `TableWriter` to be committed.

- `TableWriter`: updates the database and resolves any out-of-order data writes.
  Each committed transaction is given a `txn` number.

<Screenshot
  alt="Diagram showing the sequencer allocating txn numbers to events cronologically"
  title="The sequencer allocates unique txn numbers to transactions from different WALs chronologically and serves as the single source of truth."
  height={435}
  src="/img/docs/concepts/wal_sequencer.png"
  width={745}
/>

<Screenshot
  alt="Diagram showing the WAL job application and WAL collect events and commit to QuestDB"
  title="The WAL job application collects the transactions sequencially for the TableWriter to commit to QuestDB."
  height={435}
  src="/img/docs/concepts/wal_process.png"
  width={745}
/>

## Checking WAL configurations

The following table metadata functions are useful to check WAL table settings:

- [`tables()`](/docs/reference/function/meta/#tables) shows general table
  metadata, including whether a table is a WAL table or not.
- [`wal_tables()`](/docs/reference/function/meta/#wal_tables) shows WAL-table
  status.
- [ALTER TABLE RESUME WAL](/docs/reference/sql/alter-table-resume-wal/) restarts
  suspended transactions.

<!-- ## See also -->
<!-- Adding links to blog posts etc -->
