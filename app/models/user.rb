class User < ActiveRecord::Base
  def self.update_or_create(auth)
    user = User.find_by(uid: auth[:uid]) || User.new
    user.attributes = {
      provider: auth[:provider],
      uid: auth[:uid],
      email: auth[:info][:email],
      first_name: auth[:info][:first_name],
      last_name: auth[:info][:last_name],
      token: auth[:credentials][:token],
      refresh_token: auth[:credentials][:refresh_token],
      oauth_expires_at: auth[:credentials][:expires_at],
    }
    user.save!
    user
  end

  has_many :games

  def lifetime_earnings
    lifetime_earnings = 0

    self.games.each do |game|
      lifetime_earnings += game.total_score
    end

    return lifetime_earnings
  end

  def self.top_five(users)
    users = users.sort_by do |u|
      u.lifetime_earnings
    end

    users.reverse!

    top_five_users = []

    users.each do |u|
      if users.index(u) < 5
        top_five_users << u
      end
    end

    return top_five_users
  end
end
