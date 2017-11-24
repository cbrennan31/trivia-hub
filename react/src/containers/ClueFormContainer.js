import React, { Component } from 'react';
import ClueForm from '../components/ClueForm'

class ClueFormContainer extends Component{

  constructor(props) {
    super(props);

    this.state = {
      value: 200,
      category: "",
      question: "",
      answer: "",
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.setState({
      value: this.props.value,
      category: this.props.category,
      question: this.props.question,
      answer: this.props.answer
    })
  }

  componentWillReceiveProps(newProps){
    this.setState({
      value: newProps.value,
      category: newProps.category,
      question: newProps.question,
      answer: newProps.answer
    })
  }

  handleChange(event){
    let value = event.target.value;
    this.setState({ [event.target.name]: value },
      () => {this.props.handleClueChange(this.state, this.props.id)}
    )
  }

  render(){

    return(
        <ClueForm
          deleteFunction = {this.props.deleteFunction}
          value = {this.state.value}
          category = {this.state.category}
          question = {this.state.question}
          answer = {this.state.answer}
          handleChange = {this.handleChange}
        />
    )
  }
}

export default ClueFormContainer;
