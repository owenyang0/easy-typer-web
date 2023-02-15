import clsx from "clsx"
import React from "react"

import Button from "@theme/Button"
import Layout from "../../theme/Layout"
import { Image } from "../../components/Image"

import caCss from "../../css/case-study/card.module.css"
import juCss from "../../css/case-study/jumbotron.module.css"
import ouCss from "../../css/case-study/outcome.module.css"
import seCss from "../../css/section.module.css"
import { logos } from "../../assets/logos"

const Tqs = () => {
  const title = "TQS uses QuestDB for industrial telemetry data"
  const description =
    "QuestDB is used as a time series database to store sensor data in the cloud infrastructure of modern pharmaceutical production processing facilities."

  return (
    <Layout
      canonical="/case-study/tqs-integration"
      description={description}
      title={title}
    >
      <section
        className={clsx(
          seCss.section,
          seCss["section--center"],
          juCss.jumbotron,
        )}
      >
        <div className={juCss.jumbotron__summary}>
          <div className={juCss.jumbotron__header}>
            <Button
              href="https://www.tqsintegration.com/?utm_source=questdb"
              variant="plain"
            >
              <img
                alt="TQS Integration leader in manufacturing data solutions"
                className={juCss.jumbotron__logo}
                height={45}
                src={logos["tqs-integration"].src}
                width={100}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>
            QuestDB powers time series analytics in TQS Integration cloud
            solutions
          </h1>
          <p
            className={clsx(
              seCss.section__subtitle,
              juCss.jumbotron__description,
            )}
          >
            <a
              href="https://www.tqsintegration.com/?utm_source=questdb"
              target="_blank"
              rel="noopener noreferrer"
            >
              TQS Integration
            </a>{" "}
            uses QuestDB in industrial telemetry solutions for clients in the
            Life Science, Pharmaceutical, Energy, and Renewables industries. TQS
            Integration uses QuestDB when they require a time series database
            that’s simple and efficient for data collection, contextualization,
            visualization, analytics, and managed services for the world’s
            leading companies.
          </p>
        </div>

        <div className={juCss.jumbotron__banner}>
          <img
            alt="Logo for TQS Integration"
            height={170}
            src="/img/pages/case-study/tqs-integration/header.jpg"
            width={1000}
          />
        </div>
      </section>

      <section className={clsx(seCss.section, seCss["section--odd"])}>
        <div className={clsx(seCss["section--inner"], ouCss.outcome__wrapper)}>
          <p className={ouCss.outcome}>
            <img
              alt="Dollar icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/dollar.svg"
            />
            Massively reduced database deployment and maintenance costs
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Workflow icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/workflow.svg"
            />
            Integrations with developer tools to easily insert and query data
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Leaf icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/leaf.svg"
            />
            Simple to develop cloud-native solutions
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Gauge icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/gauge.svg"
            />
            Reliably ingest hundreds of thousands of events per second
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Voice icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/voice.svg"
            />
            Easy to deploy and low-effort to maintain
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Time icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/time.svg"
            />
            High-performance to monitor tens of thousands of metrics
          </p>
        </div>
      </section>

      <section className={clsx(seCss.section, caCss.card)}>
        <p className={caCss.card__title}>
          TQS Integration builds reference architecture for software
          applications dealing with industrial telemetry that produce and
          process hundreds of thousands of events per second. QuestDB is used
          when they require a time series database for data visualization,
          real-time analytics, anomaly detection, and predictive maintenance.
        </p>

        <p className={caCss.card__subtitle}>
          In this case study, Senior Data Scientist, Holger Amort, describes how
          and why QuestDB is relied upon within high-performance reference
          architecture built at TQS Integration.
        </p>
      </section>

      <section className={seCss.section}>
        <div
          className={clsx(
            "markdown",
            seCss["section--inner"],
            seCss["section--column"],
          )}
        >
          <h3>
            Why TQS Integration use QuestDB for cloud-native industrial
            solutions
          </h3>
          <p className="font-size--large">
            At TQS Integration, we specialize in software solutions for
            industrial processes in in Life Science, Pharmaceutical, Energy and
            Renewables industries. We’re dealing with vast amounts of industrial
            telemetry data via sensor and controller instrumentation,
            manufacturing execution systems, automation, ERP integration, and
            biopharmaceutical manufacturers. Our solutions enable manufacturers
            to leverage their process data through advanced software
            architecture and analytics.
          </p>
          <Image
            alt="A screenshot of TQS Integration software for tracking industrial processes"
            height={433}
            src="/img/pages/case-study/tqs-integration/tqs-software-overview.png"
            width={1000}
          />
          <p className="font-size--large">
            Typically, we’re taking manufacturing data and combining it with
            other data sets of an organization to contextualize information.
            Having an overview of process and business information allows our
            users to make smarter decisions about their manufacturing processes,
            gain insights on predictive maintenance, anomaly detection, and much
            more.
          </p>

          <h3>Time series in pharmaceutical processes and Industry 4.0</h3>
          <p className="font-size--large">
            The pharmaceutical and biotech industries are driven by regulation
            which means that manufacturing processes must be tightly controlled.
            Ensuring that procedures are followed correctly is mainly
            accomplished through telemetry from the manufacturing floor itself.
          </p>
          <p className="font-size--large">
            The types of metrics that manufacturers might be interested in is a
            range of variables such as temperature, pH, stirring rate of
            agitators, and many other metrics emitted when controlling
            manufacturing execution systems. Some manufacturing plants will
            produce and track between 50,000 and 70,000 process variables.
          </p>

          <p className="font-size--large">
            We’re typically sending approximately 100,000 to 150,000 events per
            second into QuestDB instances. The purpose of QuestDB in the
            reference architecture we build for our clients is for hot data,
            which we typically retain for 30 days. We then downsample this data
            for lower resolution cold storage in case we need a historical
            overview of the last 12 months’ sensor data, for instance.
          </p>
          <Image
            alt="A screenshot of TQS Integration software for tracking industrial processes"
            height={433}
            src="/img/pages/case-study/tqs-integration/high-frequency-data.jpg"
            width={700}
          />
          <p className="font-size--large">
            When we are moving hot data over to cold storage, we employ
            compression algorithms to reduce the footprint of the data. As data
            becomes less critical to act upon, performance is less of a concern,
            and we can use the downsampled data for aggregate reports, trend
            analyses and longer-term predictions.
          </p>

          <h3>Storing high-frequency industrial telemetry in QuestDB</h3>
          <p className="font-size--large">
            We’re collecting sensor and telemetry data from all available
            sources in our client’s facilities. This produces different types of
            time series data; for example, there are slow-moving batch
            processes, fast-moving purification steps, and high-speed filling
            lines in a biotechnology facility. Capturing events at different
            time scales and analyzing them requires a flexible and robust data
            strategy for acquisition, storage, and analysis.
          </p>
          <p className="font-size--large">
            It’s critical for our clients to have reliable systems based on the
            value of their raw materials used in production settings. If
            equipment fails, hundreds of millions of dollars worth of product
            could be destroyed. These are the areas where we see the value of
            predictive maintenance and anomaly detection to keep such processes
            operating reliably.
          </p>
          <p className="font-size--large">
            We have requirements for real-time monitoring of the state of the
            industrial plants and post-processing for ML models. We’re{" "}
            <a
              href="https://www.tqsintegration.com/efficient-storing-of-high-frequency-data-in-osisoft-pi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              using QuestDB to analyze historical processes
            </a>{" "}
            to control and maintain future operations. Anomaly detection is an
            exciting application that our clients are exploring for future
            scenarios as we can employ real-time alerts based on predictive
            modeling of time series data.
          </p>

          <h3>The benefits of QuestDB for storing industrial telemetry</h3>

          <p className="font-size--large">
            Because of the high-throughput functionality, we’re ingesting sensor
            data using InfluxDB line protocol to insert data. When querying the
            database, we’re using PostgreSQL wire over Python to run analytics
            in SQL and generate some basic visualizations.
          </p>
          <p className="font-size--large">
            For dashboards, we make use of Grafana quite often, which is an easy
            way to have an operational overview of the state of a system at any
            given time. An additional bonus of using open source software like
            QuestDB is that it allows us to easily test ML and multivariate
            analysis (MVA) libraries and take advantage of the very rich
            open-source ecosystem.
          </p>
          <p className="font-size--large">
            For instance, MVA allows us to detect similarity to describe how
            well a new signal matches our expectations given a template. We mark
            equipment failures (or events that led up to them) and use these to
            detect normal operating conditions and questionable events,
            highlighted in the screenshot below:
          </p>
          <Image
            alt="A screenshot detecting similarity and anomalies in time series data in TQS Integration systems"
            height={433}
            src="/img/pages/case-study/tqs-integration/anomaly-detection.png"
            width={1000}
          />

          <div
            className={clsx(
              "markdown",
              seCss["section--inner"],
              seCss["section--column"],
            )}
          >
            <p className={caCss.card__title}>
              <span className={caCss.card__quote}>&ldquo;</span>
              TQS Integration uses QuestDB in data architecture solutions for
              clients in the Life Science, Pharmaceutical, Energy, and
              Renewables industries. We use QuestDB when we require a time
              series database that’s simple and efficient for data collection,
              contextualization, visualization, and analytics.
              <span className={caCss.card__quote}>&rdquo;</span>
            </p>
            <p className={caCss.card__title}>
              <b>Holger Amort, Senior Data Scientist at TQS Integration</b>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Tqs
