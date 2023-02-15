import React from "react"
import style from "./styles.module.css"
import { Section } from "../../../components/Section"
import Button from "@theme/Button"
import customFields from "../../../config/customFields"

import { UseCase } from "./use-case"

export const OtherUseCases = () => (
  <div className={style.root}>
    <Section.Title size="small" center>
      Have a different use case?
    </Section.Title>

    <Section className={style.useCases}>
      <UseCase
        title="Self-hosting for enterprise"
        subtitle={
          <>
            We got you covered.
            <br /> Find out about our enterprise offering.
          </>
        }
      >
        <Button
          to="/enterprise"
          variant="tertiary"
          size="xsmall"
          uppercase={false}
        >
          More Info
        </Button>
      </UseCase>

      <UseCase
        title="Open Source"
        subtitle={
          <>
            Query our demo dataset with live ingestion and 1.6 billion rows or
            install on your server.
            <br /> QuestDB is open source and free to use.
          </>
        }
      >
        <Button
          href={customFields.demoUrl}
          variant="tertiary"
          size="xsmall"
          uppercase={false}
        >
          Live Demo
        </Button>
        <Button
          to="/get-questdb"
          variant="tertiary"
          size="xsmall"
          uppercase={false}
        >
          Download
        </Button>
      </UseCase>

      <UseCase
        title="Bring Your Own Cloud"
        subtitle="Install QuestDB Cloud infrastructure on your premises."
      >
        Coming soon
      </UseCase>
    </Section>
  </div>
)
