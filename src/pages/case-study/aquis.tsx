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

const Aquis = () => {
  const title = "Aquis"
  const description =
    "QuestDB is used by Aquis Exchange to store their infrastructure and business metrics in a single place and analyze them in real-time across multiple dimensions."

  return (
    <Layout
      canonical="/case-study/aquis"
      description={description}
      title={title}
      image="/img/pages/case-study/aquis/flow.png"
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
            <Button href="https://aquis.eu/?utm_source=questdb" variant="plain">
              <img
                alt="aquis logo"
                className={juCss.jumbotron__logo}
                height={45}
                src={logos["aquis-exchange"].src}
                width={100}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>
            Aquis Exchange uses QuestDB for real-time monitoring
          </h1>
          <p
            className={clsx(
              seCss.section__subtitle,
              juCss.jumbotron__description,
            )}
          >
            QuestDB is used by Aquis Exchange to store their infrastructure and
            business metrics in a single place and analyze them in real-time
            across multiple dimensions.
          </p>
        </div>

        <div className={juCss.jumbotron__banner}>
          <Image
            alt="Logo of Aquis Stock Exchange"
            height={475}
            src="/img/pages/case-study/aquis/header.jpg"
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
            High ingestion throughput with contained infra costs
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Workflow icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/workflow.svg"
            />
            Plug and play with Grafana via PostgreSQL interface
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Leaf icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/leaf.svg"
            />
            Join time series with relational data via SQL
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Gauge icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/gauge.svg"
            />
            Fast analytics to build order books on the fly
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Voice icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/voice.svg"
            />
            Simple and intuitive setup
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Time icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/time.svg"
            />
            Fast queries alongside constant ingestion speed
          </p>
        </div>
      </section>

      <section className={seCss.section}>
        <div
          className={clsx(
            "markdown",
            seCss["section--inner"],
            seCss["section--column"],
          )}
        >
          <h3>About the team</h3>
          <p className="font-size--large">
            {" "}
            <a href="https://www.aquis.eu/">Aquis Exchange</a> is a financial
            exchange that operates pan-European cash equities trading
            businesses, provides primary and secondary markets for equity and
            debt products, and develops exchange software for third parties.
          </p>
          <p className="font-size--large">
            The group is authorized and regulated by the UK Financial Conduct
            Authority and France&#39;s Autorité des marchés financiers to
            operate Multilateral Trading Facilitynbusinesses in the UK and in
            EU27 respectively. Aquis Exchange is the only European trading venue
            to operate on a subscription pricing model.
          </p>
          <p className="font-size--large">
            Viet Lee, CTO at Aquis Exchange, shares how QuestDB powers the
            financial exchange by processing infrastructure metrics and market
            data.
          </p>
          <h3>The need for a time-series database to monitor metrics</h3>
          <p className="font-size--large">
            We started to build the foundations of a system that would
            efficiently capture our infrastructure and business metrics in one
            place and monitor them in real-time.
          </p>
          <p className="font-size--large">
            As an exchange, we need to ensure fair and orderly markets, so the
            timing of messages is critical to us. We produce comprehensive
            latency reports and dashboards per security, per market, and for
            each client. The reports detail the time it takes for an order
            instructed through a FIX or binary port to hit our matching engine
            and be a fully-executed trade on the exchange.
          </p>
          <Image
            alt="Overall Market Metrics using Grafana dashboards"
            height={367}
            src="/img/pages/case-study/aquis/grafana.png"
            width={1002}
            description="Overall market metrics using Grafana dashboards."
          />
          <p className="font-size--large">
            We also track all the orders and trades coming through (such as
            count, quantity, amount) and aggregate this data to produce a live
            order book, the amount of stock one can buy or sell at a given price
            level.
          </p>
          <Image
            alt="Timeline of Market Events visualized on Grafana"
            height={521}
            src="/img/pages/case-study/aquis/timeline.png"
            width={1002}
            description="Timeline of market events visualized on Grafana."
          />

          <h3>Why we chose QuestDB for monitoring our infrastructure</h3>
          <p className="font-size--large">
            We need a high throughput database capable of efficiently ingesting
            all the data coming into the exchange. Queries need to be fast as we
            monitor critical data tracked in real-time via a Grafana dashboard.
            Finally, SQL is what we were looking for from a simplicity
            standpoint, and this lowers the learning curve with the database. We
            tried several alternative time-series databases, but they were not
            fast enough and could not process the number of transactions per
            second we dealt with.
          </p>
          <p className="font-size--large">
            I could see that QuestDB is built for developers by developers. The
            team understands our domain very well and knows the context around
            the data volumes, throughput, and types involved. The features of
            the database architecture, such as columnar storage, are thoughtful
            additions and will help our system stay efficient as our datasets
            grow.
          </p>
          <Image
            alt="Architecture diagram with QuestDB and Grafana to ingest and query market data and latency metrics from Aquis Exchange"
            description="Architecture diagram with QuestDB and Grafana to ingest and query market data and latency metrics from Aquis Exchange."
            height={446}
            src="/img/pages/case-study/aquis/flow.png"
            width={670}
          />

          <p className="font-size--large">
            In terms of database performance, the QuestDB queries are so fast
            that we adapted our domain model to aggregate order data in
            real-time, which we could not have done otherwise. This allows us to
            produce order books in real-time based on the order and trades being
            placed on our exchange.
          </p>

          <p className="font-size--large">
            We also benefit from the tooling and integrations through the
            PostgreSQL interface: we can seamlessly display real-time charts on
            Grafana and track those metrics continuously. QuestDB&apos;s
            relational model and SQL language also allow us to join time-series
            data with relational data and extract all the insights we need for
            our business.
          </p>

          <p className="font-size--large">
            Finally, the rate of improvement of the product is impressive.
            There&apos;s a continual rate of releases, and we see the team
            focusing on the right things.
          </p>

          <div
            className={clsx(
              "markdown",
              seCss["section--inner"],
              seCss["section--column"],
            )}
          >
            <p className={caCss.card__title}>
              <span className={caCss.card__quote}>&ldquo;</span>QuestDB is a
              time series database truly built by developers for developers. We
              found that QuestDB provides a unicorn solution to handle extreme
              transactions per second while also offering a simplified SQL
              programming interface.
              <span className={caCss.card__quote}>&rdquo;</span>
            </p>
            <p className={caCss.card__title}>
              <b>Viet Lee, CTO at Aquis Exchange</b>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Aquis
