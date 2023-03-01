const inquirer = require("inquirer")

const _confirmClearHistory = () =>
  inquirer.prompt([
    {
      name: "QUESTION",
      type: "confirm",
      message: `Are you sure you want to clear the historical record?`,
    },
  ])

module.exports = {
  _confirmClearHistory,
}
