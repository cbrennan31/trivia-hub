require 'rails_helper'

feature 'user visits profile page' do
  scenario 'and sees their stats in classic mode' do
    stub_omniauth
    @user = User.first
    binding.pry

    visit '/'
    click_on('Sign in with Google')

    3.times do
      FactoryGirl.create(:game, user: @user)
    end

    games_played = 0
    questions_correct = 0

    Game.all.each do |game|
        questions_correct += game.questions_correct
        games_played += 1
    end

    visit "/users/#{@user.id}"

    expect(page).to have_content("My Stats (Classic Mode)")
    expect(page).to have_content(games_played)
    expect(page).to have_content(questions_correct)
  end
end
