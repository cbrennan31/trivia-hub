class HomeController < ApplicationController
  def index
    if current_user
      @top_five_users = User.top_five(User.all)
    else
      render '/home/splash'
    end
  end
end
