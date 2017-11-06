require 'rails_helper'

RSpec.describe UserGame, type: :user_game do

  context "when the game is created" do
    before(:each) do
      auth = {
        provider: "google",
        uid: "12345678910",
        info: {
          email: "cbrennan31@gmail.com",
          first_name: "Casey",
          last_name: "Brennan"
        },
        credentials: {
          token: "abcdefg12345",
          refresh_token: "12345abcdefg",
          expires_at: DateTime.now
        }
      }

      @user = User.update_or_create(auth)
      @user_game = FactoryGirl.create(:user_game, user: @user)
    end

    it 'has a title' do
      expect(UserGame.last.title).to eq(@user_game.title)
    end

    it 'has a description' do
      expect(UserGame.last.description).to eq(@user_game.description)
    end

    it 'has a number of strikes' do
      expect(UserGame.last.strikes).to eq(@user_game.strikes)
    end

    it 'has a user' do
      expect(UserGame.last.user).to be_truthy
    end
  end

  context 'when the game is created with missing attributes' do
    before(:each) do
      auth = {
        provider: "google",
        uid: "12345678910",
        info: {
          email: "cbrennan31@gmail.com",
          first_name: "Casey",
          last_name: "Brennan"
        },
        credentials: {
          token: "abcdefg12345",
          refresh_token: "12345abcdefg",
          expires_at: DateTime.now
        }
      }

      @user = User.update_or_create(auth)
    end

    it 'does not save without a title' do
      UserGame.all.each { |g| g.destroy }
      @user_game = FactoryGirl.build(:user_game, user: @user, title: nil)
      expect(@user_game).to_not be_valid
    end

    it 'does not save without a description' do
      UserGame.all.each { |g| g.destroy }
      @user_game = FactoryGirl.build(:user_game, user: @user, description: nil)
      expect(@user_game).to_not be_valid
    end

    it 'does not save without a number of strikes' do
      UserGame.all.each { |g| g.destroy }
      @user_game = FactoryGirl.build(:user_game, user: @user, strikes: nil)
      expect(@user_game).to_not be_valid
    end
  end
end
