class AddLifetimePointsToUser < ActiveRecord::Migration
  def change
    add_column :users, :lifetime_points, :integer, default: 0
  end
end
