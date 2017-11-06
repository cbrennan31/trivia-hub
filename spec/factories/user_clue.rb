require 'factory_girl_rails'

FactoryGirl.define do
  factory :clue do
    value 200
    category 'Red Sox'
    question 'This Red Sox legend had a street named after him in 2017.'
    answer 'David Ortiz'
  end
end
