class Api::V1::UserGamesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def destroy
  end

  def create

    @user_game = UserGame.create(
      title: user_game_params[:title],
      description: user_game_params[:description],
      strikes: user_game_params[:strikes],
      user: current_user
    )

    @user_clues = params[:clues].each_with_index do |clue, index|
      UserClue.create(
        question: user_clue_params(index)[:question],
        answer: user_clue_params(index)[:answer],
        value: user_clue_params(index)[:value],
        category: user_clue_params(index)[:category],
        user_game_id: @user_game.id
      )
    end

    render json: {user_game_id: @user_game.id}
  end

  def show
    @user_game = UserGame.find(params[:id])
    @clues = @user_game.user_clues.order(:value)

    render json: {game: @user_game, clues: @clues}
  end

  def update
    @user_game = UserGame.find(params[:id])

    @user_game.update(user_game_params)

    @user_clues_old = UserClue.where(user_game: @user_game)

    @user_clues_old.each do |clue|
      clue.destroy
    end

    @user_clues = params[:clues].each_with_index do |clue, index|
      UserClue.create(
        question: user_clue_params(index)[:question],
        answer: user_clue_params(index)[:answer],
        value: user_clue_params(index)[:value],
        category: user_clue_params(index)[:category],
        user_game_id: @user_game.id
      )
    end
    @games = UserGame.where({user: current_user}).order(created_at: :desc)
    @clues = UserClue.where({user_game: @games}).order(:value)

    render json: { games: @games, clues: @clues }
  end

  def destroy
    @user_game = UserGame.find(params[:id])
    @user_game.destroy
    @clues = UserClue.where({user_game_id: params[:id]})

    @clues.each do |c|
      c.destroy
    end
    @games = UserGame.where({user: current_user}).order(created_at: :desc)
    @clues = UserClue.where({user_game: @games}).order(:value)

    render json: { games: @games, clues: @clues }
  end

  def index
    @games = UserGame.all.order(created_at: :desc)
    @clues = UserClue.all.order(:value)
    render json: {games: @games, clues: @clues}
  end

  private

  def user_game_params
    params.require(:user_game).permit(:title, :description, :strikes)
  end

  def user_clue_params(index)
    params[:clues][index].permit(:value, :category, :question, :answer)
  end
end
