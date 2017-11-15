class UserGamesController < ApplicationController

  def new
    if current_user
      @user_game_new = true
    else
      render '/home/splash'
    end
  end

  def index
    if current_user
      @user_games = true
    else
      render '/home/splash'
    end
  end

  def show
    if current_user
      @user_game = UserGame.find(params[:id])
    else
      render '/home/splash'
    end
  end
end
