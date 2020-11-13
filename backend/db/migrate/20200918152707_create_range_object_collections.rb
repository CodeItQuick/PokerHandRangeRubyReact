class CreateRangeObjectCollections < ActiveRecord::Migration[6.0]
  def change
    create_table :range_object_collections do |t|
      t.string :ScenarioName, :null => false, :unique => true
      t.string :Board, index: true, :null => false
      t.string :HandName, index: true, :null => false
      t.string :PokerUser, index: true, :null => false
      t.string :positionOpener, index: true, :null => false
      t.string :positionDefender, index: true, :null => false
      t.timestamps
      t.index [:ScenarioName, :HandName, :PokerUser], :unique => true, name: :Filename
    end
  end
end
