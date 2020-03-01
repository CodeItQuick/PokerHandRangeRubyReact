class CreateHandRangeGroup < ActiveRecord::Migration[6.0]
  def change
    create_table :hand_range_groups do |t|
      t.string :GroupName

      t.references :hand_range, index: true, foreign_key: true
      t.references :hand_range_folder, index: true, foreign_key: true
    end
  end
end
