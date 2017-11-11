require 'rails_helper'

feature 'user visits create game page' do
  scenario 'and sees a subtitle' do
    stub_omniauth
    @user = User.first

    visit '/'
    click_on('Sign in with Google')

    visit '/user_games/new'

    expect(page).to have_content("Quiz other trivia buffs on topics you love.")
  end
end
