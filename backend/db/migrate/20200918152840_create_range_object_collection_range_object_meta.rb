class CreateRangeObjectCollectionRangeObjectMeta < ActiveRecord::Migration[6.0]
  def change
    create_table :range_collection_meta do |t|
      t.references :range_object_collection, foreign_key: true, references: :range_object_collection
      t.references :range_object, foreign_key: true, references: :range_object
      t.timestamps
    end
  end
end
