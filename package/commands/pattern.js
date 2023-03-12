const chalk = require("chalk")
const Pattern = require("../utils/Pattern")
const { COLORS } = require("../utils/configs")
const { _chosePattern, _createPattern } = require("../utils/questions")
const { success, log, warn } = require("../utils/log")

module.exports = ({ use, create, list, remove }) => {
  switch (true) {
    case !!create:
      handleCreate(create)
      break

    case !!list:
      handleList()
      break

    case !!remove:
      handleRemove(remove)
      break

    default:
      handleUse(use)
      break
  }
}

const pattern = new Pattern()

async function handleUse(PATTERN_NAME) {
  if (typeof PATTERN_NAME !== "string")
    PATTERN_NAME = await chosePatternQuestion(chalk.hex(COLORS.GREEN)("use"))

  pattern.read(PATTERN_NAME)
}

async function handleCreate(PATTERN_NAME) {
  if (typeof PATTERN_NAME !== "string")
    PATTERN_NAME = await createPatternQuestion()

  pattern.create(PATTERN_NAME)
}

async function handleList() {
  const list = ["pattern 1", "pattern 2", "pattern 3"] // dummy
  for (let item of list) {
    log(item)
  }
}

async function handleRemove(PATTERN_NAME) {
  if (typeof PATTERN_NAME !== "string")
    PATTERN_NAME = await chosePatternQuestion(chalk.hex(COLORS.RED)("remove"))
}

async function createPatternQuestion() {
  const answer = await _createPattern()
  return answer.QUESTION
}

async function chosePatternQuestion(type) {
  if (!pattern.patterns.length) {
    warn("there was no any pattern yet")
    log(
      `you can use command ${chalk.hex(COLORS.YELLOW)(
        "1gpt pattern -c [pattern-name]"
      )} to create one`
    )
    log()
    return
  }
  const answer = await _chosePattern(type)
  return answer.QUESTION
}
