import clsx from "clsx"
import React from "react"

import Button from "@theme/Button"
import CodeBlock from "@theme/CodeBlock"
import Layout from "../../theme/Layout"
import { Image } from "../../components/Image"

import caCss from "../../css/case-study/card.module.css"
import juCss from "../../css/case-study/jumbotron.module.css"
import seCss from "../../css/section.module.css"
import ouCss from "../../css/case-study/outcome.module.css"
import { logos } from "../../assets/logos"

const values = [
  {
    description: "Use case: Real-time analytics and dashboards, ML predictions",
    icon: {
      alt: "Briefcase icon",
      src: "/img/pages/case-study/icons/briefcase.svg",
    },
  },
  {
    description: "Industry: E-commerce",
    icon: {
      alt: "Globe icon",
      src: "/img/pages/case-study/icons/globe.svg",
    },
  },
  {
    description: "Deployment: QuestDB Open Source",
    icon: {
      alt: "Flag icon",
      src: "/img/pages/case-study/icons/flag.svg",
    },
  },
]

const exampleQuery = `
SELECT
  coalesce(
    (forecast + manual_change_additive) * manual_change_multiplicative,
    0
  ) * price * (cast(is_active as int)) AS forecast,
  coalesce(
    (forecast + manual_change_additive) * manual_change_multiplicative,
    0
  ) * (cast(is_active as int)) AS units,
  last_year * price as last_year
`.trim()

const sampleQuery = `
SAMPLE BY 1M ALIGN TO CALENDAR
`.trim()

const favoriteQuery = `
WITH prediction_update as (
  SELECT
    COALESCE(
      sum(forecast * manual_change_multiplicative) * 0.4519271611197119,
      0.0
    ) as bump,
    sku_id,
    warehouse_id
  FROM
    'read_48f5fda8-3f9a-425c-9584-045d8a3e5dc5_410fa30d-b95e-4463-81df-63e72042146c'
  WHERE
    date >= '2023-01-01'
    AND date < '2023-02-01'
    AND category_id IN ('4850b9e0-2019-46d9-a50b')
  UPDATE
    'read_48f5fda8-3f9a-425c-9584-045d8a3e5dc5_410fa30d' draft
  SET
    stock = CAST(stock + prediction_update.bump as double)
  FROM
    prediction_update
  WHERE
    draft.sku_id = prediction_update.sku_id
    and draft.warehouse_id = prediction_update.warehouse_id
    and prediction_update.bump != 0.0
    and draft.date >= '2023-01-01'
    AND category_id IN ('4850b9e0-2019-46d9-a50b-')
`.trim()

