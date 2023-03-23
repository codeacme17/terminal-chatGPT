const History = require("../utils/History")
const chalk = require("chalk")
const { _confirmClearHistory } = require("../utils/questions")
const { warn } = require("../utils/log")
const { COLORS } = require("../utils/configs")

const history = new History()

module.exports = async (argv) => {
  if (Object.keys(argv).length > 1) {
    warn(
      `Can not enter multiple options to ${chalk.hex(COLORS.GREEN)(
        "history"
      )} command`
    )
    return
  }

  history.init()

  switch (true) {
    case argv.read:
      process.stdout.write(history.read())
      break

    case argv.clear:
      if (await confirmClearHistory()) history.clear()
      break

    default:
      process.stdout.write(history.read())
      break
  }
}

async function confirmClearHistory() {
  const answer = await _confirmClearHistory()
  return answer.QUESTION
}
