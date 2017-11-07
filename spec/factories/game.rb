require 'factory_girl_rails'

FactoryGirl.define do
  factory :game do
    total_score 2800
    questions_correct 7
  end
end
