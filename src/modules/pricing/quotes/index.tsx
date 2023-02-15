import React, { useCallback, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import clsx from "clsx"
import Chevron from "@theme/Chevron"
import useResizeObserver from "@theme/useResizeObserver"
import _quotes from "../../../assets/quotes"
import styles from "./styles.module.css"

const companiesToInclude = [
  "Syndica",
  "Airbus",
  "Aquis Exchange",
  "Copenhagen Atomics",
]

const filteredQuotes = _quotes
  .filter((quote) =>
    companiesToInclude.some((company) => quote.company === company),
  )
  .sort((a, b) => {
    return (
      companiesToInclude.indexOf(a.company) -
      companiesToInclude.indexOf(b.company)
    )
  })

const quotes = filteredQuotes.map(({ author, company, logo, role, text }) => {
  const Quote = () => (
    <div key={company} className={styles.quote}>
      <div className={styles.quote__logo}>
        <img
          alt={logo.alt}
          height={logo.height}
          src={logo.src}
          width={logo.width}
          style={{ top: logo.offset ?? 0 }}
        />
      </div>

      <p className={styles.quote__content}>{text}</p>

      <p className={styles.quote__author}>
        <span className={styles.quote__chevron}>&gt;</span>
        {author}
        <br />
        {role}
        ,&nbsp;
        {company}
      </p>
    </div>
  )

  return Quote
})

type BulletProps = {
  index: number
  onClick: (index: number) => void
  page: number
  viewportSize: number
}

const Bullet = ({ index, onClick, page, viewportSize }: BulletProps) => {
  const handleClick = useCallback(() => {
    onClick(index * viewportSize)
  }, [index, onClick, viewportSize])

  return (
    <span
      className={clsx(styles.controls__pin, {
        [styles["controls__pin--selected"]]: page === index,
      })}
      onClick={handleClick}
    />
  )
}

const QUOTE_WIDTH = 770

export const Quotes = () => {
  const { ref, width } = useResizeObserver<HTMLDivElement>()
  // An "item" is a quote
  // Index in the array of quotes of the item that is "focused"
  const [index, setIndex] = useState(0)
  // How many items we can show on the screen
  const viewportSize = Math.max(1, Math.floor((width ?? 0) / QUOTE_WIDTH))
  // How many items will actually be displayed (can be smaller than viewportSize)
  const viewportCount =
    viewportSize === 0 ? 0 : Math.ceil(quotes.length / viewportSize)
  // Page number
  const page = Math.floor(index / viewportSize)
  // The quotes to show
  const viewportQuotes = quotes.slice(
    page * viewportSize,
    (page + 1) * viewportSize,
  )
  const increaseIndex = useCallback(() => {
    setIndex((index) => Math.min(index + viewportSize, quotes.length - 1))
  }, [viewportSize])
  const decreaseIndex = useCallback(() => {
    setIndex((index) => Math.max(index - viewportSize, 0))
  }, [viewportSize])

  return (
    <div className={styles.root}>
      <div className={styles.carousel} ref={ref}>
        <TransitionGroup component={null}>
          <CSSTransition key={page} timeout={200} classNames="item">
            <div className={styles.carousel__group}>
              {viewportQuotes.map((Quote) => (
                <Quote key={quotes.indexOf(Quote)} />
              ))}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>

      <div className={styles.controls}>
        <div
          className={clsx(
            styles["controls__chevron-wrapper"],
            styles["controls__chevron-wrapper--left"],
            {
              [styles["controls__chevron-wrapper--hidden"]]: page === 0,
            },
          )}
          onClick={decreaseIndex}
        >
          <Chevron className={styles.controls__chevron} side="left" />
        </div>

        <div className={styles.controls__middle}>
          {Array(viewportCount)
            .fill(0)
            .map((_, idx) => (
              <Bullet
                index={idx}
                key={idx}
                onClick={setIndex}
                page={page}
                viewportSize={viewportSize}
              />
            ))}
        </div>

        <div
          className={clsx(
            styles["controls__chevron-wrapper"],
            styles["controls__chevron-wrapper--right"],
            {
              [styles["controls__chevron-wrapper--hidden"]]:
                page === viewportCount - 1,
            },
          )}
          onClick={increaseIndex}
        >
          <Chevron className={styles.controls__chevron} side="right" />
        </div>
      </div>
    </div>
  )
}
