let striptags = require('striptags')

module.exports = {
  response: (response) => {
    let modifiedResponse = response.toLowerCase()
    modifiedResponse = modifiedResponse.trim()
    modifiedResponse = modifiedResponse.replace("an ", "")
    modifiedResponse = modifiedResponse.replace("the ", "")
    modifiedResponse = modifiedResponse.replace("a ", "")
    return modifiedResponse
  },

  answer: (answer) => {
    let modifiedAnswer = answer.toLowerCase()
    modifiedAnswer = modifiedAnswer.replace(/[()]/g, "")
    modifiedAnswer = striptags(modifiedAnswer)
    modifiedAnswer = modifiedAnswer.replace("an ", "")
    modifiedAnswer = modifiedAnswer.replace("the ", "")
    modifiedAnswer = modifiedAnswer.replace("a ", "")
    modifiedAnswer = modifiedAnswer.replace(/"/g, "")
    modifiedAnswer = modifiedAnswer.replace(/\\/g, "")
    return modifiedAnswer
  },

  question: (question) => {
    let modifiedQuestion = question.replace(/:/g, ": ")
    return modifiedQuestion
  }
}
