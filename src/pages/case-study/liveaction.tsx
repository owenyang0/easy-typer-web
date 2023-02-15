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

const Counterflow = () => {
  const title = "LiveAction offer AI-driven network security"
  const description =
    "QuestDB is used by LiveAction  as a time series database for storing flow and encrypted traffic metadata analyzed by their real-time threat detection offering."

  return (
    <Layout
      canonical="/case-study/liveaction"
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
              href="https://www.liveaction.com/encrypted-traffic-analysis?utm_source=questdb"
              variant="plain"
            >
              <img
                alt="LiveAction logo"
                className={juCss.jumbotron__logo}
                height={65}
                src={logos.liveaction.src}
                width={150}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>
            QuestDB powers analytics in LiveAction’s network security suite
          </h1>
          <p
            className={clsx(
              seCss.section__subtitle,
              juCss.jumbotron__description,
            )}
          >
            QuestDB is used by LiveAction as a time series database for storing
            flow and encrypted traffic metadata analyzed by their real-time
            threat detection engine.
          </p>
        </div>

        <div className={juCss.jumbotron__banner}>
          <Image
            alt="Visualizing data in a Jupyter notebook querying data from QuestDB"
            height={170}
            src="/img/pages/case-study/liveaction/visualization-questdb-jupyter.png"
            width={800}
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
            Cost reduction due to lower resource consumption
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Workflow icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/workflow.svg"
            />
            RESTful API support allows simple interoperation with existing stack
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Leaf icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/leaf.svg"
            />
            SQL compatibility simplifies developer onboarding
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Gauge icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/gauge.svg"
            />
            Powers a real-time system that operates at enterprise network speeds
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Voice icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/voice.svg"
            />
            Active developer community that helps with troubleshooting
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Time icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/time.svg"
            />
            Fast turnaround time from prototype phase to production deployment
          </p>
        </div>
      </section>

      <section className={clsx(seCss.section, caCss.card)}>
        <p className={caCss.card__title}>
          LiveAction is a cybersecurity software company offering a SaaS
          platform for network monitoring and security. Their encrypted traffic
          analysis product, ThreatEye, integrates advanced security technologies
          into a streaming machine learning pipeline to identify network faults,
          anomalies and threats at wire speed.
        </p>

        <p className={caCss.card__subtitle}>
          In this case study, VP Product Development of ThreatEye and founder of
          Counterflow AI (now LiveAction), Randy Caldejon describes how and why
          QuestDB is an important component of their SaaS platform for
          time-series and behavioural analytics.
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
          <Image
            alt="Encrypted traffic is growing, SSL is nearly obsolete, and malware is hidden within encryption"
            height={433}
            src="/img/pages/case-study/liveaction/traffic-overview.jpg"
            width={791}
          />
          <h3>Encrypted traffic analysis for network security</h3>
          <p className="font-size--large">
            The rise in encrypted traffic over HTTPS and the recent introduction
            of protocols such as DNS over HTTPS and TLS 1.3 means that network
            defenders are faced with dramatically reduced deep packet inspection
            capabilities and visibility. Our security offering allows LiveAction
            partners to extend network visibility into the nature of this
            traffic using Encrypted Traffic Analysis (ETA).
          </p>
          <p className="font-size--large">
            ETA provides techniques to gain insight into network behaviour
            despite encryption while protecting user privacy. It combines Deep
            Packet Dynamics with machine learning to identify malicious patterns
            in network activity. The benefit of this approach is that it can
            scale with continued growth in network traffic and increased use of
            encrypted protocols despite having no visibility into the content of
            the exchanges.
          </p>

          <h3>Analytics to process millions of events per second</h3>
          <p className="font-size--large">
            ThreatEye NV is powered by a streaming machine learning engine (MLE)
            that ingests the high-fidelity flow data generated by its software
            probes. We use this to provide end-to-end visibility into the nature
            of network traffic using real-time inferences in combination with
            Encrypted Traffic Analysis.
          </p>
          <p className="font-size--large">
            Distinct from batch processing, streaming ML is powered by analyzers
            designed to inspect network traffic without multiple passes over the
            data stream. The streaming nature of this solution means that we
            have to process millions of events per second. The QuestDB instances
            we’re running are storing billions of records with the fields which
            we analyze to perform our predictions. The performance of QuestDB
            allows us to run queries such as these without our database being
            the bottleneck.
          </p>

          <Image
            alt="Running ML tooling via Jupyter notebooks to detect outliers"
            height={433}
            src="/img/pages/case-study/liveaction/local-outlier-factor-questdb-jupyter.png"
            width={800}
          />

          <h3>Why we chose QuestDB for time series analytics</h3>
          <p className="font-size--large">
            We started with InfluxDB as our central time series database, but we
            quickly started hitting performance issues with scalability in
            production environments, and we needed to find a practical
            alternative. We’re typically executing 25k to 100k inserts per
            second, depending on the size of the customer and the network
            activity. After InfluxDB, we tried TimescaleDB, which was reasonable
            for performance, but the database configuration was inconvenient for
            us and the system footprint was not ideal.
          </p>

          <p className="font-size--large">
            When I first tried QuestDB using test scripts to evaluate time
            series databases, I initially thought I had misconfigured something
            because the ingestion speed seemed unrealistic. When I ran some SQL
            queries in the console and got near-instant results returning our
            full dataset, I started to get excited about QuestDB being a
            legitimate alternative to other systems.
          </p>
          <p className="font-size--large">
            Our tools export either JSON or CSV, which means that a RESTful API
            to import and export data allows for seamless interfacing with the
            rest of our technology stack. We’re now using InfluxDB line protocol
            over TCP for ingestion, and the performance is even better.
          </p>

          <h3>Why performance matters for streaming data scenarios</h3>
          <p className="font-size--large">
            We’re analyzing over 150 features of network flows, and our
            customers want to see common aggregations such as{" "}
            <b>top-n clients</b> consuming data on the network or TLS
            connections with unusual entropy scores. SQL compatibility makes
            this easy to calculate in QuestDB and quick to verify in the web
            console. Even better, the Postgres interface offers our security
            analytics team the flexibility to dive into deeper analysis using
            Jupyter Hub.
          </p>

          <p className="font-size--large">
            Our solution runs in hybrid-cloud deployments and needs to scale up
            to 40Gbps worth of inspected network data. High-performance is
            critical to ensure scalable and reliable analytics when deploying in
            high-throughput scenarios such as enterprise networks.
          </p>

          <p className="font-size--large">
            LiveAction plans to introduce a community version of the ThreatEye
            analysis pipeline in Q2 2022. The pipeline includes native
            integration with QuestDB. The community version will be released as
            ThreatEye Toolkit and will be available as a Docker container on
            Docker Hub.
          </p>

          <Image
            alt="A diagram showing six patterns of network traffic highlighted by Deep Packet Dynamics"
            height={433}
            src="/img/pages/case-study/liveaction/console.png"
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
              <span className={caCss.card__quote}>&ldquo;</span>QuestDB is
              impressive and stands out as a superior option. We use it as the
              basis of our time series analytics for network threat detection.
              <span className={caCss.card__quote}>&rdquo;</span>
            </p>
            <p className={caCss.card__title}>
              <b>
                Randy Caldejon, VP Product Development ThreatEye, LiveAction
              </b>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Counterflow
