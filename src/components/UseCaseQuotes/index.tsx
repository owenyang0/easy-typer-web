import React, { useState, useEffect } from "react"

import ucCss from "./use-case-customers.module.css"
import Button from "@theme/Button"
import { logos } from "../../assets/logos"
import { CustomerLogo } from "../../assets/types"
import clsx from "clsx"

export type Customer = {
  key: string
  quote?: string
  caseStudyLink?: string
  logoWidth?: number
  logoHeight?: number
  logoOffset?: number
}

const UseCaseCustomers = ({
  customers,
  columnLayout,
}: {
  customers: Customer[]
  columnLayout?: boolean
}) => {
  const [active] = useState<Customer>(customers[0])
  const [activeLogo, setActiveLogo] = useState<CustomerLogo | null>()

  useEffect(() => {
    if (active !== null) {
      setActiveLogo(logos[active.key])
    }
  }, [active])

  return (
    <div className={ucCss["use-case-customers"]}>
      <div
        className={clsx(ucCss["use-case-customers__active"], {
          [ucCss["use-case-customers__active--column"]]: columnLayout,
        })}
      >
        <div>
          <img
            src={activeLogo?.src}
            alt={activeLogo?.alt}
            width={active.logoWidth ?? activeLogo?.width}
            height={active.logoHeight ?? activeLogo?.height}
            className={ucCss["use-case-customers__active__logo"]}
          />
          {active.quote !== null && (
            <p className={ucCss["use-case-customers__active__quote"]}>
              {active.quote}
            </p>
          )}
        </div>
        {active.caseStudyLink !== null && (
          <div className={ucCss["use-case-customers__active__link"]}>
            <Button variant="tertiary" to={active.caseStudyLink}>
              View case study
            </Button>
          </div>
        )}
      </div>
      <div className={ucCss["use-case-customers__logos"]}>
        {customers.map((customer) => (
          <img
            key={customer.key}
            src={logos[customer.key]?.src}
            alt={logos[customer.key]?.alt}
            width={customer.logoWidth ?? logos[customer.key]?.width}
            height={customer.logoHeight ?? logos[customer.key]?.height}
            style={{ top: customer.logoOffset ?? logos[customer.key]?.offset }}
            className={
              ucCss[
                active.key === customer.key
                  ? "use-case-customers__active__logo"
                  : "use-case-customers__logo"
              ]
            }
          />
        ))}
      </div>
    </div>
  )
}

export default UseCaseCustomers
