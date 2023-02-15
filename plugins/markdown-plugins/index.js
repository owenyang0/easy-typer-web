const path = require("path")
const visit = require("unist-util-visit")
const customFields = require("../../src/config/customFields")

const cwd = process.cwd()

function variable() {
  const RE_VAR = /{@([\w-_]+)@}/g
  const getVariable = (full, partial) =>
    partial ? customFields[partial] : full

  function textVisitor(node) {
    node.value = node.value.replace(RE_VAR, getVariable)
  }

  function linkVisitor(node, vFile) {
    if (/^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?/.test(node.url)) {
      const relativePath = path.relative(cwd, vFile.path)
      const { url, position: pos } = node
      console.log(
        `Warning: Links to ${url} are forbidden in markdown! Changing link to text at ${relativePath}:${pos.start.line}:${pos.start.column}`,
      )
      const { value, position } = node.children[0]
      delete node.title
      delete node.url
      delete node.children
      node.type = "inlineCode"
      node.value = value
      node.position = position
      return
    }

    node.url = node.url.replace(RE_VAR, getVariable)

    if (node.title) {
      node.title = node.title.replace(RE_VAR, getVariable)
    }
  }

  function transformer(ast, vFile) {
    visit(ast, "text", textVisitor)
    visit(ast, "code", textVisitor)
    visit(ast, "link", (node) => linkVisitor(node, vFile))
  }

  return transformer
}

module.exports = {
  remarkPlugins: [variable],
}
