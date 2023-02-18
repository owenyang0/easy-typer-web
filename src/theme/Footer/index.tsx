// import useBaseUrl from "@docusaurus/useBaseUrl"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Button from "@theme/Button"
import clsx from "clsx"
import React from "react"
// import Subscribe from "../../components/Subscribe"
import customFields from "../../config/customFields"
import styles from "./styles.module.css"
import Link from "@docusaurus/Link"

// type Props = {
//   href?: string
//   label: string
//   to?: string
// }

// const Link = ({ to, href, label, ...props }: Props) => {
//   const linkHref = useBaseUrl(href ?? "", { forcePrependBaseUrl: undefined })
//   const linkTo = useBaseUrl(to ?? "")

//   return (
//     <a
//       className={styles.link}
//       {...(href != null
//         ? {
//             href: linkHref,
//             rel: "noopener noreferrer",
//             target: "_blank",
//           }
//         : { href: linkTo })}
//       {...props}
//     >
//       {label}
//     </a>
//   )
// }

const Footer = () => {
  const { siteConfig } = useDocusaurusContext()
  const {
    themeConfig: {
      footer: { links },
    },
  } = siteConfig

  return (
    <footer className={styles.root}>
      <div className={clsx(styles.content, styles.center)}>
        <img
          alt="易跟打 logo"
          className={styles.logo}
          src="/pimgs/footer/easy-typer.png"
          title="易跟打 - 一款支持macOS、Web使用的跨平台打字练习程序"
          width={50}
          height={50}
        />

        <div className={styles.tagline}>
          <p className={styles.taglineText}>{siteConfig.tagline}</p>

          <Button
            className={styles.githubButton}
            href={customFields.githubUrl}
            icon={
              <img
                alt="GitHub logo"
                height={22}
                src="/pimgs/github.svg"
                title="GitHub"
                width={22}
              />
            }
            size="xsmall"
            uppercase={false}
            variant="secondary"
          >
            Star us on GitHub
          </Button>
        </div>

        <div className={styles.links}>
          {links.map((linkItem, i) => (
            <div key={i} className={styles.category}>
              {Boolean(linkItem.title) && (
                <span className={styles.title}>{linkItem.title}</span>
              )}

              {linkItem.items?.length > 0 && (
                <ul className={styles.items}>
                  {linkItem.items.map((item) => (
                    <li className={styles.item} key={item.href ?? item.to}>
                      <Link className={styles.link} {...item}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.border}>
        <div className={clsx(styles.bottom, styles.center)}>
          {customFields.copyright}

          <a className={styles.link} href="https://beian.miit.gov.cn/">
            蜀ICP备2023002101号-1
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
