const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const { warn, log, error, success } = require("../utils/log")
const { PATTERN_DIR } = require("../utils/path")
const { COLORS } = require("./configs")

class Pattern {
  constructor() {
    this.createPatternDir()
    this.patterns = fs.readdirSync(PATTERN_DIR)
  }

  createPatternDir() {
    if (!fs.existsSync(PATTERN_DIR)) fs.mkdirSync(PATTERN_DIR)
  }

  checkHasPatternFile(patternName) {
    const PATTERN_FILE = path.resolve(PATTERN_DIR, patternName)
    if (!fs.existsSync(PATTERN_FILE)) return false

    error(
      `the pattern '${chalk.hex(COLORS.YELLOW)(patternName)}' already exists`
    )
    return true
  }

  createPattern(patternName) {
    const PATTERN_FILE = path.resolve(PATTERN_DIR, `${patternName}`)
    if (!this.checkHasPatternFile(patternName)) {
      fs.appendFile(PATTERN_FILE, "", (err) => {})
      log()
      success(
        `Successed create pattern ${chalk.hex(COLORS.GREEN)(patternName)}`
      )
    }
  }
}

module.exports = Pattern
