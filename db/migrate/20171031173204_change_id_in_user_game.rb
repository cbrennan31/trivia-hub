class ChangeIdInUserGame < ActiveRecord::Migration
  def change
    change_column :user_games, :id, :string, null: false
  end
end
