import React, { Component } from 'react';
import GameForm from '../components/GameForm'
import ClueFormContainer from './ClueFormContainer'

class UpdateGameFormContainer extends Component{

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      strikes: null,
      clues: [],
      clueFormsDisplayed: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClueChange = this.handleClueChange.bind(this)
    this.openClueForm = this.openClueForm.bind(this)
    this.handleUpdateGame = this.handleUpdateGame.bind(this)
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


  componentDidMount(){
    let clues = []

    this.props.clues.forEach( clue => {
      let index = this.props.clues.indexOf(clue)
      Object.assign ( clues, { [index]: clue } )
    })

    this.setState({
      title: this.props.title,
      description: this.props.description,
      strikes: this.props.strikes,
      clues: clues
    }, () => {
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

  handleClueChange(obj, index) {
    let clues = this.state.clues
    Object.assign ( clues, { [index]: obj } )
    this.setState({clues: clues})
  }

  handleUpdateGame(event){
    event.preventDefault();
    let formPayload = {
      title: this.state.title,
      description: this.state.description,
      strikes: this.state.strikes,
      clues: Object.values(this.state.clues),
      id: this.props.id
    }
    this.props.handleUpdateGame(formPayload)
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
        <form onSubmit={this.handleUpdateGame}>
          <GameForm
            handleChange = {this.handleChange}
            title = {this.state.title}
            description = {this.state.description}
            strikes = {this.state.strikes}
          />
          {clueForms}
          {addClueDiv}
          <div className="text-center">
            <br/>
            <input type="submit" className="button button-small" value = "Update Game" />
          </div>
        </form>
      </div>
    )
  }
}

export default UpdateGameFormContainer;
