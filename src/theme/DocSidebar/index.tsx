import React, { useState, useCallback, useEffect, useRef, memo } from "react"
import clsx from "clsx"
import { useThemeConfig, isSamePath } from "@docusaurus/theme-common"
import useUserPreferencesContext from "@theme/hooks/useUserPreferencesContext"
import useLockBodyScroll from "@theme/hooks/useLockBodyScroll"
import useWindowSize, { windowSizes } from "@theme/hooks/useWindowSize"
import useScrollPosition from "@theme/hooks/useScrollPosition"
import Link from "@docusaurus/Link"
import isInternalUrl from "@docusaurus/isInternalUrl"
import type { Props } from "@theme/DocSidebar"
import type { PropSidebarItem } from "@docusaurus/plugin-content-docs-types"
import Logo from "@theme/Logo"
import IconArrow from "@theme/IconArrow"
import IconMenu from "@theme/IconMenu"
import { translate } from "@docusaurus/Translate"

import styles from "./styles.module.css"
import { ensureTrailingSlash } from "../../utils/ensureTrailingSlash"

const MOBILE_TOGGLE_SIZE = 24

function usePrevious(value: unknown) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

const isActiveSidebarItem = (
  item: PropSidebarItem,
  activePath: string,
): boolean => {
  if (item.type === "link") {
    return isSamePath(item.href, activePath)
  }
  if (item.type === "category") {
    return (
      item.items?.some((subItem) => isActiveSidebarItem(subItem, activePath)) ??
      false
    )
  }
  return false
}

const DocSidebarItems = memo(function DocSidebarItems({
  items,
  ...props
}: {
  items: readonly PropSidebarItem[]
  tabIndex?: string | number
  onItemClick: (e: any) => void
  collapsible: boolean
  activePath: string
}) {
  return (
    <>
      {items.map((item, index) => {
        switch (item.type) {
          case "category":
            return <DocSidebarItemCategory key={index} item={item} {...props} />
          case "link":
          default:
            return <DocSidebarItemLink key={index} item={item} {...props} />
        }
      })}
    </>
  )
})

function DocSidebarItemCategory({
  item,
  onItemClick,
  collapsible = true,
  activePath,
  ...props
}) {
  const { items, label } = item

  const isActive = isActiveSidebarItem(item, activePath)
  const wasActive = usePrevious(isActive)

  // active categories are always initialized as expanded
  // the default (item.collapsed) is only used for non-active categories
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (!collapsible) {
      return false
    }
    return isActive ? false : item.collapsed
  })

  const menuListRef = useRef<HTMLUListElement>(null)
  const [menuListHeight, setMenuListHeight] = useState<string | undefined>(
    undefined,
  )
  const handleMenuListHeight = (calc = true) => {
    setMenuListHeight(
      calc ? `${menuListRef.current?.scrollHeight ?? 0}px` : undefined,
    )
  }

  // If we navigate to a category, it should automatically expand itself
  useEffect(() => {
    const justBecameActive = isActive && wasActive === false
    if (justBecameActive && collapsed) {
      setCollapsed(false)
    }
  }, [isActive, wasActive, collapsed])

  const handleItemClick = useCallback(
    (e) => {
      e.preventDefault()

      if (typeof menuListHeight === "undefined") {
        handleMenuListHeight()
      }

      setTimeout(() => setCollapsed((state) => !state), 100)
    },
    [menuListHeight],
  )

  if (items.length === 0) {
    return null
  }

  return (
    <li
      className={clsx("menu__list-item", {
        "menu__list-item--collapsed": collapsed,
      })}
    >
      <a
        className={clsx("menu__link", styles.menuLink, {
          "menu__link--sublist": collapsible,
          "menu__link--active": collapsible && isActive,
          [styles.menuLinkText]: !collapsible,
        })}
        onClick={collapsible ? handleItemClick : undefined}
        href={collapsible ? "#!" : undefined}
        {...props}
      >
        {label}
      </a>
      <ul
        className="menu__list"
        ref={menuListRef}
        style={{
          height: menuListHeight,
        }}
        onTransitionEnd={() => {
          if (!collapsed) {
            handleMenuListHeight(false)
          }
        }}
      >
        <DocSidebarItems
          items={items}
          tabIndex={collapsed ? "-1" : "0"}
          onItemClick={onItemClick}
          collapsible={collapsible}
          activePath={activePath}
        />
      </ul>
    </li>
  )
}

