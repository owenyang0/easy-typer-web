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

const Innova = () => {
  const title = "Innova use QuestDB for Türk Telekom's big data requirements"
  const description =
    "Türk Telekom's big data workloads were migrated to QuestDB to provide insights on millions of data points to their customers in real-time."

  return (
    <Layout
      canonical="/case-study/turk-telekom"
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
            <Button href="https://www.turktelekom.com.tr/en" variant="plain">
              <img
                alt="Türk Telekom logo"
                className={juCss.jumbotron__logo}
                height={56}
                src={logos["turk-telekom"].src}
                width={140}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>
            QuestDB for high-performance big data workloads
          </h1>
          <p
            className={clsx(
              seCss.section__subtitle,
              juCss.jumbotron__description,
            )}
          >
            QuestDB is used as part of a big data solution used in
            Telecommunications, which requires writing millions of records while
            querying a constantly changing data set for real-time analytics.
          </p>
        </div>

        <div className={juCss.jumbotron__banner}>
          <Image
            alt="The Türk Telekom logo above an illustration of a network graph"
            height={400}
            src="/img/pages/case-study/turk-telekom/illustration.png"
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
            Lower operational costs
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Workflow icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/workflow.svg"
            />
            Simple setup and maintenance using QuestDB Docker image
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Leaf icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/leaf.svg"
            />
            Integrations with existing tools using the REST API
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Gauge icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/gauge.svg"
            />
            Real-time results despite massive throughput
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Voice icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/voice.svg"
            />
            Reactive support from QuestDB engineering
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Time icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/time.svg"
            />
            Reliable and fast query times for insights
          </p>
        </div>
      </section>

      <section className={clsx(seCss.section, caCss.card)}>
        <p className={caCss.card__title}>
          We’re developing big data solutions for financial transactions, BI
          systems, IT infrastructure, security, and network operators. Our
          services include real-time analytics of the network infrastructure of
          Türk Telekom, the largest Telecommunications provider in Turkey.
        </p>

        <p className={caCss.card__subtitle}>
          In this case study, we summarize why the team chose QuestDB, their
          migration experience, and the improvements they gained in query speed,
          maintainability, and compatibility.
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
          <h3>Migrating big data timeseries workloads to QuestDB</h3>
          <p className="font-size--large">
            We found QuestDB because of our requirements to store and analyze
            massive amounts of data that needs to be served to users quickly.
            The data we collect needs to be presented to customers in a way that
            it’s easy to understand how it changes over time. The search for a
            database that can display this kind of information in a timeline as
            fast as possible led to QuestDB.
          </p>
          <p className="font-size--large">
            Türk Telekom is one of the largest telecommunications providers in
            Turkey, serving internet connections to over 5 million customers.
            Infrastructure at this scale uses massive amounts of resources and
            generates a tremendous volume of data. We use operational data from
            this provider to show their customers information about their own
            internet connections, such as the quality of service, download
            speed, upload speed, bandwidth, and more.
          </p>

          <h3>How we collect and analyze big data with QuestDB</h3>
          <p className="font-size--large">
            We store the bandwidth data of devices in Fiber To The Home (FTTH)
            topology from collectors, which run on hourly intervals. These
            collector jobs contain time series for each device in JSON format
            and based on this metadata, we produce visualizations for our
            customers so that they have insights into their network quality. For
            a customer, this means that they have access to charts, tables, and
            line graphs so they can see the state of their connectivity for the
            last 30 days.
          </p>
          <Image
            alt="Chart showing the average transaction duration for QuestDB on a given day"
            height={519}
            src="/img/pages/case-study/turk-telekom/chart.png"
            width={842}
          />
          <h3>Why we use QuestDB for big data</h3>
          <p className="font-size--large">
            The original stack relied on MongoDB to store connectivity
            information, which was convenient at first. However, it soon became
            apparent that MongoDB was tightly dependent on physical resources
            and required more powerful hardware. As data sets grew in MongoDB,
            query speeds degraded below what was acceptable for our customers.
          </p>
          <p className="font-size--large">
            For communicating with QuestDB, we uses the QuestDB Docker image for
            running production instances and the REST API to query data for
            charts and insights. On average, we’re writing hundreds of millions
            of records per day while performing calculations on an ever-changing
            data set. Usually, we will keep 30 days of data in QuestDB and
            delete older partitions when they become less useful for actionable
            insights.
          </p>
          <div
            className={clsx(
              "markdown",
              seCss["section--inner"],
              seCss["section--column"],
            )}
          >
            <p className={caCss.card__title}>
              <span className={caCss.card__quote}>&ldquo;</span>QuestDB allows
              us to query data while writing millions of records. It is an
              excellent database for time series analysis and can efficiently
              store our data. QuestDB’s community is constantly growing and its
              popularity is on the rise.
              <span className={caCss.card__quote}>&rdquo;</span>
            </p>
            <p className={caCss.card__title}>
              <b>Erdem Aydemir, Innova (Türk Telekom)</b>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Innova
