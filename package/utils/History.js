const fs = require("fs")
const shell = require("shelljs")

const { log, success, warn } = require("../utils/log")
const { HISTORY_FILE } = require("../utils/path")

class History {
  constructor() {
    this.HISTORY_FILE = ""
    this.content = ""
  }

  init() {
    if (!fs.existsSync(HISTORY_FILE)) shell.touch(HISTORY_FILE)
    this.HISTORY_FILE = HISTORY_FILE
    this.content = fs.readFileSync(this.HISTORY_FILE, { encoding: "utf-8" })
  }

  read() {
    if (!this.checkHasContent()) return ""
    return this.content
  }

  write(content, type) {
    const currentDate = new Date().toLocaleDateString()
    const currentTime = new Date().toLocaleTimeString()

    content = `${
      type === "QUESTION" ? `\n${currentDate}  ${currentTime}\n` : ""
    } \n  ${type}: ${content}`

    fs.appendFile(this.HISTORY_FILE, content, () => {})
  }

  clear() {
    if (!this.checkHasContent()) return ""
    fs.writeFile(this.HISTORY_FILE, "", () => {})

    log()
    success("Successfully cleared history file content")
  }

  checkHasContent() {
    if (this.content) return true
    warn("There is no content in the history file")
    return false
  }
}

module.exports = History