function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  collapsible: _collapsible,
  ...props
}) {
  const { href, label } = item
  const isActive = isActiveSidebarItem(item, activePath)
  return (
    <li className="menu__list-item" key={label}>
      <Link
        className={clsx("menu__link", styles.menuLink, {
          "menu__link--active": isActive,
          [styles.menuLinkExternal]: !isInternalUrl(href),
        })}
        to={ensureTrailingSlash(href)}
        {...(isInternalUrl(href) && {
          isNavLink: true,
          exact: true,
          onClick: onItemClick,
        })}
        {...props}
      >
        {label}
      </Link>
    </li>
  )
}

function useShowAnnouncementBar() {
  const { isAnnouncementBarClosed } = useUserPreferencesContext()
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(
    !isAnnouncementBarClosed,
  )
  useScrollPosition(({ scrollY }) => {
    if (!isAnnouncementBarClosed) {
      setShowAnnouncementBar(scrollY === 0)
    }
  })
  return showAnnouncementBar
}

function useResponsiveSidebar() {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = useState(false)
  useLockBodyScroll(showResponsiveSidebar)

  const windowSize = useWindowSize()
  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setShowResponsiveSidebar(false)
    }
  }, [windowSize])

  const closeResponsiveSidebar = useCallback(
    (e) => {
      e.target.blur()
      setShowResponsiveSidebar(false)
    },
    [setShowResponsiveSidebar],
  )

  const toggleResponsiveSidebar = useCallback(() => {
    setShowResponsiveSidebar((value) => !value)
  }, [setShowResponsiveSidebar])

  return {
    showResponsiveSidebar,
    closeResponsiveSidebar,
    toggleResponsiveSidebar,
  }
}

function HideableSidebarButton({ onClick }) {
  return (
    <button
      type="button"
      title={translate({
        id: "theme.docs.sidebar.collapseButtonTitle",
        message: "Collapse sidebar",
        description: "The title attribute for collapse button of doc sidebar",
      })}
      aria-label={translate({
        id: "theme.docs.sidebar.collapseButtonAriaLabel",
        message: "Collapse sidebar",
        description: "The title attribute for collapse button of doc sidebar",
      })}
      className={clsx(
        "button button--secondary button--outline",
        styles.collapseSidebarButton,
      )}
      onClick={onClick}
    >
      <IconArrow className={styles.collapseSidebarButtonIcon} />
    </button>
  )
}

function ResponsiveSidebarButton({ responsiveSidebarOpened = false, onClick }) {
  return (
    <button
      aria-label={
        responsiveSidebarOpened
          ? translate({
              id: "theme.docs.sidebar.responsiveCloseButtonLabel",
              message: "Close menu",
              description:
                "The ARIA label for close button of mobile doc sidebar",
            })
          : translate({
              id: "theme.docs.sidebar.responsiveOpenButtonLabel",
              message: "Open menu",
              description:
                "The ARIA label for open button of mobile doc sidebar",
            })
      }
      aria-haspopup="true"
      className="button button--secondary button--sm menu__button"
      type="button"
      onClick={onClick}
    >
      {responsiveSidebarOpened ? (
        <span
          className={clsx(styles.sidebarMenuIcon, styles.sidebarMenuCloseIcon)}
        >
          &times;
        </span>
      ) : (
        <IconMenu
          className={styles.sidebarMenuIcon}
          height={MOBILE_TOGGLE_SIZE}
          width={MOBILE_TOGGLE_SIZE}
        />
      )}
    </button>
  )
}

function DocSidebar({
  path,
  sidebar,
  sidebarCollapsible = true,
  onCollapse,
  isHidden,
}: Props): JSX.Element | null {
  const showAnnouncementBar = useShowAnnouncementBar()
  const {
    navbar: { hideOnScroll },
    hideableSidebar,
  } = useThemeConfig()
  const { isAnnouncementBarClosed } = useUserPreferencesContext()

  const {
    showResponsiveSidebar,
    closeResponsiveSidebar,
    toggleResponsiveSidebar,
  } = useResponsiveSidebar()

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.sidebarWithHideableNavbar]: hideOnScroll,
        [styles.sidebarHidden]: isHidden,
      })}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <div
        className={clsx(
          "menu",
          "menu--responsive",
          "thin-scrollbar",
          styles.menu,
          {
            "menu--show": showResponsiveSidebar,
            [styles.menuWithAnnouncementBar]:
              !isAnnouncementBarClosed && showAnnouncementBar,
          },
        )}
      >
        <ResponsiveSidebarButton
          responsiveSidebarOpened={showResponsiveSidebar}
          onClick={toggleResponsiveSidebar}
        />
        <ul className="menu__list">
          <DocSidebarItems
            items={sidebar}
            onItemClick={closeResponsiveSidebar}
            collapsible={sidebarCollapsible}
            activePath={path}
          />
        </ul>
      </div>
      {hideableSidebar && <HideableSidebarButton onClick={onCollapse} />}
    </div>
  )
}

export default DocSidebar
