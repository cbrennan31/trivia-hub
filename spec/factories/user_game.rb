require 'factory_girl_rails'

FactoryGirl.define do
  factory :user_game do
    title 'MLB Trivia'
    description 'Think you know everything about our national pastime?'
    strikes 3
  end
end
