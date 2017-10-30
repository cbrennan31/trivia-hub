class AddTimestampsToGames < ActiveRecord::Migration
  def change
    add_column :games, :created_at, :datetime, null: false
    add_column :games, :updated_at, :datetime, null: false
  end
end
