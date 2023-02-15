const consts = require("./consts")

module.exports = {
  artifactHubUrl: "https://artifacthub.io/packages/helm/questdb/questdb",
  copyright: `Copyright © ${new Date().getFullYear()} QuestDB`,
  crunchbaseUrl: "https://www.crunchbase.com/organization/quest-db",
  demoUrl: `https://demo.${consts.domain}`,
  description:
    "QuestDB is an open source database designed to make time-series lightning fast and easy. It exposes a high performance REST API and is Postgres compatible.",
  dockerUrl: "https://hub.docker.com/r/questdb/questdb",
  domain: consts.domain,
  githubOrgUrl: consts.githubOrgUrl,
  githubUrl: `${consts.githubOrgUrl}/questdb`,
  websiteGithubUrl: `${consts.githubOrgUrl}/questdb.io`,
  linkedInUrl: "https://www.linkedin.com/company/questdb/",
  oneLiner: "QuestDB: the database for time series",
  slackUrl: `https://slack.${consts.domain}`,
  stackoverflowUrl: "https://stackoverflow.com/questions/tagged/questdb",
  twitterUrl: "https://twitter.com/questdb",
  videosUrl: "https://www.youtube.com/c/QuestDB",
  redditUrl: "https://www.reddit.com/r/questdb",
  linenUrl: "https://community-chat.questdb.io",
}
