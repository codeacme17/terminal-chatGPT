const History = require("../utils/History")
const { _confirmClearHistory } = require("../utils/questions")

const history = new History()

module.exports = async ({ read, clear }) => {
  history.init()

  switch (true) {
    case read:
      process.stdout.write(history.read())
      break

    case clear:
      if (await confirmClearHistory()) history.clear()
      break

    default:
      break
  }
}

async function confirmClearHistory() {
  const answer = await _confirmClearHistory()
  return answer.QUESTION
}
