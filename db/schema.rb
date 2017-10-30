# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171030132536) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ar_internal_metadata", primary_key: "key", force: :cascade do |t|
    t.string   "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.integer  "total_score",       null: false
    t.integer  "questions_correct", null: false
    t.integer  "user_id",           null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "user_clues", force: :cascade do |t|
    t.string   "question",   null: false
    t.string   "answer",     null: false
    t.integer  "value",      null: false
    t.string   "category",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_games", force: :cascade do |t|
    t.string   "title",       null: false
    t.string   "description", null: false
    t.integer  "strikes",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "token"
    t.string   "refresh_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "lifetime_correct", default: 0
    t.integer  "lifetime_points",  default: 0
    t.float    "points_per_game",  default: 0.0
  end

end
