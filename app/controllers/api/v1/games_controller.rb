class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    @game = Game.create(
      user: current_user,
      total_score: params[:newGame][:total_score],
      questions_correct: params[:newGame][:questions_correct]
    )

    redirect_to game_index_path
  end
end
