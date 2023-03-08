const boxen = require("boxen")

class CodeBoxer {
  constructor() {
    this.codeRegex = /```(\w+)?\n([\s\S]*?)\n```/g
  }

  boxify(text) {
    return text.replaceAll(this.codeRegex, (match, language, code) => {
      const boxenOptions = {
        padding: {
          top: 1,
          right: 5,
          bottom: 1,
          left: 5,
        },
        borderStyle: "round",
        dimBorder: true,
        fullscreen: (width) => [width - 5],
        float: "center",
      }

      return boxen(code, boxenOptions)
    })
  }
}

module.exports = CodeBoxer
