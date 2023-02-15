import clsx from "clsx"
import React from "react"
import style from "./styles.module.css"

type Props = {
  img: { src: string; width: number; height: number; alt: string }
  comingSoon?: boolean
  selected?: boolean
}

export const Provider = ({ img, comingSoon, selected }: Props) => (
  <div className={style.root}>
    <div className={clsx(style.image, { [style.selected]: selected })}>
      <img width={img.width} height={img.height} src={img.src} alt={img.alt} />
    </div>
    {typeof comingSoon !== "undefined" && (
      <span className={style.comingSoon}>Coming soon</span>
    )}
  </div>
)
