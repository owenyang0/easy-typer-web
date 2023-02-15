import clsx from "clsx"
import React, { useCallback, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Button from "@theme/Button"
import Chevron from "@theme/Chevron"
import Layout from "../theme/Layout"
import useResizeObserver from "@theme/useResizeObserver"

import caCss from "../css/customers/card.module.css"
import juCss from "../css/customers/jumbotron.module.css"
import quCss from "../css/customers/quote.module.css"
import seCss from "../css/section.module.css"
import _quotes from "../assets/quotes"
import { logos } from "../assets/logos"
import type { CustomerLogo } from "../assets/types"

// temporary duplication across customer and enterprise page for quote module

const quotes = _quotes.map(({ author, company, logo, role, text }) => {
  const Quote = () => (
    <div key={company} className={quCss.quote}>
      <div className={quCss.quote__symbol} />

      <div className={quCss.quote__logo}>
        <img
          alt={logo.alt}
          height={logo.height}
          src={logo.src}
          width={logo.width}
          style={{ top: logo.offset ?? 0 }}
        />
      </div>

      <p className={quCss.quote__content}>{text}</p>

      <p className={quCss.quote__author}>
        <span className={quCss.quote__chevron}>&gt;</span>
        {author}
        <br />
        {role}
        ,&nbsp;
        {company}
      </p>
    </div>
  )

  return Quote
})

type BulletProps = {
  index: number
  onClick: (index: number) => void
  page: number
  viewportSize: number
}

const Bullet = ({ index, onClick, page, viewportSize }: BulletProps) => {
  const handleClick = useCallback(() => {
    onClick(index * viewportSize)
  }, [index, onClick, viewportSize])

  return (
    <span
      className={clsx(quCss.controls__pin, {
        [quCss["controls__pin--selected"]]: page === index,
      })}
      onClick={handleClick}
    />
  )
}

type Customer = {
  id: string
  logo: CustomerLogo
  summary: string
  quote?: {
    author: string
    position: string
  }
  image: {
    alt: string
    src: string
    width?: number
    height?: number
  }
}

const customers: Customer[] = [
  {
    id: "central-group",
    logo: {
      ...logos["central-group"],
      width: 200,
      height: 20,
    },
    summary:
      "QuestDB is the core engine driving real-time analytics data for Central Group, the largest retail company in Asia.",
    image: {
      alt: "Central Group logo",
      src: "/img/pages/case-study/central-group/header.jpg",
      width: 225,
    },
  },

  {
    id: "aquis",
    logo: {
      ...logos["aquis-exchange"],
      height: 50,
      width: 140,
    },
    summary:
      "“QuestDB is a time series database truly built by developers for developers. We found that QuestDB provides a unicorn solution to handle extreme transactions per second while also offering a simplified SQL programming interface.”",
    quote: {
      author: "Viet Lee",
      position: "CTO, Aquis",
    },
    image: {
      alt: "Aquis logo",
      src: "/img/pages/case-study/aquis/summary.jpg",
      width: 525,
    },
  },

  {
    id: "prediko",
    logo: {
      ...logos.prediko,
      height: 50,
      width: 150,
    },
    summary:
      "“At Prediko, we need to give our customers a platform to digest, manipulate, and aggregate millions of data points in milliseconds. QuestDB stands up to and surpasses our requirements, with the ease of use SQL provides.”",
    quote: {
      author: "Nicolas Sabatier",
      position: "Co-founder and CTO of Prediko",
    },
    image: {
      alt: "Prediko",
      src: "/img/pages/case-study/prediko/preview.png",
    },
  },

  {
    id: "copenhagen-atomics",
    logo: {
      ...logos["copenhagen-atomics"],
      height: 50,
      width: 150,
    },
    summary:
      "“QuestDB was our choice for real time data due to high performance, open source, high flexibility and great support. Performance was significantly better than the competition and we believe that QuestDB will become market leading.”",
    quote: {
      author: "Lasse Tarp",
      position: "Software Group Manager, Copenhagen Atomics",
    },
    image: {
      alt: "Copenhagen Atomics",
      src: "/img/pages/case-study/copenhagen-atomics/banner.png",
    },
  },

  {
    id: "invezo",
    logo: {
      ...logos.invezo,
      width: 125,
      height: 22,
    },

    summary:
      "“Our customers value a low-latency API, so speed is extremely important to us. With QuestDB, our ingestion rate is 5x faster and query execution time went from minutes to milliseconds“",
    quote: {
      author: "Emmett Miller",
      position: "Co-founder, Invezo",
    },
    image: {
      alt: "Invezo",
      src: "/img/pages/case-study/invezo/preview.png",
    },
  },

  {
    id: "yahoo",
    logo: {
      ...logos.yahoo,
      height: 50,
      width: 140,
    },
    summary:
      "“We use QuestDB to monitor metrics for autoscaling decisions within our ML engine that provides search, recommendation, and personalization via models and aggregations on continuously-changing data.”",
    quote: {
      author: "Jon Bratseth",
      position: "VP Architect, Yahoo",
    },

    image: {
      alt: "Yahoo logo",
      height: 400,
      src: "/img/pages/case-study/yahoo/summary.jpg",
      width: 525,
    },
  },

  {
    id: "liveaction",
    logo: {
      ...logos.liveaction,
      width: 110,
      height: 44,
    },
    summary:
      "“QuestDB is impressive and stands out as a superior option. We use it as the basis of our time series analytics for network threat detection.”",
    quote: {
      author: "Randy Caldejon",
      position: "VP, ThreatEye Product Development, LiveAction",
    },

    image: {
      alt: "Logo for liveaction AI's network threat detection suite ThreatEye",
      height: 360,
      src: "/img/pages/case-study/liveaction/summary.png",
      width: 640,
    },
  },

  {
    id: "tqs-integration",
    logo: {
      ...logos["tqs-integration"],
      height: 40,
      width: 140,
    },
    summary:
      "“TQS Integration uses QuestDB in data architecture solutions for clients in Life Science, Pharmaceutical, Energy, and Renewables. We use QuestDB when we require a time series database that’s simple and efficient for data collection, contextualization, visualization, and analytics.”",
    quote: {
      author: "Holger Amort",
      position: "Senior Data Scientist, TQS Integration",
    },
    image: {
      alt: "A graphic with the logo of TQS Integration",
      height: 360,
      src: "/img/pages/case-study/tqs-integration/card.png",
      width: 640,
    },
  },

  {
    id: "toggle",
    logo: {
      ...logos.toggle,
      width: 140,
      height: 50,
    },
    summary:
      "“We switched from InfluxDB to QuestDB to get queries that are on average 300x faster utilizing 1/4 of the hardware, without ever overtaxing our servers.”",
    quote: {
      author: "Armenak Mayalian",
      position: "CTO, Toggle",
    },
    image: {
      alt: "Comparison of AI and chess to investing",
      height: 453,
      src: "/img/pages/case-study/toggle/summary.png",
      width: 600,
    },
  },

  {
    id: "datron",
    logo: {
      ...logos.datron,
      height: 24,
      width: 124,
    },
    summary:
      "“QuestDB offers new possibilities while reducing costs and simplifying data analysis.”",
    quote: {
      author: "Tim Borowski",
      position: "DATRON",
    },
    image: {
      alt: "A CNC milling machine built by DATRON",
      height: 360,
      src: "/img/pages/case-study/datron/summary.png",
      width: 640,
    },
  },

  {
    id: "turk-telekom",
    logo: {
      ...logos["turk-telekom"],
      width: 140,
      height: 50,
    },
    summary:
      "“QuestDB allows us to query data while writing millions of records. It is an excellent database for time series analysis, calculation of aggregates and can efficiently store our data.”",
    quote: {
      author: "Erdem Aydemir",
      position: "Software Engineer, Innova (TürkTelekom)",
    },

    image: {
      alt: "An photo of a cellphone with the Turk Telekom logo",
      src: "/img/pages/case-study/turk-telekom/card.png",
    },
  },
]

const QUOTE_WIDTH = 350

const Customers = () => {
  const title = "Customers"
  const description =
    "Discover how QuestDB is powering the core infrastructure of companies dealing with time series data and real-time analytics"

  const { ref, width } = useResizeObserver<HTMLDivElement>()
  // An "item" is a quote
  // Index in the array of quotes of the item that is "focused"
  const [index, setIndex] = useState(0)
  // How many items we can show on the screen
  const viewportSize = Math.max(1, Math.floor((width ?? 0) / QUOTE_WIDTH))
  // How many items will actually be displayed (can be smaller than viewportSize)
  const viewportCount =
    viewportSize === 0 ? 0 : Math.ceil(quotes.length / viewportSize)
  // Page number
  const page = Math.floor(index / viewportSize)
  // The quotes to show
  const viewportQuotes = quotes.slice(
    page * viewportSize,
    (page + 1) * viewportSize,
  )
  const increaseIndex = useCallback(() => {
    setIndex((index) => Math.min(index + viewportSize, quotes.length - 1))
  }, [viewportSize])
  const decreaseIndex = useCallback(() => {
    setIndex((index) => Math.max(index - viewportSize, 0))
  }, [viewportSize])
  return (
    <Layout canonical="/customers" description={description} title={title}>
      <section className={clsx(seCss.section, seCss["section--odd"])}>
        <div className={juCss.jumbotron}>
          <div className={juCss.jumbotron__left}>
            <h1 className={seCss.section__title}>Success Stories</h1>
            <p
              className={clsx(
                seCss.section__subtitle,
                juCss.jumbotron__subtitle,
              )}
            >
              Here are the most innovative stories from our users highlighting
              how QuestDB is powering the core infrastructure of companies
              working with time-series data.
            </p>
          </div>
          <div className={juCss.jumbotron__illustration}>
            <img
              alt="People co-working on a dashboard"
              height={274}
              src="/img/pages/customers/top.svg"
              width={250}
            />
          </div>
        </div>
      </section>
      <section
        className={clsx(seCss["section--inner"], seCss["section--column"])}
      >
        <h2 className={quCss.title}>What our users say about QuestDB</h2>

        <div className={quCss.carousel} ref={ref}>
          <TransitionGroup component={null}>
            <CSSTransition key={page} timeout={200} classNames="item">
              <div className={quCss.carousel__group}>
                {viewportQuotes.map((Quote) => (
                  <Quote key={quotes.indexOf(Quote)} />
                ))}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>

        <div className={quCss.controls}>
          <div
            className={clsx(
              quCss["controls__chevron-wrapper"],
              quCss["controls__chevron-wrapper--left"],
              {
                [quCss["controls__chevron-wrapper--hidden"]]: page === 0,
              },
            )}
            onClick={decreaseIndex}
          >
            <Chevron className={quCss.controls__chevron} side="left" />
          </div>

          <div className={quCss.controls__middle}>
            {Array(viewportCount)
              .fill(0)
              .map((_, idx) => (
                <Bullet
                  index={idx}
                  key={idx}
                  onClick={setIndex}
                  page={page}
                  viewportSize={viewportSize}
                />
              ))}
          </div>

          <div
            className={clsx(
              quCss["controls__chevron-wrapper"],
              quCss["controls__chevron-wrapper--right"],
              {
                [quCss["controls__chevron-wrapper--hidden"]]:
                  page === viewportCount - 1,
              },
            )}
            onClick={increaseIndex}
          >
            <Chevron className={quCss.controls__chevron} side="right" />
          </div>
        </div>
      </section>

      {customers.map((customer, index) => {
        const odd = index % 2 === 0

        const summary = (
          <p className={caCss.card__summary}>
            <img
              className={caCss.card__logo}
              alt={customer.logo.alt}
              src={customer.logo.src}
              height={customer.logo.height}
              width={customer.logo.width}
            />
            {customer.summary}
            {typeof customer.quote !== "undefined" && (
              <em className={caCss.card__author}>
                - <strong>{customer.quote.author}</strong>,{" "}
                {customer.quote.position}
              </em>
            )}
            <Button
              className={caCss.card__cta}
              to={`/case-study/${customer.id}`}
            >
              View full case study
            </Button>
          </p>
        )

        const illustration = (
          <div className={caCss.card__illustration}>
            <img alt={customer.image.alt} src={customer.image.src} />
          </div>
        )

        return (
          <section
            key={customer.id}
            className={clsx(seCss.section, seCss["section--inner"])}
          >
            <div className={caCss.card}>
              {odd ? illustration : summary}
              {odd ? summary : illustration}
            </div>
          </section>
        )
      })}
    </Layout>
  )
}

export default Customers
