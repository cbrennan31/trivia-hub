class AddPointsPerGameToUser < ActiveRecord::Migration
  def change
    add_column :users, :points_per_game, :float, default: 0
  end
end
