class CreateRangeObjectCollections < ActiveRecord::Migration[6.0]
  def change
    create_table :range_object_collections do |t|
      t.string :Board, index: true, :null => false
      t.string :HandName, index: true, :null => false
      t.string :PokerUser, index: true, :null => false
      t.timestamps
      t.index [:Board, :HandName, :PokerUser], :unique => true, name: :UniqueSaveKey
    end
  end
end
