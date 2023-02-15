import React, { useState } from "react"
import { Section } from "../../../components/Section"
import { PricingTable } from "../pricing-table"
import Button from "@theme/Button"
import style from "./styles.module.css"
import useBaseUrl from "@docusaurus/useBaseUrl"
import { Dialog } from "../../../components/Dialog"
import { ContactForm } from "../../cloud/ContactForm"
import { Provider } from "./provider"
import { Dropdown } from "./dropdown"
import { regions } from "../pricing-table/specs"
import type { RegionKey } from "../pricing-table/specs"

export const PricingChoices = () => {
  const awsImg = useBaseUrl("img/pages/enterprise/aws.png")
  const azureImg = useBaseUrl("img/pages/enterprise/azure.png")
  const gcpImg = useBaseUrl("img/pages/enterprise/gcp.png")
  const [region, setRegion] = useState<RegionKey>("us-east-2")

  return (
    <div className={style.root}>
      <Section.Title size="small" center className={style.title}>
        Explore pricing configurations
      </Section.Title>

      <Section noGap className={style.description}>
        <p>None of the plans work for you?</p>
        <p>
          Pick the best fitting specs.
          <br />
          Choose up to <span className={style.highlighted}>196 vCPUs</span>
          ,&nbsp;
          <span className={style.highlighted}>256 GB RAM</span> and{" "}
          <span className={style.highlighted}>16 TB</span> storage.
        </p>

        <div className={style.options}>
          <div className={style.option}>
            <div>Provider</div>
            <div className={style.optionContent}>
              <Provider
                img={{
                  src: awsImg,
                  width: 40,
                  height: 22,
                  alt: "Amazon Web Services (AWS) logo",
                }}
                selected
              />
              <Provider
                img={{
                  src: gcpImg,
                  width: 85,
                  height: 13,
                  alt: "Google Cloud Platform (GCP) logo",
                }}
                comingSoon
              />
              <Provider
                img={{
                  src: azureImg,
                  width: 58,
                  height: 17,
                  alt: "Microsoft Azure logo.",
                }}
                comingSoon
              />
            </div>
          </div>

          <div className={style.option}>
            <div className={style.optionLabel}>Region</div>
            <div className={style.optionContent}>
              <Dropdown
                value={region}
                onChange={setRegion}
                values={Object.entries(regions).map(
                  ([key, { label, disabled }]) => ({
                    label: disabled ? `${label} (Coming soon)` : label,
                    value: key as RegionKey,
                    disabled,
                  }),
                )}
              />
            </div>
          </div>
        </div>
      </Section>

      <div className={style.table}>
        <PricingTable region={regions[region]} />
        <span className={style.tableSubtext}>
          Contact us if your application requires more resources.
        </span>
      </div>

      <div className={style.footer}>
        <Dialog>
          <Dialog.Trigger>
            <Button
              uppercase={false}
              dataHook="pricing-table-contact-us-button"
            >
              Contact Us
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <ContactForm interestedIn="custom" modal />
          </Dialog.Content>
        </Dialog>
      </div>
    </div>
  )
}
