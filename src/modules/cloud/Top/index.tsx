import React from "react"
import { Section } from "../../../components/Section"
import localStyle from "./styles.module.css"
import { ContactForm } from "../ContactForm"

const featureList = [
  "Database-as-a-service",
  "Infrastructure monitoring and logs",
  "Built-in auth and TLS encryption",
  "Decoupled compute and storage",
  "Multiple regions",
  "Additional database features",
]

export const Top = () => {
  return (
    <Section className={localStyle.section}>
      <div className={localStyle.columns}>
        <div className={localStyle.textColumn}>
          <Section.Title level={1}>QuestDB Cloud</Section.Title>

          <Section.Subtitle>
            The fastest open source time series database fully managed on the
            cloud.
          </Section.Subtitle>

          <ul className={localStyle.list}>
            {featureList.map((feature) => (
              <li className={localStyle.bullet} key={feature}>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Section noGap center>
          <ContactForm interestedIn="cloud" />
        </Section>
      </div>
    </Section>
  )
}
