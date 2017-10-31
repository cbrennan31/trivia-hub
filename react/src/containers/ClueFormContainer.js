import React, { Component } from 'react';
import ClueForm from '../components/ClueForm'

class ClueFormContainer extends Component{

  constructor(props) {
    super(props);

    this.state = {
      value: 200,
      category: "",
      question: "",
      answer: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    let value = event.target.value;
    this.setState({ [event.target.name]: value },
      () => {this.props.handleClueChange(this.state, this.props.id)})
  }

  render(){

    return(
      <ClueForm
        handleChange = {this.handleChange}
      />
    )
  }
}

export default ClueFormContainer;
