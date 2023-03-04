const { Configuration, OpenAIApi } = require("openai")

const { log, error } = require("../utils/log")

// chat model api
async function chat(prompt) {
  const openai = initConfiguration()

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Q: ${prompt} \n`,
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
      stop: ["Q: "],
    })
    const res = response.data.choices[0].text.trim()
    return formatResponse(res)
  } catch (err) {
    errorResponse(err)
  }
}

// explain code model api
async function explainCode(prompt) {
  const openai = initConfiguration()

  try {
    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `code: ${prompt} \n`,
      temperature: 0,
      max_tokens: 200,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["code: "],
    })
    const res = response.data.choices[0].text.trim()
    return res
  } catch (err) {
    errorResponse(err)
  }
}

// 3.5 turbo model api
async function turbo(cache) {
  const openai = initConfiguration()

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: cache,
      temperature: 0,
      max_tokens: 200,
      top_p: 1.0,
      frequency_penalty: 0.8,
      presence_penalty: 0.0,
    })
    const res = response.data.choices[0].message.content.trim()
    return res
  } catch (err) {
    errorResponse(err)
  }
}

module.exports = {
  chat,
  explainCode,
  turbo,
}

function initConfiguration() {
  const configuration = new Configuration({
    organization: "org-7ks4y8LPKnuFd4EWbPxKBZxB",
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
        break
    }
  else error(err)

  process.exit(1)
}

function formatResponse(res) {
  if (res.startsWith("\n\n")) res = res.substring(2)
  if (res.startsWith("A: ")) res = res.substring(3)
  if (res.startsWith("Answer: ")) res = res.substring(8)
  return res
}
