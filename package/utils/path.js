const path = require("path")
const shell = require("shelljs")
const fs = require("fs")

// Target dir paths
const TARGET = {
  root: path.resolve("."),
  src: path.resolve(".", "./src"),
  plugins: getTargetPlugins,
  vite_ts: path.resolve(".", "./vite.config.ts"),
  apis: path.resolve(".", "./src/apis"),
  apis_modules: path.resolve(".", "./src/apis/modules"),
}

// Axios source files and dir paths
const SOURCE_AXIOS = {
  axios_ts: path.resolve(__dirname, `../../template/plugin/axios/axios.ts`),
  apis: path.resolve(__dirname, "../../template/plugin/axios/apis"),
}

// TailwindCSS source files paths
const SOURCE_TAILWIND = {
  postcss_cjs: path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/postcss.config.cjs`
  ),
  vue_style_css: path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/vue/style.css`
  ),
  vue_tailwind_cjs: path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/vue/tailwind.config.cjs`
  ),
  react_index_css: path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/react/index.css`
  ),
  react_tailwind_cjs: path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/react/tailwind.config.cjs`
  ),
}

// Project templates paths
const SOURCE_PROJECT = {
  vanilla: path.resolve(__dirname, "../../template/project/vanilla/*"),
  vue: path.resolve(__dirname, "../../template/project/vue/*"),
  react: path.resolve(__dirname, "../../template/project/react/*"),
}

// If there isnt plugins dir in current project,
// generate and return the path
function getTargetPlugins() {
  const TARGET_DIR_plugins = path.resolve(".", "./src/plugins")
  if (!fs.existsSync(TARGET_DIR_plugins)) shell.mkdir("-p", TARGET_DIR_plugins)
  return TARGET_DIR_plugins
}

module.exports = {
  TARGET,
  SOURCE_AXIOS,
  SOURCE_TAILWIND,
  SOURCE_PROJECT,
}
