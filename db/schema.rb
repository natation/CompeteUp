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

ActiveRecord::Schema.define(version: 20151014233532) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "competition_interests", force: :cascade do |t|
    t.integer  "competition_id", null: false
    t.integer  "interest_id",    null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "competition_interests", ["competition_id", "interest_id"], name: "index_competition_interests_on_competition_id_and_interest_id", unique: true, using: :btree
  add_index "competition_interests", ["interest_id"], name: "index_competition_interests_on_interest_id", using: :btree

  create_table "competition_photos", force: :cascade do |t|
    t.string   "url",            null: false
    t.integer  "competition_id", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "competition_photos", ["competition_id"], name: "index_competition_photos_on_competition_id", using: :btree

  create_table "competitions", force: :cascade do |t|
    t.string   "name",                 null: false
    t.string   "location",             null: false
    t.text     "description",          null: false
    t.string   "profile_pic_url"
    t.integer  "competition_owner_id", null: false
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "competitions", ["competition_owner_id"], name: "index_competitions_on_competition_owner_id", using: :btree

  create_table "events", force: :cascade do |t|
    t.text     "description",    null: false
    t.integer  "competition_id", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "events", ["competition_id"], name: "index_events_on_competition_id", using: :btree

  create_table "interests", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "interests", ["name"], name: "index_interests_on_name", unique: true, using: :btree

  create_table "user_competitions", force: :cascade do |t|
    t.integer  "user_id",        null: false
    t.integer  "competition_id", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "user_competitions", ["competition_id"], name: "index_user_competitions_on_competition_id", using: :btree
  add_index "user_competitions", ["user_id", "competition_id"], name: "index_user_competitions_on_user_id_and_competition_id", unique: true, using: :btree

  create_table "user_events", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "event_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "user_events", ["event_id"], name: "index_user_events_on_event_id", using: :btree
  add_index "user_events", ["user_id", "event_id"], name: "index_user_events_on_user_id_and_event_id", unique: true, using: :btree

  create_table "user_interests", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "interest_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "user_interests", ["interest_id"], name: "index_user_interests_on_interest_id", using: :btree
  add_index "user_interests", ["user_id", "interest_id"], name: "index_user_interests_on_user_id_and_interest_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "profile_pic_url"
    t.text     "bio"
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "name",            null: false
    t.string   "location",        null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
