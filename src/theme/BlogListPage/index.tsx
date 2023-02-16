import React from "react"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import BlogPostItem from "@theme/BlogPostItem"
import BlogListPaginator from "@theme/BlogListPaginator"
import type { FrontMatter as OriginalFrontMatter } from "@theme/BlogPostPage"
import type { Props } from "@theme/BlogListPage"
import type { Tag } from "@theme/BlogTagsListPage"
import { ThemeClassNames } from "@docusaurus/theme-common"

import styles from "./styles.module.css"
import { ListItem } from "./ListItem"
// import { Categories } from "./Categories"
// import type { Props as CategoriesProps } from "./Categories"
// import { Chips } from "./Chips"
// import type { Props as ChipProps } from "./Chips"
import { ensureTrailingSlash } from "../../utils"

export type FrontMatter = OriginalFrontMatter & { permalink?: string }

// const categories: CategoriesProps["categories"] = [
//   {
//     title: "Benchmarks",
//     description:
//       "Reproducible benchmarks of QuestDB and other databases using open source benchmarking frameworks",
//     url: "/blog/tags/benchmark/",
//   },
//   {
//     title: "Demos",
//     description:
//       "Demos involving QuestDB and other popular open source tools for a wide range of use cases",
//     url: "/blog/tags/demo/",
//   },
//   {
//     title: "Tutorials",
//     description:
//       "Step-by-step tutorials and guides for developers to build applications with QuestDB",
//     url: "/blog/tags/tutorial/",
//   },
//   {
//     title: "User Stories",
//     description:
//       "How QuestDB powers the core infrastructure of our users for time series data and real-time analytics",
//     url: "/customers/",
//   },
// ]

// const prioritizedTags: ChipProps["items"] = [
//   "release",
//   "engineering",
//   "python",
//   "grafana",
//   "time-series",
//   "sql",
//   "kafka",
//   "prometheus",
//   "telegraf",
//   "company",
//   "community",
//   "newsletter",
//   "crypto",
// ].map((tag) => ({
//   name: tag,
//   permalink: `/blog/tags/${tag.replace(/ /g, "-")}`,
// }))

function BlogListPage(props: Props): JSX.Element {
  const { metadata, items } = props
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext()
  const { blogDescription, blogTitle, permalink } = metadata
  const isBlogOnlyMode = permalink === "/blog"
  const isTagsPage =
    typeof ((metadata as unknown) as Tag).allTagsPath !== "undefined"

  const tagsPageDescription = `Articles tagged with ${
    ((metadata as unknown) as Tag).name
  }`

  const titles: Array<[boolean, string]> = [
    [isBlogOnlyMode, siteTitle],
    [isTagsPage, tagsPageDescription],
    [true, blogTitle],
  ]

  const descriptions: Array<[boolean, string]> = [
    [isBlogOnlyMode, blogDescription],
    [isTagsPage, tagsPageDescription],
    [true, "QuestDB Blog tags"],
  ]

  const posts = [...items]
  const latestPost = metadata.page === 1 ? posts.shift() : undefined

  return (
    <Layout
      title={titles.find(([when]) => Boolean(when))?.[1] ?? ""}
      description={descriptions.find(([when]) => Boolean(when))?.[1] ?? ""}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogListPage}
      searchMetadatas={{
        // assign unique search tag to exclude this page from search results!
        tag: "blog_posts_list",
      }}
    >
      <main className={styles.root}>
        {latestPost !== undefined && (
          <div className={styles.latestPost}>
            <BlogPostItem
              key={latestPost.content.metadata.permalink}
              frontMatter={latestPost.content.frontMatter}
              metadata={{
                ...latestPost.content.metadata,
                permalink: ensureTrailingSlash(
                  (latestPost.content.frontMatter as FrontMatter).permalink ??
                    latestPost.content.metadata.permalink,
                ),
                tags: [],
              }}
              truncated={latestPost.content.metadata.truncated}
            >
              {React.createElement(latestPost.content)}
            </BlogPostItem>
          </div>
        )}

        {isTagsPage ? (
          <h1 className={styles.tagsTitle}>
            Articles tagged with &quot;{((metadata as unknown) as Tag).name}
            &quot;
          </h1>
        ) : (
          <h2>Blog Posts</h2>
        )}

        <div className={styles.posts}>
          {posts.map(({ content }, i) => (
            <ListItem
              key={content.metadata.permalink}
              content={content}
              belowFold={i > 5}
              forcedTag={
                isTagsPage
                  ? {
                      label: ((metadata as unknown) as Tag).name,
                      permalink: ensureTrailingSlash(metadata.permalink),
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <BlogListPaginator metadata={metadata} />
      </main>
    </Layout>
  )
}

export default BlogListPage
