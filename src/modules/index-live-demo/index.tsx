import React, { useEffect, useState } from "react"
import exampleQueriesRaw from "./example-queries"
import customFields from "../../config/customFields"
import Highlight from "../../components/Highlight"
import { Section } from "../../components/Section"
import styles from "./styles.module.css"
import Button from "@theme/Button"
import TypeIt from "typeit-react"

const exampleQueries = exampleQueriesRaw.map(({ comment, query }) => ({
  url: `${customFields.demoUrl}?query=${encodeURIComponent(
    [comment, query].join("\n"),
  )}&executeQuery=true`,
  query,
  view() {
    return <Highlight code={query} />
  },
}))

const LiveDemo = () => {
  const [query, setQuery] = useState<null | number>(null)

  useEffect(() => {
    const isClient = typeof window !== "undefined"

    if (isClient) {
      setQuery(Math.floor(Math.random() * exampleQueries.length))
    }
  }, [])

  return (
    <Section fullWidth odd center>
      <Section.Title center size="small">
        See live demo
      </Section.Title>
      <Section.Subtitle>
        Query three large datasets and more than 2 billion rows in milliseconds
        with SQL
      </Section.Subtitle>

      <div className={styles.preview}>
        <Section.Subtitle className={styles.previewHeader}>
          Try QuestDB demo in your browser
        </Section.Subtitle>

        <div className={styles.editor}>
          <div className={styles.code}>
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
          </div>
        </div>
      </div>
      <Button
        href={
          typeof query === "number"
            ? exampleQueries[query].url
            : customFields.demoUrl
        }
      >
        Load results&nbsp;&nbsp;&gt;
      </Button>
    </Section>
  )
}

export default LiveDemo
