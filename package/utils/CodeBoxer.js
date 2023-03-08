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
          right: 10,
          bottom: 1,
          left: 5,
        },
        dimBorder: true,
        backgroundColor: "#333333",
        borderStyle: {
          topLeft: " ",
          topRight: " ",
          bottomLeft: " ",
          bottomRight: " ",
          top: " ",
          bottom: " ",
          left: " ",
          right: " ",
          vertical: " ",
          horizontal: " ",
        },
        fullscreen: (width) => [width - 2],
        float: "center",
      }

      return boxen(code, boxenOptions)
    })
  }
}

module.exports = CodeBoxer
