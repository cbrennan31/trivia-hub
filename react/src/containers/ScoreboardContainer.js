import React, { Component } from 'react';

class ScoreboardContainer extends Component{

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render(){
    let that = this
    let values = that.props.cat1Clues.map (clue => {
      let className
      let cat1Clue = clue
      let cat2Clue = that.props.cat2Clues[that.props.cat1Clues.indexOf(clue)]
      let correctClues = that.props.correctClues
      let incorrectClues = that.props.incorrectClues
      if (correctClues.includes(cat1Clue) || correctClues.includes(cat2Clue)) {
        className = "scoreboard-correct"
      } else if (incorrectClues.includes(cat1Clue) || incorrectClues.includes(cat2Clue)) {
        className = "scoreboard-incorrect"
      } else if (that.props.cat1Clues.indexOf(clue) ==
          that.props.currentQuestionIndex) {
        className = "scoreboard-current"
      } else {
        className = "scoreboard-upcoming"
      }
      return(<p className = {className}>${clue.value}</p>)
    })

    values = values.reverse()

    return(
      <div className = "scoreboard-container">
        {values}
      </div>
    )
  }
}

export default ScoreboardContainer;
