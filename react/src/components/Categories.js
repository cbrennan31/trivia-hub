import React, { Component } from 'react';

class Categories extends Component{

  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: null,
      Q1Correct: false,
      Q2Correct: false,
      Q1Response: "",
      Q2Response: ""
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit1 = this.handleSubmit1.bind(this)
    this.handleSubmit2 = this.handleSubmit2.bind(this)
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleNextQuestion = this.handleNextQuestion.bind(this)
  }

  handleClick(event) {
    this.setState( {selectedCategory: event.target.id })
  }

  handleSubmit1(event) {
    event.preventDefault();
    if (this.state.Q1Response == this.props.answer1) {
      this.setState( { Q1Correct: true })
    }
  }

  handleSubmit2(event) {
    event.preventDefault();
    if (this.state.Q2Response == this.props.answer2) {
      this.setState( { Q2Correct: true })
    }
  }

  handleChange1(event) {
    this.setState( { Q1Response: event.target.value } )
  }

  handleChange2(event) {
    this.setState( { Q2Response: event.target.value } )
  }

  handleNextQuestion() {
    this.setState( {
      selectedCategory: null,
      Q1Correct: false,
      Q2Correct: false,
      Q1Response: "",
      Q2Response: ""
    })
  }

  render(){
    // let retrieveQuestions = () => {
    //   this.props.retrieveQuestions();
    // }

    let id1;
    let id2;

    if (this.state.selectedCategory == null)
      id1 = 1
    else {
      id1 = this.state.selectedCategory
    }

    if (this.state.selectedCategory == null)
      id2 = 2
    else {
      id2 = this.state.selectedCategory
    }

    let body1;
    let body2;

    let correctMessage;

    if (this.state.Q1Correct || this.state.Q2Correct) {
      correctMessage =
      <div>
        <p>Correct</p>
        <input
          className = "button"
          onClick = {() => {
            this.props.retrieveQuestions();
            this.handleNextQuestion();
          }}
          value = "Next Question"
        />
      </div>
    }

    if (this.state.selectedCategory == 1) {
      body1 =
        <div>
          <p>{this.props.body1}</p>

          <form onSubmit = {this.handleSubmit1} >
            <label value = "Your response"/>
            <input
              type="text"
              value = {this.state.Q1Response}
              onChange = {this.handleChange1}
            />
            <input type="submit" />
          </form>
          {correctMessage}
        </div>

    }

    if (this.state.selectedCategory == 2) {
      body2 =
        <div>
          <p>{this.props.body2}</p>
          <div>
            <form onSubmit = {this.handleSubmit2} >
              <label value = "Your response"/>
              <input
                value = {this.state.Q2Response}
                onChange = {this.handleChange2}
                type="text"
              />
              <input type="submit" />
            </form>
          </div>
          {correctMessage}
        </div>
    }

    return(
      <div>
        <div>
          <p onClick = {this.handleClick} id = {id1}>{this.props.category1}</p>
          {body1}
        </div>

        <div>
          <p onClick = {this.handleClick} id = {id2}>{this.props.category2}</p>
          {body2}
        </div>
      </div>
    )
  }
}


export default Categories;
