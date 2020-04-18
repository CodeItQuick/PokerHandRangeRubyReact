class HandRangeGroup < ApplicationRecord
    belongs_to :hand_range
    belongs_to :hand_range_folder
    validates :hand_range_id, presence: true
    validates :hand_range_folder_id, presence: true
    
end
