import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Game from './containers/Game'
import GameFormContainer from './containers/GameFormContainer'
import UserGamesContainer from './containers/UserGamesContainer'

const Routes = props => {
  return(
    <Router history={browserHistory}>
      <Route path="user_games/new" component = {GameFormContainer} />
      <Route path="game" component = {Game} />
      <Route path="/user_games" component = {UserGamesContainer} />
    </Router>
  )
}

export default Routes;
