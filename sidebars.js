let guidelines

if (process.env.NODE_ENV === "development") {
  guidelines = {
    label: "Guidelines (DEV ONLY)",
    type: "category",
    items: [
      {
        type: "category",
        label: "Templates",
        items: [
          "__guidelines/template/guide",
          "__guidelines/template/function",
          "__guidelines/template/sql",
        ],
      },
      "__guidelines/naming-convention",
      "__guidelines/content-hierarchy",
      "__guidelines/lexicon",
      "__guidelines/markdown",
      "__guidelines/sql-code-blocks",
      "__guidelines/influences",
    ],
  }
}

module.exports = {
  docs: [
    {
      id: "introduction",
      type: "doc",
    },
    {
      label: "使用指南",
      type: "category",
      items: [
        {
          label: "快速上手",
          id: "guides/quick-started",
          type: "doc",
        },
        {
          label: "易跟打macOS版下载",
          id: "guides/download",
          type: "doc",
        },
      ],
    },
    {
      id: "changelog",
      type: "doc",
    },
    // guidelines,
  ].filter(Boolean),
}
