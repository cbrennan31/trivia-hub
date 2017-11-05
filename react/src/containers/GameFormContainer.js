import React, { Component } from 'react';
import GameForm from '../components/GameForm'
import ClueFormContainer from './ClueFormContainer'

class GameFormContainer extends Component{

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      strikes: null,
      clues: [],
      clueFormsDisplayed: 0,
      thanksMessage: null,
      errors: {
        titleError: null,
        descriptionError: null,
        strikesError: null,
        numberOfCluesError: null,
        categoryError: null,
        questionError: null,
        answerError: null
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClueChange = this.handleClueChange.bind(this)
    this.openClueForm = this.openClueForm.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.handleGameRequest = this.handleGameRequest.bind(this)
    this.deleteNewClue = this.deleteNewClue.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.assignError = this.assignError.bind(this)
  }

  handleChange(event){
    if (event.target) {
      let value = event.target.value;
      this.setState({ [event.target.name]: value })
    } else {
      this.setState({strikes: event})
    }
  }

  // For the react-radio-button-group library, the value property is
  // automatically passed in at the argument to any function called onChange

  handleClueChange(obj, index) {
    let clues = this.state.clues
    Object.assign ( clues, { [index]: obj } )
    this.setState({clues: clues})
  }

  componentDidMount(){
    let clues = this.state.clues

    this.setState({clues: clues, clueFormsDisplayed: clues.length})
  }

  handleClearForm() {
    this.setState({
      title: '',
      description: '',
      strikes: null,
      clues: [],
      thanksMessage: "Your game has been submitted!",
      clueFormsDisplayed: 0
    })
  }

  handleGameRequest(event){
    event.preventDefault();
    if ( this.validateForm() ) {
      let formPayload = {
        title: this.state.title,
        description: this.state.description,
        strikes: this.state.strikes,
        clues: this.state.clues,
      }

      fetch('/api/v1/user_games', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(formPayload),
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
      .catch(error => console.error(`Error in fetch: ${error.message}`))
      this.handleClearForm()
    }
  }

  deleteNewClue(index){
    let clues = this.state.clues
    clues.splice(index, 1)

    let clueFormsDisplayed = this.state.clueFormsDisplayed
    this.setState({clues: clues, clueFormsDisplayed: clueFormsDisplayed - 1})
  }

  openClueForm(){
    let clueFormsDisplayed = this.state.clueFormsDisplayed
    this.setState({clueFormsDisplayed: clueFormsDisplayed + 1})
  }

  assignError(field, message) {
    let errors = this.state.errors
    Object.assign(errors, {[field]: message})
    this.setState({errors: errors})
  }

  validateForm() {
    let valid = true
    if ( this.state.title == "" || this.state.title == null ) {
      this.assignError("titleError", "Your game should include a title.")
      valid = false
    } else {
      this.assignError("titleError", null)
    }
    if ( this.state.description == "" || this.state.description == null ) {
      this.assignError("descriptionError", "Your game should include a description.")
      valid = false
    } else {
      this.assignError("descriptionError", null)
    }
    if (this.state.strikes == null) {
      this.assignError("strikesError", "Your game should include a number of strikes.")
      valid = false
    } else {
      this.assignError("strikesError", null)
    }
    if (this.state.clues.length < 2) {
      this.assignError("numberOfCluesError", "Your game should include at least two clues.")
      valid = false
    } else {
      this.assignError("numberOfCluesError", null)
    }
    if (this.state.clues.some( e => e.category == null || e.category == '')) {
      this.assignError("categoryError", "Each clue should include a category.")
      valid = false
    } else {
      this.assignError("categoryError", null)
    }
    if (this.state.clues.some( e => e.question == null || e.question == '')) {
      this.assignError("questionError", "Each clue should include a question.")
      valid = false
    } else {
      this.assignError("questionError", null)
    }
    if (this.state.clues.some( e => e.answer == null || e.answer == '')) {
      this.assignError("answerError", "Each clue should include a answer.")
      valid = false
    } else {
      this.assignError("answerError", null)
    }
    return valid;
  }

  render(){
    let thanksMessage;
    if (this.state.thanksMessage) {
      thanksMessage = <h4><i>{this.state.thanksMessage}</i></h4>
    }
    
    let clues = this.state.clues

    let filledClueForms = clues.map( clue => {
      let index = clues.indexOf(clue)
      let deleteNewClue = () => {
        this.deleteNewClue(index)
      }

      return (
        <div className = 'clue-form'>
          <ClueFormContainer
            id = {index}
            value = {clue.value}
            question = {clue.question}
            category = {clue.category}
            answer = {clue.answer}
            handleClueChange = {this.handleClueChange}
            deleteFunction = {deleteNewClue}
          />
        </div>
      )
    })

    let clueForms = []
    clueForms = clueForms.concat(filledClueForms)

    for (let i = clues.length; i < 12; i++) {
      let deleteNewClue = () => {this.deleteNewClue(i)}
      let value = 200, question = '', category = '', answer = ''
      if (this.state.clues[i]) {
        let clue = this.state.clues[i]
        value = clue.value
        question = clue.question
        category = clue.category
        answer = clue.answer
      }
      if (i < this.state.clueFormsDisplayed) {
        clueForms.push(
          <div className = 'clue-form'>
            <ClueFormContainer
              id = {i}
              handleClueChange = {this.handleClueChange}
              value = {value}
              question = {question}
              category = {category}
              answer = {answer}
              deleteFunction = {deleteNewClue}
            />
          </div>
        )
      }
    }

    let addClueDiv

    if (this.state.clueFormsDisplayed <= 12) {
      addClueDiv =
        <div className="add-new-question" onClick={this.openClueForm}>
          <h4>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
            &nbsp;Add Clue
          </h4>
        </div>
    }

    let errorDiv

    if (Object.values(this.state.errors).some(e => e !== null)) {
      errorDiv = Object.values(this.state.errors).map ( error => {
        if (error !== null) {return(<p><i>{error}</i></p>)}
      })
    }

    return(
      <div>
        {thanksMessage}
        <form onSubmit={this.handleGameRequest}>
          <GameForm
            handleChange = {this.handleChange}
            title = {this.state.title}
            description = {this.state.description}
            strikes = {this.state.strikes}
          />
          {clueForms}
          {addClueDiv}
          <br/>
          {errorDiv}
          <input type="submit" className="button button-small" value = "Submit Game" />
        </form>
      </div>
    )
  }
}

export default GameFormContainer;
