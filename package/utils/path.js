const path = require("path")

const CONFIG_FILE = path.resolve(__dirname, "../../user_configs.json")
const HISTORY_FILE = path.resolve(__dirname, "../../chat_history.txt")
const PATTERN_DIR = path.resolve(__dirname, "../../patterns")

module.exports = {
  CONFIG_FILE,
  HISTORY_FILE,
  PATTERN_DIR,
}
