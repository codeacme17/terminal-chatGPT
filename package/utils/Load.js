const chalk = require("chalk")
const { COLORS } = require("./configs")

/** The Load Class to create a loading effect interface
    @param {string} message the message of loading text content
 */
class Load {
  constructor(message) {
    this.stream = process.stdout
    this.loading = false
    this.frameIndex = 0
    this.ellipsisIndex = 0
    this.interval = ""
    this.message = message
  }

  start() {
    this.loading = true
    this.stream.write("\u001b[?25l")
    this.render()
  }

  render() {
    this.interval = setInterval(() => {
      this.stream.clearLine()
      this.stream.cursorTo(0)
      this.stream.write(this.content())
    }, 200)
  }

  content() {
    const frames = [".", "o", "O", "°", "O", "o", "."]
    const frame = frames[this.frameIndex]
    this.frameIndex = ++this.frameIndex % frames.length

    return (
      chalk.hex(COLORS.BLUE)(frame) + " " + chalk.hex(COLORS.GRAY)(this.message)
    )
  }

  end() {
    this.loading = false
    this.stream.clearLine()
    this.stream.cursorTo(0)
    this.stream.write("\u001b[?25h")
    clearInterval(this.interval)
  }
}

module.exports = Load
