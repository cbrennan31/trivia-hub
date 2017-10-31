class Api::V1::UserGamesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create

    @user_game = UserGame.create(
      title: user_game_params[:title],
      description: user_game_params[:description],
      strikes: user_game_params[:strikes],
      user: current_user
    )

    @user_clues = params[:clues].each_with_index do |clue, index|
      @clue = UserClue.create(
        question: user_clue_params(index)[:question],
        answer: user_clue_params(index)[:answer],
        value: user_clue_params(index)[:value],
        category: user_clue_params(index)[:category],
        user_game_id: @user_game.id
      )
    end

    redirect_to new_user_game_path
  end

  def index
    render json: {games: UserGame.all, clues: UserClue.all}
  end

  private

  def user_game_params
    params.require(:user_game).permit(:title, :description, :strikes)
  end

  def user_clue_params(index)
    params[:clues][index].permit(:value, :category, :question, :answer)
  end
end
