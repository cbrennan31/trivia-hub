require 'rails_helper'

feature 'user signs in ' do
  scenario 'with Google OAuth2' do
    stub_omniauth
    visit '/'
    click_on "Sign in with Google"
    
    expect(page).to have_content "Classic Mode: All-Time Leaders"
  end
end
