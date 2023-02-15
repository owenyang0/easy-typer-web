import React from "react"
import { Section } from "../../components/Section"
import type { CustomerLogo } from "../../assets/types"
import { logos } from "../../assets/logos"
import Link from "@docusaurus/Link"

import styles from "./styles.module.css"
import SvgImage from "../../components/SvgImage"

import PostgresLogo from "../../../static/img/logos/pg.svg"
import GrafanaLogo from "../../../static/img/logos/grafana.svg"
import KafkaLogo from "../../../static/img/logos/kafka.svg"
import PythonLogo from "../../../static/img/logos/python_grayscale.svg"
import PandasLogo from "../../../static/img/logos/pandas.svg"
import TelegrafLogo from "../../../static/img/logos/influxdata.svg"
import MindsDBLogo from "../../../static/img/logos/mindsdb.svg"
import CubeLogo from "../../../static/img/logos/cube.svg"
import RedpandaLogo from "../../../static/img/logos/redpanda_grayscale.svg"
import PlotlyLogo from "../../../static/img/logos/plotly.svg"

const integrations: Array<{
  label: string
  logo: CustomerLogo & { svg: any }
  src?: string
}> = [
  {
    logo: { ...logos.postgres, svg: PostgresLogo },
    label: "Postgres",
    src: "/docs/reference/api/postgres/",
  },
  {
    logo: { ...logos.grafana, svg: GrafanaLogo },
    label: "Grafana",
    src: "/docs/third-party-tools/grafana/",
  },
  {
    logo: { ...logos.kafka, svg: KafkaLogo },
    label: "Kafka",
    src: "/docs/third-party-tools/kafka/overview/",
  },
  {
    logo: { ...logos.python, svg: PythonLogo },
    label: "Python",
    src: "https://github.com/questdb/py-questdb-client",
  },
  {
    logo: { ...logos.pandas, svg: PandasLogo },
    label: "Pandas",
    src: "/blog/2022/03/08/questdb-crypto-pandas/",
  },
  {
    logo: { ...logos.telegraf, svg: TelegrafLogo },
    label: "Telegraf",
    src: "/docs/third-party-tools/telegraf/",
  },
  {
    logo: { ...logos.mindsDB, svg: MindsDBLogo },
    label: "MindsDB",
    src: "/blog/2022/04/18/enabling-machine-learning-in-questdb-with-mindsdb/",
  },
  {
    logo: { ...logos.cube, svg: CubeLogo },
    label: "Cube",
    src: "/blog/2022/04/26/time-series-data-analytics-with-questdb-and-cube/",
  },
  {
    logo: { ...logos.redpanda, width: 50, svg: RedpandaLogo },
    label: "Redpanda",
    src:
      "/blog/2022/05/25/how-to-build-a-real-time-crypto-tracker-with-redpanda-and-questdb/",
  },
  {
    logo: { ...logos.plotly, svg: PlotlyLogo },
    label: "Plotly",
    src: "/blog/2021/11/01/plotly-finnhub-realtime-dashboard/",
  },
]

export const Integration = () => (
  <Section noGap>
    <Section.Title size="small" center>
      他们在使用易跟打
    </Section.Title>

    <div className={styles.integrations}>
      {integrations.map(({ label, logo, src }, index: number) => {
        const props = {
          key: index,
          className: styles.integration,
        }

        return React.createElement(
          typeof src === "string" ? Link : "div",
          {
            ...props,
            ...(typeof src === "string" ? { href: src } : {}),
          },

          <>
            <SvgImage
              title={logo.alt}
              image={React.createElement(logo.svg, {
                className: styles.logo,
                alt: logo.alt,
                width: logo.width ?? 50,
                height: logo.height ?? 50,
                loading: "lazy",
              })}
            />
            {label}
          </>,
        )
      })}
    </div>
  </Section>
)
