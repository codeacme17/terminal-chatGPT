const path = require("path")

/**
 *  @description Check does current project has specifical dependence
 *  @param package The dependence name
 *  @param type dep/devDep
 *  @return `Boolean`
 */

function checkHasDependencies(package, type) {
  const packagePath = path.resolve(".", "./package.json")
  const packageData = require(packagePath)

  let dependencies

  if (type === "dep") dependencies = packageData.dependencies
  if (type === "devDep") dependencies = packageData.devDependencies

  return dependencies && Object.keys(dependencies).includes(package)
}

module.exports = checkHasDependencies
