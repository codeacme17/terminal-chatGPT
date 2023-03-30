const fs = require("fs")
const shell = require("shelljs")
const chalk = require("chalk")
const { CONFIG_FILE } = require("../utils/path")
const { log, success, warn } = require("../utils/log")
const { _confirmChangeKey } = require("../utils/questions")
const { COLORS } = require("../utils/configs")

module.exports = (argv) => {
  if (Object.keys(argv).length > 1) {
    warn(
      `Can not enter multiple options to ${chalk.hex(COLORS.GREEN)(
        "config"
      )} command`
    )
    return
  }

  if (Object.keys(argv).length < 1) {
    warn(
      `You must enter an option to ${chalk.hex(COLORS.GREEN)("config")} command`
    )
    return
  }

  if (typeof argv.key === "string") handleKey(argv.key)
  else warn("OpenAI key cannot be empty")
}

async function handleKey(key) {
  if (!fs.existsSync(CONFIG_FILE)) await createKeyFile()
  if (checkHasKey() && !(await confirmChangeKey())) return
  modifyKey(key)
}

async function modifyKey(key) {
  const data = JSON.parse(fs.readFileSync(CONFIG_FILE))
  data["OPENAI_API"] = `${key}`
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(data))

  log()
  success("Successfully modified OpenAI key")
}

async function createKeyFile() {
  shell.touch(CONFIG_FILE)

  const KEY = {
    OPENAI_API: "",
  }

  fs.appendFileSync(CONFIG_FILE, JSON.stringify(KEY), (err) => {
    console.log(err)
  })

  return Promise.resolve("create success")
}

function checkHasKey() {
  const data = JSON.parse(fs.readFileSync(CONFIG_FILE))
  return !!data["OPENAI_API"]
}

async function confirmChangeKey() {
  const answer = await _confirmChangeKey()
  return answer.QUESTION
}
