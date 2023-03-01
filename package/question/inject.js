const inquirer = require("inquirer")
const chalk = require("chalk")

const { PLUGIN, COLORS } = require("../utils/config")

const pluginName = () =>
  inquirer.prompt([
    {
      name: "PLUGINNAME",
      type: "list",
      message: "Which plugin do you want to inject ?",
      choices: PLUGIN,
    },
  ])

const hadPlugin = (plugin) =>
  inquirer.prompt([
    {
      name: "HADPLUGIN",
      type: "confirm",
      message: `You already had ${chalk.hex(COLORS.YELLOW)(
        plugin
      )} in your package, determine continue to download`,
    },
  ])

module.exports = {
  pluginName,
  hadPlugin,
}
