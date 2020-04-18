# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_24_121315) do

  create_table "hand_range_folders", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "FolderName"
    t.bigint "user_id"
    t.index ["user_id"], name: "index_hand_range_folders_on_user_id"
  end

  create_table "hand_range_groups", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "GroupName"
    t.bigint "hand_range_id"
    t.bigint "hand_range_folder_id"
    t.index ["hand_range_folder_id"], name: "index_hand_range_groups_on_hand_range_folder_id"
    t.index ["hand_range_id"], name: "index_hand_range_groups_on_hand_range_id"
  end

  create_table "hand_ranges", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "RangeName"
    t.string "RangeScope"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
  end

  add_foreign_key "hand_range_folders", "users"
  add_foreign_key "hand_range_groups", "hand_range_folders"
  add_foreign_key "hand_range_groups", "hand_ranges"
end
