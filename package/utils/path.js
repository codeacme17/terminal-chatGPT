const path = require("path")

const API_FILE = path.resolve(__dirname, "../../KEY.json")
const HISTORY_FILE = path.resolve(__dirname, "../../chat_history.txt")
const PATTERN_DIR = path.resolve(__dirname, "../../patterns")

module.exports = {
  API_FILE,
  HISTORY_FILE,
  PATTERN_DIR,
}
