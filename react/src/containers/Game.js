import React from 'react';
import ClueContainer from './ClueContainer'
import Scoreboard from '../components/Scoreboard'
import Guidelines from '../components/Guidelines'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import DifficultyLevelModal from '../components/DifficultyLevelModal'

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
      maxStrikes: null,
      guidelinesOpen: false,
      showModal: true
    }

    this.handleIncorrectResponse = this.handleIncorrectResponse.bind(this)
    this.handleCorrectResponse = this.handleCorrectResponse.bind(this)
    this.handleNextQuestion = this.handleNextQuestion.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
    this.openGuidelines = this.openGuidelines.bind(this)
    this.selectDifficultyLevel = this.selectDifficultyLevel.bind(this)
  }

  selectDifficultyLevel(difficultyLevel) {
    this.setState({showModal: false})

    let that = this;

    fetch('/api/v1/clues', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({difficulty_level: difficultyLevel}),
      headers: { 'Content-Type': 'application/json' }
    })
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
      let maxStrikes

      if (difficultyLevel == 'Hard') {
        maxStrikes = 2
      } else {
        maxStrikes = 3
      }

      that.setState({
        cat1Clues: body[0],
        cat2Clues: body[1],
        maxStrikes: maxStrikes
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

  handleCorrectResponse(clue){
    this.setState({
      latestQuestionCorrect: true,
      correctClues: this.state.correctClues.concat(clue),
      score: this.state.score + clue.value,
      moneyAppear: true
    })
    if (this.state.currentQuestionIndex + 1 == this.state.cat1Clues.length) {
      this.setState({gameOver: true})
    }
  }

  handleNextQuestion(){
    this.setState({
      latestQuestionCorrect: false,
      selectedCategory: null,
      moneyAppear: false
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
    let difficultyLevelModal;

    if (this.state.showModal == true) {
      difficultyLevelModal = <DifficultyLevelModal
        showModal = {this.state.showModal}
        selectDifficultyLevel = {this.selectDifficultyLevel}
      />
    }

    let guidelinesText = "Show Guidelines"
    let guidelinesContent

    if (this.state.guidelinesOpen) {
      guidelinesText = "Hide Guidelines"
      guidelinesContent = <Guidelines />
    }

    let loadingClass = "loading"

    if (this.state.showModal) {
      loadingClass = ''
    }

    let id1 = 1, id2 = 2;

    if (this.state.selectedCategory) {
      id1 = this.state.selectedCategory
      id2 = this.state.selectedCategory
    }

    let categoryTitle1, categoryTitle2, clue1, clue2, scoreboard, score;

    let currentQuestionIndex = this.state.currentQuestionIndex

    if (this.state.cat1Clues && this.state.cat2Clues) {
      loadingClass = ''
      let strikeCircles = []
      // separate component - lines 186-203
      for (let i=0; i < this.state.strikes; i++) {
        strikeCircles.push(<div className = "circle-selected" key = {i}/>)
      }

      for (let i=this.state.strikes; i < this.state.maxStrikes; i++) {
        strikeCircles.push(<div className = "circle" key = {i}/>)
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
            <span id="current-value" >${this.state.cat1Clues[currentQuestionIndex].value}</span>
          </div>
        </div>

      scoreboard =
        <Scoreboard
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
            handleCorrectResponse={this.handleCorrectResponse}
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
            handleCorrectResponse={this.handleCorrectResponse}
            handleNextQuestion={this.handleNextQuestion}
          />
      }
    }

    return (
      <div>
        {difficultyLevelModal}

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

              <CSSTransitionGroup transitionName="clue" transitionEnterTimeout={800} transitionLeaveTimeout={1}>
                {clue1}
              </CSSTransitionGroup>

              {categoryTitle2}

              <CSSTransitionGroup transitionName="clue" transitionEnterTimeout={800} transitionLeaveTimeout={1}>
                {clue2}
              </CSSTransitionGroup>

            </div>

            <div className = "small-3 columns">
              {scoreboard}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Game
