class HandRangeFolder < ApplicationRecord
    belongs_to :user
    has_many :hand_range_groups
    validates :user_id, presence: true
end
