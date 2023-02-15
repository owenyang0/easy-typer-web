import clsx from "clsx"
import React, { useCallback, useRef } from "react"

import Button from "@theme/Button"
import Layout from "../theme/Layout"

import caCss from "../css/careers/card.module.css"
import joCss from "../css/careers/job.module.css"
import liCss from "../css/careers/list.module.css"
import seCss from "../css/section.module.css"

type Opening = {
  href: string
  title: string
  location: string
}

const currentOpenings: Opening[] = [
  {
    href: "/careers/growth-engineer-open-source/",
    title: "Growth Engineer (open source)",
    location: "Remote",
  },
  {
    href: "/careers/senior-backend-engineer-python/",
    title: "Backend Engineers (Python)",
    location: "Remote",
  },

  {
    href: "/careers/core-database-engineer/",
    title: "Core Database Engineers",
    location: "Remote",
  },

  {
    href: "/careers/developer-relations-engineer/",
    title: "Developer Relations Engineers",
    location: "Remote",
  },

  {
    href: "/careers/senior-cloud-engineer/",
    title: "Cloud Engineers",
    location: "Remote",
  },

  {
    href: "/careers/solution-engineer/",
    title: "Solution Engineer",
    location: "Remote",
  },
]

const CareersPage = () => {
  const title = "Careers at QuestDB"
  const description =
    "Join us at QuestDB to build breakthrough technology that will power the infrastructure of tomorrow."
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null)
  const onOpeningsClick = useCallback(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [scrollAnchorRef])

  return (
    <Layout canonical="/careers" description={description} title={title}>
      <section
        className={clsx(seCss["section--inner"], seCss["section--center"])}
      >
        <div className={caCss.card}>
          <div className={caCss.card__side}>
            <h1 className={caCss["card__title--important"]}>Careers</h1>
            <p className={caCss.card__content}>
              We help developers handle explosive amounts of data while getting
              them started in just a few minutes with the fastest and most
              accessible time series database.
            </p>
            <div className={caCss.careers_cta}>
              <Button onClick={onOpeningsClick}>Openings</Button>
              <Button variant="secondary" href="/about-us" newTab={false}>
                Our Team
              </Button>
            </div>
          </div>
          <div
            className={clsx(
              caCss.card__side,
              caCss["card__side--illustration"],
            )}
          >
            <img
              alt="Illustration of team collaboration"
              height={201}
              src="/img/pages/careers/teamCollaboration.svg"
              width={305}
            />
          </div>
        </div>

        <div
          className={clsx(
            caCss.card,
            caCss["card--reverse"],
            caCss["card--no-gap"],
          )}
        >
          <div
            className={clsx(
              caCss.card__side,
              caCss["card__side--illustration"],
              caCss["card__side--baseline"],
            )}
          >
            <img
              alt="Illustration of team spirit"
              height={230}
              src="/img/pages/careers/teamSpirit.svg"
              width={305}
            />
          </div>
          <div className={caCss.card__side}>
            <h2 className={caCss.card__title}>Working at QuestDB</h2>
            <p className={caCss.card__content}>
              We hire talented and passionate people who share our mission to
              empower developers to solve their problems with data. We are
              building breakthrough technology to power the infrastructure of
              tomorrow
            </p>
            <ul className={liCss.list}>
              <li className={liCss.list__item}>
                We are a company with thousands of users; our mission is to
                empower them
              </li>
              <li className={liCss.list__item}>
                We invest in a culture that promotes ownership, autonomy and
                independent thinking
              </li>
              <li className={liCss.list__item}>
                We have transparent leadership and value employees’ strategic
                inputs
              </li>
              <li className={liCss.list__item}>
                Our team is ambitious and tackles the most difficult problems at
                the deepest data infrastructure layer
              </li>
            </ul>
          </div>
        </div>

        <div className={caCss.scrollAnchor} ref={scrollAnchorRef} />

        <div className={caCss.card}>
          <div className={caCss.card__side}>
            <h2 className={caCss.card__title}>Current openings</h2>
          </div>

          <div className={clsx(caCss.card__side, caCss["card__side--center"])}>
            {currentOpenings.map(({ href, title, location }) => (
              <a key={href} className={joCss.job} href={href}>
                <h3 className={joCss.job__title}>{title}</h3>
                <p className={joCss.job__location}>{location}</p>
                <span className={joCss.job__cta}>
                  Details&nbsp;
                  <img
                    alt="Right arrow"
                    height={20}
                    src="/img/pages/careers/arrowRight.svg"
                    width={20}
                  />
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className={clsx(caCss.card, caCss["card--reverse"])}>
          <div
            className={clsx(
              caCss.card__side,
              caCss["card__side--illustration"],
              caCss["card__side--baseline"],
            )}
          >
            <img
              alt="Illustration of a developer with efficient"
              height={230}
              src="/img/pages/careers/timeseriesApplication.svg"
              width={305}
            />
          </div>
          <div className={caCss.card__side}>
            <h2 className={caCss.card__title}>What we offer</h2>
            <ul className={liCss.list}>
              <li className={liCss.list__item}>
                Generous equity options package
              </li>
              <li className={liCss.list__item}>Flexible working hours</li>
              <li className={liCss.list__item}>100% remote</li>
              <li className={liCss.list__item}>
                Freedom of choice for your technical equipment
              </li>
              <li className={liCss.list__item}>
                Wonderful, highly qualified colleagues
              </li>
              <li className={liCss.list__item}>
                Truly international: more than 10 different nationalities
              </li>
              <li className={liCss.list__item}>
                A transparent, collaborative & inclusive culture
              </li>
              <li className={liCss.list__item}>
                Exciting opportunities for career progression as we grow
              </li>
              <li className={liCss.list__item}>
                Little to zero controls combined with autonomous work where you
                set your own pace in a collaborative environment
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CareersPage
