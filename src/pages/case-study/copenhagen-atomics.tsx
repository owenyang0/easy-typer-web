import clsx from "clsx"
import React from "react"

import Button from "@theme/Button"
import CodeBlock from "@theme/CodeBlock"
import Layout from "../../theme/Layout"
import { Image } from "../../components/Image"

import caCss from "../../css/case-study/card.module.css"
import juCss from "../../css/case-study/jumbotron.module.css"
import ouCss from "../../css/case-study/outcome.module.css"
import seCss from "../../css/section.module.css"
import { logos } from "../../assets/logos"

const values = [
  {
    description: "Optimised SQL query performance",
    icon: {
      alt: "Leaf icon",
      src: "/img/pages/case-study/icons/gauge.svg",
    },
  },
  {
    description: "Real time IoT sensor monitoring",
    icon: {
      alt: "Time icon",
      src: "/img/pages/case-study/icons/time.svg",
    },
  },
  {
    description: "Deployment on Azure using Kubernetes Helm chart",
    icon: {
      alt: "Workflow icon",
      src: "/img/pages/case-study/icons/workflow.svg",
    },
  },
  {
    description: "High-throughput ingestion with official client libraries",
    icon: {
      alt: "Gauge icon",
      src: "/img/pages/case-study/icons/gauge.svg",
    },
  },
  {
    description: "Active and supportive open source community",
    icon: {
      alt: "Leaf icon",
      src: "/img/pages/case-study/icons/leaf.svg",
    },
  },
  {
    description:
      "Responsive to user feedback and fast iteration on software releases",
    icon: {
      alt: "Workflow icon",
      src: "/img/pages/case-study/icons/voice.svg",
    },
  },
]

const exampleQuery = `
SELECT
  timestamp,
  AVG(aircon) as aircon,
  AVG(ac01_temperature) as ac01_temperature,
  AVG(dc01_temperature) as dc01_temperature
FROM
  'loop'
WHERE
  timestamp BETWEEN '2022-08-26T07:16:15.104000Z' AND '2022-08-26T08:01:15.104000Z' SAMPLE BY 1s FILL(LINEAR)
`

