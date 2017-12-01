import React, { Component } from 'react';

class Scoreboard extends Component{

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render(){
    let values = this.props.cat1Clues.map (clue => {
      let className
      let cat1Clue = clue
      let cat2Clue = this.props.cat2Clues[this.props.cat1Clues.indexOf(clue)]
      let correctClues = this.props.correctClues
      let incorrectClues = this.props.incorrectClues
      if (correctClues.includes(cat1Clue) || correctClues.includes(cat2Clue)) {
        className = "scoreboard-correct"
      } else if (incorrectClues.includes(cat1Clue) || incorrectClues.includes(cat2Clue)) {
        className = "scoreboard-incorrect"
      } else if (this.props.cat1Clues.indexOf(clue) ==
          this.props.currentQuestionIndex) {
        className = "scoreboard-current"
      } else {
        className = "scoreboard-upcoming"
      }
      return(<p className = {className} key = {this.props.cat1Clues.indexOf(clue)}>${clue.value}</p>)
    })

    values = values.reverse()

    return(
      <div className = "scoreboard-container">
        {values}
      </div>
    )
  }
}

export default Scoreboard;
