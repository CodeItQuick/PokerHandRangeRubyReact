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

ActiveRecord::Schema.define(version: 2020_09_18_152840) do

  create_table "hands", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "hand"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "range_collection_meta", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "range_object_collection_id"
    t.bigint "range_object_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["range_object_collection_id"], name: "index_range_collection_meta_on_range_object_collection_id"
    t.index ["range_object_id"], name: "index_range_collection_meta_on_range_object_id"
  end

  create_table "range_hand_meta", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "range_object_id"
    t.bigint "hand_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["hand_id"], name: "index_range_hand_meta_on_hand_id"
    t.index ["range_object_id"], name: "index_range_hand_meta_on_range_object_id"
  end

  create_table "range_object_collections", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "ScenarioName", null: false
    t.string "Board", null: false
    t.string "HandName", null: false
    t.string "PokerUser", null: false
    t.string "positionOpener", null: false
    t.string "positionDefender", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["Board"], name: "index_range_object_collections_on_Board"
    t.index ["HandName"], name: "index_range_object_collections_on_HandName"
    t.index ["PokerUser"], name: "index_range_object_collections_on_PokerUser"
    t.index ["ScenarioName", "HandName", "PokerUser"], name: "Filename", unique: true
    t.index ["positionDefender"], name: "index_range_object_collections_on_positionDefender"
    t.index ["positionOpener"], name: "index_range_object_collections_on_positionOpener"
  end

  create_table "range_objects", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "Street"
    t.string "BetType"
    t.string "PokerHands"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "range_collection_meta", "range_object_collections"
  add_foreign_key "range_collection_meta", "range_objects"
  add_foreign_key "range_hand_meta", "hands"
  add_foreign_key "range_hand_meta", "range_objects"
end
