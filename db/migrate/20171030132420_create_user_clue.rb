class CreateUserClue < ActiveRecord::Migration
  def change
    create_table :user_clues do |t|
      t.string :question, null: false
      t.string :answer, null: false
      t.integer :value, null: false
      t.string :category, null: false

      t.timestamps
    end
  end
end