const Prediko = () => {
  const title = "Prediko"
  const description =
    "Prediko uses QuestDB to provide fast analytics and forecasts to their e-commerce customers."
  return (
    <Layout
      canonical="/case-study/prediko"
      description={description}
      title={title}
      image="/img/pages/case-study/prediko/banner.png"
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
            <Button href="https://www.prediko.io/" variant="plain">
              <img
                alt={logos.prediko.alt}
                className={juCss.jumbotron__logo}
                src={logos.prediko.src}
                width={125}
                height={22}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>Prediko</h1>
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
            alt={description}
            src="/img/pages/case-study/prediko/banner.png"
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
          <h3>About the team</h3>

          <p className="font-size--large">
            The founders of <a href="https://prediko.io/">Prediko</a> spotted a
            gap in the market, where numerous omnichannel commerce businesses
            still plan their inventory on excel spreadsheets. Unlike large
            retail companies, small retailers and e-commerce businesses do not
            have sufficient advanced predictive analytical capabilities for
            inventory.
          </p>

          <p className="font-size--large">
            The ability to predict and plan inventory is crucial to business
            success, as the correct prediction helps minimize waste, improve
            operational processes, and increase financial plan accuracy.
          </p>

          <p className="font-size--large">
            To address this problem for e-commerce businesses, the Prediko team
            resorted to their expertise in developing advanced enterprise
            operating software. Today, Prediko provides brands with an Inventory
            Operating System to forecast, plan, order, and finance their stock
            seamlessly.
          </p>

          <p className="font-size--large">
            Nicolas Sabatier, Co-founder and CTO of Prediko, shares with us how
            QuestDB works behind the scene for the Prediko Inventory OS.
          </p>

          <h3>Why QuestDB?</h3>

          <p className="font-size--large">
            In the retail industry, Stock Keeping Unit (SKU) is used to track
            and manage stock levels internally. SKU is the unique combination of
            the product name and other product details such as color, size,
            location, etc. SKU management is the process to ensure that every
            piece of inventory meets the financial objectives of the business.
            Correct SKU management is key to the success of a business. The
            basis of Prediko is to make predictions of SKUs for the next twelve
            months for our users.
          </p>

          <p className="font-size--large">
            We started with machine-learning algorithms providing predictions
            based on historical data. However, it did not take long for us to
            realize that we needed a time series database for storage, because
            SKUs are updated daily and scale up exponentially as historical
            records grow. Our clients needed to fetch predictions for a product
            category in a specific period (weekly, monthly, quarterly). We
            needed a database from which clients could aggregate and fetch data
            promptly.
          </p>

          <p className="font-size--large">
            In addition, once we provided a baseline prediction, we wanted to
            allow our users to update the prediction and immediately see the
            changes in SKU management strategies. Data science is not a magic
            wand: small businesses might not have a large amount of historical
            data to rely on. Therefore, after creating the first benchmark, our
            users should be able to use their business expertise to adjust the
            predictions. We needed a database that could handle fast updates.
          </p>

          <p className="font-size--large">
            To sum up, we had two requirements for a large and growing amount of
            data:
          </p>

          <ul className="font-size--large">
            <li>The ability to fetch data fast with SQL</li>
            <li>The ability to update the data easily</li>
          </ul>

          <p className="font-size--large">
            We were using Google BigQuery, which could not meet the query speed
            we required. We considered ClickHouse, TimescaleDB, DuckDB, Druid,
            and QuestDB. We narrowed down the list by looking for databases that
            were easy to get started. As a two-person team, a product that took
            too long to set up would be a waste of our precious time. We finally
            did a benchmark amongst TimeScaleDB, Druid, and QuestDB. Our queries
            aggregated various SKUs and fetched the latest version of
            prediction.
          </p>

          <p className="font-size--large">
            QuestDB stood out immediately from this benchmark: it completed test
            queries in just over one second, while similar queries took 4
            seconds and 3 seconds for TimescaleDB and Apache Druid,
            respectively. Based on the benchmark results and the fact that we
            liked to try new exciting technologies, we decided to switch to
            QuestDB.
          </p>

          <h3>Architecture overview</h3>

          <Image
            description="A high-level overview of the Prediko architecture"
            src="/img/pages/case-study/prediko/architecture.png"
            width={679}
            height={328}
          />

          <p className="font-size--large">
            We have one QuestDB instance on GCP. Both historical data and
            predictions are ingested and updated to QuestDB via REST API. We use
            Google&#39;s Cloud Run to communicate with the instance and fetch
            data.
          </p>

          <Image
            description="All the SKUs are stored in QuestDB"
            src="/img/pages/case-study/prediko/web-console.png"
            width={412}
            height={393}
          />

          <p className="font-size--large">
            Our clients have access to user-friendly dashboards to see the
            aggregated result for different &quot;scenarios&quot;, which are
            recommended SKU plans based on predictions. Users can update the
            predictions and immediately fetch updated scenarios to change their
            inventory planning, thanks to QuestDB&#39;s excellent query speed.
          </p>

          <Image
            description="The Prediko scenario dashboard"
            src="/img/pages/case-study/prediko/dashboard.png"
            width={1811}
            height={814}
          />

          <p className="font-size--large">
            Behind the interactive dashboards, QuestDB&#39;s engine powers
            various aggregate functions and fetch data fast on the fly. Some of
            the aggregation functions look like the following:
          </p>

          <CodeBlock>{exampleQuery}</CodeBlock>

          <p className="font-size--large">
            The aggregated result is then presented using QuestDB&#39;s powerful
            `SAMPLE BY` SQL keyword, allowing an efficient way to summarize
            large datasets:
          </p>

          <CodeBlock>{sampleQuery}</CodeBlock>

          <Image
            description="Users can focus on the prediction of a specific product "
            src="/img/pages/case-study/prediko/dashboard-2.png"
            width={1817}
            height={821}
          />

          <h3>Favorite SQL queries</h3>

          <p className="font-size--large">
            The most powerful SQL query we use is undoubtedly the `UPDATE`
            keyword: it makes our task to update predictions very easy and
            provides superior query speed. Here is one example:
          </p>

          <CodeBlock>{favoriteQuery}</CodeBlock>

          <h3>Conclusion</h3>

          <p className="font-size--large">
            At Prediko, we are obsessed with offering the best sales predictions
            to e-merchants and to democratize operational excellence. Using
            QuestDB as our main &quot;Prediction Store&quot; means our users can
            digest, manipulate, and aggregate predictions at a great speed. Big
            kudos to the team!
          </p>

          <div
            className={clsx(
              "markdown",
              seCss["section--inner"],
              seCss["section--column"],
            )}
          >
            <p className={caCss.card__title}>
              <span className={caCss.card__quote}>&ldquo;</span>
              At Prediko, we need to give our customers a platform to digest,
              manipulate, and aggregate millions of data points in milliseconds.
              QuestDB stands up to and surpasses our requirements, with the ease
              of use SQL provides.
              <span className={caCss.card__quote}>&rdquo;</span>
            </p>

            <p className={caCss.card__title}>
              <strong>Nicolas Sabatier, Co-founder and CTO of Prediko</strong>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Prediko
