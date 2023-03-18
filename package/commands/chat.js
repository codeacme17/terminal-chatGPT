const repl = require("repl")
const chalk = require("chalk")
const fs = require("fs")

const Load = require("../utils/Load")
const History = require("../utils/History")
const Cache = require("../utils/Cache")
const CodeBoxer = require("../utils/CodeBoxer")
const { COLORS } = require("../utils/configs")
const { clear, error, log } = require("../utils/log")
const { TurboStream } = require("../utils/apis.js")
const { CONFIG_FILE } = require("../utils/path")

const load = new Load(`chatGPT is thinking...`)
const history = new History()
const cache = new Cache()
const codeBoxer = new CodeBoxer()

let _pattern
let PATTERN_MODE = false

/** Starts a REPL interface to chat with GPT-3 using OpenAI's API.
 */
module.exports = (pattern) => {
  // check does have API_KEY
  if (!fs.existsSync(CONFIG_FILE)) {
    error("You haven't set OPENAI KEY. Please set up before dive into chatting")
    log(
      `use command ${chalk.hex(COLORS.YELLOW)(
        "1gpt config -k [your OpenAI Key]"
      )} to set your key`
    )
    log("")
    return
  }

  // trigger to pattern mode
  if (pattern.PATTERN_NAME) {
    _pattern = pattern
    PATTERN_MODE = true
  }

  history.init()
  startChatLog()
  startREPL()
}

function startREPL() {
  process.env.NODE_REPL_HISTORY = ""

  PATTERN_MODE && cache.injectPattern(_pattern)

  repl.start({
    prompt: `${chalk.hex(COLORS.GREEN)("Question: ")}\n`,
    eval: evalHandler,
    writer: writerHandler,
  })
}

async function evalHandler(cmd, context, filename, cb) {
  const formatedCmd = formatCmd(cmd)
  chatCommandHandler(formatedCmd)

  if (!formatedCmd || load.loading) return

  load.start()

  if (!cache.cache.length) cache.firstChat(cmd)
  else cache.ask(cmd)

  console.log(`${chalk.hex(COLORS.YELLOW)("Answer: ")}`)
  const res = await TurboStream(cache.cache, load)

  PATTERN_MODE && _pattern.writeUser(formatedCmd)
  history.write(formatedCmd + "\n", "QUESTION")

  cb(null, res)
}

function writerHandler(output) {
  cache.answer(output)
  PATTERN_MODE && _pattern.writeAssistant(output)
  history.write(output + "\n\n", "ANSWER")

  const boxedOutput = codeBoxer.boxify(output.toString())
  return `${boxedOutput}\n`
}

function formatCmd(cmd) {
  const index = cmd.lastIndexOf("\n")
  return cmd.substring(0, index)
}

function chatCommandHandler(cmd) {
  switch (true) {
    case cmd === "/":
      process.exit()
      break

    case cmd === "/clear":
      clear()
      process.exit()
      break
  }
}

// async function requestOpenai() {
//   return await Turbo(cache.cache)
// }

function startChatLog() {
  clear()

  log()
  PATTERN_MODE ? startPatternModeLog() : startNormalModeLog()
  log()

  log(
    `${chalk.hex(COLORS.GRAY)(
      "start at: " + new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    )}\n`
  )
}

function startPatternModeLog() {
  log(
    `📔 You are now chatting with ${chalk.hex(COLORS.PURPLE)(
      _pattern.PATTERN_NAME
    )} pattern`
  )
  if (_pattern.currentId === 0) _pattern.firstLog()
  else _pattern.lastHistoryLog()
}

function startNormalModeLog() {
  log(`${chalk.hex(COLORS.PURPLE)("🤖 CHAT WITH GPT MODEL HERE...")}`)
}
