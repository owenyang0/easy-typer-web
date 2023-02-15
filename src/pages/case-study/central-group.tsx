import clsx from "clsx"
import React from "react"

import Button from "@theme/Button"
import Layout from "../../theme/Layout"
import { Image } from "../../components/Image"

import juCss from "../../css/case-study/jumbotron.module.css"
import ouCss from "../../css/case-study/outcome.module.css"
import seCss from "../../css/section.module.css"
import { logos } from "../../assets/logos"

const values = [
  {
    description: "Plug and play with Grafana",
    icon: {
      alt: "Workflow icon",
      src: "/img/pages/case-study/icons/workflow.svg",
    },
  },
  {
    description: "High-throughput ingestion",
    icon: {
      alt: "Gauge icon",
      src: "/img/pages/case-study/icons/gauge.svg",
    },
  },
  {
    description: "Real-time performance monitoring",
    icon: {
      alt: "Time icon",
      src: "/img/pages/case-study/icons/time.svg",
    },
  },
  {
    description: "Optimised query performance",
    icon: {
      alt: "Leaf icon",
      src: "/img/pages/case-study/icons/leaf.svg",
    },
  },
  {
    description: "Cost-effective hardware usage",
    icon: {
      alt: "Dollar icon",
      src: "/img/pages/case-study/icons/dollar.svg",
    },
  },
  {
    description: "Dynamic data analysis",
    icon: {
      alt: "Workflow icon",
      src: "/img/pages/case-study/icons/workflow.svg",
    },
  },
]

