class CreateHands < ActiveRecord::Migration[6.0]
  def change
    create_table :hands do |t|
      t.string :hand

      t.timestamps
    end
  end
end
