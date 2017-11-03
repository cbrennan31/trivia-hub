class Api::V1::UserCluesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def destroy
    @user_clue = UserClue.find(params[:id])
    @user_clue.destroy

    @games = UserGame.where({user: current_user}).order(created_at: :desc)
    @clues = UserClue.where({user_game: @games}).order(:value)
    render json: {clues: @clues.order(:value)}
  end
end
