import React from "react"
import useThemeContext from "@theme/hooks/useThemeContext"

import style from "./style.module.css"

type Client = {
  label: string
  logoSrc: string
  lightThemeLogoSrc?: string
  docsUrl?: string
  sourceUrl?: string
}

const clients: Client[] = [
  {
    label: "Python",
    logoSrc: "/img/logos/python.svg",
    docsUrl: "https://py-questdb-client.readthedocs.io/en/latest/",
    sourceUrl: "https://github.com/questdb/py-questdb-client",
  },
  {
    label: "NodeJS",
    logoSrc: "/img/logos/nodejs-light.svg",
    lightThemeLogoSrc: "/img/logos/nodejs-dark.svg",
    docsUrl: "https://questdb.github.io/nodejs-questdb-client",
    sourceUrl: "https://github.com/questdb/nodejs-questdb-client",
  },
  {
    label: ".NET",
    logoSrc: "/img/logos/dotnet.svg",
    sourceUrl: "https://github.com/questdb/net-questdb-client",
  },
  {
    label: "Java",
    docsUrl: "/docs/reference/clients/java_ilp/",
    logoSrc: "/img/logos/java.svg",
  },
  {
    label: "C and C++",
    logoSrc: "/img/logos/cplusplus.svg",
    sourceUrl: "https://github.com/questdb/c-questdb-client",
  },
  {
    label: "Golang",
    logoSrc: "/img/logos/go.svg",
    docsUrl: "https://pkg.go.dev/github.com/questdb/go-questdb-client",
    sourceUrl: "https://github.com/questdb/go-questdb-client",
  },
  {
    label: "Rust",
    logoSrc: "/img/logos/rust.svg",
    docsUrl: "https://docs.rs/crate/questdb-rs/latest",
    sourceUrl: "https://github.com/questdb/c-questdb-client",
  },
]

const openInNewTab = (url: string) =>
  /^https?:\/\//.test(url)
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {}

export const ILPClientsTable = () => {
  const { isDarkTheme } = useThemeContext()

  return (
    <div className={style.root}>
      {clients
        .sort(({ label: labelA }, { label: labelB }) =>
          labelA.localeCompare(labelB),
        )
        .map(({ label, logoSrc, lightThemeLogoSrc, docsUrl, sourceUrl }) => (
          <div className={style.client} key={label}>
            <div className={style.logo}>
              <img
                src={isDarkTheme ? logoSrc : lightThemeLogoSrc ?? logoSrc}
                alt={label}
              />
              {label}
            </div>

            <div className={style.buttons}>
              {typeof docsUrl === "string" && (
                <a
                  className={style.button}
                  href={docsUrl}
                  {...openInNewTab(docsUrl)}
                >
                  <img
                    alt="Documentation icon"
                    height={22}
                    src="/img/icons/open-book.svg"
                    style={{ filter: "invert(1)" }}
                    title="Documentation"
                    width={22}
                  />
                  Docs
                </a>
              )}
              {typeof sourceUrl === "string" && (
                <a
                  className={style.button}
                  href={sourceUrl}
                  {...openInNewTab(sourceUrl)}
                >
                  <img
                    alt="Github icon"
                    height={22}
                    src="/img/github.svg"
                    title="Source"
                    width={22}
                  />
                  Source
                </a>
              )}
            </div>
          </div>
        ))}
    </div>
  )
}
