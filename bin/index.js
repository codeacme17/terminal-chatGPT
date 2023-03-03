#! /usr/bin/env node

const currentNodeVersion = process.versions.node
const major = currentNodeVersion.split(".")[0]
const chalk = require("chalk")

if (major < 14) {
  console.error(
    chalk.red(
      `You are running Node \n${currentNodeVersion} \n1llg-terminal-gpt requires Node 14 or higher.\nPlease update your version of Node`
    )
  )
  process.exit(1)
}

const { program } = require("commander")

const generateCfonts = require("../package/utils/generate-cfonts")

program.version(require("../package.json").version)

program.usage("[command] [option]").description(generateCfonts().string)

program
  .command("chat")
  .description("Chat with GPT model")
  .action(require("../package/commands/chat"))

program
  .command("config")
  .option("-k --key [OPENAI_KEY]", "read history file conent in terminal")
  .description("Config your GPT terminal")
  .action(require("../package/commands/config"))

program
  .command("history")
  .option("-r --read", "read history file conent in terminal", false)
  .option("-c --clear", "clear history file conent", false)
  .description("Operate your chat historical document")
  .action(require("../package/commands/history"))

program.parse(process.argv)
