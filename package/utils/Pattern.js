const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const { warn, log, error, success } = require("../utils/log")
const { PATTERN_DIR } = require("../utils/path")
const { COLORS } = require("./configs")

class Pattern {
  constructor() {
    if (!fs.existsSync(PATTERN_DIR)) fs.mkdirSync(PATTERN_DIR)

    this.patterns = fs
      .readdirSync(PATTERN_DIR)
      .map((pattern) => pattern.replace(".json", ""))

    this.createFlag = false
    this.currentId = 0 // `id` is used to sort conversation records
  }

  create(patternName) {
    const PATTERN_FILE = path.resolve(PATTERN_DIR, `${patternName}.json`)

    if (!this.checkHasPatternFile(patternName)) {
      fs.appendFile(PATTERN_FILE, "", (err) => err && error(err))
      this.createFlag = true
      log()
      success(
        `Successed create pattern ${chalk.hex(COLORS.GREEN)(patternName)}`
      )
    } else
      error(
        `the pattern '${chalk.hex(COLORS.YELLOW)(patternName)}' already exists`
      )
  }

  write(patternName, data) {
    const PATTERN_FILE = path.resolve(PATTERN_DIR, `${patternName}.json`)
    const content = JSON.parse(fs.readFileSync(PATTERN_FILE, "utf-8"))
    if (this.createFlag) {
      content.user.push({
        id: this.currentId,
        system: data.user,
      })
      content.assistant.push({
        id: this.currentId,
        assistant: data.assistant,
      })
    } else {
      content.user.push({
        id: this.currentId,
        user: data.user,
      })
      content.assistant.push({
        id: this.currentId,
        assistant: data.assistant,
      })
    }
    fs.writeFileSync(
      PATTERN_DIR,
      JSON.stringify(content, null, 2),
      (err) => err && error(err)
    )
    this.currentId++
  }

  getCurrentId(patternName) {}

  read(patternName) {
    const PATTERN_FILE = path.resolve(PATTERN_DIR, `${patternName}.json`)
    const content = JSON.parse(fs.readFileSync(PATTERN_FILE, "utf-8"))
    log(content)
  }

  checkHasPatternFile(patternName) {
    const PATTERN_FILE = path.resolve(PATTERN_DIR, `${patternName}.json`)
    if (!fs.existsSync(PATTERN_FILE)) return false
    return true
  }
}

module.exports = Pattern
