[![Netlify Status](https://api.netlify.com/api/v1/badges/8bf4638d-8f79-4cc4-9970-b47359eb1a35/deploy-status)](https://app.netlify.com/sites/unruffled-blackwell-31bfb2/deploys)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-green.svg)](https://conventionalcommits.org)

# questdb.io

[This website](https://questdb.io) is built using
[Docusaurus 2](https://v2.docusaurus.io/). Pages & components are written in
TypeScript, the styles in vanilla CSS with variables using
[CSS Modules](https://github.com/css-modules/css-modules).

<!-- prettier-ignore-start -->
<div align="center">
  <a href="http://questdb.io">
    <img src=".github/console.png" width="400" />
  </a>
</div>
<div align="center">
  <a href="http://questdb.io">
    questdb.io
  </a>
</div>
<!-- prettier-ignore-end -->

## Installation

```script
yarn
```

Note. On Linux you may have to install `autoconf` package to have a successful
installation. On Ubuntu it should be enough to run
`sudo apt-get install autoconf` command to install the package.

## Local development

```script
yarn start
```

This command starts a local development server and open up a browser window.
Most changes are reflected live without having to restart the server.

## Build for production

```script
yarn build
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service. For that purpose, you can also
use:

```script
yarn serve
```

# Contributing

We are always happy to have contributions to the project whether it is
documentation, bug reports, blog posts, or feedback. To get started with
contributing:

- Have a look through
  [GitHub issues](https://github.com/questdb/questdb.io/issues).
- Read this section for guidelines.
- For blog posts, follow
  [blog guidelines](blog/__guidelines/blog_contribution.md)
- Create a [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
  of questdb.io and submit a pull request with your proposed changes.

## Bugs and features

Raise a [GH issue](https://github.com/questdb/questdb.io/issues/new/choose) for
bug report, update request, or tutorial proposal using the respective template.

## Guidelines

Check the following guides to ensure that your submission is consistent to our
style:

- [Markdown guidelines](https://github.com/questdb/questdb.io/blob/master/docs/__guidelines/markdown.md)
- [Lexicon](https://github.com/questdb/questdb.io/blob/master/docs/__guidelines/lexicon.md)
- [Naming convention](https://github.com/questdb/questdb.io/blob/master/docs/__guidelines/naming-convention.md)
- [Code blocks](https://github.com/questdb/questdb.io/blob/master/docs/__guidelines/sql-code-blocks.md)

## Commits

The commit messages must follow the
[Conventional Commits](https://conventionalcommits.org/) spec.

## Templates

To ensure consistency across the document, please follow the templates for:

- [Function](https://github.com/questdb/questdb.io/blob/master/docs/__guidelines/template/function.md)
- [SQL keyword](https://github.com/questdb/questdb.io/blob/master/docs/__guidelines/template/sql.md)
- [Blog](blog/__guidelines/template/blog.md)

# Code Quality

## 1. Linting

The coding style rules are defined by [Prettier](https://prettier.io/) and
enforced by [Eslint](https://eslint.org)

On top of this, we follow the rules set by the
[JavaScript Standard Style](https://standardjs.com/rules.html).

You do not need to run the linting task manually, Webpack will take care of that
for you.

## 2. Git Hooks

We use [Husky](https://github.com/typicode/husky) to automatically deploy git
hooks.

On every `git commit` we check that images added to `static/img/*` do not exceed
10MB.

## Legal Notice

When contributing to this project, you must agree that you have authored 100% of
the content, that you have the necessary rights to the content and that the
content you contribute may be provided under the project license.
