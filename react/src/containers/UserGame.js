import React, { Component } from 'react';
import ClueContainer from './ClueContainer'
import ScoreboardContainer from './ScoreboardContainer'
import Guidelines from '../components/Guidelines'

class UserGame extends Component{

  constructor(props) {
    super(props);

    this.state = {
      clues: null,
      title: null,
      description: null,
      maxStrikes: null,
      correctClues: [],
      incorrectClues: [],
      currentQuestionIndex: 0,
      latestQuestionCorrect: false,
      score: 0,
      strikes: 0,
      gameOver: false,
      guidelinesOpen: false
    }

    this.handleIncorrectResponse = this.handleIncorrectResponse.bind(this)
    this.handleCorrectReponse = this.handleCorrectReponse.bind(this)
    this.handleNextQuestion = this.handleNextQuestion.bind(this)
    this.openGuidelines = this.openGuidelines.bind(this)
  }

  componentDidMount() {
    let id = document.getElementById('app').dataset.currentgameid
    fetch(`/api/v1/user_games/${id}`)
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
      this.setState({
        clues: body.clues,
        title: body.game.title,
        description: body.game.description,
        maxStrikes: body.game.strikes
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleCorrectReponse(clue){
    this.setState({
      latestQuestionCorrect: true,
      correctClues: this.state.correctClues.concat(clue),
      score: this.state.score + clue.value
    })
    if (this.state.currentQuestionIndex + 1 == this.state.clues.length) {
      this.setState({gameOver: true})
    }
  }

  handleNextQuestion(){
    this.setState({
      latestQuestionCorrect: false
    })

    let currentQuestionIndex = this.state.currentQuestionIndex
    if (currentQuestionIndex + 1 < this.state.clues.length) {
      currentQuestionIndex++
      this.setState({currentQuestionIndex: currentQuestionIndex})
    }
  }

  handleIncorrectResponse(clue){
    this.setState({
      strikes: this.state.strikes + 1,
      incorrectClues: this.state.incorrectClues.concat(clue)
    })
    if (this.state.currentQuestionIndex + 1 == this.state.clues.length) {
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

    let currentQuestionIndex = this.state.currentQuestionIndex

    let clue, scoreboardContainer, score, clueContainer;

    if (this.state.clues) {
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
              <tr id="earnings-top">
                <td>Earnings</td>
                <td>${this.state.score}</td>
              </tr>
              <tr>
                <td>Strikes</td>
                <td>{strikeCircles}</td>
              </tr>
            </table>
          </div>
          <div className = "small-6 columns question">
            <span id="current-value" >${this.state.clues[currentQuestionIndex].value}</span>
          </div>
        </div>

      scoreboardContainer =
        <ScoreboardContainer
          cat1Clues = {this.state.clues}
          correctClues = {this.state.correctClues}
          incorrectClues = {this.state.incorrectClues}
          currentQuestionIndex = {this.state.currentQuestionIndex}
          score = {this.state.score}
        />

      clueContainer =
        <ClueContainer
          userGame={true}
          clue={this.state.clues[currentQuestionIndex]}
          strikes={this.state.strikes}
          maxStrikes={this.state.maxStrikes}
          gameOver={this.state.gameOver}
          latestQuestionCorrect={this.state.latestQuestionCorrect}

          handleIncorrectResponse={this.handleIncorrectResponse}
          handleCorrectReponse={this.handleCorrectReponse}
          handleNextQuestion={this.handleNextQuestion}
        />
    }

    return(
      <div>
        <div className="guidelines text-left">
          <h5 id="guidelines-header" onClick={this.openGuidelines}>{guidelinesText}</h5>
          <hr/>
          {guidelinesContent}
        </div>

        <div className = "row game-container">
          <div className = "small-9 columns game-and-score-container">
            {score}
            {clueContainer}
          </div>

          <div className = "small-3 columns">
            {scoreboardContainer}
          </div>
        </div>
      </div>
    )
  }
}

export default UserGame;
