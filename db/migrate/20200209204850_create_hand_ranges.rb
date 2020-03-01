class CreateHandRanges < ActiveRecord::Migration[6.0]
  def change
    create_table :hand_ranges do |t|
      t.string :RangeName
      t.string :RangeScope

      t.timestamps
    end
  end
end