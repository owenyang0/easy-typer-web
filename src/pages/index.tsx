// import clsx from "clsx"
import React from "react"
// import Customers from "../components/Customers"
import customFields from "../config/customFields"
// import { QueryScroller } from "../components/QueryScroller"

import Layout from "../theme/Layout"
import { Header } from "../modules/index-header"
// import { ActionFooter } from "../components/ActionFooter"
import { Section } from "../components/Section"
import { UseCases } from "../modules/use-cases"
// import { Integration } from "../modules/integration"

// import feCss from "../css/index/feature.module.css"
// import seCss from "../css/section.module.css"
import LiveDemo from "../modules/index-live-demo"

// const Cards = () => (
//   <Section odd fullWidth>
//     <Section noGap>
//       <Section.Title level={3} size="small" center>
//         Why time series?
//       </Section.Title>

//       <div
//         className={clsx(
//           seCss.section__footer,
//           seCss["section__footer--feature-cards"],
//         )}
//       >
//         {[
//           {
//             header: "DevOps, monitoring and observability",
//             content:
//               "Collect CPU, memory and storage metrics from your infrastructure and get real-time visibility into your entire stack.",
//           },

//           {
//             header: "Financial market data",
//             content:
//               "Store market tick data to identify historical trends, find correlations and analyze trades in real-time. Build aggregated views across multiple venues and efficiently compute live order books.",
//           },

//           {
//             header: "Network traffic analysis",
//             content:
//               "Collect sFlow or other network traffic metadata to run analytics and detect anomalies in real-time.",
//           },

//           {
//             header: "Connected devices",
//             content:
//               "Capture, store and respond to sensor data and telemetry at any resolution in industrial or machine-to-machine applications.",
//           },

//           {
//             header: "Application metrics",
//             content:
//               "Empower application developers and UX teams to track and visualize user behavior data, API calls, data latency, and other application events in real-time.",
//           },

//           {
//             header: "Machine learning with time-series data",
//             content:
//               "Use QuestDB with popular Python frameworks and tools for leveraging anomaly detection algorithms, machine learning libraries, statistical analysis with Pandas, or Jupyter notebooks.",
//           },
//         ].map(({ header, content }, index) => (
//           <div key={index} className={feCss.feature}>
//             <h3 className={feCss.feature__header}>{header}</h3>
//             <p className={feCss.feature__content}>{content}</p>
//           </div>
//         ))}
//       </div>
//     </Section>
//   </Section>
// )

// const Console = () => (
//   <Section fullWidth>
//     <Section.Title size="small" center>
//       Interactive Console
//     </Section.Title>

//     <Section.Subtitle center>
//       Interactive console to import data (drag and drop) and start querying
//       right away.
//     </Section.Subtitle>

//     <Section.Subtitle center>
//       Check our{" "}
//       <a href="/docs/develop/web-console/">Web Console documentation</a> to get
//       started.
//     </Section.Subtitle>

//     <Section center>
//       <img
//         loading="lazy"
//         alt="Artistic view of QuestDB's Web Console split in 3 components: the navigation tree, the SQL code editor and data displayed as a chart"
//         width={600}
//         height={467}
//         src="/pimgs/pages/index/console.svg"
//       />
//     </Section>
//   </Section>
// )

const Home = () => (
  <Layout
    canonical=""
    description={customFields.description}
    title="木易跟打器 - 官网"
    replaceTitle
  >
    <Header />
    {/* <Customers /> */}
    <Section fullWidth center>
      <UseCases />
    </Section>

    <LiveDemo />

    {/* <Section fullWidth odd>
      <Integration />
    </Section> */}

    {/* <QueryScroller /> */}
    {/* <Cards /> */}
    {/* <Console /> */}

    {/* <Section>
      <ActionFooter />
    </Section> */}
  </Layout>
)

export default Home
