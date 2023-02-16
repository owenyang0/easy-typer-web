import React from "react"
import Layout from "../Layout"
import { Section } from "../../components/Section"
// import SearchBar from "@theme/SearchBar"
import Link from "@docusaurus/Link"
import styles from "./styles.module.css"

const NotFound = ({ location }) => {
  const missingLink = location.pathname.replace("/", "")

  return (
    <Layout title="Page not found">
      <Section>
        <Section.Title size="small">
          404 - <code className={styles.missingLink}>{missingLink}</code> 未找到
        </Section.Title>

        <Section.Subtitle>啊哦！这个页面不存在哦~ :(</Section.Subtitle>

        <div className={styles.search}>{/* <SearchBar /> */}</div>

        <div>
          <Section.Subtitle>或查看其他内容</Section.Subtitle>
          <ul className={styles.otherContentLinks}>
            {[
              { to: "/blog/", label: "阅读博客" },
              { to: "/docs/", label: "阅读文档" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </Layout>
  )
}

export default NotFound
