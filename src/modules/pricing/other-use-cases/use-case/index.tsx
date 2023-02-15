import React from "react"
import style from "./styles.module.css"

export const UseCase = ({ title, subtitle, children }) => (
  <article className={style.root}>
    <header>
      <h3 className={style.title}>{title}</h3>
      <p className={style.subtitle}>{subtitle}</p>
    </header>
    <aside className={style.side}>{children}</aside>
  </article>
)
