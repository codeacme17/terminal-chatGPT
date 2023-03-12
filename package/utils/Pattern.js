const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const { warn, log, error, success } = require("../utils/log")
const { PATTERN_DIR } = require("../utils/path")
const { COLORS } = require("./configs")

class Pattern {
  constructor() {
    this.createPatternDir()

    this.patterns = fs
      .readdirSync(PATTERN_DIR)
      .map((pattern) => pattern.replace(".json", ""))
  }

  createPattern(patternName) {
    const PATTERN_FILE = path.resolve(PATTERN_DIR, `${patternName}.json`)

    if (!this.checkHasPatternFile(patternName)) {
      fs.appendFile(PATTERN_FILE, "", (err) => error(err))

      log()
      success(
        `Successed create pattern ${chalk.hex(COLORS.GREEN)(patternName)}`
      )
    } else
      error(
        `the pattern '${chalk.hex(COLORS.YELLOW)(patternName)}' already exists`
      )
  }

  createPatternDir() {
    if (!fs.existsSync(PATTERN_DIR)) fs.mkdirSync(PATTERN_DIR)
  }

  checkHasPatternFile(patternName) {
    const PATTERN_FILE = path.resolve(PATTERN_DIR, `${patternName}.json`)
    if (!fs.existsSync(PATTERN_FILE)) return false
    return true
  }
}

module.exports = Pattern
