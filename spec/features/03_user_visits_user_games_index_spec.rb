require 'rails_helper'

feature 'user visits user games index' do
  scenario 'and sees a subtitle' do
    stub_omniauth
    @user = User.first

    visit '/'
    click_on('Sign in with Google')

    visit '/user_games'

    expect(page).to have_content("Trebek isn\'t the only expert around here.")
  end
end
