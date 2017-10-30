class CreateUserGame < ActiveRecord::Migration
  def change
    create_table :user_games do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.integer :strikes, null: false

      t.timestamps
    end
  end
end
