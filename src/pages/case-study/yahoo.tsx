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

const Yahoo = () => {
  const title = "Yahoo use QuestDB for big data machine learning engines"
  const description =
    "QuestDB is used as a time series database to store resource utilization metrics within a machine learning engine within systems serving over a billion users."

  return (
    <Layout
      canonical="/case-study/yahoo"
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
              href="https://yahoo.com/?utm_source=questdb"
              variant="plain"
            >
              <img
                alt="Yahoo logo"
                className={juCss.jumbotron__logo}
                height={45}
                src={logos.yahoo.src}
                width={100}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>
            QuestDB enables machine learning engines that power Yahoo search
          </h1>
          <p
            className={clsx(
              seCss.section__subtitle,
              juCss.jumbotron__description,
            )}
          >
            Yahoo use QuestDB in an embedded capacity within their machine
            learning engine deployed in systems that serve close to a billion
            users at a rate of 500k queries per second.
          </p>
        </div>

        <div className={juCss.jumbotron__banner}>
          <img
            alt="An advertisement for yahoo.com showing personalized search across multiple mobile devices"
            height={170}
            src="/img/pages/case-study/yahoo/header.jpg"
            width={1200}
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
            No external monitoring solutions required for autoscaling decisions
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Workflow icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/workflow.svg"
            />
            Native timeseries support within the ML engine in an embedded
            capacity
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Leaf icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/leaf.svg"
            />
            Helps provide fault-tolerance at the software architecture layer
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Gauge icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/gauge.svg"
            />
            Powering web-scale systems with hundreds of millions of monthly
            users
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Voice icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/voice.svg"
            />
            Comprehensive documentation accelerated the integration
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Time icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/time.svg"
            />
            High-performance solution for real-time resource monitoring
          </p>
        </div>
      </section>

      <section className={clsx(seCss.section, caCss.card)}>
        <p className={caCss.card__title}>
          Yahoo’s media, technology, and business platform serves content to
          hundreds of millions of users per month. To power search and
          recommendation, Yahoo relies on a custom machine learning engine which
          serves personalized content in real-time. High-performance is critical
          at this scale because every extra millisecond a consumer has to wait
          matters.
        </p>

        <p className={caCss.card__subtitle}>
          In this case study, VP Architect Jon Bratseth describes how and why
          QuestDB is relied upon within high-performance machine learning
          engines at Yahoo.
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
          <h3>Why Yahoo uses QuestDB for our Vespa machine learning engine</h3>
          <p className="font-size--large">
            Vespa is an open-source big data processing and serving engine
            powering applications at Yahoo. Many products, such as Yahoo News,
            Yahoo Sports, and Yahoo Finance, use this engine to store, search,
            organize, and make machine-learned inferences over big data at
            serving time.
          </p>
          <p className="font-size--large">
            These platforms serve close to a billion users, and we needed an
            embedded solution that monitors resource utilization metrics in
            nodes within our application clusters. We decided to use QuestDB to
            store and analyze application monitoring metrics quickly and easily
            within the application itself, removing external failure modes and
            leaving plenty of headroom for performance.
          </p>

          <h3>The scale and scope of our application monitoring needs</h3>
          <p className="font-size--large">
            The Vespa platform performs machine-learned inferences over big data
            with high availability and high performance. The engine powers
            search, question answering for chatbots, recommendation and
            personalization, and typeahead suggestions for systems that serve
            close to a billion users at a rate of 500k queries per second. In
            these use cases, the engine needs to select a subset of data from a
            vast data corpus, evaluate machine-learned models over the selected
            data, organize and aggregate it, and return results in less than 100
            milliseconds while the data corpus is continuously changing.
          </p>

          <Image
            alt="Chart showing a continuous integration pipeline for Yahoo's Vespa engine"
            height={433}
            src="/img/pages/case-study/yahoo/graphic.png"
            width={1000}
          />

          <h3>How we capture and store application metrics in QuestDB</h3>
          <p className="font-size--large">
            We’re running a large number of deployments on behalf of customers.
            Each consists of several clusters running on dedicated Docker
            containers. The clusters are controlled by a shared control plane
            mainly consisting of ’configuration server clusters’ where a single
            cluster runs per environment and region and handles application
            configuration.
          </p>
          <p className="font-size--large">
            Autoscaling lets you adjust the hardware resources allocated to
            application clusters automatically depending on actual usage. You
            want your application to use as few resources as possible to
            minimize cost, but at the same time, you don’t want to run out of
            resources when traffic is high or you feed more data. We want
            clusters to maintain the optimal allocation required to handle the
            current load at any time.
          </p>
          <Image
            alt="Chart showing resource utilization of nodes within Yahoo's Vespa engine"
            height={433}
            src="/img/pages/case-study/yahoo/resource-utilization.png"
            width={791}
          />
          <p className="font-size--large">
            We run QuestDB embedded in the admin and configuration clusters to
            store a few days of resource usage of the nodes. The data is sampled
            continuously for each cluster or node, and we query the resource
            utilization data to make scaling decisions based on that data. We
            use QuestDB to act on the usage patterns observed on the system in
            the recent past. When users deploy a new cluster (or application),
            defaults initially configure the minimal resources provided within a
            given range. When engineers enable autoscaling for a cluster, it
            will continue unchanged until autoscaling determines that a change
            is beneficial.
          </p>

          <p className="font-size--large">
            Our ’ideal utilization’ considers that a node may be down or
            failing, that another region may be down, which can cause a doubling
            of traffic. We can also factor into the equation that we need
            headroom for maintenance operations and handling requests with low
            latency.
          </p>
          <h3>Why QuestDB is a good database to use for fault-tolerance</h3>

          <p className="font-size--large">
            We decided that metric collection should be embedded within nodes
            that manage the clusters. We embed QuestDB to avoid failure
            scenarios where some parts of the cluster work, but others don’t.
            Using a time series database within Yahoo’s recommendation engine
            helps include fault-tolerance measures within the engine’s
            architecture and allows engineers to make AI-driven decisions using
            customer data in real-time, at any scale.
          </p>

          <div
            className={clsx(
              "markdown",
              seCss["section--inner"],
              seCss["section--column"],
            )}
          >
            <p className={caCss.card__title}>
              <span className={caCss.card__quote}>&ldquo;</span>We use QuestDB
              to monitor metrics for autoscaling decisions within our ML engine
              that provides search, recommendation, and personalization via
              models and aggregations on continuously changing data.
              <span className={caCss.card__quote}>&rdquo;</span>
            </p>
            <p className={caCss.card__title}>
              <b>Jon Bratseth, VP Architect at Yahoo</b>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Yahoo
