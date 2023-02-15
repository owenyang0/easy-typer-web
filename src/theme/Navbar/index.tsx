import clsx from "clsx"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React, { ComponentProps, useCallback, useState, useEffect } from "react"

import Toggle from "@theme/Toggle"

import Button from "@theme/Button"
import SearchBar from "@theme/SearchBar"
import useLockBodyScroll from "@theme/hooks/useLockBodyScroll"
import useWindowSize, { windowSizes } from "@theme/hooks/useWindowSize"

import styles from "./styles.module.css"
import NavbarItem from "@theme/NavbarItem"

import { useThemeConfig } from "@docusaurus/theme-common"
import useThemeContext from "@theme/hooks/useThemeContext"

const DefaultNavItemPosition = "right"

function useColorModeToggle() {
  const {
    colorMode: { disableSwitch },
  } = useThemeConfig()
  const { isDarkTheme, setLightTheme, setDarkTheme } = useThemeContext()
  const toggle = useCallback(
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    (e) => (e.target.checked ? setDarkTheme() : setLightTheme()),
    [setLightTheme, setDarkTheme],
  )
  return { isDarkTheme, toggle, disabled: disableSwitch }
}

function splitNavItemsByPosition(
  items: Array<ComponentProps<typeof NavbarItem>>,
): {
  leftItems: Array<ComponentProps<typeof NavbarItem>>
  rightItems: Array<ComponentProps<typeof NavbarItem>>
} {
  const leftItems = items.filter(
    (item) =>
      // @ts-expect-error: temporary, will be fixed in Docusaurus TODO remove soon
      (item.position ?? DefaultNavItemPosition) === "left",
  )
  const rightItems = items.filter(
    (item) =>
      // @ts-expect-error: temporary, will be fixed in Docusaurus TODO remove soon
      (item.position ?? DefaultNavItemPosition) === "right",
  )
  return {
    leftItems,
    rightItems,
  }
}

function Navbar(): JSX.Element {
  const {
    siteConfig: {
      themeConfig: {
        navbar: { items },
      },
    },
  } = useDocusaurusContext()
  const [sidebarShown, setSidebarShown] = useState(false)
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false)

  useLockBodyScroll(sidebarShown)

  const showSidebar = useCallback(() => {
    setSidebarShown(true)
  }, [])
  const hideSidebar = useCallback(() => {
    setSidebarShown(false)
  }, [])

  const windowSize = useWindowSize()

  const colorModeToggle = useColorModeToggle()

  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setSidebarShown(false)
    }
  }, [windowSize])

  const { leftItems, rightItems } = splitNavItemsByPosition(items)

  return (
    <header
      className={clsx("navbar", styles.navbar, "navbar--light", {
        "navbar-sidebar--show": sidebarShown,
      })}
    >
      <div className={clsx("navbar__inner", styles.inner)}>
        <div className="navbar__items">
          <a className={clsx("navbar__brand", styles.brand)} href="/">
            QuestDB
          </a>
          {leftItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
        </div>
        <div className="navbar__items navbar__items--right">
          {rightItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
          {!colorModeToggle.disabled && (
            <Toggle
              className={styles.themeToggleInHeading}
              checked={colorModeToggle.isDarkTheme}
              onChange={colorModeToggle.toggle}
            />
          )}
          <div className={styles.searchBar}>
            <SearchBar
              handleSearchBarToggle={setIsSearchBarExpanded}
              isSearchBarExpanded={isSearchBarExpanded}
            />
          </div>
          <Button
            className={clsx(styles.ctaButton, styles.getQuestdb)}
            size="xsmall"
            variant="secondary"
            to="/cloud/"
          >
            Get QuestDB
          </Button>

          <div
            aria-label="Navigation bar toggle"
            className="navbar__toggle"
            role="button"
            tabIndex={0}
            onClick={showSidebar}
            onKeyDown={showSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              role="img"
              focusable="false"
            >
              <title>An icon showing a hamburger menu</title>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M4 7h22M4 15h22M4 23h22"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        role="presentation"
        className="navbar-sidebar__backdrop"
        onClick={hideSidebar}
      />
      <div className="navbar-sidebar">
        <div className="navbar-sidebar__brand">
          <a
            className={clsx("navbar__brand", styles.brand)}
            href="/"
            onClick={hideSidebar}
          >
            QuestDB
          </a>

          {!colorModeToggle.disabled && (
            <Toggle
              className={styles.themeToggleInSidebar}
              checked={colorModeToggle.isDarkTheme}
              onChange={colorModeToggle.toggle}
            />
          )}
        </div>
        <div className="navbar-sidebar__items">
          <div className="menu">
            <ul className="menu__list">
              {items.map((item, i) => (
                <NavbarItem
                  mobile
                  {...item}
                  {...(item.type !== "search" && { onClick: hideSidebar })} // Search type def does not accept onClick
                  key={i}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
