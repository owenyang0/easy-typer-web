import React from "react"
import Link from "@docusaurus/Link"
import styles from "./styles.module.css"

const useCases = [
  {
    title: "Performance",
    uses: [
      "2M rows/s per node",
      "5-10x faster vs Timescale & InfluxDB",
      "Don’t worry about cardinality",
      "Columnar storage",
      "Data partitioned by time",
      "SIMD-optimized queries",
    ],
    cta: {
      label: "See Benchmarks",
      url: "/blog/tags/benchmark/",
    },
  },
  {
    title: "Developer experience",
    uses: [
      "SQL time series extensions",
      "Built-in SQL optimizer and REST API",
      "PostgreSQL driver compatibility",
      "Real-time streaming API",
      "SQL and time-series joins",
      "Grafana integration",
    ],
    cta: {
      label: "See live demo",
      url: "https://demo.questdb.io",
    },
  },
  {
    title: "Operational simplicity",
    uses: [
      "Fully managed hosted cloud",
      "Elastic cloud instances",
      "TLS for all protocols",
      "Online snapshot based backups",
      "Monitoring dashboards",
      "SSO authentication",
    ],

    cta: {
      label: "See Cloud",
      url: "/cloud/",
    },
  },
]

export const UseCases = () => (
  <div className={styles.root}>
    {useCases.map(({ title, uses, cta }, index) => (
      <div className={styles.card} key={index}>
        <h2>{title}</h2>

        <ul className={styles.list}>
          {uses.map((use, index) => (
            <li key={index} className={styles.listItem}>
              {use}
            </li>
          ))}
        </ul>

        <Link className={styles.link} href={cta.url}>
          {cta.label}
        </Link>
      </div>
    ))}
  </div>
)
