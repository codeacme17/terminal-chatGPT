const chalk = require("chalk")
const { COLORS } = require("../utils/config")

function log(message = "") {
  console.log(message)
}

function success(message) {
  console.log(chalk.hex(COLORS.GREEN)("✔ ") + " " + message)
  console.log()
}

function warn(message) {
  console.log()
  console.warn(chalk.hex(COLORS.ORANGE)("WARN") + ": " + message)
  console.log()
}

function error(message) {
  console.log()
  console.error(chalk.hex(COLORS.RED)("ERROR") + ": " + message)
  console.log()
}

function clear() {
  console.clear()
}

module.exports = {
  log,
  success,
  warn,
  error,
  clear,
}
