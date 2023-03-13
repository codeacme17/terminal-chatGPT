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

    this.PATTERN_NAME = ""
    this.PATTERN_CONTENT = ""
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
        `the pattern ${chalk.hex(COLORS.YELLOW)(patternName)} already exists`
      )
  }

  write(data) {

    read(this.PATTERN_NAME)

    if (this.currentId === 0) {
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
    this.PATTERN_CONTENT = JSON.parse(fs.readFileSync(PATTERN_FILE, "utf-8"))
    this.currentId = content.assistant[content.assistant.length - 1].id
  }

  remove(patternName) {
    const PATTERN_FILE = path.resolve(PATTERN_DIR, `${patternName}.json`)
      
    if (!this.checkHasPatternFile(patternName)) {
      error(`there is no pattern ${chalk.hex(COLORS.YELLOW)(patternName)}`)
    }

    fs.unlink(PATTERN_FILE, (err) => err && error(err))
    log()
    success(`Successed remove pattern ${chalk.hex(COLORS.YELLOW)(patternName)}`)
  }

  checkHasPatternFile(patternName) {
    const PATTERN_FILE = path.resolve(PATTERN_DIR, `${patternName}.json`)
    if (!fs.existsSync(PATTERN_FILE)) return false
    return true
  }

}

module.exports = Pattern
