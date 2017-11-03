import React, { Component } from 'react';
import { Link } from 'react-router';
import Routes from '../Routes'

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
         <div className = "user-game">
           <h3>{game.title}</h3>
           <i><p>{clues.length} questions</p></i>
           <h4>{game.description}</h4>
           <a href = {`/user_games/${game.id}`}>
              <input type="button" className="button button-small" value="Play"/>
          </a>
         </div>
         <hr/>
         <br/>
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
