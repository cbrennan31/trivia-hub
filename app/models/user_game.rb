class UserGame < ApplicationRecord
  belongs_to :user
  has_many :user_clues

  # validates :user_clues, length: {minimum: 2, maximum: 12}
  validates :title, presence: true
  validates :description, presence: true
  validates :strikes, presence: true
end
