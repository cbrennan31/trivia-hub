class Game < ApplicationRecord
  validates :total_score, presence: true
  validates :questions_correct, presence: true

  belongs_to :user
end
