const { Configuration, OpenAIApi } = require("openai")
const { log, error } = require("../utils/log")

// chat model api
async function chat(prompt) {
  const openai = initConfiguration()
  let response = ""
  try {
    response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Q: ${prompt} \n`,
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
      stop: ["Q: "],
    })
  } catch (err) {
    errorResponse(err.response)
  }

  const res = response.data.choices[0].text.trim()
  return formatResponse(res)
}

// explain code model api
async function explainCode(prompt) {
  const openai = initConfiguration()

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
  let res = response.data.choices[0].text.trim()
  return res
}

function initConfiguration() {
  const configuration = new Configuration({
    apiKey: require("../../KEY.json").OPENAI_API,
  })
  return new OpenAIApi(configuration)
}

function errorResponse(response) {
  switch (response.status) {
    case 401:
      log()
      error("your OpenAI key is incorrect, please change correct one")
      break

    default:
      break
  }

  process.exit(1)
}

module.exports = {
  chat,
  explainCode,
}

function formatResponse(res) {
  if (res.startsWith("\n\n")) res = res.substring(2)
  if (res.startsWith("A: ")) res = res.substring(3)
  if (res.startsWith("Answer: ")) res = res.substring(8)
  return res
}
