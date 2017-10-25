import React from 'react';
import ClueContainer from './ClueContainer'
import ScoreboardContainer from './ScoreboardContainer'

class App extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      cat1Clues: null,
      cat2Clues: null,
      correctQuestions: [],
      currentQuestionIndex: 0,
      latestQuestionCorrect: false,
      lostGame: false,
      numberCorrect: 0,
      score: 0,
      selectedCategory: null,
      wonGame: false
    }

    this.handleCorrectReponse = this.handleCorrectReponse.bind(this)
    this.handleNextQuestion = this.handleNextQuestion.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
    this.loseGame = this.loseGame.bind(this)
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
    if (this.state.lostGame || this.state.wonGame) {
      let newGame = {
        total_score: this.state.score,
        questions_correct: this.state.correctQuestions.length
      }
      fetch('/api/v1/games', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({newGame}),
        headers: { 'Content-Type': 'application/json'}
      })
      // .then GET BACK THE GAMES FOR THAT USER!
      // .then UPDATE USER WITH POINTS!
    }
  }

  handleCorrectReponse(clue){
    this.setState({
      latestQuestionCorrect: true,
      correctQuestions: this.state.correctQuestions.concat(clue),
      score: this.state.score + clue.value
    })
    if (this.state.currentQuestionIndex + 1 == this.state.cat1Clues.length) {
      this.setState({wonGame: true})
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

  loseGame(){
    this.setState({lostGame: true})
  }

  render(){
    let currentQuestionIndex = this.state.currentQuestionIndex

    let id1, id2;

    if (this.state.selectedCategory == null) {
      id1 = 1
      id2 = 2
    } else {
      id1 = this.state.selectedCategory
      id2 = this.state.selectedCategory
    }

    let categoryTitle1, categoryTitle2, clue1, clue2, scoreboardContainer, score;

    if (this.state.cat1Clues && this.state.cat2Clues) {
      score =
        <div className = "row score">
          <div className = "small-8 columns">
          </div>

          <div className = "small-4 columns score">
            <span>${this.state.score}</span><br/>
          </div>
        </div>

      scoreboardContainer =
        <ScoreboardContainer
          cat1Clues = {this.state.cat1Clues}
          correctQuestions = {this.state.correctQuestions}
          currentQuestionIndex = {this.state.currentQuestionIndex}
          score = {this.state.score}
        />

      if (this.state.selectedCategory != 2) {
        categoryTitle1 =
          <div className='category-title'>
            <span id={id1} onClick={this.handleSelection} >
              {this.state.cat1Clues[currentQuestionIndex].category.title}
            </span>
          </div>
      }

      if (this.state.selectedCategory != 1) {
        categoryTitle2 =
          <div className='category-title'>
            <span id = {id2} onClick = {this.handleSelection} >
              {this.state.cat2Clues[currentQuestionIndex].category.title}
            </span>
          </div>
      }

      if (this.state.selectedCategory == 1) {
        clue1 =
          <ClueContainer
            clue={this.state.cat1Clues[currentQuestionIndex]}
            lostGame={this.state.lostGame}
            wonGame={this.state.wonGame}
            latestQuestionCorrect={this.state.latestQuestionCorrect}

            loseGame={this.loseGame}
            handleCorrectReponse={this.handleCorrectReponse}
            handleNextQuestion={this.handleNextQuestion}
          />
      }

      if (this.state.selectedCategory == 2) {
        clue2 =
        <ClueContainer
          clue={this.state.cat2Clues[currentQuestionIndex]}
          lostGame={this.state.lostGame}
          wonGame={this.state.wonGame}
          latestQuestionCorrect={this.state.latestQuestionCorrect}

          loseGame={this.loseGame}
          handleCorrectReponse={this.handleCorrectReponse}
          handleNextQuestion={this.handleNextQuestion}
        />
      }
    }

    return (
      <div className = "row">
        <div className = "small-10 columns">
          {score}
          {categoryTitle1}
          {clue1}
          {categoryTitle2}
          {clue2}
        </div>
        <div className = "small-2 columns">
          {scoreboardContainer}
        </div>
      </div>
    )
  }
}

export default App
