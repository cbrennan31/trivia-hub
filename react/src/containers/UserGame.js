import React, { Component } from 'react';
import ClueContainer from './ClueContainer'
import ScoreboardContainer from './ScoreboardContainer'

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
      numberCorrect: 0,
      score: 0,
      strikes: 0,
      wonGame: false
    }

    this.handleIncorrectResponse = this.handleIncorrectResponse.bind(this)
    this.handleCorrectReponse = this.handleCorrectReponse.bind(this)
    this.handleNextQuestion = this.handleNextQuestion.bind(this)
    // this.handleSelection = this.handleSelection.bind(this)
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
      this.setState({wonGame: true})
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
      this.setState({wonGame: true})
    }
  }

  render(){
    let currentQuestionIndex = this.state.currentQuestionIndex

    let clue, scoreboardContainer, score, clueContainer;

    if (this.state.clues) {
      score =
        <div className = "row score-and-question-container">
          <div className = "small-6 columns score">
            <span>Earnings | ${this.state.score}</span><br/>
            <span>Strikes | {this.state.strikes} of {this.state.maxStrikes}</span><br/>
          </div>
          <div className = "small-6 columns question">
            <span>This Clue | ${this.state.clues[currentQuestionIndex].value}</span><br/>
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
          wonGame={this.state.wonGame}
          latestQuestionCorrect={this.state.latestQuestionCorrect}

          handleIncorrectResponse={this.handleIncorrectResponse}
          handleCorrectReponse={this.handleCorrectReponse}
          handleNextQuestion={this.handleNextQuestion}
        />
    }

    return(
      <div className = "row game-container">
        <div className = "small-9 columns game-and-score-container">
          {score}
          {clueContainer}
        </div>
        <div className = "small-3 columns">
          {scoreboardContainer}
        </div>
      </div>
    )
  }
}

export default UserGame;
