const inquirer = require("inquirer")
const { PROJECT } = require("../utils/config")

const filename = () =>
  inquirer.prompt([
    {
      name: "FILENAME",
      type: "input",
      message: "Project name ?",
      default: "nafr-project",
    },
  ])

const framework = () =>
  inquirer.prompt([
    {
      name: "FRAMEWORK",
      type: "list",
      message: "Which framework you want to use ?",
      choices: PROJECT,
    },
  ])

const creativeQuestions = {
  filename,
  framework,
}

module.exports = creativeQuestions
