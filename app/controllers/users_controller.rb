class UsersController < ApplicationController
  def show
    @user = current_user
    @user_profile = true
  end
end
