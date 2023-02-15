import Link from "@docusaurus/Link"
import { usePluralForm } from "@docusaurus/theme-common"
import { translate } from "@docusaurus/Translate"
import { MDXProvider } from "@mdx-js/react"
import type { Props } from "@theme/BlogPostItem"
import type { Metadata } from "@theme/BlogPostPage"
import MDXComponents from "@theme/MDXComponents"
import Seo from "@theme/Seo"
import React from "react"
import EditThisPage from "@theme/EditThisPage"
import styles from "./styles.module.css"
import customFields from "../../config/customFields"
import { ensureTrailingSlash } from "../../utils"

function useReadingTimePlural() {
  const { selectMessage } = usePluralForm()
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat)
    return selectMessage(
      readingTime,
      translate(
        {
          id: "theme.blog.post.readingTime.plurals",
          message: "One min read|{readingTime} min read",
        },
        { readingTime },
      ),
    )
  }
}

type MetadataWithSource = Metadata & { source: string }

function BlogPostItem(props: Props): JSX.Element {
  const readingTimePlural = useReadingTimePlural()
  const {
    children,
    frontMatter,
    metadata,
    truncated,
    isBlogPostPage = false,
  } = props
  const {
    date,
    formattedDate,
    permalink,
    tags,
    readingTime,
    source,
    editUrl,
  } = metadata as MetadataWithSource
  const { author, title, image, keywords } = frontMatter

  const authorURL = frontMatter.author_url ?? frontMatter.authorURL
  const authorTitle = frontMatter.author_title ?? frontMatter.authorTitle
  const authorImageURL =
    frontMatter.author_image_url ?? frontMatter.authorImageURL

  const contributeUrl =
    editUrl ??
    `${customFields.websiteGithubUrl}/edit/master/${source.replace(
      "@site",
      "",
    )}`

  const isTruncated = typeof truncated === "boolean" ? truncated : false
  const TitleHeading = isBlogPostPage || isTruncated ? "h1" : "h2"

  return (
    <>
      <Seo {...{ keywords, image }} />

      <header>
        <TitleHeading className={styles.title}>
          {isBlogPostPage ? title : <Link to={permalink}>{title}</Link>}
        </TitleHeading>

        <time dateTime={date} className={styles.date}>
          {formattedDate}
          {typeof readingTime === "number" && (
            <>
              {" · "}
              {readingTimePlural(readingTime)}
            </>
          )}
        </time>

        <div className={styles.avatar}>
          {typeof authorImageURL === "string" && (
            <Link className={styles.avatarPhoto} href={authorURL}>
              <img src={authorImageURL} alt={author} width="45" height="45" />
            </Link>
          )}

          {typeof author === "string" && (
            <>
              <h3 className={styles.avatarName}>
                <Link href={authorURL}>{author}</Link>
              </h3>
              <small>{authorTitle}</small>
            </>
          )}
        </div>
      </header>

      <article className="markdown">
        <MDXProvider components={MDXComponents}>{children}</MDXProvider>
      </article>

      <footer className={styles.footer}>
        {isTruncated ? (
          <Link
            to={metadata.permalink}
            aria-label={`Read more about ${title}`}
            className={styles.readMore}
          >
            Read More
          </Link>
        ) : (
          <>
            {tags.length > 0 && (
              <div className={styles.tags}>
                Tags:
                <ul className={styles.tagsList}>
                  {tags.map(({ label, permalink: tagPermalink }) => (
                    <li key={tagPermalink}>
                      <Link
                        key={tagPermalink}
                        to={ensureTrailingSlash(tagPermalink)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <EditThisPage editUrl={contributeUrl} />
          </>
        )}
      </footer>
    </>
  )
}

export default BlogPostItem
