const cfonts = require("cfonts")

function generate() {
  return cfonts.render("leyoonafr.", {
    font: "tiny", // define the font face
    align: "left", // define text alignment
    colors: ["system"], // define all colors
    background: "transparent", // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 2, // define letter spacing
    lineHeight: 1, // define the line height
    space: true, // define if the output text should have empty lines on top and on the bottom
    maxLength: "20", // define how many character can be on one line
    gradient: ["white", "#1e1e1e"], // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false, // define if this is a transition between colors directly
    env: "node", // define the environment cfonts is being executed in
  })
}

module.exports = generate
