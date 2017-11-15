class GameController < ApplicationController
  def index
    if current_user
      @game = true
    else 
      render '/home/splash'
    end
  end
end
