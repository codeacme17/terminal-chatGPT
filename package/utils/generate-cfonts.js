const cfonts = require("cfonts")

function generate() {
  const content = `|1llest Group|TERMINAL-GPT|`
  return cfonts.render(content, {
    font: "console",
    align: "left",
    colors: ["system"],
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: false,
    maxLength: "20",
    gradient: ["white", "#1e1e1e"],
    independentGradient: false,
    transitionGradient: false,
    env: "node",
  })
}

module.exports = generate
