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
}

module.exports = Cache
