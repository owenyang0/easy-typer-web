import React from "react"
import Link from "@docusaurus/Link"
import styles from "./styles.module.css"

const useCases = [
  {
    title: "跨平台",
    uses: [
      "Web 在线跟打练习",
      "macOS 平台上直接载文",
      "基于PWA的免安装 Web App",
    ],
    cta: {
      label: "了解更多",
      url: "https://typer.owenyang.top",
    },
  },
  {
    title: "功能丰富",
    uses: [
      "阅读、发文、跟打、成绩可视化等",
      "编码提示、支持复合指标练习",
      "速度、击键、码长等丰富成绩指标",
      "内置单字+名篇等丰富练习素材",
    ],
    cta: {
      label: "更多功能",
      url: "https://typer.owenyang.top",
    },
  },
  {
    title: "安全性",
    uses: [
      "基于浏览器 IndexDB 的数据本地化",
      "无任何数据后台上传",
      "虎码用户设置预设",
    ],

    cta: {
      label: "Read IndexDB",
      url: "https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API",
    },
  },
]

export const UseCases = () => (
  <div className={styles.root}>
    {useCases.map(({ title, uses, cta }, index) => (
      <div className={styles.card} key={index}>
        <h2>{title}</h2>

        <ul className={styles.list}>
          {uses.map((use, index) => (
            <li key={index} className={styles.listItem}>
              {use}
            </li>
          ))}
        </ul>

        <Link className={styles.link} href={cta.url}>
          {cta.label}
        </Link>
      </div>
    ))}
  </div>
)
