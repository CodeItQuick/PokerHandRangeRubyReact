class CreateHandRangeFolder < ActiveRecord::Migration[6.0]
  def change
    create_table :hand_range_folders do |t|
      t.string :FolderName
      t.belongs_to :user, index: true, foreign_key: true

    end
  end
end
