const repl = require("repl")
const chalk = require("chalk")
const fs = require("fs")

const Load = require("../utils/Load")
const History = require("../utils/History")
const Cache = require("../utils/Cache")
const CodeBoxer = require("../utils/CodeBoxer")
const { COLORS } = require("../utils/configs")
const { clear, error, log } = require("../utils/log")
const { Turbo, DavinciChat, DavinciCode } = require("../utils/apis")
const { API_FILE } = require("../utils/path")

// eslint-disable-next-line no-undef
NODE_REPL_HISTORY = ""

const load = new Load(`chatGPT is writing...`)
const history = new History()
const cache = new Cache()
const codeBoxer = new CodeBoxer()

/** Starts a REPL interface to chat with GPT-3 using OpenAI's API.
 */
module.exports = () => {
  if (!fs.existsSync(API_FILE)) {
    error("You haven't set OPENAI KEY. Please set up before dive into chatting")
    log(
      `use command ${chalk.hex(COLORS.YELLOW)(
        "1gpt config -k [your OpenAI Key]"
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
    eval: evalHandler,
    writer: writerHandler,
  })
}

async function evalHandler(cmd, context, filename, cb) {
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

function writerHandler(output) {
  cache.answer(output)
  history.write(output + "\n\n", "ANSWER")
  const boxedOutput = codeBoxer.boxify(output.toString())
  load.end()
  return `${chalk.hex(COLORS.YELLOW)("Answer: ")}\n${boxedOutput}\n`
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
      break

    case cmd === "/clear":
      clear()
      process.exit(1)
      break

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
