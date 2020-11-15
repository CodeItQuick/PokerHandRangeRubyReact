class CreateRangeObjects < ActiveRecord::Migration[6.0]
  def change
    create_table :range_objects do |t|
      t.string :Street
      t.string :BetType
      t.text :PokerHands

      t.timestamps
    end
  end
end
