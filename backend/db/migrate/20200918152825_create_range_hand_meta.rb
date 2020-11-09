class CreateRangeHandMeta < ActiveRecord::Migration[6.0]
  def change
    create_table :range_hand_meta do |t|
      t.references :range_object, foreign_key: true, references: :range_object
      t.references :hand, foreign_key: true, references: :hand
      t.timestamps
    end
  end
end
