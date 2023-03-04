const repl = require("repl")
const chalk = require("chalk")
const fs = require("fs")

const Load = require("../utils/Load")
const History = require("../utils/History")
const Cache = require("../utils/Cache")
const { COLORS } = require("../utils/configs")
const { clear, error, log } = require("../utils/log")
const { Turbo, DavinciChat, DavinciCode } = require("../utils/apis")
const { API_FILE } = require("../utils/path")

NODE_REPL_HISTORY = ""

const load = new Load(`chatGPT is writing...`)
const history = new History()
const cache = new Cache()

/** Starts a REPL interface to chat with GPT-3 using OpenAI's API.
 */
module.exports = () => {
  if (!fs.existsSync(API_FILE)) {
    error("You haven't set OPENAI KEY. Please set up before dive into chatting")
    log(
      `use command ${chalk.hex(COLORS.YELLOW)(
        "igpt config -k [your OpenAI Key]"
      )} to set your key`
    )
    log("")
    return
  }

  history.init()
  startChatLog()
  startREPL()
}

function startREPL() {
  repl.start({
    prompt: `${chalk.hex(COLORS.GREEN)("Question: ")}\n`,
    eval,
    writer,
  })
}

async function eval(cmd, context, filename, cb) {
  const formatedCmd = formatCmd(cmd)
  const commendType = chatCommand(formatedCmd)

  if (!formatedCmd || load.loading) return

  load.start()
  if (!cache.cache.length) cache.firstChat(cmd)
  else cache.ask(cmd)
  const res = await requestOpenai(cmd, commendType)
  history.write(formatedCmd + "\n", "QUESTION")

  cb(null, res)
}

function writer(output) {
  cache.answer(output)
  history.write(output + "\n\n", "ANSWER")
  load.end()
  return `${chalk.hex(COLORS.YELLOW)("Answer: ")}\n${output}\n`
}

function formatCmd(cmd) {
  const index = cmd.lastIndexOf("\n")
  return cmd.substring(0, index)
}

function chatCommand(cmd) {
  switch (true) {
    case /^\/davinci_code/.test(cmd):
      return "DaviciCode"

    case /^\/davinci_chat/.test(cmd):
      return "DaviciChat"

    case cmd === "/":
      process.exit(1)

    case cmd === "clear":
      clear()
      process.exit(1)

    default:
      return "Turbo"
  }
}

async function requestOpenai(cmd, type) {
  switch (type) {
    case "DaviciChat":
      return await DavinciChat(cmd)

    case "DaviciCode":
      return await DavinciCode(cmd.substring(5))

    default:
      return await Turbo(cache.cache)
  }
}

function startChatLog() {
  clear()

  log()
  log(`${chalk.hex(COLORS.PURPLE)("🤖 CHAT WITH GPT MODEL HERE...")}`)
  log()

  log(
    `${chalk.hex(COLORS.GRAY)(
      "start at: " + new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    )}\n`
  )
}
