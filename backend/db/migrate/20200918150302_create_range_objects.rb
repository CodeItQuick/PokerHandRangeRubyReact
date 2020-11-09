class CreateRangeObjects < ActiveRecord::Migration[6.0]
  def change
    create_table :range_objects do |t|
      t.string :Street
      t.string :BetType
      t.string :PokerHands

      t.timestamps
    end
  end
end
