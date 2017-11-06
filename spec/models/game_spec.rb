require 'rails_helper'

RSpec.describe Game, type: :game do

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
      @game = FactoryGirl.create(:game, user: @user)
    end

    it 'has a total score' do
      expect(Game.last.total_score).to eq(@game.total_score)
    end

    it 'has a number of correctly answered questions' do
      expect(Game.last.questions_correct).to eq(@game.questions_correct)
    end

    it 'has a user' do
      expect(Game.last.user).to be_truthy
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

    it 'does not save without a total score' do
      Game.all.each { |g| g.destroy }
      @game = FactoryGirl.build(:game, user: @user, total_score: nil)
      expect(@game).to_not be_valid
    end

    it 'does not save without a number of correctly answer questions' do
      Game.all.each { |g| g.destroy }
      @game = FactoryGirl.build(:game, user: @user, questions_correct: nil)
      expect(@game).to_not be_valid
    end
  end
end
