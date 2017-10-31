import React, { Component } from 'react';

class UserGamesContainer extends Component{

  constructor(props) {
    super(props);

    this.state = {
      games: null,
      clues: null
    }
  }

  componentDidMount(){
    fetch('/api/v1/user_games')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        games: body.games,
        clues: body.clues
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let games;
    if (this.state.games) {
      games = this.state.games.map ((game) => {
      let clues = this.state.clues.filter((c) => c.user_game_id == game.id)
       return(
       <div>
         <hr/>

         <div className = "user-game">
           <h3>{game.title}</h3>
           <i><p>{clues.length} questions</p></i>
           <h4>{game.description}</h4>
           <input type="button" id="button-play" className="button" value="Play"/>
         </div>
       </div>
       )
     })
    }
    return(
      <div>
        {games}
      </div>
    )
  }
}

export default UserGamesContainer;
