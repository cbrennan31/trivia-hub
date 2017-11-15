class HomeController < ApplicationController
  def index
    if current_user
      @users = User.all

      @users = @users.sort_by do |u|
        u.lifetime_earnings
      end

      @users.reverse!

      array = []

      @users.each do |user|
        if @users.index(user) < 5
          array << user
        end
      end

      @users = array
    else 
      render '/home/splash'
    end
  end

end
