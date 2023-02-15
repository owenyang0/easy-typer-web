import React from "react"
import style from "./styles.module.css"
import HighPerformerLogo from "../../../pages/pricing/high-performer.svg"
import SvgImage from "../../../components/SvgImage"

export const HighPerformer = () => (
  <div className={style.root}>
    <div className={style.quoteWrapper}>
      <h2 className={style.quote}>Easy to use on every scale</h2>
      <span className={style.stars}>
        <span className={style.star} />
        <span className={style.star} />
        <span className={style.star} />
        <span className={style.star} />
        <span className={style.star} />
      </span>
    </div>
    <a
      href="https://www.g2.com/products/questdb/reviews"
      target="_blank"
      rel="noreferrer noopener"
    >
      <SvgImage
        image={<HighPerformerLogo />}
        title="A G2 High Performer Winter 2023 badge"
      />
    </a>
  </div>
)
