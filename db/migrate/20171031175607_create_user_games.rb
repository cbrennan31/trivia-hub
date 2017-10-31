class CreateUserGames < ActiveRecord::Migration
  def change
    create_table :user_games do |t|
      t.string   "title",       null: false
      t.string   "description", null: false
      t.integer  "strikes",     null: false
      t.datetime "created_at"
      t.datetime "updated_at"
      t.integer  "user_id",     null: false
    end
  end
end
