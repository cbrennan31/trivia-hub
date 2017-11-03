import React, { Component } from 'react';
import * as modify from '../modules/modifyAnswersAndResponses.js'

class ClueContainer extends Component{

  constructor(props) {
    super(props);

    this.state = {
      response: '',
      answerSubmitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.clearResponse = this.clearResponse.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.latestQuestionCorrect == false) {
      this.setState({ answerSubmitted: true })
      let response = modify.response(this.state.response)
      let answer = modify.answer(this.props.clue.answer)
      if (response == answer) {
        this.props.handleCorrectReponse(this.props.clue)
      } else {
        this.props.handleIncorrectResponse(this.props.clue)
      }
    }
  }

  handleChange(event) {
    this.setState( { response: event.target.value } )
  }

  clearResponse() {
    this.setState( {response: '', answerSubmitted: false} )
  }

  render(){
    let categoryDiv

    if (this.props.userGame) {
      categoryDiv = <h2 className = "text-center">{this.props.clue.category}</h2>
    }
    
    let question = modify.question(this.props.clue.question)

    let submitDiv = <input
      className="button button-large"
      type="submit"
      value="Submit Answer"
    />

    if (this.props.strikes == 3) {
      submitDiv = <div><p>Sorry! Game over.</p></div>
    } else if (this.props.wonGame && this.props.latestQuestionCorrect){
      submitDiv = <div><p>Correct! You win!</p></div>
    } else if (this.props.wonGame) {
      submitDiv =
        <div>
          <p>Sorry! The correct answer is: ANSWER</p>
          <p>...but you're still a winner!</p>
        </div>
    } else if (this.props.latestQuestionCorrect) {
        submitDiv =
        <div>
          <p>Correct!</p>
          <input
            type="button"
            className = "button button-large"
            onClick = { () => {
                this.props.handleNextQuestion();
                this.clearResponse();
              }
            }
            value = "Next Question"
          />
        </div>
    } else if (this.props.strikes < this.props.maxStrikes && this.state.answerSubmitted) {
    submitDiv = <div>
      <p>Sorry! The correct answer is: ANSWER</p>
      <input
        type="button"
        className = "button button-large"
        onClick = { () => {
            this.props.handleNextQuestion();
            this.clearResponse();
          }
        }
        value = "Next Question"
      />
      </div>
    }

    return(
      <div className='clue'>
        {categoryDiv}
        <p>{question}</p>
        <div>
          <form onSubmit={this.handleSubmit} >
            <label value="Your response"/>
            <input
              value={this.state.response}
              onChange={this.handleChange}
              type="text"
              className="answer-input"
            />
            {submitDiv}
          </form>
        </div>
      </div>
    )
  }
}

export default ClueContainer;
