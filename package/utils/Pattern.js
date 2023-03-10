const fs = require("fs")
const path = require("path")
const chalk = require("chalk")

const CodeBoxer = require("../utils/CodeBoxer")
const { log, error, success } = require("../utils/log")
const { PATTERN_DIR } = require("../utils/path")
const { COLORS } = require("./configs")

class Pattern {
  constructor() {
    if (!fs.existsSync(PATTERN_DIR)) fs.mkdirSync(PATTERN_DIR)

    this.patterns = fs
      .readdirSync(PATTERN_DIR)
      .map((pattern) => pattern.replace(".json", ""))

    this.PATTERN_FILE = ""
    this.PATTERN_NAME = ""
    this.PATTERN_CONTENT = ""
    this.currentId = 0 // `id` is used to sort conversation records
  }

  read() {
    this.PATTERN_FILE = path.resolve(PATTERN_DIR, `${this.PATTERN_NAME}.json`)
    this.PATTERN_CONTENT = JSON.parse(
      fs.readFileSync(this.PATTERN_FILE, "utf-8")
    )
    this.getCurrentId()
  }

  writeUser(data) {
    this.getCurrentId()

    if (this.currentId === 0) {
      this.PATTERN_CONTENT.user.push({
        id: this.currentId,
        system: data,
      })
    } else {
      this.PATTERN_CONTENT.user.push({
        id: this.currentId,
        user: data,
      })
    }
  }

  writeAssistant(data) {
    this.PATTERN_CONTENT.assistant.push({
      id: this.currentId,
      assistant: data,
    })

    fs.writeFileSync(
      this.PATTERN_FILE,
      JSON.stringify(this.PATTERN_CONTENT, null, 2),
      (err) => err && error(err)
    )
  }

  getCurrentId() {
    this.currentId = this.PATTERN_CONTENT.user.length
      ? this.PATTERN_CONTENT.user.length
      : 0
  }

  create(patternName) {
    const PATTERN_FILE = path.resolve(PATTERN_DIR, `${patternName}.json`)

    if (!this.checkHasPatternFile(patternName)) {
      fs.appendFile(PATTERN_FILE, "", (err) => err && error(err))
      this.initPatternContent(PATTERN_FILE)

      log()
      success(
        `Successed create pattern ${chalk.hex(COLORS.GREEN)(patternName)}`
      )
    } else
      error(
        `the pattern ${chalk.hex(COLORS.YELLOW)(patternName)} already exists`
      )
  }

  // init content in pattern file, if there is no any content
  initPatternContent(PATTERN_FILE) {
    fs.writeFileSync(
      PATTERN_FILE,
      JSON.stringify({ user: [], assistant: [] }),
      (err) => err && error(err)
    )
  }

  remove(patternName) {
    if (!this.checkHasPatternFile(patternName)) {
      error(`there is no pattern ${chalk.hex(COLORS.YELLOW)(patternName)}`)
    }

    const PATTERN_FILE = path.resolve(PATTERN_DIR, `${patternName}.json`)

    fs.unlink(PATTERN_FILE, (err) => err && error(err))
    log()
    success(`Successed remove pattern ${chalk.hex(COLORS.YELLOW)(patternName)}`)
  }

  checkHasPatternFile(patternName) {
    const PATTERN_FILE = path.resolve(PATTERN_DIR, `${patternName}.json`)
    if (!fs.existsSync(PATTERN_FILE)) return false
    return true
  }

  lastHistoryLog() {
    const codeBoxer = new CodeBoxer()
    const lastUser = this.PATTERN_CONTENT.user[this.currentId - 1].user
    const lastAssistant =
      this.PATTERN_CONTENT.assistant[this.currentId - 1].assistant
    const boxedOutput = codeBoxer.boxify(lastAssistant.toString())

    log()
    log(`${chalk.hex(COLORS.GREEN)("Question: ")}\n${chalk.dim(lastUser)}`)
    log(`${chalk.hex(COLORS.YELLOW)("Answer: ")}\n${chalk.dim(boxedOutput)}`)
  }

  firstLog() {
    log()
    log(
      `${chalk.dim(
        "This is the first time you use this pattern, and your first dialogue data will be used as the system of this pattern."
      )}`
    )
    log()
    log(
      `${chalk.dim(
        `You can go to ${chalk.hex(COLORS.GREEN)(
          "https://github.com/f/awesome-chatgpt-prompts"
        )} to choose a prompt as the pattern system`
      )}`
    )
  }
}

module.exports = Pattern

/** pattern JSON file structure:
 
   {
     "user": [
       {
         "id": 0,
         "system": "..."
       },
       {
         "id": 1,
         "user": "..."
       }
     ],
     "assistant": [
       {
         "id": 0,
         "assistant": "..."
       },
       {
         "id": 1,
         "assistant": "..."
       }
     ]
   }
   
 */
