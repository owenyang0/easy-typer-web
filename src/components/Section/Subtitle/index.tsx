import React from "react"
import style from "./styles.module.css"
import clsx from "clsx"

type Props = {
  children: React.ReactNode
  center?: boolean
  size?: "small" | "medium"
  className?: string
}

export const Subtitle = ({
  children,
  center,
  size = "medium",
  className = "",
}: Props) => (
  <p
    className={clsx(
      style.root,
      { [style.center]: center },
      style[`size-${size}`],
      className,
    )}
  >
    {children}
  </p>
)
