import React from "react"
import Link from "@docusaurus/Link"
import { Chip } from "../Chip"
import styles from "./styles.module.css"
import { ensureTrailingSlash } from "../../../utils"

export type Props = {
  items: Array<{ name: string; permalink: string }>
  activeChip?: string
}

export const Chips = ({ items, activeChip }: Props) => (
  <div className={styles.root}>
    {items.map(({ name, permalink }) => (
      <Chip
        key={permalink}
        className={styles.chip}
        label={name}
        permalink={ensureTrailingSlash(permalink)}
        active={activeChip === permalink}
      />
    ))}

    <Link className={styles.linkToTags} to="/blog/tags/">
      See all topics
    </Link>
  </div>
)
