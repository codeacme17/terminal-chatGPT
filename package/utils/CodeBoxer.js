const boxen = require("boxen")
const highlight = require("cli-highlight").highlight
const { COLORS } = require("../utils/configs")

class CodeBoxer {
  constructor() {
    this.codeRegex = /```(\w+)?\n([\s\S]*?)\n```/g
    this.theme = {
      keyword: COLORS.BLUE,
      built_in: ["cyan", "dim"],
      string: COLORS.GREEN,
      default: COLORS.GRAY,
    }
    this.boxenOptions = {
      padding: {
        top: 1,
        right: 16,
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
      float: "center",
    }
  }

  boxify(text) {
    return text.replaceAll(this.codeRegex, (match, language, code) => {
      const highlighted = this.highlighty(code, language)
      return boxen(highlighted, this.boxenOptions)
    })
  }

  highlighty(code, language) {
    return highlight(code, {
      language: language ? language : "javascript",
      ignoreIllegals: true,
      theme: () => this.theme,
    })
  }
}

module.exports = CodeBoxer
