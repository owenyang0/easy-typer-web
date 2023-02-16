import React from "react"
import type { Props as BlogPostItemProps } from "@theme/BlogPostItem"
import { Chip } from "../Chip"
import styles from "./styles.module.css"
import type { FrontMatter } from "../"
import Link from "@docusaurus/Link"
import { ensureTrailingSlash } from "../../../utils"

type Props = {
  content: Omit<BlogPostItemProps, "children">
  forcedTag?: { label: string; permalink: string }
  belowFold: boolean
}

const ExternalChip = ({ permalink }) => {
  const externalUrl = new URL(permalink)
  return (
    <Chip
      className={styles.externalPost}
      label={`Posted on ${externalUrl.hostname}`}
      permalink={`${externalUrl.protocol}//${externalUrl.hostname}`}
      size="small"
      skin="secondary"
    />
  )
}

export const ListItem = ({ forcedTag, content, belowFold }: Props) => {
  const tag = forcedTag ?? content.metadata.tags[0] ?? {}
  const frontMatter: FrontMatter = content.frontMatter
  const isExternal = Boolean(frontMatter.permalink)
  const postUrl = isExternal
    ? frontMatter.permalink
    : ensureTrailingSlash(content.metadata.permalink)
  const imageUrl = content.frontMatter.image ?? "/pimgs/tutorial/placeholder.png"
  const author =
    typeof content.frontMatter.author_url !== "undefined" ? (
      <a href={content.frontMatter.author_url}>{content.frontMatter.author}</a>
    ) : (
      content.frontMatter.author
    )

  return (
    <div className={styles.root}>
      <div className={styles.imageBox}>
        <Link to={postUrl} className={styles.image}>
          <img
            loading={belowFold ? "lazy" : "eager"}
            src={imageUrl}
            alt={`Banner for blog post with title "${content.metadata.title}"`}
          />
        </Link>
        {isExternal && <ExternalChip permalink={postUrl} />}
      </div>

      <div className={styles.content}>
        <div className={styles.tags}>
          <Chip
            label={tag.label}
            permalink={tag.permalink}
            skin="secondary"
            size="small"
          />
        </div>

        <h2 className={styles.title}>
          <Link to={postUrl}>{content.metadata.title}</Link>
        </h2>
        <div className={styles.author}>
          by {author} on {content.metadata.formattedDate}
        </div>
      </div>
    </div>
  )
}
