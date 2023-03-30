const chalk = require("chalk")
const { COLORS } = require("./configs")
const { log } = require("./log")

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

function preventDefaultCommands(REPLServer) {
  const COMMANDS = Object.keys(REPLServer.commands)

  COMMANDS.forEach((command) => {
    REPLServer.commands[command] = {
      action() {
        log(`${chalk.hex(COLORS.PURPLE)("System:")}`)
        log(
          "You cannot use the special commands provided by the REPL while chatting with chatGPT"
        )
        log()
        REPLServer.clearBufferedCommand()
        REPLServer.displayPrompt()
      },
    }
  })
}

module.exports = { chatCommandHandler, preventDefaultCommands }
