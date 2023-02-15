import useBaseUrl from "@docusaurus/useBaseUrl"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Button from "@theme/Button"
import clsx from "clsx"
import React from "react"
import Subscribe from "../../components/Subscribe"
import customFields from "../../config/customFields"
import styles from "./styles.module.css"

type Props = {
  href?: string
  label: string
  to?: string
}

const Link = ({ to, href, label, ...props }: Props) => {
  const linkHref = useBaseUrl(href ?? "", { forcePrependBaseUrl: undefined })
  const linkTo = useBaseUrl(to ?? "")

  return (
    <a
      className={styles.link}
      {...(href != null
        ? {
            href: linkHref,
            rel: "noopener noreferrer",
            target: "_blank",
          }
        : { href: linkTo })}
      {...props}
    >
      {label}
    </a>
  )
}

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
          alt="QuestDB logo"
          className={styles.logo}
          src="/img/footer/questdb.svg"
          title="QuestDB - Fastest open source database for time-series and analytics"
          width={108}
          height={27}
        />

        <div className={styles.tagline}>
          <p className={styles.taglineText}>{siteConfig.tagline}</p>

          <div className={styles.subscribe}>
            <p className={styles.subscribeText}>
              Subscribe to our newsletter. Stay up to date with all things
              QuestDB.
            </p>

            <Subscribe
              classNameInputs={styles.subscribeInputs}
              submitButtonVariant="tertiary"
              provider="newsletter"
              renderSubmitButton={({ loading, defaultLoader }) => (
                <Button
                  variant="tertiary"
                  type="submit"
                  className={styles.subscribeSubmit}
                >
                  {loading ? defaultLoader : "Subscribe"}
                </Button>
              )}
            />
          </div>

          <Button
            className={styles.githubButton}
            href={customFields.githubUrl}
            icon={
              <img
                alt="GitHub logo"
                height={22}
                src="/img/github.svg"
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
                      <Link {...item} />
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

          <a className={styles.link} href="/privacy-notice/">
            Privacy
          </a>

          <a className={styles.link} href="/terms/">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
