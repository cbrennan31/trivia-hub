import React, { Component } from 'react';
import UpdateGameFormContainer from './UpdateGameFormContainer'

class ProfileContainer extends Component{

  constructor(props) {
    super(props);

    this.state = {
      games: null,
      clues: null,
      gamesBeingEdited: [],
      thanksMessage: null
    }

    this.editGame = this.editGame.bind(this)
    this.handleUpdateGame = this.handleUpdateGame.bind(this)
  }

  componentDidMount(){
    let id = document.getElementById('app').dataset.currentuserid
    fetch(`/api/v1/users/${id}`)
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
        clues: body.clues,
        thanksMessage: null
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  editGame(event){
    this.setState({gamesBeingEdited: this.state.gamesBeingEdited.concat(event.target.id)})
  }

  handleUpdateGame(formPayload, method){
    let id = formPayload.id

    fetch(`/api/v1/user_games/${formPayload.id}`, {
      credentials: 'same-origin',
      method: method,
      body: JSON.stringify(formPayload),
      headers: { 'Content-Type': 'application/json' }
    })
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
        clues: body.clues,
        gamesBeingEdited: [],
        thanksMessage: "Your changes have been saved."
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    let gameDiv;
    let thanksMessage;

    if (this.state.games) {
      if (this.state.thanksMessage) {
        thanksMessage = <h4><i>{this.state.thanksMessage}</i></h4>
      }

      let that = this
      gameDiv = that.state.games.map ((game) => {
        let index = that.state.games.indexOf(game).toString()
        if (that.state.gamesBeingEdited.includes(index)) {
          let clues = that.state.clues.filter( (c) => c.user_game_id == game.id)
          return(
            <div>
              <hr/>
              <div className='user-game'>
                <div className='update-form'>
                  <UpdateGameFormContainer
                    id = {game.id}
                    clues = {clues}
                    strikes = {game.strikes}
                    title = {game.title}
                    description = {game.description}
                    handleUpdateGame = {this.handleUpdateGame}
                    deleteExistingClue = {this.deleteExistingClue}
                  />
                </div>
              </div>
            </div>
          )
        } else {
          return(
            <div>
              <hr/>
              <div className = 'user-game'>
                <h3>{game.title}</h3>
                <h5>{game.description}</h5>

                <input
                  id={index}
                  type="button"
                  className="button button-small"
                  value="Edit"
                  onClick={this.editGame}
                />
              </div>
            </div>
          )
        }
      })
    }

    return(
      <div>
        <h2>My Games</h2>
        {thanksMessage}
        {gameDiv}
      </div>
    )
  }
}

export default ProfileContainer;
