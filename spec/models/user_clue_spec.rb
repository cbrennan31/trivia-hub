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
      expect(UserClue.last.value).to eq(200)
    end

    it 'has a category' do
      expect(UserClue.last.category).to eq('Red Sox')
    end

    it 'has a question' do
      expect(UserClue.last.question).to eq('This Red Sox legend had a street named after him in 2017.')
    end

    it 'has an answer' do
      expect(UserClue.last.answer).to eq('David Ortiz')
    end

    it 'has a user game' do
      expect(UserClue.last.user_game).to be_truthy
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
      @user_game = FactoryGirl.create(:user_game, user: @user)
    end

    it 'does not save without a value' do
      UserClue.all.each { |g| g.destroy }
      @user_clue = FactoryGirl.build(:user_clue, user_game: @user_game, value: nil)
      expect(@user_clue).to_not be_valid
    end

    it 'does not save without a category' do
      UserClue.all.each { |g| g.destroy }
      @user_clue = FactoryGirl.build(:user_clue, user_game: @user_game, category: nil)
      expect(@user_clue).to_not be_valid
    end

    it 'does not save without a question' do
      UserClue.all.each { |g| g.destroy }
      @user_clue = FactoryGirl.build(:user_clue, user_game: @user_game, question: nil)
      expect(@user_clue).to_not be_valid
    end

    it 'does not save without a answer' do
      UserClue.all.each { |g| g.destroy }
      @user_clue = FactoryGirl.build(:user_clue, user_game: @user_game, question: nil)
      expect(@user_clue).to_not be_valid
    end
  end
end
