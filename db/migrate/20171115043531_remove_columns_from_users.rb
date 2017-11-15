class RemoveColumnsFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :lifetime_correct
    remove_column :users, :lifetime_points
    remove_column :users, :points_per_game

  end
end
