class HomeController < ApplicationController
  def index
    @users = User.all

    @users = @users.sort_by do |u|
      u.lifetime_earnings
    end

    @users.reverse
    array = []

    @users.each do |user|
      if @users.index(user) < 5
        array << user
      end
    end

    @users = array.reverse
  end

  def privacy
    render '/home/privacy'
  end
end
