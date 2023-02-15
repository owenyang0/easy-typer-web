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
    description: "Use case: Market data",
    icon: {
      alt: "Briefcase icon",
      src: "/img/pages/case-study/icons/briefcase.svg",
    },
  },
  {
    description: "Industry: Fintech",
    icon: {
      alt: "Globe icon",
      src: "/img/pages/case-study/icons/globe.svg",
    },
  },
  {
    description: "Deployment: QuestDB Cloud",
    icon: {
      alt: "Flag icon",
      src: "/img/pages/case-study/icons/flag.svg",
    },
  },
]

const exampleQuery = `
SELECT ts, sum(value) 
FROM 'twitter_mentions' 
WHERE symbol='btc' AND ts >= dateadd('d', 14, now) 
SAMPLE BY 10m
`.trim()

const mongoDBQuery = `
def basicAggregation():
    pipeline = [
        {"$match": {"metadata.pair": "btc-usdt", "metadata.exchange": "binance"}},
        {"$sort": {"time": -1}},
        {"$limit": 50000}
    ]
    results = col.aggregate(pipeline, hint="Main Index", allowDiskUse=True)
    values = []
    for i in results:
        values.append(i)
    return values
start = time.time()
basicAggregation()
print(time.time() - start) 
`.trim()

const questDBQuery = `
SELECT ts, first(open), max(high), min(low), last(close) 
FROM 'ohlc_all' 
WHERE pair='btc-usd' 
SAMPLE BY 5m 
LIMIT 50000
`.trim()

