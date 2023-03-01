const fs = require("fs")
const chalk = require("chalk")

const { COLORS } = require("./config")
const { success, error } = require("./log")

/** A utility class for modifying files.
 */
class File {
  /** Constructs a new `File` object with the given target file path.
      @param {string} TARGET_FILE_PATH - The path to the target file.
   */
  constructor(TARGET_FILE_PATH) {
    this.TARGET_FILE_PATH = TARGET_FILE_PATH
    this.fileContents = fs.readFileSync(this.TARGET_FILE_PATH, "utf-8")
  }

  /** Writes the given content to the target file at the appropriate location.
      If the target file already has the specified property, the file is not modified.
      @param {string} content - The content to insert into the target file.
   */
  write(content) {
    const { TARGET_FILE_PATH, fileContents, match } = this

    if (this.hasProperty("proxy")) return

    const configObj = match[1].trim()
    const insertIndex = fileContents.indexOf(configObj) + configObj.length - 1
    const result =
      fileContents.slice(0, insertIndex) +
      `${content}\n` +
      fileContents.slice(insertIndex)

    fs.writeFile(TARGET_FILE_PATH, result, "utf8", (err) => {
      if (err) return error(err)

      success(
        `Successfully updated file: ${chalk.hex(COLORS.PURPLE)(
          this.TARGET_FILE_PATH
        )}`
      )
    })
  }

  /** Returns the result of matching the `defineConfig()` call in the target file.
      @returns {Array|null} - An array of matches or null if no matches were found.
   */
  get match() {
    const { fileContents } = this
    const match = /export default defineConfig\((\{[\s\S]*?\})\)/.exec(
      fileContents
    )

    if (!match)
      return error("Could not find the position to insert the new code")

    return match
  }

  /** Returns whether the target file has the specified property.
      @param {string} property - The name of the property to check for.
      @returns {boolean} - `true` if the target file has the specified property, `false` otherwise.
   */
  hasProperty(property) {
    const index = this.fileContents.indexOf(property)
    return index !== -1
  }
}

module.exports = File
