class UserGamesController < ApplicationController

  def new
    @user_game_new = true
  end

  def index
    @user_games = true
  end
end
