class UserClue < ApplicationRecord
  belongs_to :user_game

  validates :value, presence: true
  validates :category, presence: true
  validates :question, presence: true
  validates :answer, presence: true
end
