require 'rails_helper'

feature 'user visits home page' do
  before(:each) do
    stub_omniauth
    @user = User.first

    visit '/'
    click_on('Sign in with Google')
  end

  scenario 'and sees a list of all-time leaders in classic mode' do
    visit '/home'
    expect(page).to have_content(@user.first_name)
  end

  scenario 'and navigates to classic mode' do
    visit '/home'
    click_on 'Play'

    find('h2', text: "Classic Mode")
  end

  scenario 'and navigates to the index of user games' do
    visit '/home'
    click_on 'Browse'

    find('h2', text: "User-Created Games")
  end

  scenario 'and navigates to the page to create a game' do
    visit '/home'
    click_on 'Create'

    find('h2', text: 'Create Your Own Game')
  end

  scenario 'and navigates to their profile page' do
    visit '/home'
    click_on 'Profile'

    find('h2', text: 'My Profile')
  end

  scenario 'and signs out' do
    visit '/home'
    click_on 'Sign Out'

    expect(page).to have_content('Sign in with Google')
  end
end
