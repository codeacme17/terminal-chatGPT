const fs = require("fs")
const shell = require("shelljs")
const { API_FILE } = require("../utils/path")
const { log, success, warn } = require("../utils/log")
const { _confirmChangeKey } = require("../utils/questions")

module.exports = ({ key }) => {
  if (typeof key === "string") handleKey(key)
  else warn("OpenAI key cannot be empty")
}

async function handleKey(key) {
  if (!fs.existsSync(API_FILE)) await createKeyFile()
  if (checkHasKey() && !(await confirmChangeKey())) return
  modifyKey(key)
}

async function modifyKey(key) {
  const data = JSON.parse(fs.readFileSync(API_FILE))
  data["OPENAI_API"] = `${key}`
  fs.writeFileSync(API_FILE, JSON.stringify(data))

  log()
  success("Successfully modified OpenAI key")
}

async function createKeyFile() {
  shell.touch(API_FILE)

  const KEY = {
    OPENAI_API: "",
  }

  fs.appendFileSync(API_FILE, JSON.stringify(KEY), (err) => {
    console.log(err)
  })

  return Promise.resolve("create success")
}

function checkHasKey() {
  const data = JSON.parse(fs.readFileSync(API_FILE))
  return !!data["OPENAI_API"]
}

async function confirmChangeKey() {
  const answer = await _confirmChangeKey()
  return answer.QUESTION
}
