/** Cache Class to handle the turbo 3.5 model request & response message
 */

class Cache {
  constructor() {
    this.cache = []
  }

  firstChat(message) {
    const msg = {
      role: "system",
      content: message,
    }
    this.cache.push(msg)
  }

  ask(message) {
    const msg = {
      role: "user",
      content: message,
    }
    this.cache.push(msg)
  }

  answer(message) {
    const msg = {
      role: "assistant",
      content: message,
    }
    this.cache.push(msg)
  }

  // if is pattern mode, inject previous pattern content to current cache
  injectPattern(pattern) {
    pattern.read()
    const patternContent = pattern.PATTERN_CONTENT
    const userList = patternContent.user
    const assistantList = patternContent.assistant

    let p = 0

    while(p < userList.length) {
      if(p === 0) {
        this.firstChat(userList[p].system)
        this.answer(assistantList[p].assistant)
        p++
        continue
      }

      this.ask(userList[p].user)
      this.answer(assistantList[p].assistant)
      p++
    }
  }
}

module.exports = Cache
