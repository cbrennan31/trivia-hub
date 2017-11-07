import React from 'react';
import ClueContainer from './ClueContainer'
import ScoreboardContainer from './ScoreboardContainer'
import Guidelines from '../components/Guidelines'

class Game extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      cat1Clues: null,
      cat2Clues: null,
      correctClues: [],
      incorrectClues: [],
      currentQuestionIndex: 0,
      latestQuestionCorrect: false,
      strikes: 0,
      score: 0,
      selectedCategory: null,
      gameOver: false,
      maxStrikes: 3,
      guidelinesOpen: false
    }

    this.handleIncorrectResponse = this.handleIncorrectResponse.bind(this)
    this.handleCorrectReponse = this.handleCorrectReponse.bind(this)
    this.handleNextQuestion = this.handleNextQuestion.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
    this.openGuidelines = this.openGuidelines.bind(this)
  }

  componentDidMount() {
    let that = this;
    fetch('/api/v1/clues.json')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      that.setState({
        cat1Clues: body[0],
        cat2Clues: body[1]
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidUpdate() {
    if (this.state.strikes == 3 || this.state.gameOver) {
      let newGame = {
        total_score: this.state.score,
        questions_correct: this.state.correctClues.length
      }
      fetch('/api/v1/games', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({newGame}),
        headers: { 'Content-Type': 'application/json'}
      })
    }
  }

  handleCorrectReponse(clue){
    this.setState({
      latestQuestionCorrect: true,
      correctClues: this.state.correctClues.concat(clue),
      score: this.state.score + clue.value
    })
    if (this.state.currentQuestionIndex + 1 == this.state.cat1Clues.length) {
      this.setState({gameOver: true})
    }
  }

  handleNextQuestion(){
    this.setState({
      latestQuestionCorrect: false,
      selectedCategory: null
    })

    let currentQuestionIndex = this.state.currentQuestionIndex
    if (currentQuestionIndex + 1 < this.state.cat1Clues.length) {
      currentQuestionIndex++
      this.setState({currentQuestionIndex: currentQuestionIndex})
    }
  }

  handleSelection(event) {
    this.setState( {
      selectedCategory: event.target.id,
      latestQuestionCorrect: false
    })
  }

  handleIncorrectResponse(clue){
    this.setState({
      strikes: this.state.strikes + 1,
      incorrectClues: this.state.incorrectClues.concat(clue)
    })
    if (this.state.currentQuestionIndex + 1 == this.state.cat1Clues.length) {
      this.setState({gameOver: true})
    }
  }

  openGuidelines() {
    this.setState({guidelinesOpen: !this.state.guidelinesOpen})
  }

  render(){
    let guidelinesText = "Show Guidelines"
    let guidelinesContent

    if (this.state.guidelinesOpen) {
      guidelinesText = "Hide Guidelines"
      guidelinesContent = <Guidelines />
    }

    let loadingClass = "loading"

    let currentQuestionIndex = this.state.currentQuestionIndex

    let id1 = 1, id2 = 2;

    if (this.state.selectedCategory) {
      id1 = this.state.selectedCategory
      id2 = this.state.selectedCategory
    }

    let categoryTitle1, categoryTitle2, clue1, clue2, scoreboardContainer, score;

    if (this.state.cat1Clues && this.state.cat2Clues) {
      loadingClass = ''
      let strikeCircles = []

      for (let i=0; i < this.state.strikes; i++) {
        strikeCircles.push(<div className = "circle-selected"/>)
      }

      for (let i=this.state.strikes; i < this.state.maxStrikes; i++) {
        strikeCircles.push(<div className = "circle" />)
      }

      score =
        <div className = "row score-and-question-container">
          <div className = "small-6 columns score">
            <table className = "earnings-table">
              <tbody>
                <tr id="earnings-top">
                  <td>Earnings</td>
                  <td>${this.state.score}</td>
                </tr>
                <tr>
                  <td>Strikes</td>
                  <td>{strikeCircles}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className = "small-6 columns question">
            <span id="current-value" >${this.state.cat1Clues[currentQuestionIndex].value}</span>
          </div>
        </div>

      scoreboardContainer =
        <ScoreboardContainer
          cat1Clues = {this.state.cat1Clues}
          cat2Clues = {this.state.cat2Clues}
          correctClues = {this.state.correctClues}
          incorrectClues = {this.state.incorrectClues}
          currentQuestionIndex = {this.state.currentQuestionIndex}
          score = {this.state.score}
        />

      if (this.state.selectedCategory != 2) {
        categoryTitle1 =
          <div className='category-title'>
            <p className = "no-margin" id = {id1} onClick = {this.handleSelection} >
              {this.state.cat1Clues[currentQuestionIndex].category.title}
            </p>
          </div>
      }

      if (this.state.selectedCategory != 1) {
        categoryTitle2 =
          <div className='category-title'>
            <p className = "no-margin" id = {id2} onClick = {this.handleSelection} >
              {this.state.cat2Clues[currentQuestionIndex].category.title}
            </p>
          </div>
      }

      if (this.state.selectedCategory == 1) {
        clue1 =
          <ClueContainer
            clue={this.state.cat1Clues[currentQuestionIndex]}
            strikes={this.state.strikes}
            gameOver={this.state.gameOver}
            latestQuestionCorrect={this.state.latestQuestionCorrect}
            maxStrikes={this.state.maxStrikes}

            handleIncorrectResponse={this.handleIncorrectResponse}
            handleCorrectReponse={this.handleCorrectReponse}
            handleNextQuestion={this.handleNextQuestion}
          />
      }

      if (this.state.selectedCategory == 2) {
        clue2 =
        <ClueContainer
          clue={this.state.cat2Clues[currentQuestionIndex]}
          strikes={this.state.strikes}
          gameOver={this.state.gameOver}
          latestQuestionCorrect={this.state.latestQuestionCorrect}
          maxStrikes={this.state.maxStrikes}

          handleIncorrectResponse={this.handleIncorrectResponse}
          handleCorrectReponse={this.handleCorrectReponse}
          handleNextQuestion={this.handleNextQuestion}
        />
      }
    }

    return (
      <div className = {loadingClass}>
        <div className="guidelines text-left">
          <h5 id="guidelines-header" onClick={this.openGuidelines} >{guidelinesText}</h5>
          <hr/>
          {guidelinesContent}
        </div>

        <div className = "row game-container">
          <div className = "small-9 columns game-and-score-container">
            {score}
            {categoryTitle1}
            {clue1}
            {categoryTitle2}
            {clue2}
          </div>

          <div className = "small-3 columns">
            {scoreboardContainer}
          </div>
        </div>
      </div>
    )
  }
}

export default Game
