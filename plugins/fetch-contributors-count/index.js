const nodeFetch = require("node-fetch")

module.exports = () => ({
  name: "fetch-contributors-count",
  async loadContent() {
    const response = await nodeFetch(
      `https://github-api.questdb.io/github/contributors`,
    )

    const data = await response.json()

    return data.count
  },
  async contentLoaded({ content, actions }) {
    const { setGlobalData } = actions
    setGlobalData({ contributorsCount: content })
  },
})
