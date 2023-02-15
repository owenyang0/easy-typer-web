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
      label: "Get Started",
      type: "category",
      items: [
        "get-started/docker",
        "get-started/binaries",
        "get-started/homebrew",
        "get-started/first-database",
        "get-started/learn-more",
      ],
    },
    {
      label: "Develop",
      type: "category",
      items: [
        "develop/connect",
        "develop/insert-data",
        "develop/query-data",
        "develop/update-data",
        "develop/web-console",
      ],
    },
    {
      label: "Guides",
      type: "category",
      items: [
        "guides/importing-data",
        "guides/importing-data-rest",
        "guides/modifying-data",
        "guides/working-with-timestamps-timezones",
        "guides/out-of-order-commit-lag",
        {
          label: "More tutorials",
          type: "link",
          href: "/blog/tags/tutorial/",
        },
      ],
    },
    {
      label: "Deployment",
      type: "category",
      items: [
        "deployment/aws-official-ami",
        "deployment/kubernetes",
        "deployment/google-cloud-platform",
        "deployment/digitalocean",
      ],
    },
    {
      label: "Operations",
      type: "category",
      items: [
        "operations/design-for-performance",
        "operations/capacity-planning",
        "operations/data-retention",
        "operations/health-monitoring",
        "operations/backup",
        "operations/updating-data",
      ],
    },
    {
      label: "Third-party Tools",
      type: "category",
      items: [
        "third-party-tools/grafana",
        {
          label: "Kafka",
          type: "category",
          items: [
            "third-party-tools/kafka/overview",
            "third-party-tools/kafka/questdb-kafka",
            "third-party-tools/kafka/jdbc",
          ],
        },
        "third-party-tools/pandas",
        "third-party-tools/prometheus",
        "third-party-tools/telegraf",
      ],
    },
    {
      label: "Concepts",
      type: "category",
      items: [
        "concept/write-ahead-log",        
        "concept/storage-model",
        "concept/designated-timestamp",
        "concept/sql-extensions",
        "concept/jit-compiler",
        "concept/partitions",
        "concept/symbol",
        "concept/indexes",
        "concept/geohashes",
        "concept/root-directory-structure",
      ],
    },
    {
      label: "Reference",
      type: "category",
      items: [
        {
          type: "category",
          label: "API",
          items: [
            "reference/api/rest",
            "reference/api/postgres",
            {
              type: "category",
              label: "InfluxDB Line Protocol",
              items: [
                "reference/api/ilp/overview",
                "reference/api/ilp/columnset-types",
                "reference/api/ilp/tcp-receiver",
                "reference/api/ilp/udp-receiver",
                "reference/api/ilp/authenticate",
              ]
            },
            "reference/api/java-embedded",
          ],
        },
        "reference/command-line-options",
        "reference/configuration",
        {
          type: "category",
          label: "ILP client libraries",
          items: [
            "reference/clients/overview",
            "reference/clients/java_ilp",
          ]
        },
        "reference/sql/datatypes",
        {
          type: "category",
          label: "Functions",
          items: [
            "reference/function/aggregation",
            "reference/function/analytic",
            "reference/function/binary",
            "reference/function/boolean",
            "reference/function/conditional",
            "reference/function/date-time",
            "reference/function/meta",
            "reference/function/numeric",
            "reference/function/random-value-generator",
            "reference/function/row-generator",
            "reference/function/spatial",
            "reference/function/text",
            "reference/function/timestamp-generator",
            "reference/function/timestamp",
            "reference/function/trigonometric"
          ],
        },
        {
          type: "category",
          label: "Operators",
          items: [
            "reference/operators/bitwise",
            "reference/operators/pattern-matching",
            "reference/operators/spatial",
          ],
        },
        {
          type: "category",
          label: "SQL",
          items: [
            "concept/sql-execution-order",
            {
              type: "category",
              label: "ALTER TABLE",
              items: [
                "reference/sql/alter-table-add-column",
                "reference/sql/alter-table-rename-column",
                "reference/sql/alter-table-drop-column",
                "reference/sql/alter-table-attach-partition",
                "reference/sql/alter-table-detach-partition",
                "reference/sql/alter-table-drop-partition",
                "reference/sql/alter-table-set-param",
                "reference/sql/alter-table-set-type",
                "reference/sql/alter-table-resume-wal",
              ],
            },
            {
              type: "category",
              label: "ALTER COLUMN",
              items: [
                "reference/sql/alter-table-alter-column-add-index",
                "reference/sql/alter-table-alter-column-drop-index",
                "reference/sql/alter-table-alter-column-cache",
              ],
            },
            "reference/sql/backup",
            "reference/sql/case",
            "reference/sql/cast",
            "reference/sql/copy",
            "reference/sql/create-table",
            "reference/sql/distinct",
            "reference/sql/explain",
            "reference/sql/drop",
            "reference/sql/fill",
            "reference/sql/group-by",
            "reference/sql/insert",
            "reference/sql/join",
            "reference/sql/latest-on",
            "reference/sql/limit",
            "reference/sql/order-by",
            "reference/sql/reindex",
            "reference/sql/rename",
            "reference/sql/sample-by",
            "reference/sql/select",
            "reference/sql/show",
            "reference/sql/snapshot",
            "reference/sql/truncate",
            "reference/sql/union-except-intersect",
            "reference/sql/update",
            "reference/sql/vacuum-table",
            "reference/sql/where",
            "reference/sql/with",
          ],
        }
      ],
    },
    {
      label: "Troubleshooting",
      type: "category",
      items: [
        "troubleshooting/faq",
        "troubleshooting/os-error-codes"
      ],
    },
    {
      label: "Tutorials",
      type: 'link',
      href: '/blog/tags/tutorial',
    },
  ].filter(Boolean),
}
