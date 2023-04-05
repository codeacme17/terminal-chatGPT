const readline = require("readline")
const CodeBoxer = require("./CodeBoxer")

const codeBoxer = new CodeBoxer()
const stream = process.stdout

let isCodeBlock = false
let codeRows = 0
let codeContent = ""
let shadowEnd = false

async function streamDataHander(content) {
  // shadow END
  if (isCodeBlock && content.includes("``")) shadowEnd = true

  // code block END
  if (
    (shadowEnd && content.includes("`\n")) ||
    (isCodeBlock && content.includes("```"))
  ) {
    content = "\n"
    deleteLines(codeRows + 1)
    stream.write(codeBoxer.boxify(codeContent.toString() + "`"))
    shadowEnd = false
    isCodeBlock = false
    codeContent = ""
    codeRows = 0
  }

  // coce block START
  if ((!isCodeBlock && content.includes("``")) || content.includes("```"))
    isCodeBlock = true

  if (isCodeBlock) {
    codeContent += content
    if (content.includes("\n") && !content.includes("\n\n")) codeRows++
    else if (content.includes("\n\n")) codeRows += 2
  }

  stream.write(content)
}

function deleteLines(rows) {
  const CLEAR_LINE = "\x1b[2K\x1b[0G"
  const SHOW_CURSOR = "\x1b[?25h"

  readline.moveCursor(stream, 0, -rows)
  readline.clearLine(stream, 0)

  stream.write(CLEAR_LINE)
  stream.write(SHOW_CURSOR)

  readline.moveCursor(stream, 0, 0)
}

module.exports = {
  streamDataHander,
  deleteLines,
}
