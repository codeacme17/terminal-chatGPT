const chalk = require("chalk")

const injectPlugin = require("../handler/inject-plugin")
const { pluginName } = require("../question/inject")
const { COLORS, PLUGIN } = require("../utils/config")
const { clear, error } = require("../utils/log")

/**
 *  @description `nafr inject` command handler
 *  @param pluginName the name of needed plugin
 */

module.exports = async (pluginName) => {
  clear()
  pluginName = pluginName || (await choseInjectPlugin())
  pluginName = getValidPluginName(pluginName)
  if (!pluginName) return
  injectPlugin[pluginName]()
}

// invoke plugin question - chose whitch plugin to inject
async function choseInjectPlugin() {
  const answers = await pluginName()
  return answers.PLUGINNAME
}

function getValidPluginName(pluginName) {
  const pluginNameLower = pluginName.toLowerCase()

  if (PLUGIN.includes(pluginNameLower)) return pluginNameLower
  return error(
    `Can not find plugin called '${chalk.hex(COLORS.YELLOW)(pluginName)}'`
  )
}
