class UsersController < ApplicationController
  def show
    @user = current_user
    @user_profile = true
    @games = Game.where({user: current_user})

    @lifetime_earnings = 0
    @lifetime_correct = 0
    @lifetime_games = 0

    if @games > 0

      @games.each do |game|
        @lifetime_earnings += game.total_score
        @lifetime_correct += game.questions_correct
        @lifetime_games += 1
      end

      @lifetime_earnings = @lifetime_earnings

      @earnings_per_game = @lifetime_earnings / @lifetime_games
    end
  end
end
