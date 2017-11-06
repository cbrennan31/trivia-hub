require 'rails_helper'

RSpec.describe UserClue, type: :user_clue do

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
      @user_clue = FactoryGirl.create(:user_clue, user_game: @user_game)
    end

    it 'has a value' do
      expect(UserClue.last.value).to eq(@user_clue.value)
    end

    it 'has a category' do
      expect(UserClue.last.category).to eq(@user_clue.category)
    end

    it 'has a question' do
      expect(UserClue.last.question).to eq(@user_clue.question)
    end

    it 'has an answer' do
      expect(UserClue.last.answer).to eq(@user_clue.answer)
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
