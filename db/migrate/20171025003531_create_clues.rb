class CreateClues < ActiveRecord::Migration
  def change
    create_table :clues do |t|
      t.string :question, null: false
      t.string :answer, null: false
      t.integer :value, null: false
      t.date :airdate, null: false
      t.integer :game_id, null: false
    end
  end
end
