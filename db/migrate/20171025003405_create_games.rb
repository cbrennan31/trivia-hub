class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :total_score, null: false
      t.integer :questions_correct, null: false
      t.integer :user_id, null: false
    end
  end
end
