class CreateHandRanges < ActiveRecord::Migration[6.0]
  def change
    create_table :hand_ranges do |t|
      t.string :RangeName
      t.string :RangeScope0
      t.string :RangeScope1
      t.string :RangeScope2
      t.string :RangeScope3
      t.string :RangeScope4
      t.references :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end