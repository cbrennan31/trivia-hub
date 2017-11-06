class UserGame < ApplicationRecord
  belongs_to :user
  has_many :user_clues

  validates :title, presence: true
  validates :description, presence: true
  validates :strikes, presence: true
end