const Invezo = () => {
  const title = "Invezo"
  const description =
    "QuestDB is the backbone behind analytical capabilities at Invezo, which aims to become Bloomberg for digital assets."

  return (
    <Layout
      canonical="/case-study/invezo"
      description={description}
      title={title}
      image="/img/pages/case-study/invezo/banner.png"
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
              href="https://www.invezo.com/?utm_source=questdb"
              variant="plain"
            >
              <img
                alt={logos.invezo.alt}
                className={juCss.jumbotron__logo}
                src={logos.invezo.src}
                width={125}
                height={22}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>Invezo</h1>
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
            src="/img/pages/case-study/invezo/banner.png"
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
            <a href="https://www.invezo.com/">Invezo</a> is a fast growing
            startup that aims to become the gold standard for digital assets
            analytics. Traditional companies in equity markets are assessed and
            valued based on established frameworks; their coverage from equity
            research companies is plentiful and all of this information is
            aggregated on platforms such as the Bloomberg Terminal. It&apos;s a
            different situation for crypto assets, which is a brand new asset
            class. There is a lack of tools to analyze market price behavior and
            underlying valuations. Invezo pulls on-chain and off-chain metrics
            to understand the behavior of crypto assets to a much deeper level,
            while offering superior charting capabilities and also providing an
            API.
          </p>

          <p className="font-size--large">
            Emmett Miller, co-founder and CEO, Invezo, tells us about his
            journey building his company using QuestDB Cloud.
          </p>

          <h3>
            The need for a time-series database to deliver real-time analytics
            to end users
          </h3>

          <p className="font-size--large">
            All of the data in the Invezo platform is time series. We track all
            of our metrics over time. There are plenty of metrics to track:
            cryptocurrency token price, GitHub commits, reddit subscribers,
            on-chain wallet transactions. This data is then exposed to the end
            user of the platform in real-time. The latency needs to be as low as
            possible to guarantee a good user experience. We want the dashboards
            to refresh live in milliseconds rather than seconds. This may seem a
            trivial thing to achieve but it is not: users zooming in and out of
            our dynamic charts are performing heavy operations for the
            underlying database to compute. New data also flows in real-time,
            requiring aggregations on the fly. Performant time-series databases
            are crucial to cope with the ingestion rate: we currently pull
            market data for hundreds of cryptocurrencies from more than nine
            different exchanges. We also need very fast querying capabilities to
            power our live dashboards and analytics.
          </p>

          <Image
            description="Example of live dashboards and analytics in real time. Each refresh is a SQL query for QuestDB."
            src="/img/pages/case-study/invezo/dashboard-1.png"
            width={1017}
            height={504}
          />

          <h3>QuestDB deployment within the Invezo stack</h3>

          <p className="font-size--large">
            We collect data from crypto exchanges APIs and build our main
            application in Python. We use the official QuestDB Python client
            library to send the data via the InfluxDB Line Protocol
            (&quot;ILP&quot;) over TCP. Each query is computed programmatically
            via PGWire using SQL and feeds real-time data, aggregations and
            downsampled data to plot out charts.
          </p>

          <p className="font-size--large">
            QuestDB has built time-series specific syntax to make queries less
            verbose. For example, SAMPLE BY automatically downsamples the data
            for a given interval. An example of SQL query to compute the number
            of twitter mentions over time is the following:
          </p>

          <CodeBlock>{exampleQuery}</CodeBlock>

          <Image
            description="Example of live dashboards and analytics in real time. Each refresh is a SQL query for QuestDB."
            src="/img/pages/case-study/invezo/dashboard-2.png"
            width={1017}
            height={504}
          />

          <p className="font-size--large">
            We started with AWS RD but the database was too slow for our use
            case as queries would take up to 6 minutes to come back. We then
            looked into MongoDB, which recently released time-series
            capabilities. Here again, slow ingestion and queries made our
            application unusable (see a comparison with QuestDB toward the end
            of the case study). In addition, we had a crack at InfluxDB but
            their query language &quot;Flux&quot; was a show stopper because it
            is unintuitive.
          </p>

          <p className="font-size--large">
            Here is a comparison of the same query between MongoDB for time
            series and QuestDB:
          </p>

          <CodeBlock title="MongoDB Query">{mongoDBQuery}</CodeBlock>

          <p className="font-size--large">
            MongoDB query execution time: 5.4 seconds
          </p>

          <CodeBlock title="QuestDB Query">{questDBQuery}</CodeBlock>

          <p className="font-size--large">
            QuestDB query execution time: 0.1 seconds
          </p>

          <p className="font-size--large">
            We saw the light at the end of the tunnel when we found out about
            QuestDB. We liked it for its superior ingestion rates and the
            ability to query data on the fly. On top of the superior performance
            we are impressed by how vibrant the community is; we asked a few
            questions on the QuestDB Slack and got a response immediately. We
            love SQL and wanted to build the queries for our application with a
            familiar language.
          </p>

          <Image
            src="/img/pages/case-study/invezo/dashboard-3.gif"
            width={828}
            height={331}
            description="SAMPLE BY queries, which are on the fly"
          />

          <h3>QuestDB Cloud: why we chose the fully hosted solution</h3>

          <p className="font-size--large">
            We initially deployed QuestDB open source via the AWS marketplace.
            With QuestDB open source, we do not have the luxury of web console
            authentication, although we knew that a workaround with setting
            NGINX as a proxy was possible. We also did not have the bandwidth
            nor internal resources to properly monitor and manage the instances.
            It made sense to us that the instances should be overseen by the
            QuestDB creators, who know the product inside out.
          </p>

          <p className="font-size--large">
            By offloading the management and monitoring responsibilities to the
            QuestDB team, we gained precious hours to focus on our business. We
            also benefit from authentication for the web console, and scheduled
            snapshots without any downtime at the click of a button. The UI is
            intuitive and the team is shipping new features every week. I am
            excited about the upcoming cold storage integration with AWS S3,
            which should free a lot of space on our EBS volume.
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
              Our customers value a low-latency API, so speed is extremely
              important to us. With QuestDB, our ingestion rate is 5x faster and
              query execution time went from minutes to milliseconds
              <span className={caCss.card__quote}>&rdquo;</span>
            </p>

            <p className={caCss.card__title}>
              <strong>Emmett Miller, Co-founder, Invezo</strong>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Invezo
