const inquirer = require("inquirer")
const chalk = require("chalk")
const { COLORS } = require("./configs")

const _confirmClearHistory = () =>
  inquirer.prompt([
    {
      name: "QUESTION",
      type: "confirm",
      message: `Are you sure you want to clear the historical record?`,
    },
  ])

const _confirmChangeKey = () =>
  inquirer.prompt([
    {
      name: "QUESTION",
      type: "confirm",
      message: `There was a key in your ${chalk.hex(COLORS.YELLOW)(
        "KEY.json"
      )} file, do you confirm to change this key ?`,
    },
  ])

module.exports = {
  _confirmClearHistory,
  _confirmChangeKey,
}
