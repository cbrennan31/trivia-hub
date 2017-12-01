import React, { Component } from 'react';

class UserScoreboard extends Component{

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render(){
    let that = this
    let values = that.props.clues.map (clue => {
      let className
      let correctClues = that.props.correctClues
      let incorrectClues = that.props.incorrectClues
      if (correctClues.includes(clue)) {
        className = "scoreboard-correct"
      } else if (incorrectClues.includes(clue)) {
        className = "scoreboard-incorrect"
      } else if (that.props.clues.indexOf(clue) ==
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

export default UserScoreboard;
