const boxen = require("boxen")

class CodeBoxer {
  constructor() {
    this.codeRegex = /```(\w+)?\n([\s\S]*?)\n```/g
  }

  boxify(text) {
    return text.replace(this.codeRegex, (match, language, code) => {
      const boxenOptions = {
        padding: {
          top: 1,
          right: 5,
          bottom: 1,
          left: 5,
        },
        title: language ? language : "",
        backgroundColor: "#333333",
        dimBorder: true,
        borderStyle: {
          topLeft: "━",
          topRight: " ",
          bottomLeft: " ",
          bottomRight: " ",
          top: language ? "━" : " ",
          bottom: " ",
          left: " ",
          right: " ",
        },
        fullscreen: (width) => [width],
      }

      return boxen(code, boxenOptions)
    })
  }
}

module.exports = CodeBoxer
