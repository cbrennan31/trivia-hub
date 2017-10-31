class AddUserIdToUserGames < ActiveRecord::Migration
  def change
    add_column :user_games, :user_id, :integer, null: false
  end
end
