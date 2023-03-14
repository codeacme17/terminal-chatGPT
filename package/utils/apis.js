const { Configuration, OpenAIApi } = require("openai")
const { log, error } = require("../utils/log")

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
        timeout: 30 * 1000,
      }
    )

    return response.data.choices[0].message.content.trim()
  } catch (err) {
    errorResponse(err)
  }
}


module.exports = {
  Turbo
}

function initConfiguration() {
  const configuration = new Configuration({
    apiKey: require("../../KEY.json").OPENAI_API,
  })
  return new OpenAIApi(configuration)
}

function errorResponse(err) {
  if (err.response)
    switch (err.response.status) {
      case 401:
        log()
        error("your OpenAI key is incorrect, please change correct one")
        break

      default:
        error(err)
        break
    }
  else error(err)
}

