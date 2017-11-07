import React, { Component } from 'react';

class ScoreboardContainer extends Component{

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render(){
    let values = this.props.cat1Clues.map (clue => {
      let className

      let attemptedClues = this.props.incorrectClues.length +
        this.props.correctClues.length
        
      if ( this.props.cat1Clues.indexOf(clue) ==
        this.props.currentQuestionIndex) {
        className = "scoreboard-current"
      } else {
        className = "scoreboard-upcoming"
      }
      return(<p className = {className}>${clue.value}</p>)
    })
    return(
      <div className = "scoreboard-container">
        {values.reverse()}
      </div>
    )
  }
}

export default ScoreboardContainer;