const CentralGroup = () => {
  const title = "Central Group"
  const description =
    "QuestDB is the core engine driving real-time analytics data for Central Group, the largest retail company in Asia."

  return (
    <Layout
      canonical="/case-study/central-group"
      description={description}
      title={title}
      image="/img/pages/case-study/central-group/header.jpg"
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
              href="https://www.centralgroup.com/?utm_source=questdb"
              variant="plain"
            >
              <img
                alt="Central Group logo"
                className={juCss.jumbotron__logo}
                height={45}
                src={logos["central-group"].src}
                width={100}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>Central Group</h1>
          <p
            className={clsx(
              seCss.section__subtitle,
              juCss.jumbotron__description,
            )}
          >
            {description}
          </p>
        </div>

        <div className={juCss.jumbotron__banner}>
          <Image
            alt="Central Group's major footprints in Thailand comprises over 4 million sqm of net leasable area, 60 malls, 2400 retail stores, 1000 food outlets, and 53 hotels."
            description={
              <>
                Central Group&apos;s major footprints in Thailand comprises over
                4 million sqm of net leasable area, 60 malls, 2400 retail
                stores, 1000 food outlets, and 53 hotels.&nbsp;
                <a
                  href="https://www.centralgroup.com/en/our-business/overview"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Source
                </a>
                .
              </>
            }
            src="/img/pages/case-study/central-group/central-of-life.png"
            width={777}
            height={350}
          />
        </div>
      </section>

      <section className={clsx(seCss.section, seCss["section--odd"])}>
        <div className={clsx(seCss["section--inner"], ouCss.outcome__wrapper)}>
          {values.map(({ icon, description }, index) => (
            <p key={index} className={ouCss.outcome}>
              <img
                alt={icon.alt}
                className={ouCss.outcome__icon}
                src={icon.src}
              />
              {description}
            </p>
          ))}
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
          <h3>The team</h3>
          <p className="font-size--large">
            Central Group is a retailer originated from Thailand. Today, they
            are the largest retailer in Asia with businesses across the globe.
            The organization is fast-growing and owns business in various
            sectors including department stores, hospitality, restaurants,
            mobility as a service, logistics, and fintech solutions.
          </p>
          <p className="font-size--large">
            In this article, Central Group&#39;s Head of R&amp;D, Clovis Warlop,
            and MarTech Product Owner, Damien Dupont, take us through Central
            Group&#39;s requirements for real-time data analytics processing.
            They also explain why they decided to incorporate QuestDB at the
            core of their architecture.
          </p>

          <h3>The challenge to deploy real-time analytics</h3>

          <p className="font-size--large">
            Central Group consists of a couple dozens of business units across
            industries such as fashion, property, supply chain, and logistics.
            We aggregate data from online and offline data points and our
            ultimate aim is to deliver the data as actionable dashboards to
            specific teams in each business unit. The real-time trends are
            broadcast on big screens in our offices, so that each business unit
            can monitor and react promptly when any unusual data is detected.
            This solution is our <em>Business Control Tower.</em>
          </p>

          <p className="font-size--large">
            We started with developing the solution for just one business unit,
            the Central Department Store.
          </p>

          <p className="font-size--large">
            This business unit collects intelligence from its e-commerce
            platforms, physical stores, as well as business analytical tools.
            Sales metrics such as product category, brand as well as discount
            are collected into our data pipelines and our solution displays the
            information as analytical dashboards on Grafana. Real-time
            monitoring means that the business unit can take corrective actions
            promptly if any abnormalities are detected.
          </p>

          <p className="font-size--large">
            Ultimately, the real-time statistics enable business modelling and
            data-driven marketing strategies. Monitoring online search terms,
            order progress, and promotion over time also means that we can track
            and react to consumer behaviors dynamically, in order to automate
            marketing campaign triggers.
          </p>

          <Image
            src="/img/pages/case-study/central-group/dashboard.png"
            width={828}
            height={331}
            description="Real-time performance marketing: This dashboard monitors the effect of marketing campaigns in sales and the corresponding product stock, highlighting products low in stock. Tracking discount and order allows quick analysis of revenue and stock distribution (screenshot altered to protect sensitive data)."
          />

          <Image
            src="/img/pages/case-study/central-group/dashboard-2.png"
            width={819}
            height={308}
            description="QuestDB powers the marketing performance tracking dashboard, allowing dynamic comparison between various advertisement platforms across a selected time span (screenshot altered to protect sensitive data)."
          />

          <p className="font-size--large">
            Since we aggregate data from both online and offline sales, our
            Business Control Tower can correlate online sales with the physical
            presence of the department store geographically. More recently, we
            have implemented a dashboard analyzing offline business performance:
            we are working with different teams to understand the presentation
            of our footfall, that is, the number of people in a building in real
            time.
          </p>

          <h3>QuestDB deployment on Central Group stack</h3>

          <p className="font-size--large">
            We deploy a dedicated Change Data Captures (CDCs) process to collect
            endpoints from various source:
          </p>

          <p className="font-size--large">
            <ul>
              <li>E-commerce platforms: Online order tracking.</li>
              <li>Analytical data: Keyword searches, user data analysis.</li>
              <li>
                Online marketing data: Unser interaction with social media
                feeds, online advertisement.
              </li>
            </ul>
            The CDCs are then streamed into Kafka. QuestDB&#39;s engine consumes
            Kafka topics in real time and acts as long term storage of time
            series data. In the meanwhile, we have about 10 Grafana dashboards
            constantly querying QuestDB to showcase real-time analytics and time
            series charts.
          </p>

          <Image
            src="/img/pages/case-study/central-group/high-level-overview.png"
            width={828}
            height={464}
            description="High-level overview of the Business Control Tower solution at Central Group."
          />

          <Image
            src="/img/pages/case-study/central-group/dashboard-5.png"
            width={981}
            height={520}
            description="Grafana dashboards querying QuestDB database."
          />

          <h3>Why QuestDB?</h3>

          <p className="font-size--large">
            Our key requirement is to process data and generate multiple
            dashboards, all in real time. Time-series databases (TSDBs) are
            optimized to process large amounts of timestamped data efficiently,
            so it was clear that we should be looking in this direction.
          </p>

          <p className="font-size--large">
            As the Head of the team, I was in charge of comparing different
            options based on my experience and research: InfluxDB could not
            accommodate the input scale our APIs demand. Similarly, our in-out
            requirement was higher than the capacity provided by Google Suite.
            SingleStore did not provide any sensible recovery mechanisms when
            the system crashed, and it was also costly.
          </p>

          <p className="font-size--large">
            In the end, QuestDB stood out for the following reasons:
          </p>

          <p className="font-size--large">
            <ul>
              <li>
                Superior performance: Fastest overall performance for our user
                traffic and dashboard queries.
              </li>
              <li>
                Easy integration with Grafana: Setting up Grafana dashboards and
                panels is straightforward with the PGwire Protocol.
              </li>
              <li>
                Lower hardware costs: Since we deployed QuestDB in production,
                we have not increased the number of CPUs nor the amount of RAM.
                This helps us manage our costs.
              </li>
            </ul>
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default CentralGroup
