import React from "react"
// import React, { useEffect, useState } from "react"
// import exampleQueriesRaw from "./example-queries"
// import customFields from "../../config/customFields"
// import Highlight from "../../components/Highlight"
import { Section } from "../../components/Section"
import styles from "./styles.module.css"
// import Button from "@theme/Button"
// import TypeIt from "typeit-react"

// const exampleQueries = exampleQueriesRaw.map(({ comment, query }) => ({
//   url: `${customFields.demoUrl}?query=${encodeURIComponent(
//     [comment, query].join("\n"),
//   )}&executeQuery=true`,
//   query,
//   view() {
//     return <Highlight code={query} />
//   },
// }))

const LiveDemo = () => {
  // const [query, setQuery] = useState<null | number>(null)

  // useEffect(() => {
  //   const isClient = typeof window !== "undefined"

  //   if (isClient) {
  //     setQuery(Math.floor(Math.random() * exampleQueries.length))
  //   }
  // }, [])

  return (
    <Section fullWidth odd center>
      <Section.Title center size="small">
        直接载文 - 演示
      </Section.Title>
      <Section.Subtitle>
        易跟打macOS版可通过热键 F4
        激活当前QQ群聊天窗口，从当前鼠标位置载文并跟打
      </Section.Subtitle>

      <div className={styles.preview}>
        {/* <Section.Subtitle className={styles.previewHeader}>
          Try QuestDB demo in your browser
        </Section.Subtitle> */}

        <div className={styles.video}>
          <video
            autoPlay
            controls
            loop
            src="https://s.owenyang.top/typers/%E6%9C%A8%E6%98%93%E8%B7%9F%E6%89%93%E5%99%A8macOS%E7%89%88-%E8%BD%BD%E6%96%87%E6%BC%94%E7%A4%BA.mp4"
          />
          {/* <div className={styles.code}>
            {typeof query === "number" && (
              <TypeIt
                options={{
                  startDelay: 1000,
                  speed: 2,
                  waitUntilVisible: true,
                  cursor: false,
                }}
              >
                {exampleQueries[query].view()}
              </TypeIt>
            )}
          </div> */}
        </div>
      </div>
      {/* <Button
        href={
          typeof query === "number"
            ? exampleQueries[query].url
            : customFields.demoUrl
        }
      >
        Load results&nbsp;&nbsp;&gt;
      </Button> */}
    </Section>
  )
}

export default LiveDemo
