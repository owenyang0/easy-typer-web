import React from "react"
import Button from "@theme/Button"
import { Section } from "../../components/Section"
import styles from "./styles.module.css"
// import Link from "@docusaurus/Link"

export const Header = () => {
  return (
    <Section fullWidth center>
      <div className={styles.titles}>
        <Section.Title level={1} className={styles.header}>
          木易跟打器
        </Section.Title>

        <Section.Subtitle className={styles.subheader} center>
          木易跟打器是一款支持macOS、Web使用的跨平台打字练习程序，是macOS平台唯一的、可直接通过QQ群载文的跟打器
        </Section.Subtitle>

        <div className={styles.getStartedButtons}>
          <a href="/" className={styles.joinPublicPreviewLink} target="_self">
            <Button newTab uppercase={false}>
              开始Web跟打练习
            </Button>
          </a>
        </div>
      </div>
    </Section>
  )
}
