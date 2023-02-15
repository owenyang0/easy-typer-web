import React from "react"
import Button from "@theme/Button"
import { Section } from "../../../components/Section"
import style from "./styles.module.css"
import clsx from "clsx"

import { Dialog } from "../../../components/Dialog"
import { ContactForm } from "../../cloud/ContactForm"
import styled from "styled-components"
import { formatPrice } from "../../../utils"

export type PricingPlan = {
  type: "entry" | "performant" | "high-performance"
  title: string
  description: string
  price: number
  specs: Array<{ label: string; value: string }>
  subtext: string
  highlighted?: boolean
}

const StyledDialogContent = styled(Dialog.Content)`
  padding: 0;
`

export const Plan = (plan: PricingPlan) => (
  <article className={style.root}>
    <header
      className={clsx(style.heading, { [style.highlighted]: plan.highlighted })}
    >
      <Section.Title level={3} className={style.title}>
        {plan.title}
      </Section.Title>

      <span className={style.description}>{plan.description}</span>
    </header>

    <div className={style.hourlyPrice}>
      <span className={style.priceHourlyValue}>${plan.price.toFixed(3)}</span>
      <span className={style.pricePeriod}>per hour</span>
    </div>

    <div className={style.monthlyPrice}>
      <span className={style.priceMonthlyValue}>
        ${formatPrice(((plan.price * 730).toFixed(0) as unknown) as number)}
      </span>
      <span className={style.pricePeriod}>per month (est)</span>
    </div>

    <div className={style.specs}>
      {plan.specs.map((spec, index) => (
        <div key={index} className={style.spec}>
          <span className={style.specLabel}>{spec.label}</span>
          <span className={style.specValue}>{spec.value}</span>
        </div>
      ))}
    </div>

    <div className={style.cta}>
      <Dialog>
        <Dialog.Trigger>
          <Button size="small" dataHook={`get-access-button-plan-${plan.type}`}>
            Get Access
          </Button>
        </Dialog.Trigger>
        <StyledDialogContent>
          <ContactForm interestedIn={plan.type} modal />
        </StyledDialogContent>
      </Dialog>
    </div>
  </article>
)
