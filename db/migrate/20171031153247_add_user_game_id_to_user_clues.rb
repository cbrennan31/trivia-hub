class AddUserGameIdToUserClues < ActiveRecord::Migration
  def change
    add_column :user_clues, :user_game_id, :integer, null: false
  end
end