const CopenhagenAtomics = () => {
  const title = "Copenhagen Atomics"
  const description =
    "Copenhagen Atomics, manufacturer of next generation molten salt reactors, uses QuestDB to monitor their thorium reactors in real time."

  return (
    <Layout
      canonical="/case-study/copenhagen-atomics"
      description={description}
      title={title}
      image="/img/pages/case-study/copenhagen-atomics/banner.png"
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
              href="https://www.copenhagenatomics.com/?utm_source=questdb"
              variant="plain"
            >
              <img
                alt="Copenhagen Atomics logo"
                className={juCss.jumbotron__logo}
                height={45}
                src={logos["copenhagen-atomics"].src}
                width={100}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>Copenhagen Atomics</h1>
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
            alt="Copenhagen Atomics's major footprints in Thailand comprises over 4 million sqm of net leasable area, 60 malls, 2400 retail stores, 1000 food outlets, and 53 hotels."
            description={
              <>
                An overview of the benefits brought by the Copenhagen Atomics
                Waste Burner.{" "}
                <a
                  href="https://www.copenhagenatomics.com/potential/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Image source
                </a>
                .
              </>
            }
            src="/img/pages/case-study/copenhagen-atomics/overview.png"
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
          <h3>Introduction</h3>
          <p className="font-size--large">
            Founded by a group of scientists and engineers in 2014,{" "}
            <a href="https://www.copenhagenatomics.com">Copenhagen Atomics</a>{" "}
            aims to address one of the most burning issues for our planet: the
            bottleneck in the supply of energy resources. The team develops
            Generation IV reactors, which are molten salt reactors. These
            reactors use thorium to burn spent nuclear fuel: the process reduces
            the radioactivity of the nuclear waste while producing high energy
            output. The design of these reactors fits in a container. This
            results in lower costs of construction and increased safety, as both
            issues are associated with traditional large-scale nuclear power
            plants.
          </p>
          <Image
            alt="Copenhagen Atomics develops Generation IV reactors, which are
        molten salt reactors."
            description={
              <>
                Copenhagen Atomics develops Generation IV reactors, which are
                molten salt reactors.{" "}
                <a
                  href="https://www.copenhagenatomics.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Image source
                </a>
                .
              </>
            }
            src="/img/pages/case-study/copenhagen-atomics/illustration.png"
            width={777}
            height={350}
          />
          <p className="font-size--large">
            Modelling on how offshore windmill energy achieved economies of
            scale through mass production, Copenhagen Atomics aims to scale up
            the production of molten salt reactors to provide Energy as a
            Service. Depending on the energy needs of each client, the company
            will lease the reactors and sell the generated energy while managing
            the equipment after decommission.
          </p>
          <p className="font-size--large">
            In this case study, Lasse Tarp, Software Group Manager at Copenhagen
            Atomics, introduces us to the company&#39;s software architectural
            design with QuestDB at its core.
          </p>

          <h3>Architecture overview</h3>

          <Image
            description="Copenhagen Atomics' software stack to monitor nuclear reactors sensors in real time."
            src="/img/pages/case-study/copenhagen-atomics/architecture.png"
            width={1017}
            height={504}
          />

          <p className="font-size--large">
            Reactors function in a sealed environment; monitoring this
            environment is a crucial step for anomaly detection. QuestDB is the
            time series database behind the growing number of reactor sensors,
            which continuously send back information such as temperature, liquid
            flow and pressure. The data is then filtered and presented to the
            plot systems, accessible via the web browser for monitoring
            purposes.
          </p>

          <p className="font-size--large">
            We deploy our architecture on Azure and host API servers as well as
            QuestDB&#39;s engine on Kubernetes. Each reactor sends thousands of
            data points to the API servers every 10 milliseconds. The number of
            reactor sensor values is likely to grow by a factor of 10 in the
            near future.
          </p>

          <p className="font-size--large">
            From the API servers we have two parallel processes: ingesting
            sensor data to QuestDB using the .NET ILP client and sending queried
            (downsampled) data to our plot systems for monitoring. We customize
            our own plot systems for fetching and displaying data.
          </p>
          <Image
            src="/img/pages/case-study/copenhagen-atomics/iot-monitors-graph.png"
            width={828}
            height={331}
            description="An example screenshot of a plot system that monitors IoT devices"
          />

          <p className="font-size--large">
            At Copenhagen Atomics we also sell loops for{" "}
            <a href="https://www.copenhagenatomics.com/technology">
              testing equipment
            </a>
            . The plot shown above is a selection of some of the temperature
            sensors delivered in real time with the loop. Selecting what to see
            in a plot is done by the end user - properties such as colors and
            scaling can be configured. All data is fetched from QuestDB and
            downsampled with the query SAMPLE BY.
          </p>

          <p className="font-size--large">
            This way, we can adjust the granularity of the data by zooming in
            and out and visualize the updated chart in milliseconds. We are
            really impressed with response time when we query data.
          </p>

          <p className="font-size--large">
            <CodeBlock>{exampleQuery.trim()}</CodeBlock>
            The query fetches 2,700 rows from QuestDB in 236 milliseconds.
          </p>

          <h3>Why QuestDB?</h3>

          <p className="font-size--large">
            We wanted to choose an open source time series database that we
            could trust and see evolve in the open. We also want to contribute
            to the project and open source allows this. QuestDB caught our eye
            due to its performance both on ingestion and time-series as well as
            analytical queries. QuestDB&#39;s traction in the market also made
            us confident about our choice. Our initial interaction with the team
            was extremely positive: in addition to getting a good vibe from Vlad
            (CTO) and Nic (CEO), we also enjoyed the effective communication on
            <a href="https://slack.questdb.io/">Slack</a> with the rest of the
            team as well as QuestDB&#39;s growing community.
          </p>

          <h3>What&apos;s Next?</h3>

          <p className="font-size--large">
            We have been collaborating with the QuestDB team by providing
            product feedback and testing out new features. Here are the next
            steps for our project:
          </p>

          <ol>
            <li>
              <strong>Cold storage:</strong>

              <p className="font-size--large">
                As the amount of data increases, it is crucial to migrate older
                data to cold storage to resolve the limitation of disk space and
                to reduce hardware costs.
              </p>

              <strong>Insights from the QuestDB team:</strong>
              <p className="font-size--large">
                QuestDB open source allows detaching partitions via SQL
                keywords. Once a partition is detached, it can be moved to a
                suitable cold storage solution. The SQL commands are:
              </p>

              <ul>
                <li>
                  <a href="https://questdb.io/docs/reference/sql/alter-table-attach-partition">
                    ALTER TABLE ATTACH PARTITION
                  </a>
                </li>
                <li>
                  <a href="https://questdb.io/docs/reference/sql/alter-table-detach-partition">
                    ALTER TABLE DETACH PARTITION
                  </a>
                </li>
              </ul>

              <p className="font-size--large">
                For QuestDB Cloud, the team will provide a one-click solution to
                enable seamless data migration to and from cold storage. This
                way, users can query hot data really fast and store less
                critical data on cold storage solutions such as AWS S3 or Azure
                Blob Storage. Watch this space!
              </p>
            </li>

            <li style={{ marginTop: "2rem" }}>
              <strong>User access control:</strong>

              <p className="font-size--large">
                QuestDB open source provides no control access to the Web
                Console. Therefore, we only use it for ad-hoc queries. Ideally,
                we would like to be able to set different admin groups with
                different access rights to use the Web Console.
              </p>

              <strong>Insights from the QuestDB team:</strong>
              <p className="font-size--large">
                We are building user access control for QuestDB Cloud and
                Enterprise. You can track its progress{" "}
                <a href="https://github.com/orgs/questdb/projects/1/views/5">
                  on our public roadmap
                </a>
                .
              </p>
            </li>
          </ol>

          <div
            className={clsx(
              "markdown",
              seCss["section--inner"],
              seCss["section--column"],
            )}
          >
            <p className={caCss.card__title}>
              <span className={caCss.card__quote}>&ldquo;</span>
              QuestDB was our choice for real time data due to high performance,
              open source, high flexibility and great support. Performance was
              significantly better than the competition and we believe that
              QuestDB will become market leading.
              <span className={caCss.card__quote}>&rdquo;</span>
            </p>

            <p className={caCss.card__title}>
              <b>Lasse Tarp, Software Group Manager, Copenhagen Atomics</b>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CopenhagenAtomics
