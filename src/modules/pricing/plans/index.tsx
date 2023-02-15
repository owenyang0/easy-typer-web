import React from "react"
import { Plan } from "../plan"
import style from "./styles.module.css"
import { Section } from "../../../components/Section"

import { plans } from "./plans"

export const Plans = () => (
  <div className={style.root}>
    <Section.Title center className={style.title}>
      Choose a plan or pick exact specs
    </Section.Title>

    <div className={style.plans}>
      {plans.map((plan, index) => (
        <div className={style.plan} key={index}>
          <Plan {...plan} />
          <span className={style.subtext}>{plan.subtext}</span>
        </div>
      ))}
    </div>
  </div>
)
