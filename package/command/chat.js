const repl = require("repl")
const chalk = require("chalk")

const Load = require("../utils/Load")
const History = require("../utils/History")
const { COLORS } = require("../utils/config")
const { clear, log, error } = require("../utils/log")
const { chat, explainCode } = require("../utils/api")

NODE_REPL_HISTORY = ""

const load = new Load("chatGPT is writing...")
const history = new History()

/** Starts a REPL interface to chat with GPT-3 using OpenAI's API.
 */
module.exports = (argus) => {
  history.init()

  if (argus.length) analyseArguments(argus)
  else startREPL()
}

/** Analyse the arguments passed to the function.
    @param {Array} argus - The array of arguments passed to the function.
    @returns {void}
 */
function analyseArguments(argus) {
  const [flag, command] = argus

  switch (command) {
    case undefined:
      process.stdout.write(history.read())
      break

    case "read":
      process.stdout.write(history.read())
      break

    case "clear":
      history.clear()
      break

    default:
      error(`no command called '${chalk.hex(COLORS.YELLOW)(command)}'`)
      return
  }
}

/** Starts a new REPL session to chat with GPT-3.
    @returns {void}
 */
function startREPL() {
  clear()
  startChatLog()

  log(
    `${chalk.hex(COLORS.GRAY)(
      "start at: " + new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    )}\n`
  )

  repl.start({
    prompt: `${chalk.hex(COLORS.GREEN)("Question: ")}\n`,
    eval,
    writer,
  })
}

/** Evaluates the user's command and retrieves a response from the OpenAI API.
    @param {string} cmd - The user's command
    @param {Object} context - The context object passed to the REPL session
    @param {string} filename - The name of the file being executed
    @param {Function} cb - The callback function to return the response to the REPL session
    @returns {void}
 */
async function eval(cmd, context, filename, cb) {
  const formatedCmd = formatCmd(cmd)
  const commendType = chatCommand(formatedCmd)

  if (!formatedCmd || load.loading) return
  load.start()
  const res = await requestOpenai(cmd, commendType)
  history.write(formatedCmd + "\n", "QUESTION")
  load.end()
  cb(null, res)
}

function writer(output) {
  history.write(output + "\n\n", "ANSWER")
  return `${chalk.hex(COLORS.YELLOW)("Answer: ")}\n${output}\n`
}

/** Formats the user's command by removing any trailing newline characters.
    @param {string} cmd - The user's command
    @returns {string} The formatted command
 */
function formatCmd(cmd) {
  const index = cmd.lastIndexOf("\n")
  return cmd.substring(0, index)
}

/** Determines the type of command being executed based on its prefix.
    @param {string} cmd - The user's command
    @returns {string} The type of command being executed
 */
function chatCommand(cmd) {
  if (cmd === "/") process.exit(1)
  if (cmd === "clear") {
    clear()
    process.exit(1)
  }
  if (/^\/code/.test(cmd)) return "code"
}

/** Sends a request to the OpenAI API to retrieve a response to the user's command.
    @param {string} cmd - The user's command
    @param {string} type - The type of command being executed
    @returns {Promise<string>} The response to the user's command
 */
async function requestOpenai(cmd, type) {
  let res
  switch (type) {
    case "code":
      res = await explainCode(cmd.substring(5))
      break

    default:
      res = await chat(cmd)
      break
  }
  return res
}

function startChatLog() {
  log()
  log(`${chalk.hex(COLORS.PURPLE)("🤖 CHAT WITH CHATGPT HERE...")}`)
  log()
}
