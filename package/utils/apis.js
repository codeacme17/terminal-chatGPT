const chalk = require("chalk")
const { Configuration, OpenAIApi } = require("openai")
const { streamDataHander, deleteLines } = require("./stream-data-handler")
const { COLORS } = require("./configs")
const { log } = require("console")

// 3.5 turbo model api
async function Turbo(cache) {
  const openai = initConfiguration()

  try {
    const response = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: cache,
      },
      {
        timeout: 60 * 1000,
      }
    )

    return response.data.choices[0].message.content.trim()
  } catch (err) {
    errorResponse(err)
  }
}

// 3.5 turbo model stream-completion api
const TurboStream = async (cache, load) => {
  const { OpenAIClient } = await import("@fern-api/openai")

  const client = new OpenAIClient({
    token: require("../../user_configs.json").OPENAI_API,
  })

  return new Promise((resolve) => {
    let res = ""
    let counter = 0

    client.chat.createCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: cache,
        stream: true,
      },
      async (data) => {
        counter++
        if (counter == 1) {
          load.end()
        }
        let content = data.choices[0].delta.content || ""
        if (counter == 2 && content.includes("\n\n")) content = ""
        res += content
        await streamDataHander(content)
      },
      {
        onError: (error) => errorResponse(error.response.status),
        onFinish: () => resolve(res),
      }
    )
  })
}

module.exports = {
  Turbo,
  TurboStream,
}

function initConfiguration() {
  const configuration = new Configuration({
    apiKey: require("../../user_configs.json").OPENAI_API,
  })

  return new OpenAIApi(configuration)
}

async function errorResponse(errStatus) {
  await deleteLines(0)

  log(`${chalk.hex(COLORS.PURPLE)("System:")}`)

  switch (errStatus) {
    case 401:
      log(
        "There are problems with your certification, they may be caused by the following reasons"
      )
      log(" - Invalid Authentication")
      log(" - The requesting API key is not correct")
      log(" - Your account is not part of an organization")
      log()
      break

    case 429:
      log(
        "There were some problems processing your request, they may be caused by the following reasons"
      )
      log(" - You are sending requests too quickly")
      log(
        " - You exceeded your current quota, please check your plan and billing details"
      )
      log("The engine is currently overloaded, please try again later")
      log()
      break

    case 500:
      log("There are some issues on Openai servers")
      log()

    default:
      log(
        "There are some problems I can't track down, please check the network conditions and try later"
      )
      log()
      break
  }

  process.exit(1)
}
