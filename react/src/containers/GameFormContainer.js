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
      clueFormsDisplayed: [],
      thanksMessage: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClueChange = this.handleClueChange.bind(this)
    this.openClueForm = this.openClueForm.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.handleGameRequest = this.handleGameRequest.bind(this)
    this.deleteNewClue = this.deleteNewClue.bind(this)
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

    this.setState({clues: clues}, () => {
      let clueFormsDisplayed = []

      Object.values(this.state.clues).forEach((clue) => {
        clueFormsDisplayed.push(true)
      })

      while (clueFormsDisplayed.length < 12) {
        clueFormsDisplayed.push(false)
      }

      this.setState({clueFormsDisplayed: clueFormsDisplayed})
    })
  }

  handleClearForm() {
    let clueFormsDisplayed = []

    while (clueFormsDisplayed.length < 12) {
      clueFormsDisplayed.push(false)
    }

    this.setState({
      title: '',
      description: '',
      strikes: null,
      clues: [],
      thanksMessage: "Your game has been submitted!",
      clueFormsDisplayed: clueFormsDisplayed
    })
  }

  handleGameRequest(event){
    event.preventDefault();
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

  deleteNewClue(index){
    let clues = this.state.clues
    clues.splice(index, 1)
    this.setState({clues: clues})

    let clueFormsDisplayed = this.state.clueFormsDisplayed
    Object.assign(clueFormsDisplayed, {[index]: false })

    let rearrangedForms = []
    clueFormsDisplayed.forEach((boolean)=>{
      if (boolean === true) {
        rearrangedForms.push(boolean)
      }
    })
    while (rearrangedForms.length < 12) {
      rearrangedForms.push(false)
    }
    this.setState({clueFormsDisplayed: rearrangedForms})

    let rearrangedClues = []
    this.state.clues.forEach((clue)=>{
      rearrangedClues.push(clue)
    })

    this.setState({clues: rearrangedClues})
  }

  openClueForm(){
    let clueFormsDisplayed = this.state.clueFormsDisplayed
    for (let i = 11; i >= 0; i = i-1) {
      if (clueFormsDisplayed[i] === false){
        Object.assign(clueFormsDisplayed, {[i]: true })
        break;
      }
    }
    let rearrangedForms = []
    clueFormsDisplayed.forEach((boolean)=>{
      if (boolean === true) {
        rearrangedForms.push(boolean)
      }
    })
    while (rearrangedForms.length < 12) {
      rearrangedForms.push(false)
    }
    this.setState({clueFormsDisplayed: rearrangedForms})
  }


  render(){
    let thanksMessage;
    if (this.state.thanksMessage) {
      thanksMessage = <h4>{this.state.thanksMessage}</h4>
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
      if (this.state.clueFormsDisplayed[i] === true) {
        clueForms.push(
          <div className = 'clue-form'>
            <ClueFormContainer
              edit = {false}
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

    if (this.state.clueFormsDisplayed.some((element) => element === false)) {
      addClueDiv =
        <div className="add-new-question" onClick={this.openClueForm}>
          <h4>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
            &nbsp;Add Clue
          </h4>
        </div>
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
          <input type="submit" className="button button-small" value = "Submit Game" />
        </form>
      </div>
    )
  }
}

export default GameFormContainer;
