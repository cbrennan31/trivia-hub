class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:show]

  def show
    @user = User.find(params[:id])
    @games = (UserGame.where({user: @user})).order(created_at: :desc)
    @clues = UserClue.where({user_game: @games}).order(:value)
    render json: {
      games: @games,
      clues: @clues
    }
  end
end
