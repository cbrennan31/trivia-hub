import React from 'react';
import Categories from '../components/Categories'
const js = require('jservice-node')
const validator = require('../modules/validAnswer')

class App extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      cat1Question: null,
      cat2Question: null,
      score: 0
    }

    this.retrieveQuestions = this.retrieveQuestions.bind(this)
  }

  retrieveQuestions() {
    let that = this;

    let getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let random1 = getRandomIntInclusive(0, 23656);
    let cat1QuestionIndex = getRandomIntInclusive(0, 99);

    let random2 = getRandomIntInclusive(0, 23656)
    let cat2QuestionIndex = getRandomIntInclusive(0, 99);

    let setQuestion2 = () => {
      js.clues({ value: 200, offset: random2, max_date: '2000-01-01' },
        (error, response, array) => {
          if(!error && response.statusCode == 200){
            // while loop to validate answer
            while(
              (array[cat2QuestionIndex].category.title ===
                that.state.cat1Question.category.title) ||
                !validator.valid(array[cat2QuestionIndex])
            ) {
              cat2QuestionIndex == getRandomIntInclusive(0, 99);
            }

            that.setState( {
              cat2Question: array[cat2QuestionIndex]
            } )
        } else {
          console.log(`Error: ${response.statusCode}`);
        }
      });
    }

    js.clues({ value: 200, offset: random2, max_date: '2000-01-01' },
      (error, response, array) => {
        if(!error && response.statusCode == 200){
          while( !validator.valid(array[cat1QuestionIndex]) ) {
            cat1QuestionIndex = getRandomIntInclusive(0, 99);
          }

          that.setState( {
            cat1Question: array[cat1QuestionIndex]
          } )

          setQuestion2();
        } else {
          console.log(`Error: ${response.statusCode}`);
        }
      }
    );
  }

  componentDidMount() {
    this.retrieveQuestions();
  }

  render(){
    let content;
    if (this.state.cat1Question && this.state.cat2Question) {
      content =
        <div>
          <Categories
            retrieveQuestions = {this.retrieveQuestions}
            category1 = {this.state.cat1Question.category.title}
            body1 = {this.state.cat1Question.question}
            answer1 = {this.state.cat1Question.answer}

            category2 = {this.state.cat2Question.category.title}
            body2 = {this.state.cat2Question.question}
            answer2 = {this.state.cat2Question.answer}
          />
        </div>
    }

    return (
      <div>{content}</div>
    )
  }
}

export default App
