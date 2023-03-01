const fs = require("fs")
const path = require("path")
const chalk = require("chalk")

const create = require("../handler/create-preject")
const creativeQuestions = require("../question/create")
const { COLORS } = require("../utils/config")
const { clear, error } = require("../utils/log")
const { TARGET } = require("../utils/path")

module.exports = async (name) => {
  clear()

  name = name || (await setPrjectName(name))

  const TARGET_DIR = path.resolve(TARGET.root, name)

  if (fs.existsSync(TARGET_DIR))
    return error(
      `there already was dir called ${chalk.hex(COLORS.YELLOW)(
        name
      )}, please change the project name`
    )

  const framework = await setFramework()

  create[framework](TARGET_DIR, name)
}

async function setPrjectName() {
  const creativeAnswers = await creativeQuestions.filename()
  return creativeAnswers.FILENAME
}

async function setFramework() {
  const answer = await creativeQuestions.framework()
  return answer.FRAMEWORK
}
