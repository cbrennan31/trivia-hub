module.exports = {
  response: (response) => {
    let modifiedResponse = response.toLowerCase()
    modifiedResponse = modifiedResponse.trim()
    modifiedResponse = modifiedResponse.replace(/^an /, "")
    modifiedResponse = modifiedResponse.replace(/^the /, "")
    modifiedResponse = modifiedResponse.replace(/^a /, "")
    return modifiedResponse
  },

  answer: (answer) => {
    let modifiedAnswer = answer.toLowerCase()
    let div = document.createElement("div");
    div.innerHTML = modifiedAnswer;
    modifiedAnswer = div.textContent || "";

    modifiedAnswer = modifiedAnswer.trim()
    modifiedAnswer = modifiedAnswer.replace(/[()]/g, "")
    modifiedAnswer = modifiedAnswer.replace(/"/g, "")
    modifiedAnswer = modifiedAnswer.replace(/\\/g, "")
    modifiedAnswer = modifiedAnswer.replace(/^an /, "")
    modifiedAnswer = modifiedAnswer.replace(/^a /, "")
    modifiedAnswer = modifiedAnswer.replace(/^the /, "")
    return modifiedAnswer
  },

  question: (question) => {
    let modifiedQuestion = question.replace(/:/g, ": ")
    return modifiedQuestion
  },

  displayAnswer: (displayAnswer) => {
    let div = document.createElement("div");
    div.innerHTML = displayAnswer;
    let modifiedDisplayAnswer = div.textContent;
    modifiedDisplayAnswer = modifiedDisplayAnswer.trim()
    modifiedDisplayAnswer = modifiedDisplayAnswer.replace(/[()]/g, "")
    modifiedDisplayAnswer = modifiedDisplayAnswer.replace(/"/g, "")
    modifiedDisplayAnswer = modifiedDisplayAnswer.replace(/\\/g, "")
    modifiedDisplayAnswer = modifiedDisplayAnswer.replace(/^an /, "")
    modifiedDisplayAnswer = modifiedDisplayAnswer.replace(/^a /, "")
    modifiedDisplayAnswer = modifiedDisplayAnswer.replace(/^the /, "")
    return modifiedDisplayAnswer
  },
}
