import React from "react"
import style from "./styles.module.css"

import type { Region } from "./specs"
import clsx from "clsx"
import { formatPrice } from "../../../utils"

type Props = {
  className?: string
  region: Region
}

export const PricingTable = ({ className, region }: Props) => (
  <table className={clsx(style.root, className)}>
    <thead>
      <tr>
        <th>CPU</th>
        <th>RAM</th>
        <th>Storage</th>
        <th>Price</th>
      </tr>
    </thead>

    <tbody>
      {region.specs.map((spec, index) => (
        <tr key={index}>
          <td>
            {spec.cpu} <span className={style.dimmed}>cores</span>
          </td>
          <td>
            {spec.ram} <span className={style.dimmed}>GB</span>
          </td>
          <td>
            {spec.storage} <span className={style.dimmed}>GB</span>
          </td>
          <td>
            ${spec.price}
            <span className={style.dimmed}>/hr (</span>$
            {formatPrice(((spec.price * 730).toFixed(0) as unknown) as number)}
            <span className={style.dimmed}>/mo est)</span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)
