require 'rails_helper'

RSpec.describe User, type: :user do
  it "creates or updates itself from an oauth hash" do

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

    User.update_or_create(auth)
    new_user = User.first

    expect(new_user.provider).to eq("google")
    expect(new_user.uid).to eq("12345678910")
    expect(new_user.email).to eq("cbrennan31@gmail.com")
    expect(new_user.first_name).to eq("Casey")
    expect(new_user.last_name).to eq("Brennan")
    expect(new_user.token).to eq("abcdefg12345")
    expect(new_user.refresh_token).to eq("12345abcdefg")
  end

  it "calculates its lifetime_earnings" do
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

    User.update_or_create(auth)
    new_user = User.first

    game_1 = FactoryGirl.create(:game, user: new_user)

    game_2 = FactoryGirl.create(:game, user: new_user)

    expect(new_user.lifetime_earnings).to eq(5600)
  end

  # how to test class method?
end
