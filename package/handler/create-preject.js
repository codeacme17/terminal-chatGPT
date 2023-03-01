const shell = require("shelljs")
const chalk = require("chalk")

const { SOURCE_PROJECT } = require("../utils/path")
const { log, success } = require("../utils/log")
const { COLORS } = require("../utils/config")

shell.config.fatal = true

function vanilla(TARGET_DIR, project) {
  startCreateLog(project)

  shell.mkdir("-p", TARGET_DIR)
  shell.cp("-R", SOURCE_PROJECT.vanilla, TARGET_DIR)

  successLog(project)
}

function vue(TARGET_DIR, project) {
  startCreateLog(project)

  shell.mkdir("-p", TARGET_DIR)
  shell.cp("-R", SOURCE_PROJECT.vue, TARGET_DIR)

  successLog(project)
}

function react(TARGET_DIR, project) {
  startCreateLog(project)

  shell.mkdir("-p", TARGET_DIR)
  shell.cp("-R", SOURCE_PROJECT.react, TARGET_DIR)

  successLog(project)
}

module.exports = {
  vanilla,
  vue,
  react,
}

function startCreateLog(prject) {
  log()
  log(`📦  Creating ${chalk.cyan(prject)}...`)
  log()
}

function successLog(name) {
  success(`Successfully created ${chalk.hex(COLORS.GREEN)(name)}`)
  log("now run:")
  log()
  log(`   ${chalk.hex(COLORS.YELLOW)("cd")} ${name}`)
  log(`   ${chalk.hex(COLORS.YELLOW)("pnpm")} install`)
  log(`   ${chalk.hex(COLORS.YELLOW)("pnpm")} dev`)
  log()
}
