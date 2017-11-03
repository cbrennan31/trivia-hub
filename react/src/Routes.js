import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Game from './containers/Game'
import GameFormContainer from './containers/GameFormContainer'
import UserGamesContainer from './containers/UserGamesContainer'
import ProfileContainer from './containers/ProfileContainer'
import UserGame from './containers/UserGame'

const Routes = props => {
  return(
    <Router history={browserHistory}>
      <Route path="/user_games/new" component = {GameFormContainer} />
      <Route path="/game" component = {Game} />
      <Route path="/user_games" component = {UserGamesContainer} />
      <Route path="/user_games/:id" component = {UserGame} />
      <Route path="/users/:id" component = {ProfileContainer} />
    </Router>
  )
}

export default Routes;
