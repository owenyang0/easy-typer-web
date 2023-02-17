const ssrTemplate = require("./src/internals/ssr.template")
const consts = require("./src/config/consts")
const customFields = require("./src/config/customFields")
const markdownPlugins = require("./plugins/markdown-plugins")

const config = {
  title: '木易跟打器',
  tagline: '易跟打是一款支持macOS、Web使用的跨平台打字练习程序，是macOS平台唯一的、可直接通过QQ群载文的跟打器',
  url: `https://${consts.domain}`,
  baseUrl: "/portal/",
  baseUrlIssueBanner: false,
  favicon: "/pimgs/favicon.png",
  organizationName: "木易某某",
  projectName: "木易跟打器",
  customFields: customFields,
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "throw",

  // i18n: {
  //   defaultLocale: 'zh-CN',
  //   locales: ['zh-CN'],
  // },

  plugins: [
    // require.resolve("./plugins/fetch-latest-release/index"),
    // require.resolve("./plugins/fetch-repo/index"),
    // require.resolve("./plugins/remote-repo-example/index"),
    // require.resolve("./plugins/fetch-contributors-count/index"),
    require.resolve("./plugins/webpack-ts/index"),
    // require.resolve("./plugins/optimize/index"),
    // require.resolve("./plugins/manifest/index"),
    // require.resolve("./plugins/delay-code-block-appearance"),
    // [
    //   "@docusaurus/plugin-pwa",
    //   {
    //     pwaHead: [
    //       {
    //         tagName: "link",
    //         rel: "manifest",
    //         href: "/manifest.webmanifest",
    //       },
    //       {
    //         tagName: "meta",
    //         name: "theme-color",
    //         content: "#21222c",
    //       },
    //       {
    //         tagName: "meta",
    //         name: "apple-mobile-web-app-capable",
    //         content: "yes",
    //       },
    //       {
    //         tagName: "meta",
    //         name: "apple-mobile-web-app-status-bar-style",
    //         content: "#21222c",
    //       },
    //     ],
    //   },
    // ],
    [
      require.resolve("./plugins/blog"),
      {
        ...markdownPlugins,
        blogSidebarCount: 10,
        feedOptions: {
          type: "all",
          copyright: customFields.copyright,
        },
        showReadingTime: true,
        postsPerPage: 1000,
        blogPostComponent: require.resolve(
          "./src/theme/BlogPostPage/index.tsx",
        ),
        blogTagsPostsComponent: require.resolve(
          "./src/theme/BlogListPage/index.tsx",
        ),
      },
    ],
    ...[
      process.env.POSTHOG_API_KEY
        ? require.resolve("posthog-docusaurus/src/index.js")
        : null,
    ],

    ...[
      process.env.NODE_ENV === "development"
        ? require.resolve("./plugins/click-through-debug-iframe")
        : null,
    ],
  ].filter(Boolean),

  themeConfig: {
    // posthog: {
    //   apiKey: process.env.POSTHOG_API_KEY,
    // },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    // image: "/pimgs/og.gif",
    // gtag: {
    //   trackingID: "GTM-PVR7M2G",
    //   anonymizeIP: true,
    // },
    prism: {
      // defaultLanguage: "questdb-sql",
      additionalLanguages: [
        "rust",
        "csharp",
        "julia",
        "cpp",
        "java",
        "ebnf",
        "ini",
        "toml",
        "ruby",
        "php",
      ],
      theme: require("./src/internals/prism-github"),
      darkTheme: require("./src/internals/prism-dracula"),
    },
    // algolia: {
    //   appId: "QL9L2YL7AQ",
    //   apiKey: "2f67aeacbe73ad08a49efb9214ea27f3",
    //   indexName: "questdb",
    // },
    navbar: {
      title: "木易跟打器",
      logo: {
        alt: "木易跟打器",
        src: "/pimgs/navbar/easy-typer.png",
      },
      items: [
        {
          label: "使用文档",
          position: "left",
          href: "#",
          items: [
            // {
            //   label: "博客",
            //   to: "/blog/",
            //   activeBaseRegex: "/blog/?$",
            // },
            {
              label: "快速开始",
              to: "/docs/intro",
              // activeBaseRegex: "/docs/?$",
            },
            {
              label: "发布记录",
              to: "/docs/changelog",
            },
          ],
        },
        {
          label: "博客",
          to: "/blog/",
          position: "left",
        },
        {
          href: '/dojo',
          label: '跟打器',
          position: "left",
        },
        {
          label: "点个赞",
          href: "https://github.com/owenyang0/easy-typer",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
        {
          href: 'https://tiger-code.com',
          label: '虎码官网',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: "产品",
          items: [
            {
              label: "跟打器",
              href: "https://typer.owenyang.top",
            },
          ],
        },
        // {
        //   title: "文档",
        //   items: [
        //     {
        //       label: "快速开始",
        //       to: "/docs",
        //     },
        //     {
        //       label: "博客",
        //       to: "/blog/",
        //     }
        //   ],
        // },
        {
          title: "友链",
          items: [
            // {
            //   label: "关于作者",
            //   to: "/about-us/",
            // },
            {
              label: "虎码官网",
              href: "https://tiger-code.com",
            },
            {
              label: "秃秃的小屋",
              href: "https://tiger-code.com/guide/1+-+Archives/Input+Method/00+-+MOC/MOC+%E8%99%8E%E7%A0%81%E8%BE%93%E5%85%A5%E6%B3%95",
            },
          ],
        },
        {
          title: "社交",
          items: [
            // {
            //   label: "Twitter",
            //   href: customFields.twitterUrl,
            // },
            {
              label: "GitHub",
              href: customFields.githubUrl,
            },
            // {
            //   label: "StackOverflow",
            //   to: customFields.stackoverflowUrl,
            // },
            // {
            //   label: "Linkedin",
            //   href: customFields.linkedInUrl,
            // },
            // {
            //   label: "YouTube",
            //   to: customFields.videosUrl,
            // },
            // {
            //   label: "Reddit",
            //   href: customFields.redditUrl,
            // },
          ],
        },
      ],
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        // blog is enabled through a custom plugin, so we disable it from preset
        // ./plugins/blog/index.js
        blog: false,
        docs: {
          ...markdownPlugins,
          sidebarPath: require.resolve("./sidebars.js"),
          // editUrl: ({ docPath }) =>
          //   `${customFields.websiteGithubUrl}/edit/master/docs/${docPath}`,
        },

        sitemap: {
          changefreq: "daily",
          priority: 0.7,
          trailingSlash: true,
        },
        theme: {
          customCss: [require.resolve("./src/css/_global.css")],
        },
      },
    ],
  ],
}

module.exports = {
  ...config,
  ssrTemplate: ssrTemplate(config),
}
