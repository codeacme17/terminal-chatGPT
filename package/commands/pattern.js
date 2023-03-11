const chalk = require("chalk")
const { COLORS } = require("../utils/configs")
const { _chosePattern, _createPattern } = require("../utils/questions")
const { success, log } = require("../utils/log")

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

async function handleUse(PATTERN_NAME) {
  if (typeof PATTERN_NAME !== "string")
    PATTERN_NAME = await chosePattern(chalk.hex(COLORS.GREEN)("use"))
}

async function handleCreate(PATTERN_NAME) {
  if (typeof PATTERN_NAME !== "string") PATTERN_NAME = await createPattern()

  log()
  success(`Successed create pattern ${PATTERN_NAME}`)
}

async function handleList() {
  const list = ["pattern 1", "pattern 2", "pattern 3"] // dummy
  for (let item of list) {
    log(item)
  }
}

async function handleRemove(PATTERN_NAME) {
  if (typeof PATTERN_NAME !== "string")
    PATTERN_NAME = await chosePattern(chalk.hex(COLORS.RED)("remove"))
}

async function createPattern() {
  const answer = await _createPattern()
  return answer.QUESTION
}

async function chosePattern(type) {
  const answer = await _chosePattern(type)
  return answer.QUESTION
}
