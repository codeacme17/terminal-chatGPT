const shell = require("shelljs")
const path = require("path")
const chalk = require("chalk")
const fs = require("fs")

const checkHasDependencies = require("../utils/check-depences")
const install = require("../utils/install")
const File = require("../utils/File")
const { hadPlugin } = require("../question/inject")
const { COLORS } = require("../utils/config")
const { TARGET, SOURCE_AXIOS, SOURCE_TAILWIND } = require("../utils/path")
const { log, success, error } = require("../utils/log")
const { SERVER_PROXY } = require("../utils/file-write-content")

shell.config.fatal = true

/** Injects Axios library to the current project.
    @async
    @returns {Promise<void>}  Promise that resolves when Axios is injected successfully.
 */
async function axios() {
  if (
    checkHasDependencies("axios", "dep") &&
    !(await determineWhenHadPlugin("axios"))
  )
    return

  startInjectLog("axios")

  await install.axios()

  if (!fs.existsSync(TARGET.vite_ts)) return

  const TARGET_DIR_plugins = TARGET.plugins()
  shell.cp("-R", SOURCE_AXIOS.axios_ts, TARGET_DIR_plugins)
  shell.cp("-R", SOURCE_AXIOS.apis, TARGET.src)
  await writeFile("vite.config.ts", SERVER_PROXY)

  successInjectLog([
    {
      TARGET_DIR: TARGET_DIR_plugins,
      FILE_NAME: "axios.ts",
    },
    {
      TARGET_DIR: TARGET.apis,
      FILE_NAME: "index.ts",
    },
    {
      TARGET_DIR: TARGET.apis_modules,
      FILE_NAME: "test.ts",
    },
  ])
}

/** Injects Tailwind CSS configuration files and dependencies into 
    a Vue or React project.
    @async
    @function tailwindcss
    @throws {Error} If the project does not have the required dependencies or is not a Vue or React project.
    @returns {void}
 */
async function tailwindcss() {
  if (!checkHasDependencies("vite", "devDep"))
    return errorInjectLog("tailwindCSS", "vite")

  if (
    checkHasDependencies("tailwindcss", "devDep") &&
    !(await determineWhenHadPlugin("tailwindCSS"))
  )
    return

  // neither vue or react
  if (
    !checkHasDependencies("vue", "dep") &&
    !checkHasDependencies("react", "dep")
  )
    return errorInjectLog("tailwindCSS", "Vue or React")

  startInjectLog("tailwindCSS")

  // its vue project
  if (checkHasDependencies("vue", "dep")) {
    shell.cp("-R", SOURCE_TAILWIND.postcss_cjs, TARGET.root)
    shell.cp("-R", SOURCE_TAILWIND.vue_style_css, TARGET.src)
    shell.cp("-R", SOURCE_TAILWIND.vue_tailwind_cjs, TARGET.root)
    await install.tailwindcss([TARGET.src, TARGET.root])
    return successInjectLog([
      {
        TARGET_DIR: TARGET.root,
        FILE_NAME: "postcss.config.cjs",
      },
      {
        TARGET_DIR: TARGET.root,
        FILE_NAME: "tailwind.config.cjs",
      },
      {
        TARGET_DIR: TARGET.src,
        FILE_NAME: "style.css",
      },
    ])
  }

  // its react project
  if (checkHasDependencies("react", "dep")) {
    shell.cp("-R", SOURCE_TAILWIND.postcss_cjs, TARGET.root)
    shell.cp("-R", SOURCE_TAILWIND.react_index_css, TARGET.src)
    shell.cp("-R", SOURCE_TAILWIND.react_tailwind_cjs, TARGET.root)
    await install.tailwindcss()
    return successInjectLog([
      {
        TARGET_DIR: TARGET.root,
        FILE_NAME: "postcss.config.cjs",
      },
      {
        TARGET_DIR: TARGET.root,
        FILE_NAME: "tailwind.config.cjs",
      },
      {
        TARGET_DIR: TARGET.src,
        FILE_NAME: "index.css",
      },
    ])
  }
}

// Install ESlint and inject needed file
async function eslint() {
  log("eslint")
}

const plugin = {
  axios,
  tailwindcss,
  eslint,
}

module.exports = plugin

async function determineWhenHadPlugin(plugin) {
  const answers = await hadPlugin(plugin)
  return answers.HADPLUGIN
}

async function writeFile(FILE_NAME, content) {
  const file = new File(path.resolve(".", FILE_NAME))
  file.write(content)
  return "success"
}

function startInjectLog(plugin) {
  log()
  log(`📦  Injecting ${chalk.cyan(plugin)}...`)
  log()
}

function successInjectLog(files) {
  files.forEach((file) => {
    const FILE_PATH = path.resolve(file.TARGET_DIR, "./", file.FILE_NAME)
    success(`Successfully injected file: ${chalk.hex(COLORS.GREEN)(FILE_PATH)}`)
  })
}

function errorInjectLog(plugin, dep) {
  error(
    `${plugin} is only support to '${chalk.hex(COLORS.YELLOW)(dep)}' project`
  )
}
