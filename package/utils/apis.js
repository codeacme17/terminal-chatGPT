const readline = require("readline")
const { Configuration, OpenAIApi } = require("openai")
const { error } = require("../utils/log")

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

// Turbo stream-completion api
const TurboStream = async (cache, load) => {
  const { OpenAIClient } = await import("@fern-api/openai")

  const client = new OpenAIClient({
    token: require("../../user_configs.json").OPENAI_API,
  })

  const stream = process.stdout

  return new Promise((resolve) => {
    let res = ""
    let counter = 0
    client.chat.createCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: cache,
        stream: true,
      },
      (data) => {
        counter++
        if (counter == 1) load.end()
        let content = data.choices[0].delta.content || ""
        if (content === "\n\n") content = ""
        res += content
        stream.write(content)
      },
      {
        onError: (err) => error(err),
        onFinish: () => {
          stream.clearScreenDown()
          readline.cursorTo()
          stream.cursorTo(0)
          resolve(res)
        },
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

function errorResponse(err) {
  if (err.response)
    switch (err.response.status) {
      case 401:
        error("your OpenAI key is incorrect, please change correct one")
        break

      default:
        error(err)
        break
    }
  else error(err)
}
