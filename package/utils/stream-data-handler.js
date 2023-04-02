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
    await deleteLines(codeRows)
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

function deleteLines(end) {
  const rows = end + 1
  const clear = "\x1b[2K\x1b[0G"

  readline.moveCursor(stream, 0, -rows)

  for (let i = 0; i < rows; i++) {
    readline.clearLine(stream, 0)
    readline.moveCursor(stream, 0, 1)
  }

  readline.moveCursor(stream, 0, -rows)
  readline.clearLine(stream, 0)
  stream.write(clear)
  readline.moveCursor(stream, 0, 0)
  return Promise.resolve()
}

module.exports = streamDataHander

// can you give me a sum func in py?
// can you give me a debounce fn in js?
