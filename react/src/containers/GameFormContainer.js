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
      clues: {},
      numberOfClueForms: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClueChange = this.handleClueChange.bind(this)
    this.openClueForm = this.openClueForm.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.handleGameRequest = this.handleGameRequest.bind(this)
  }

  handleChange(event){
    if (event.target) {
      let value = event.target.value;
      this.setState({ [event.target.name]: value })
    } else {
      this.setState({strikes: event})
    }
  }

  handleClueChange(obj, index) {
    if ( obj.question != '' && obj.answer != '' && obj.category != '') {
      let clues = this.state.clues
      Object.assign ( clues, { [index]: obj } )
      this.setState({clues: clues})
    } else {
      let clues = this.state.clues
      delete clues[index]
      this.setState({clues: clues})
    }
  }

  handleClearForm() {
    this.setState({
      title: '',
      description: '',
      strikes: null,
      clues: {},
      numberOfClueForms: 0
    })
  }

  handleGameRequest(event){
    event.preventDefault();
    let formPayload = {
      title: this.state.title,
      description: this.state.description,
      strikes: this.state.strikes,
      clues: Object.values(this.state.clues)
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

  openClueForm(){
    if (this.state.numberOfClueForms < 12) {
      this.setState({ numberOfClueForms: this.state.numberOfClueForms + 1 })
    }
  }

  render(){
    let numberOfClueForms = this.state.numberOfClueForms

    let clueForms = []

    for (let i=0; i < numberOfClueForms; i++) {
      clueForms.push(<ClueFormContainer
        id = {clueForms.length}
        handleClueChange = {this.handleClueChange}
      />)
    }

    let addClueDiv;

    if (this.state.numberOfClueForms < 12) {
      addClueDiv =
        <div className="add-new-question" onClick={this.openClueForm}>
          <h4>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
            &nbsp;Add Clue
          </h4>
        </div>
    }

    return(
      <form onSubmit={this.handleGameRequest}>
        <GameForm
          handleChange = {this.handleChange}
          title = {this.state.title}
          description = {this.state.description}
          strikes = {this.state.strikes}
        />

        {clueForms}

        {addClueDiv}

        <input className="button site-submit" type="submit" value="Submit Game" />
      </form>
    )
  }
}

export default GameFormContainer;
