import React from "react"
import { ThemeClassNames } from "@docusaurus/theme-common"
import BlogPostItem from "@theme/BlogPostItem"
import type { Props } from "@theme/BlogPostPage"
import BlogPostPaginator from "@theme/BlogPostPaginator"
import BlogSidebar from "@theme/BlogSidebar"
import Layout from "@theme/Layout"
import { ensureTrailingSlash } from "../../utils"

function BlogPostPage(props: Props): JSX.Element {
  const { content: BlogPostContents, sidebar } = props
  const { frontMatter, metadata } = BlogPostContents
  const { title, description, nextItem, prevItem } = metadata

  if (prevItem != null) {
    ;((prevItem.permalink as any) as string) = ensureTrailingSlash(
      prevItem.permalink,
    )
  }

  if (nextItem != null) {
    ;((nextItem.permalink as any) as string) = ensureTrailingSlash(
      nextItem.permalink,
    )
  }

  return (
    <Layout
      title={title}
      description={description}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogPostPage}
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <main className="col col--8 col--offset-1">
            <BlogPostItem
              frontMatter={frontMatter}
              metadata={metadata}
              isBlogPostPage
            >
              <BlogPostContents />
            </BlogPostItem>

            {(nextItem != null || prevItem != null) && (
              <div className="margin-vert--xl">
                <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
              </div>
            )}
          </main>

          <aside className="col col--3">
            <BlogSidebar
              sidebar={{
                ...sidebar,
                items: sidebar.items.map((item) => {
                  item.permalink = ensureTrailingSlash(item.permalink)
                  return item
                }),
              }}
            />
          </aside>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostPage
